interface Props {
  topic: string;
  setTopic: (value: string) => void;
  startResearch: () => void;
  loading: boolean;
}

export default function ResearchInput({
  topic,
  setTopic,
  startResearch,
  loading,
}: Props) {

  const examples = [
    "Artificial Intelligence in Healthcare",
    "Future of Quantum Computing",
    "Impact of Social Media on Mental Health",
    "Cybersecurity Threats in 2026",
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-5">

      <h2 className="text-xl font-semibold mb-4">
        Research Topic
      </h2>

      <textarea
        value={topic}
        onChange={(e) =>
          setTopic(e.target.value)
        }
        placeholder="Describe the topic you want researched..."
        className="w-full h-32 bg-slate-800 rounded p-3"
      />

      <div className="mt-2 text-sm text-slate-400">
        {topic.length} characters
      </div>

      <div className="mt-4">
        <p className="text-sm text-slate-400 mb-2">
          Example Topics
        </p>

        <div className="flex flex-wrap gap-2">

          {examples.map((example) => (
            <button
              key={example}
              onClick={() =>
                setTopic(example)
              }
              className="bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded text-sm"
            >
              {example}
            </button>
          ))}

        </div>
      </div>

      <button
        onClick={startResearch}
        disabled={
          loading || !topic.trim()
        }
        className="w-full mt-5 bg-blue-600 hover:bg-blue-700 p-3 rounded-lg disabled:bg-slate-700"
      >
        {loading
          ? "Researching..."
          : "Start Research"}
      </button>

    </div>
  );
}