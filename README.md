# FFmpegLab Server

![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

FFmpegLab Server is the API backend for the FFmpegLab ecosystem. It handles render job management, project configuration, and media processing orchestration.

---

## Requirements

`docker-compose.yml` starts the API and the runners only. You bring your own
PostgreSQL and object storage:

| Requirement | Provided by Compose | Notes |
|-------------|---------------------|-------|
| Docker with Compose v2 | - | `docker compose version` |
| PostgreSQL reachable from the containers | No | A Supabase project or any PostgreSQL server supported by `pgmq` |
| `pgmq` available in that database | No | On Supabase, enable the `pgmq` extension. The role in `DB_USER` must be allowed to run `CREATE EXTENSION IF NOT EXISTS pgmq`, which the server executes on startup |
| S3-compatible bucket | No | Only required for `file-runner`. Supabase Storage exposes an S3-compatible endpoint |

The `render`, `logs` and `file` queues are created automatically on startup, so
no manual `pgmq.create()` is needed.

---

## Quick Start

```bash
# Clone and configure
git clone https://github.com/ffmpeglab/server.git
cd server
cp .env.example .env

# Edit .env with your database and S3 credentials
nano .env

# Check that every variable resolves before starting
docker compose config

# Start the API and the runners
docker compose up -d
```

The server will be available at `http://localhost:3000`.

`DB_HOST` must be reachable from inside the containers. `localhost` points at
the container itself — use `host.docker.internal` for a database running on the
Docker host, or a routable hostname.

On the first start, set `DB_MIGRATION_ENABLED=true` so TypeORM creates the
`render`, `api_key` and `log_piece` tables from the entities in `src/model/`.

---

## Services

| Service | Description | Port |
|---------|-------------|------|
| `api` | Main API server | 3000 |
| `render-runner` | Executes FFmpeg rendering jobs | - |
| `file-runner` | Handles file operations with S3 | - |
| `logs-runner` | Processes logs | - |

Not included in `docker-compose.yml`: PostgreSQL, Supabase, object storage and
a reverse proxy. The API port is published on all interfaces, so put it behind
a proxy or restrict the published port before exposing the host.

---

## Verify the Setup

```bash
# API is up
curl http://localhost:3000/

# Interactive API docs are served at http://localhost:3000/api

# Startup errors, database and pgmq connection
docker compose logs -f api

# Authenticated request (see API Keys below)
curl -H "Authorization: Bearer <your-api-key>" http://localhost:3000/renders
```

### API Keys

`/renders` is guarded by a bearer token that is matched against the `apikey`
column of the `api_key` table. There is no signup endpoint — insert a row into
that table (for example through the Supabase SQL editor) and use its `apikey`
value as the bearer token. `user_id` scopes every render to its owner.

Every column is `NOT NULL`, so the row needs `title`, `apikey`, `user_id` and a
JSON value for `data`.

---

## Powered by Supabase

FFmpegLab Server is built on **Supabase** — the open-source Firebase alternative — as a **full-cycle provider** for all backend services:

| Service | Provider | Description |
|---------|----------|-------------|
| **PostgreSQL** | Supabase | Primary database. The server connects directly with TypeORM and scopes rows by `user_id`, so RLS policies only apply to clients that go through the Supabase API |
| **pgmq** | Supabase | Job queue for asynchronous render processing |
| **S3-compatible Storage** | Supabase | File storage for media assets and rendered output |
| **REST API** | Supabase | Auto-generated REST API with JWT authentication |
| **API Keys** | Supabase | User-managed API keys with role-based access |
| **Logs** | Supabase | Centralized storage of FFmpegLab runner stdout from the ffmpeg execution |

### Database Schema & Models

The server uses TypeORM with models defined in `src/model/`:

| Model | Table | Description |
|-------|-------|-------------|
| `Render` | `render` | Render job tracking and status |
| `ApiKey` | `api_key` | API key management with permissions |
| `LogPiece` | `log_piece` | FFmpeg runner stdout from the ffmpeg execution |

---

## Configuration

### Minimal `.env` file

```env
# Database (external — not started by docker compose)
DB_HOST=your-postgres-host
DB_USER=postgres
DB_PORT=5432
DB_PASSWORD=your_password
DB_NAME=postgres
DB_MIGRATION_ENABLED=false

# S3 Storage (required for file-runner)
S3_BUCKET_ID=prod
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_REGION=us-east-1
S3_ENDPOINT=https://s3.amazonaws.com
```

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DB_HOST` | PostgreSQL host, also used for pgmq | Yes | - |
| `DB_USER` | PostgreSQL user | Yes | - |
| `DB_PORT` | PostgreSQL port | No | `5432` |
| `DB_PASSWORD` | PostgreSQL password | Yes | - |
| `DB_NAME` | PostgreSQL database name | Yes | - |
| `DB_MIGRATION_ENABLED` | Sync the schema from the entities on startup (TypeORM `synchronize`). The repository has no migration files | No | `false` |
| `S3_BUCKET_ID` | Target bucket for rendered output | For file-runner | `prod` |
| `S3_ACCESS_KEY` | S3 access key | For file-runner | - |
| `S3_SECRET_KEY` | S3 secret key | For file-runner | - |
| `S3_REGION` | S3 region | For file-runner | - |
| `S3_ENDPOINT` | S3 endpoint URL | For file-runner | - |
| `IS_RENDER_RUNNER` | Enable render runner mode | For render-runner | `false` |
| `IS_FILE_RUNNER` | Enable file runner mode | For file-runner | `false` |
| `IS_LOGS_RUNNER` | Enable logs runner mode | For logs-runner | `false` |
| `RENDER_QUEUE` | Render queue name | No | `render` |
| `LOGS_QUEUE` | Logs queue name | No | `logs` |
| `FILE_QUEUE` | File queue name | No | `file` |
| `DOCUMENT_DIRECTORY` | Working directory for media and render output | No | `/tmp/ffmpeglab` |
| `PORT` | API listen port | No | `3000` |

The `QUEUE_DB_*` variables in `.env.example` are not used yet: pgmq runs on the
`DB_*` connection, and `docker-compose.yml` does not pass them to the containers.

### Scaling Runners

```bash
docker compose up -d --scale render-runner=8
```

Render runners share the `./tmp` bind mount and have no CPU or memory limits, so
size the replica count against the host.

---

## API Reference

Full API documentation: **[api.ffmpeglab.com/api](https://api.ffmpeglab.com/api)**

### Request/Response Objects

All schemas are defined in the OpenAPI specification. Request and response
shapes live in `src/types/`; the persisted entities live in `src/model/`:

| Schema | Model | Description | Link |
|--------|-------|-------------|------|
| `EditorProjectConfiguration` | `Project` | Full editor project configuration | [View](https://api.ffmpeglab.com/api#/components/schemas/EditorProjectConfiguration) |
| `EditorProject` | `Project` | Project metadata | [View](https://api.ffmpeglab.com/api#/components/schemas/EditorProject) |
| `RenderData` | `Render` | Render job data | [View](https://api.ffmpeglab.com/api#/components/schemas/RenderData) |
| `RenderDto` | `Render` | Render data transfer object | [View](https://api.ffmpeglab.com/api#/components/schemas/RenderDto) |
| `RunDto` | `Render` | Run execution request | [View](https://api.ffmpeglab.com/api#/components/schemas/RunDto) |
| `RenderResponse` | `Render` | API response for render operations | [View](https://api.ffmpeglab.com/api#/components/schemas/RenderResponse) |
| `EditorLayer` | `Project` | Individual editor layer | [View](https://api.ffmpeglab.com/api#/components/schemas/EditorLayer) |
| `EncoderProject` | `Project` | Encoder project configuration | [View](https://api.ffmpeglab.com/api#/components/schemas/EncoderProject) |
| `Media` | `Project` | Media file metadata | [View](https://api.ffmpeglab.com/api#/components/schemas/Media) |

### Common Endpoints

| Method | Endpoint | Description | Model |
|--------|----------|-------------|-------|
| `GET` | `/` | Service info, unauthenticated | - |
| `GET` | `/renders` | List all renders | `Render[]` |
| `POST` | `/renders` | Create a render job | `Render` |
| `GET` | `/renders/{id}` | Get render by ID | `Render` |
| `PUT` | `/renders/run` | Trigger render execution | `RunDto` |

---

## Build from Source

```bash
yarn install --frozen-lockfile
yarn build
yarn start
```

Running outside Docker also needs `ffmpeg` on `PATH` or `FFMPEG_PATH` pointing
at the binary, plus the same `.env` values as above.

---

## License

MIT

---

## Links

- **Website**: [ffmpeglab.com](https://ffmpeglab.com)
- **API Docs**: [api.ffmpeglab.com/api](https://api.ffmpeglab.com/api)
- **GitHub**: [github.com/ffmpeglab/server](https://github.com/ffmpeglab/server)

---

**Open source and self‑hostable. Powered by Supabase.**