#!/usr/bin/env node

// Postinstall: warm-up SQLite deps into ~/.e404r/runtime so the first
// `e404r` start doesn't need network. Failure here is non-fatal —
// cli.js will retry at runtime if anything is missing.
const { ensureSqliteRuntime } = require("./sqliteRuntime");
const { ensureTrayRuntime } = require("./trayRuntime");

try {
  ensureSqliteRuntime({ silent: false });
  console.log("[e404r] runtime SQLite deps ready");
} catch (e) {
  console.warn(`[e404r] runtime warm-up skipped: ${e.message}`);
}

try {
  ensureTrayRuntime({ silent: false });
} catch (e) {
  console.warn(`[e404r] tray runtime skipped: ${e.message}`);
}

process.exit(0);
