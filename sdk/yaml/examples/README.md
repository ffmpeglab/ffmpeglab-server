## 📂 Examples Directory – FFmpegLab YAML Pipelines

This directory contains a collection of **declarative YAML pipeline templates** for automated media processing with FFmpeg, PostgreSQL triggers, pgmq, and Supabase Storage. Each example includes a **YAML pipeline definition** and its corresponding **SVG graph**.

---

### 📁 File Listing

| File | Description |
|------|-------------|
| `audio.yaml` / `audio.svg` | Sequential audio processing (podcasts) |
| `video.yaml` / `video.svg` | Parallel video & image onboarding |
| `whisper-subtitles.yaml` / `whisper-subtitles.svg` | AI subtitle generation with Whisper |
| `dnn-labeling.yaml` / `dnn-labeling.svg` | Object detection & scene classification |
| `dnn-upscale.yaml` / `dnn-upscale.svg` | Super‑resolution AI upscaling |

---

## 🎧 Audio Processing Pipeline (`audio.yaml` / `audio.svg`)

**Sequential audio processing for podcasts.**

- **Input:** Audio (MP3, WAV, FLAC) or video (audio extracted).
- **Steps:** Extract WAV → Normalise & compress to MP3 → Generate waveform PNG.
- **Outputs:** MP3 + waveform PNG, grouped under `{userId}/audio-pipeline/{runId}/`.

<div align="center">
  <img src="audio.svg" alt="Audio Pipeline Graph" width="800">
</div>

---

## 🎬 Video Onboarding Pipeline (`video.yaml` / `video.svg`)

**Parallel video & image processing.**

- **Input:** Video (MP4, QuickTime, WebM) or image (JPEG, PNG, WebP, GIF).
- **Steps (all triggered in parallel):** 3 thumbnails + 3 video resolutions + 1 image thumbnail.
- **Outputs:** All artifacts stored in `video-processed/{userId}/video-pipeline/{runId}/`.

<div align="center">
  <img src="video.svg" alt="Video Pipeline Graph" width="800">
</div>

---

## 🗣️ Whisper Subtitle Generation (`whisper-subtitles.yaml` / `whisper-subtitles.svg`)

**Automated subtitles with AI transcription.**

- **Input:** Video files.
- **Steps:** Extract audio → Whisper transcription (SRT) → Burn subtitles into video.
- **Outputs:** Subtitled MP4 + standalone SRT, grouped under `{userId}/subtitle-pipeline/{runId}/`.

<div align="center">
  <img src="whisper-subtitles.svg" alt="Subtitle Generation Pipeline Graph" width="800">
</div>

---

## 🧠 DNN Object Detection & Labeling (`dnn-labeling.yaml` / `dnn-labeling.svg`)

**Automated video labeling with deep neural networks.**

- **Input:** Video files.
- **Steps:** Object/face detection (`dnn_detect`) → Scene/emotion classification (`dnn_classify`) → Overlay bounding boxes.
- **Outputs:** JSON metadata + labeled video, grouped under `{userId}/video-labeling/{runId}/`.

<div align="center">
  <img src="dnn-labeling.svg" alt="DNN Labeling Pipeline Graph" width="800">
</div>

---

## 📈 DNN AI Upscaling (`dnn-upscale.yaml` / `dnn-upscale.svg`)

**Super‑resolution upscaling with DNN models.**

- **Input:** Low‑resolution video.
- **Steps (parallel):** AI upscaling (SRCNN) + Bicubic upscaling (fallback).
- **Outputs:** Both upscaled versions (AI and bicubic) stored in `public-processed/{userId}/ai-upscaling/{runId}/upscaled/`.

<div align="center">
  <img src="dnn-upscale.svg" alt="AI Upscaling Pipeline Graph" width="800">
</div>

---

## 🚀 How to Use These Examples

1. **Download** the transpiler (`transpiler.ts`) and SVG generator (`svg.ts`) from the [FFmpegLab server repository](https://github.com/ffmpeglab/server).

2. **Choose** a YAML file (e.g., `video.yaml`).

3. **Run the transpiler** to generate the SQL migration:

   ```bash
   deno run --allow-read --allow-write transpiler.ts examples/video.yaml ./supabase/migrations
   ```

4. **Apply the migration** to your Supabase database (psql or SQL Editor).

5. **Upload a file** to the input bucket (e.g., `video-uploads`) – the pipeline will run automatically.

6. **Generate an SVG graph** of your pipeline (if you haven’t already):

   ```bash
   deno run --allow-read --allow-write transpiler.ts examples/video.yaml ./supabase/migrations --svg
   ```

---

## 📝 Customising the Pipelines

Each YAML file is self‑contained and well‑commented. You can:

- **Add or remove steps** – copy/paste a step block.
- **Change output formats** – modify the `editor.output` field.
- **Adjust resolutions** – update `width` and `height` in `editor`.
- **Switch DNN models** – change the model path and tensor names in the command.
- **Modify the `runId`** – choose `random` (sequential) or `deterministic` (parallel).

Refer to the [transpiler documentation](../README.md) for the full YAML specification.

---

## 🔧 Dependencies

- **Deno** – to run the transpiler.
- **Supabase** – PostgreSQL database and Storage.
- **FFmpeg** – with required libraries (libx264, libmp3lame, DNN backends, etc.).
- **Optional:** Whisper.cpp (for subtitle generation), OpenVINO/TensorFlow (for DNN).

---

## 📄 License

MIT – see the [FFmpegLab server repository](https://github.com/ffmpeglab/server) for details.