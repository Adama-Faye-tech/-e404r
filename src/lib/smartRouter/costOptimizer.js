/**
 * E404R Cost Optimizer
 * ====================
 * Ranks provider candidates by cost efficiency.
 */

/**
 * Sort candidates by cost per 1k tokens (ascending = cheapest first).
 * Free providers (costPer1k === 0) always rank first.
 *
 * @param {Array} candidates
 * @returns {Array} Sorted candidates
 */
export function selectByCost(candidates) {
  return candidates.slice().sort((a, b) => {
    // Free models always win on cost
    if (a.costPer1k === 0 && b.costPer1k > 0) return -1;
    if (b.costPer1k === 0 && a.costPer1k > 0) return 1;
    // Among paid, sort by cost ascending
    if (a.costPer1k !== b.costPer1k) return a.costPer1k - b.costPer1k;
    // Tiebreak: quality descending
    return b.quality - a.quality;
  });
}

/**
 * Estimate cost for a request based on token count and provider.
 *
 * @param {string} provider
 * @param {number} inputTokens
 * @param {number} outputTokens
 * @param {Object} [rates] - Optional override rates map { provider: { input, output } }
 * @returns {number} Estimated cost in USD
 */
export function estimateCost(provider, inputTokens, outputTokens, rates = {}) {
  const defaultRates = {
    openai:    { input: 0.003,  output: 0.006 },
    anthropic: { input: 0.015,  output: 0.075 },
    gemini:    { input: 0.00125, output: 0.005 },
    deepseek:  { input: 0.00014, output: 0.00028 },
    mistral:   { input: 0.002,  output: 0.006 },
    groq:      { input: 0.00059, output: 0.00079 },
    ollama:    { input: 0,      output: 0 },
    perplexity: { input: 0.001, output: 0.001 },
    xai:       { input: 0.005,  output: 0.015 },
  };

  const r = rates[provider] || defaultRates[provider] || { input: 0.005, output: 0.015 };
  return (inputTokens / 1000) * r.input + (outputTokens / 1000) * r.output;
}

/**
 * Calculate savings vs. using the most expensive option.
 *
 * @param {string} selectedProvider
 * @param {number} inputTokens
 * @param {number} outputTokens
 * @returns {{ selected: number, baseline: number, saved: number, pctSaved: number }}
 */
export function calculateSavings(selectedProvider, inputTokens, outputTokens) {
  const selected = estimateCost(selectedProvider, inputTokens, outputTokens);
  const baseline = estimateCost("anthropic", inputTokens, outputTokens); // Claude = expensive baseline
  const saved = Math.max(0, baseline - selected);
  const pctSaved = baseline > 0 ? (saved / baseline) * 100 : 0;
  return { selected, baseline, saved, pctSaved: Math.round(pctSaved) };
}
