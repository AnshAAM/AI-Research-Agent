interface Paper {
  title: string;
  authors: string[];
  summary?: string;
  url: string;
}

interface Props {
  papers: Paper[];
}

export default function PapersPanel({
  papers,
}: Props) {
  return (
    <div className="bg-slate-900 rounded-xl p-5">
      <h2 className="text-xl font-semibold mb-4">
        Academic Papers
      </h2>

      {papers.length === 0 ? (
        <p className="text-slate-400">
          No papers found
        </p>
      ) : (
        <div className="space-y-4">
          {papers.map((paper, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-lg p-4"
            >
              <h3 className="font-semibold text-lg">
                {paper.title}
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                {paper.authors?.join(", ")}
              </p>

              {paper.summary && (
                <p className="text-sm mt-3 text-slate-300">
                  {paper.summary}
                </p>
              )}

              <a
                href={paper.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-blue-400 hover:underline"
              >
                Read Paper →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}