# FFmpegLab Server

![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

FFmpegLab Server is the API backend for the FFmpegLab ecosystem. It handles render job management, project configuration, and media processing orchestration.

---

## Quick Start

This automatic script will install supabase and ffmpeglab

```bash
curl -sSL https://ffmpeglab.com/sh/install.sh | bash
```

The server will be available at `http://localhost:3000`.

---

## Services

| Service | Description | Port |
|---------|-------------|------|
| `api` | Main API server | 3000 |
| `render-runner` | Executes FFmpeg rendering jobs | - |
| `file-runner` | Handles file operations with S3 | - |
| `logs-runner` | Processes logs | - |

---

## Powered by Supabase

FFmpegLab Server is built on **Supabase** — the open-source Firebase alternative — as a **full-cycle provider** for all backend services:

| Service | Provider | Description |
|---------|----------|-------------|
| **PostgreSQL** | Supabase | Primary database with Row Level Security (RLS) |
| **pgmq** | Supabase | Job queue for asynchronous render processing |
| **S3-compatible Storage** | Supabase | File storage for media assets and rendered output |
| **REST API** | Supabase | Auto-generated REST API with JWT authentication |
| **API Keys** | Supabase | User-managed API keys with role-based access |
| **Logs** | Supabase | Centralized storage of FFmpegLab runner stdout from the ffmpeg execution |

### Database Schema & Models

The server uses TypeORM with models defined in `src/models/`:

| Model | Description |
|-------|-------------|
| `Render` | Render job tracking and status |
| `ApiKey` | API key management with permissions |
| `LogPiece` | FFmpeg runner stdout from the ffmpeg execution |

---

## Configuration

### Minimal `.env` file

```env
# Database
DB_HOST=postgres
DB_USER=postgres
DB_PORT=5432
DB_PASSWORD=your_password
DB_NAME=ffmpeglab

# S3 Storage (required for file-runner)
S3_ACCESS_KEY=your_access_key
S3_SECRET_KEY=your_secret_key
S3_REGION=us-east-1
S3_ENDPOINT=https://s3.amazonaws.com
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_HOST` | PostgreSQL host | Yes |
| `DB_USER` | PostgreSQL user | Yes |
| `DB_PASSWORD` | PostgreSQL password | Yes |
| `DB_NAME` | PostgreSQL database name | Yes |
| `S3_ACCESS_KEY` | S3 access key | For file-runner |
| `S3_SECRET_KEY` | S3 secret key | For file-runner |
| `DB_MIGRATION_ENABLED` | Auto-run migrations | No (default: false) |
| `IS_RENDER_RUNNER` | Enable render runner mode | For render-runner |
| `IS_FILE_RUNNER` | Enable file runner mode | For file-runner |
| `IS_LOGS_RUNNER` | Enable logs runner mode | For logs-runner |

---

## API Reference

Full API documentation: **[api.ffmpeglab.com/api](https://api.ffmpeglab.com/api)**

### Request/Response Objects

All schemas are defined in the OpenAPI specification. Key models from `src/models/`:

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
| `GET` | `/` | Health check | - |
| `GET` | `/renders` | List all renders | `Render[]` |
| `POST` | `/renders` | Create a render job | `Render` |
| `GET` | `/renders/{id}` | Get render by ID | `Render` |
| `PUT` | `/renders/run` | Trigger render execution | `RunDto` |

---

## Build from Source

```bash
npm install
npm run build
npm start
```

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