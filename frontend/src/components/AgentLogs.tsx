interface Props {
  logs: string[];
}

export default function AgentLogs({ logs }: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-5 h-full">
      <h2 className="text-xl font-semibold mb-4">
        Agent Activity
      </h2>

      <div className="space-y-2">
        {logs.length === 0 ? (
          <p className="text-slate-400">
            No activity yet...
          </p>
        ) : (
          logs.map((log, index) => (
            <div
              key={index}
              className="bg-slate-800 p-2 rounded"
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}