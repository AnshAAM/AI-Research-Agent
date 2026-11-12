import { useState } from "react";
import { api } from "../services/api";
import ReactMarkdown from "react-markdown";

interface Props {
  report: string;
}

export default function ResearchChat({
  report,
}: Props) {
  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    if (!report.trim()) {
      setAnswer(
        "Generate a research report first."
      );
      return;
    }

    try {
      setLoading(true);

      const response =
        await api.post(
          "/chat",
          {
            report,
            question,
          }
        );

      setAnswer(
        response.data.answer || ""
      );
    } catch (error) {
      console.error(error);

      setAnswer(
        "Failed to generate answer."
      );
    } finally {
      setLoading(false);
    }
  };

  const quickPrompt = (
    text: string
  ) => {
    setQuestion(text);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-5">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          Research Chat
        </h2>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">

        <button
          onClick={() =>
            quickPrompt(
              "Summarize this report in 100 words."
            )
          }
          className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded text-sm"
        >
          100 Word Summary
        </button>

        <button
          onClick={() =>
            quickPrompt(
              "Explain this report for beginners."
            )
          }
          className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded text-sm"
        >
          Beginner Mode
        </button>

        <button
          onClick={() =>
            quickPrompt(
              "What are the biggest challenges?"
            )
          }
          className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded text-sm"
        >
          Challenges
        </button>

        <button
          onClick={() =>
            quickPrompt(
              "What is the future scope?"
            )
          }
          className="bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded text-sm"
        >
          Future Scope
        </button>

      </div>

      <textarea
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
        placeholder="Ask questions about the research..."
        className="w-full h-32 bg-slate-800 rounded p-3 mb-3 resize-none"
      />

      <button
        onClick={askQuestion}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded"
      >
        {loading
          ? "Thinking..."
          : "Ask AI"}
      </button>

      <div className="mt-6 bg-slate-800 rounded p-5">

        {answer ? (
          <div className="max-h-[600px] overflow-y-auto pr-2">
            <div className="prose prose-invert max-w-none break-words">
              <ReactMarkdown>
                {answer}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="min-h-[150px] flex items-center">
            <p className="text-slate-400">
              Ask questions about your generated research.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}