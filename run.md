# How to Run SpendLens

SpendLens is an Enterprise application composed of a **Next.js Frontend** and a **Python FastAPI Backend** with a **PostgreSQL** database.

Because the project is fully Dockerized, you **do not** need to run the frontend and backend separately. A single command spins up everything.

---

## 🐳 Running the Project (Docker)

### Prerequisites
- Docker Desktop installed and running.

### Steps
1. **Set up Environment Variables:**
   ```bash
   # In the root directory
   cp .env.example .env
   
   # In the frontend directory
   cd frontend
   cp .env.example .env.local
   cd ..
   ```
   *Note: Open the `.env` files and add your `ANTHROPIC_API_KEY` and `RESEND_API_KEY` if you want AI summaries and email delivery to work.*

2. **Start the Entire Stack:**
   From the root `credex` directory, run:
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```
   This single command automatically starts:
   - The PostgreSQL Database
   - The Redis Cache
   - The Python FastAPI Backend
   - The Next.js Frontend

3. **Access the Application:**
   - **Frontend UI:** [http://localhost:3000](http://localhost:3000)
   - **Backend API Docs (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

To stop the application, press `Ctrl+C` and run `docker-compose -f docker-compose.dev.yml down`.

---

## 🧪 Running Tests (Optional)

To verify the core financial math and application logic, you can run the test suites inside their respective environments.

**Backend Tests (Pytest):**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
pytest
```

**Frontend Tests (Jest):**
```bash
cd frontend
npm install
npm test
```
