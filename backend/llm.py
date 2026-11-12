from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

MODEL_NAME = "gemini-3.5-flash"


def generate_response(prompt: str):

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return response.text

    except Exception as e:

        print("LLM ERROR:", e)

        return f"Error generating response: {str(e)}"


def chat_with_report(
    report: str,
    question: str
):

    report = report[:4000]

    prompt = f"""
You are an advanced AI Research Assistant.

REPORT:

{report}

QUESTION:
{question}

Answer clearly using the report.
Use markdown formatting.
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt
        )

        return response.text

    except Exception as e:

        print("CHAT ERROR:", e)

        return f"Error generating response: {str(e)}"