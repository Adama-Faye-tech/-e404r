/**
 * E404R Availability Checker
 * ==========================
 * Lightweight provider availability check.
 * Fail-open: if check fails, provider is assumed available.
 */

// Simple in-memory cache: { provider: { available, checkedAt } }
const cache = new Map();
const CACHE_TTL_MS = 30_000; // 30 seconds

// Known health/ping endpoints for providers
const HEALTH_URLS = {
  openai:     "https://status.openai.com/api/v2/status.json",
  anthropic:  "https://status.anthropic.com/api/v2/status.json",
  gemini:     "https://generativelanguage.googleapis.com/",
  groq:       "https://api.groq.com/",
  mistral:    "https://api.mistral.ai/",
  deepseek:   "https://api.deepseek.com/",
  ollama:     "http://localhost:11434/api/tags",
  perplexity: "https://api.perplexity.ai/",
};

/**
 * Check if a provider is available.
 * Uses a 30-second cache to avoid hammering providers.
 *
 * Always fail-open: returns true on error so routing continues.
 *
 * @param {string} provider
 * @returns {Promise<boolean>}
 */
export async function checkAvailability(provider) {
  // Check cache
  const cached = cache.get(provider);
  if (cached && Date.now() - cached.checkedAt < CACHE_TTL_MS) {
    return cached.available;
  }

  const url = HEALTH_URLS[provider];

  // Unknown providers are assumed available
  if (!url) {
    cache.set(provider, { available: true, checkedAt: Date.now() });
    return true;
  }

  // For local Ollama: quick TCP-style check
  if (provider === "ollama") {
    return checkOllama();
  }

  // For cloud providers: lightweight HEAD/GET with short timeout
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000); // 2s timeout
    const res = await fetch(url, {
      method: "GET",
      signal: controller.signal,
      headers: { "User-Agent": "E404R-HealthCheck/1.0" },
    }).finally(() => clearTimeout(timeout));

    const available = res.status < 500;
    cache.set(provider, { available, checkedAt: Date.now() });
    return available;
  } catch {
    // Fail-open: if we can't check, assume available
    cache.set(provider, { available: true, checkedAt: Date.now() });
    return true;
  }
}

async function checkOllama() {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1000);
    const res = await fetch("http://localhost:11434/api/tags", {
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
    const available = res.ok;
    cache.set("ollama", { available, checkedAt: Date.now() });
    return available;
  } catch {
    cache.set("ollama", { available: false, checkedAt: Date.now() });
    return false;
  }
}

/**
 * Invalidate cached status for a provider (call after an error).
 * @param {string} provider
 */
export function invalidateCache(provider) {
  cache.delete(provider);
}

/**
 * Get all cached availability statuses.
 * @returns {Object}
 */
export function getCachedStatuses() {
  const result = {};
  for (const [provider, data] of cache.entries()) {
    result[provider] = { ...data, ageMs: Date.now() - data.checkedAt };
  }
  return result;
}
