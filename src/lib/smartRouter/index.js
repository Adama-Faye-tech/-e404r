/**
 * E404R Smart AI Router — Intelligence Layer
 * ===========================================
 * Automatically selects the optimal AI provider and model
 * based on request type, cost, quality, and availability.
 *
 * Strategy: cost | quality | speed | balanced (default)
 */

import { classifyRequest } from "./classifier.js";
import { selectByCost } from "./costOptimizer.js";
import { selectByQuality } from "./qualityRouter.js";
import { checkAvailability } from "./availabilityChecker.js";

// Default routing strategy from env
const DEFAULT_STRATEGY = process.env.E404R_ROUTING_STRATEGY || "balanced";

// Provider priority lists by capability
const PROVIDER_TIERS = {
  code: [
    { provider: "anthropic", model: "claude-opus-4-5",      quality: 0.97, costPer1k: 0.015 },
    { provider: "deepseek",  model: "deepseek-coder-v2",   quality: 0.94, costPer1k: 0.001 },
    { provider: "openai",    model: "gpt-4o",              quality: 0.93, costPer1k: 0.005 },
    { provider: "gemini",    model: "gemini-2.5-pro",      quality: 0.92, costPer1k: 0.003 },
    { provider: "groq",      model: "qwen-qwq-32b",        quality: 0.88, costPer1k: 0.0009 },
  ],
  creative: [
    { provider: "anthropic", model: "claude-opus-4-5",      quality: 0.97, costPer1k: 0.015 },
    { provider: "openai",    model: "gpt-4o",              quality: 0.93, costPer1k: 0.005 },
    { provider: "gemini",    model: "gemini-2.5-pro",      quality: 0.91, costPer1k: 0.003 },
    { provider: "mistral",   model: "mistral-large-latest",quality: 0.87, costPer1k: 0.003 },
  ],
  analysis: [
    { provider: "gemini",    model: "gemini-2.5-pro",      quality: 0.95, costPer1k: 0.003 },
    { provider: "anthropic", model: "claude-opus-4-5",      quality: 0.94, costPer1k: 0.015 },
    { provider: "deepseek",  model: "deepseek-r1",         quality: 0.93, costPer1k: 0.0014 },
    { provider: "openai",    model: "gpt-4o",              quality: 0.91, costPer1k: 0.005 },
  ],
  simple: [
    { provider: "groq",      model: "llama-3.3-70b-versatile", quality: 0.84, costPer1k: 0.00059 },
    { provider: "deepseek",  model: "deepseek-chat",       quality: 0.85, costPer1k: 0.00027 },
    { provider: "gemini",    model: "gemini-2.0-flash",    quality: 0.83, costPer1k: 0.0001 },
    { provider: "openai",    model: "gpt-4o-mini",         quality: 0.82, costPer1k: 0.00015 },
  ],
  search: [
    { provider: "perplexity",model: "sonar-pro",            quality: 0.92, costPer1k: 0.003 },
    { provider: "gemini",    model: "gemini-2.5-pro",      quality: 0.88, costPer1k: 0.003 },
    { provider: "openai",    model: "gpt-4o-search-preview",quality: 0.90, costPer1k: 0.006 },
  ],
  local: [
    { provider: "ollama",    model: "llama3.2",             quality: 0.78, costPer1k: 0 },
    { provider: "ollama",    model: "qwen2.5-coder",        quality: 0.80, costPer1k: 0 },
  ],
};

/**
 * Main smart routing function.
 *
 * @param {Object} request - The incoming chat request body
 * @param {Object} options
 * @param {string} [options.strategy] - Routing strategy override
 * @param {string[]} [options.availableProviders] - List of configured provider names
 * @param {boolean} [options.allowLocal] - Whether to consider local Ollama models
 * @returns {Promise<SmartRouteResult>}
 */
export async function smartRoute(request, options = {}) {
  const {
    strategy = DEFAULT_STRATEGY,
    availableProviders = null,
    allowLocal = true,
  } = options;

  const startMs = Date.now();

  // 1. Classify the request
  const classification = classifyRequest(request);

  // 2. Get candidate providers for this task type
  let candidates = PROVIDER_TIERS[classification.type] || PROVIDER_TIERS.simple;

  // 3. Filter local models if not allowed
  if (!allowLocal) {
    candidates = candidates.filter((c) => c.provider !== "ollama");
  }

  // 4. Filter to only configured providers (if list provided)
  if (availableProviders && availableProviders.length > 0) {
    const filtered = candidates.filter((c) => availableProviders.includes(c.provider));
    if (filtered.length > 0) candidates = filtered;
    // else fall back to full list (better than nothing)
  }

  // 5. Apply routing strategy
  let ranked;
  switch (strategy) {
    case "cost":
      ranked = selectByCost(candidates);
      break;
    case "quality":
      ranked = selectByQuality(candidates);
      break;
    case "speed":
      // Speed: prefer Groq (ultra-fast) and local
      ranked = candidates.slice().sort((a, b) => {
        const speedOrder = ["groq", "ollama", "gemini", "openai", "anthropic", "deepseek", "mistral"];
        return speedOrder.indexOf(a.provider) - speedOrder.indexOf(b.provider);
      });
      break;
    case "balanced":
    default:
      // Balanced: weighted score (60% quality, 40% cost-efficiency)
      ranked = candidates.slice().sort((a, b) => {
        const scoreA = a.quality * 0.6 + (1 - Math.min(a.costPer1k / 0.02, 1)) * 0.4;
        const scoreB = b.quality * 0.6 + (1 - Math.min(b.costPer1k / 0.02, 1)) * 0.4;
        return scoreB - scoreA;
      });
      break;
  }

  // 6. Pick the best available candidate (with availability check)
  let selected = null;
  const checked = [];
  for (const candidate of ranked) {
    const available = await checkAvailability(candidate.provider);
    checked.push({ ...candidate, available });
    if (available) {
      selected = candidate;
      break;
    }
  }

  // 7. Fallback: if none available, use the top candidate anyway
  if (!selected) {
    selected = ranked[0] || { provider: "openai", model: "gpt-4o", quality: 0.9, costPer1k: 0.005 };
  }

  const elapsedMs = Date.now() - startMs;

  return {
    provider: selected.provider,
    model:    selected.model,
    quality:  selected.quality,
    costPer1k: selected.costPer1k,
    strategy,
    classification,
    candidates: checked,
    routingMs: elapsedMs,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Analyze a request and return routing recommendation without executing.
 * Used by the /api/smart-route/analyze endpoint.
 *
 * @param {Object} request
 * @param {Object} options
 * @returns {Promise<SmartRouteResult>}
 */
export async function analyzeRequest(request, options = {}) {
  return smartRoute(request, { ...options });
}

/**
 * @typedef {Object} SmartRouteResult
 * @property {string} provider - Selected provider name
 * @property {string} model - Selected model name
 * @property {number} quality - Estimated quality score (0-1)
 * @property {number} costPer1k - Cost per 1k tokens (USD)
 * @property {string} strategy - Routing strategy used
 * @property {Object} classification - Request classification result
 * @property {Array}  candidates - All candidates with availability status
 * @property {number} routingMs - Time taken to route (ms)
 * @property {string} timestamp - ISO timestamp
 */
