# AI Research Agent

An AI-powered research platform designed to automate research planning, information gathering, academic paper discovery, and report generation using an agent-based workflow.

## Features

- **Automated Research Planning:** Generates structured research plans based on user-provided topics.
- **AI-Powered Report Generation:** Creates detailed research reports with organized sections and key takeaways.
- **Web Research:** Collects relevant information and sources from the web.
- **Academic Paper Discovery:** Incorporates relevant academic papers into the research workflow.
- **Interactive AI Chat:** Allows users to ask follow-up questions about generated research reports.
- **Research Depth Selection:** Supports different research depth settings.

## Technology Stack

**Frontend**
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- React Markdown
- Recharts

**Backend**
- Python
- FastAPI
- LangGraph
- Pydantic

## Project Structure

```text
AI-Research-Agent/
├── backend/
│   ├── agents.py
│   ├── graph.py
│   ├── llm.py
│   ├── main.py
│   ├── paper_agent.py
│   └── search_agent.py
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AnshAAM/ai-research-agent.git
cd ai-research-agent
```

### 2. Backend Setup

```bash
cd backend
python -m venv .venv
```

Activate the environment on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install the required Python dependencies according to the project's requirements.

Create a `.env` file and configure the required API credentials. Never upload API keys to GitHub.

Start the backend:

```bash
uvicorn main:app --reload
```

Backend URL: `http://127.0.0.1:8000`

API documentation: `http://127.0.0.1:8000/docs`

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Check backend status |
| POST | `/research` | Generate a research report |
| POST | `/chat` | Ask questions about a research report |

## Future Improvements

- Enhanced source verification and citation management.
- Improved research retrieval and summarization.
- Advanced multi-agent collaboration.
- Additional report export and customization options.

## Author

**Ansh Arora**

GitHub: [AnshAAM](https://github.com/AnshAAM)
