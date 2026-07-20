# E404R — Agent Skills

Drop-in skills for any AI agent (Claude, Cursor, ChatGPT, custom SDK). Just **copy a link** below and paste it to your AI — it will fetch the skill and use E404R for you.

> Tip: start with the **e404r** entry skill — it covers setup and links to all capability skills.

## Skills

| Capability | Copy link below and paste to your AI |
|---|---|
| **Entry / Setup** (start here) | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r/SKILL.md |
| Chat / code-gen | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-chat/SKILL.md |
| Image generation | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-image/SKILL.md |
| Video generation (xAI Grok Imagine) | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-video/SKILL.md |
| Text-to-speech | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-tts/SKILL.md |
| Speech-to-text | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-stt/SKILL.md |
| Embeddings | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-embeddings/SKILL.md |
| Web search | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-web-search/SKILL.md |
| Web fetch (URL → markdown) | https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r-web-fetch/SKILL.md |

## How to use

Paste to your AI (Claude, Cursor, ChatGPT, …):

```
Read this skill and use it: https://raw.githubusercontent.com/Adama-Faye-tech/-e404r/refs/heads/main/skills/e404r/SKILL.md
```

Then ask normally — *"generate an image of a cat"*, *"transcribe this URL"*, etc.

## Configure your shell once

```bash
export NINEROUTER_URL="http://localhost:20128"   # local default, or your VPS / tunnel URL
export NINEROUTER_KEY="sk-..."                   # from Dashboard → Keys (only if requireApiKey=true)
```

Verify: `curl $NINEROUTER_URL/api/health` → `{"ok":true}`.

## Links

- Source: https://github.com/Adama-Faye-tech/-e404r
- Dashboard: https://e404r.com
