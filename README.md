# Snapshot Platform

A full-stack application for generating digital performance audits for agencies.

## Architecture

- **Client**: Next.js 14 (App Router)
- **Server**: Node.js + Fastify + Puppeteer (Optimized for Mac/ARM64)
- **Infrastructure**: Docker Compose

## Requirements

- Docker Desktop (ensure it is running)

## Getting Started

1. **Environment Setup**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env if needed (though currently the server doesn't seem to use it explicitly in the code shown, it might be for future use or legacy)
   ```

2. **Run with Docker**
   Start the entire stack:
   ```bash
   docker compose up --build
   ```

3. **Access the Application**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5001](http://localhost:5001)

## Development

The `compose.yaml` maps the local directories to the containers, so changes to the code should reflect immediately for the client (Hot Reload) and require a container restart for the server depending on nodemon usage (currently standard node).

### Rebuilding
If you add dependencies, rebuild the containers:
```bash
docker compose up --build
```
