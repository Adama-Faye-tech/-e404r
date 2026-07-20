/**
 * E404R Quality Router
 * ====================
 * Ranks provider candidates by quality score.
 */

/**
 * Sort candidates by quality score (descending = best first).
 *
 * @param {Array} candidates
 * @returns {Array} Sorted candidates
 */
export function selectByQuality(candidates) {
  return candidates.slice().sort((a, b) => {
    if (b.quality !== a.quality) return b.quality - a.quality;
    // Tiebreak: cost ascending (prefer cheaper among equal quality)
    return a.costPer1k - b.costPer1k;
  });
}
