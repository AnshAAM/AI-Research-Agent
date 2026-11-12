from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from graph import graph
from llm import chat_with_report

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ResearchRequest(BaseModel):
    topic: str
    depth: str = "Standard"


class ChatRequest(BaseModel):
    report: str
    question: str


@app.get("/")
def home():
    return {
        "message": "Backend Running"
    }


@app.post("/research")
def research(req: ResearchRequest):

    result = graph.invoke(
        {
            "topic": req.topic,
            "depth": req.depth,
            "plan": "",
            "web_data": [],
            "papers": [],
            "report": ""
        }
    )

    return {
        "report": result["report"],
        "sources": result["web_data"],
        "papers": result["papers"]
    }


@app.post("/chat")
def research_chat(req: ChatRequest):

    answer = chat_with_report(
        req.report,
        req.question
    )

    return {
        "answer": answer
    }