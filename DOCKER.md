# Docker

Run E404R in a container. Published image: [`decolua/e404r`](https://hub.docker.com/r/decolua/e404r) — multi-platform `linux/amd64` + `linux/arm64`.

---

# 👤 For Users

## Quick start

```bash
docker run -d \
  -p 20128:20128 \
  -v "$HOME/.e404r:/app/data" \
  -e DATA_DIR=/app/data \
  --name e404r \
  decolua/e404r:latest
```

App listens on port `20128`. Open: http://localhost:20128

## Manage container

```bash
docker logs -f e404r        # view logs
docker stop e404r           # stop
docker start e404r          # start again
docker rm -f e404r          # remove
```

## Data persistence

```bash
-v "$HOME/.e404r:/app/data" \
-e DATA_DIR=/app/data
```

Without `DATA_DIR`, the app falls back to `~/.e404r/` (macOS/Linux) or `%APPDATA%\e404r\` (Windows). In the container, `DATA_DIR=/app/data` makes the bind mount work.

Data layout under `$DATA_DIR/`:

```text
$DATA_DIR/
├── db/
│   ├── data.sqlite       # main SQLite database
│   └── backups/          # auto backups
└── ...                   # certs, logs, runtime configs
```

Host path: `$HOME/.e404r/db/data.sqlite`
Container path: `/app/data/db/data.sqlite`

## Optional env vars

```bash
docker run -d \
  -p 20128:20128 \
  -v "$HOME/.e404r:/app/data" \
  -e DATA_DIR=/app/data \
  -e PORT=20128 \
  -e HOSTNAME=0.0.0.0 \
  -e DEBUG=true \
  --name e404r \
  decolua/e404r:latest
```

## Optional Headroom sidecar

The E404R image does not bundle Python or Headroom. To use Headroom in Docker, run it as a separate service and point E404R at that proxy:

```yaml
services:
  e404r:
    image: decolua/e404r:latest
    ports:
      - "20128:20128"
    volumes:
      - "$HOME/.e404r:/app/data"
    environment:
      DATA_DIR: /app/data
      HEADROOM_URL: http://headroom:8787
    depends_on:
      - headroom

  headroom:
    image: ghcr.io/chopratejas/headroom:latest
    ports:
      - "8787:8787"
```

In the dashboard, open `Endpoint` → `Token Saver` → `Headroom`, confirm the URL is `http://headroom:8787`, recheck status, then enable Headroom.

If Headroom runs on the Docker host instead of as a sidecar, use `http://host.docker.internal:8787` on macOS/Windows. On Linux, add `--add-host=host.docker.internal:host-gateway` or the equivalent compose `extra_hosts` entry.

## Update to latest

```bash
docker pull decolua/e404r:latest
docker rm -f e404r
# re-run the quick start command
```

---

# 🛠 For Developers

## Build image locally (test)

```bash
cd app && docker build -t e404r .

docker run --rm -p 20128:20128 \
  -v "$HOME/.e404r:/app/data" \
  -e DATA_DIR=/app/data \
  e404r
```

## Publish (automatic via CI)

Push a git tag `v*` → GitHub Actions builds multi-platform (amd64+arm64) and pushes to:
- `ghcr.io/decolua/e404r:v{version}` + `:latest`
- `decolua/e404r:v{version}` + `:latest`

```bash
# Use scripts/release.js (recommended)
node scripts/release.js "Release title" "Notes"

# Or manually
git tag v0.4.x && git push origin v0.4.x
```

Workflow: `app/.github/workflows/docker-publish.yml`
