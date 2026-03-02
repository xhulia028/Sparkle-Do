# Todo List App

A simple full-stack todo list application with:
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend Proxy**: Next.js API routes
- **API Server**: FastAPI (Python) with SQLite database

## Project Structure

```
├── backend/           # FastAPI Python backend
│   ├── app/
│   │   ├── main.py    # FastAPI app and routes
│   │   ├── models.py  # SQLAlchemy models
│   │   ├── schemas.py # Pydantic schemas
│   │   └── database.py # Database configuration
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/          # Next.js frontend
│   ├── src/
│   │   └── app/
│   │       ├── page.tsx    # Main todo list UI
│   │       ├── layout.tsx  # Root layout
│   │       └── api/        # API routes (proxy to FastAPI)
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Running with Docker Compose

```bash
# Build and start all services
docker compose up --build

# Or run in background
docker compose up --build -d
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## Local Development

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend (Next.js)

```bash
cd frontend
npm install
FASTAPI_URL=http://localhost:8000 npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all todos |
| POST | /todos | Create a new todo |
| GET | /todos/{id} | Get a specific todo |
| PUT | /todos/{id} | Update a todo |
| DELETE | /todos/{id} | Delete a todo |
