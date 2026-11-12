interface Source {
  title: string;
  type: string;
  url?: string;
}

interface Props {
  sources: Source[];
}

export default function SourcesPanel({
  sources,
}: Props) {
  const getDomain = (url?: string) => {
    if (!url) return "Unknown";

    try {
      return new URL(url).hostname.replace(
        "www.",
        ""
      );
    } catch {
      return "Unknown";
    }
  };

  return (
    <div className="bg-slate-900 rounded-xl p-5 h-full">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-semibold">
          Research Sources
        </h2>

        <span className="text-sm text-slate-400">
          {sources.length} Sources
        </span>

      </div>

      {sources.length === 0 ? (

        <div className="bg-slate-800 rounded-lg p-4 text-center">
          <p className="text-slate-400">
            No sources found
          </p>
        </div>

      ) : (

        <div className="space-y-3">

          {sources.map(
            (source, index) => (
              <div
                key={index}
                className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-blue-500 transition"
              >

                <div className="flex justify-between items-start mb-2">

                  <span className="bg-blue-600 text-xs px-2 py-1 rounded">
                    {source.type}
                  </span>

                  <span className="text-xs text-slate-400">
                    #{index + 1}
                  </span>

                </div>

                <h3 className="font-semibold mb-2 break-words">
                  {source.title}
                </h3>

                <p className="text-xs text-slate-400 mb-3">
                  {getDomain(
                    source.url
                  )}
                </p>

                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    Open Source ↗
                  </a>
                ) : (
                  <span className="text-sm text-slate-500">
                    No URL Available
                  </span>
                )}

              </div>
            )
          )}

        </div>

      )}
    </div>
  );
}