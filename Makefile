.PHONY: up down backend frontend

up:
	docker-compose up --build

down:
	docker-compose down

backend:
	cd backend && uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

frontend:
	cd frontend && npm run dev
