/**
 * E404R Request Classifier
 * ========================
 * Analyzes incoming chat requests and classifies them by task type
 * to enable intelligent routing decisions.
 */

// Keywords that signal each task type
const TYPE_SIGNALS = {
  code: [
    /\b(code|function|class|method|implement|debug|fix|refactor|algorithm|script|program)\b/i,
    /\b(python|javascript|typescript|rust|go|java|c\+\+|sql|bash|shell|html|css|react|node)\b/i,
    /\b(error|exception|bug|syntax|compile|lint|test|unit test|coverage)\b/i,
    /```[\s\S]*?```/,
    /def |function |class |import |require\(|const |let |var /,
  ],
  search: [
    /\b(search|find|look up|what is|who is|when|where|latest|current|today|news|recent)\b/i,
    /\b(2024|2025|2026|this year|last year|now)\b/i,
  ],
  creative: [
    /\b(write|story|poem|creative|fiction|narrative|character|plot|scene|dialogue|novel)\b/i,
    /\b(imagine|describe|invent|compose|draft|essay|article|blog|script|screenplay)\b/i,
  ],
  analysis: [
    /\b(analyze|analyse|explain|summarize|compare|evaluate|assess|review|interpret)\b/i,
    /\b(pros and cons|advantages|disadvantages|tradeoffs|implications|impact|assessment)\b/i,
    /\b(research|study|paper|report|data|statistics|metrics|performance)\b/i,
  ],
  local: [
    /\b(local|offline|private|no internet|on-device|confidential|sensitive)\b/i,
  ],
};

// Estimate complexity from message length and structure
function estimateComplexity(messages) {
  const totalChars = messages.reduce((sum, m) => sum + (m.content?.length || 0), 0);
  const hasSystemPrompt = messages.some((m) => m.role === "system");
  const multiTurn = messages.filter((m) => m.role === "user").length > 1;

  if (totalChars > 8000 || (hasSystemPrompt && multiTurn)) return "high";
  if (totalChars > 2000 || hasSystemPrompt || multiTurn) return "medium";
  return "low";
}

// Score a request against each type's signals
function scoreType(text, patterns) {
  let score = 0;
  for (const pattern of patterns) {
    if (pattern instanceof RegExp && pattern.test(text)) score++;
    else if (typeof pattern === "string" && text.includes(pattern)) score++;
  }
  return score;
}

/**
 * Classify an incoming chat request.
 *
 * @param {Object} request - The chat request body
 * @returns {ClassificationResult}
 */
export function classifyRequest(request) {
  const messages = request.messages || [];
  const systemPrompt = messages.find((m) => m.role === "system")?.content || "";

  // Flatten all user content into a single text for analysis
  const userText = messages
    .filter((m) => m.role === "user")
    .map((m) => (typeof m.content === "string" ? m.content : JSON.stringify(m.content)))
    .join(" ");

  const fullText = `${systemPrompt} ${userText}`;
  const complexity = estimateComplexity(messages);

  // Score each type
  const scores = {};
  for (const [type, patterns] of Object.entries(TYPE_SIGNALS)) {
    scores[type] = scoreType(fullText, patterns);
  }

  // Find winning type
  let type = "simple";
  let maxScore = 0;
  for (const [t, s] of Object.entries(scores)) {
    if (s > maxScore) {
      maxScore = s;
      type = t;
    }
  }

  // Override: if complexity is high but type is simple, upgrade to analysis
  if (type === "simple" && complexity === "high") {
    type = "analysis";
  }

  // Check for explicit model request
  const requestedModel = request.model || null;
  const hasExplicitModel = requestedModel && !requestedModel.includes("auto");

  return {
    type,
    complexity,
    scores,
    confidence: maxScore > 0 ? Math.min(maxScore / 3, 1) : 0.3,
    hasExplicitModel,
    requestedModel,
    messageCount: messages.length,
    estimatedTokens: Math.ceil(fullText.length / 4),
  };
}

/**
 * @typedef {Object} ClassificationResult
 * @property {string} type - Task type: code | creative | analysis | simple | search | local
 * @property {string} complexity - Complexity: low | medium | high
 * @property {Object} scores - Raw scores per type
 * @property {number} confidence - Confidence in classification (0-1)
 * @property {boolean} hasExplicitModel - Whether client explicitly requested a model
 * @property {string|null} requestedModel - The explicitly requested model (if any)
 * @property {number} messageCount - Number of messages in the conversation
 * @property {number} estimatedTokens - Rough token count estimate
 */
