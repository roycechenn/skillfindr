# skillfindr

SkillFindr pairs two people so each can teach and learn a skill in the same session.

## Prerequisites
- Python 3.11+ (use a virtualenv to avoid PEP 668 “externally-managed” errors)
- Node 18+ and npm
- Docker (optional) if you want to use `docker-compose`

## Quick start (local dev)
1) **Backend**
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   python3 -m pip install fastapi 'uvicorn[standard]' sqlalchemy alembic 'python-jose[cryptography]' 'passlib[bcrypt]' 'psycopg[binary]'
   cp ../.env.example ../.env   # adjust DATABASE_URL, JWT_SECRET, etc. if needed
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   - Health check: http://localhost:8000/api/v1/health
   - Docs: http://localhost:8000/docs

2) **Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://localhost:8000
   npm run dev                  # http://localhost:3000
   ```

Keep the backend running in one terminal and the frontend in another.

## Docker Compose (optional)
```bash
docker-compose up --build
```
Services:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000 (health at `/api/v1/health`)
- Postgres: exposed on 5432 (credentials in `docker-compose.yml`)

## Notes
- If you see `externally-managed-environment`, your Python is protected by Homebrew; always use the venv above.
- Change env secrets before deploying.
