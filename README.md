# skillfindr

SkillFindr pairs two people so each can teach and learn a skill in the same session.

## Prerequisites
- Python 3.11+ (use a virtualenv to avoid PEP 668 “externally-managed” errors)
- Node 18+ and npm
- Docker (optional) to run Postgres locally via compose

## Environment
Create a `.env` at the repo root (backend reads it automatically):
```
DATABASE_URL=postgresql+psycopg://skillfindr:password@localhost:5433/skillfindr
JWT_SECRET=change-me
JWT_ALGORITHM=HS256
JWT_EXP_MINUTES=1440
```
Adjust the DB URL if your Postgres credentials/host/port differ.

## Quick start (local dev)
1) **Database (Docker)**
   ```bash
   docker compose up -d db   # maps host 5433 -> container 5432
   ```

2) **Backend**
   ```bash
   cd backend
   python3 -m venv .venv
   source .venv/bin/activate
   python3 -m pip install fastapi "uvicorn[standard]" sqlalchemy alembic "python-jose[cryptography]" "passlib[bcrypt]" "psycopg[binary]"
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   - Health: http://localhost:8000/api/v1/health
   - Docs: http://localhost:8000/docs

3) **Frontend**
   ```bash
   cd frontend
   npm install
   # set your backend URL
   echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
   npm run dev -- --hostname 0.0.0.0 --port 3000  # http://localhost:3000
   ```
   If accessing from another device, replace `localhost` with your host IP (e.g. `http://172.16.220.136:8000` in `.env.local`) and open `http://<host-ip>:3000`.

## CORS / Origins
Backend allows `http://localhost:3000` by default. If you serve the frontend from a different origin/IP, add it to `ALLOWED_ORIGINS` in `backend/app/main.py`, then restart uvicorn.

## Matching and meetings
- Signup/Login store users in Postgres with skills and availability.
- `/api/v1/matches` returns reciprocal teach/learn pairs for the logged-in user.
- Proposing a swap calls `/api/v1/matches/{match_id}/propose` and returns a deterministic Jitsi link so both sides join the same room.

## Docker Compose (full stack)
```bash
docker compose up --build
```
Services (with current compose):
- Frontend: http://localhost:3000
- Backend: http://localhost:8000 (health at `/api/v1/health`)
- Postgres: host port 5433 -> container 5432 (credentials in `docker-compose.yml`)

## Troubleshooting
- If login/signup hangs, verify `NEXT_PUBLIC_API_URL` points to the running backend and that CORS includes your frontend origin.
- If the backend fails to start, confirm Postgres is running and `DATABASE_URL` matches the actual user/password/host/port.
