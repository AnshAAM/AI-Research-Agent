interface Props {
  report: string;
  sources: number;
  papers: number;
}

export default function ResearchMetrics({
  report,
  sources,
  papers,
}: Props) {

  const wordCount =
    report.trim().length > 0
      ? report.trim().split(/\s+/).length
      : 0;

  const readingTime =
    Math.max(
      1,
      Math.ceil(wordCount / 200)
    );

  const qualityScore =
    Math.min(
      100,
      60 +
        sources * 5 +
        papers * 3
    );

  return (
    <div className="bg-slate-900 rounded-xl p-5">

      <h2 className="text-xl font-semibold mb-4">
        Research Metrics
      </h2>

      <div className="grid grid-cols-2 gap-3">

        <div className="bg-slate-800 p-3 rounded">
          <p className="text-sm text-slate-400">
            Word Count
          </p>

          <h3 className="text-xl font-bold">
            {wordCount}
          </h3>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <p className="text-sm text-slate-400">
            Reading Time
          </p>

          <h3 className="text-xl font-bold">
            {readingTime} min
          </h3>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <p className="text-sm text-slate-400">
            Sources
          </p>

          <h3 className="text-xl font-bold">
            {sources}
          </h3>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <p className="text-sm text-slate-400">
            Papers
          </p>

          <h3 className="text-xl font-bold">
            {papers}
          </h3>
        </div>

        <div className="bg-slate-800 p-3 rounded col-span-2">
          <p className="text-sm text-slate-400">
            Research Quality Score
          </p>

          <h3 className="text-2xl font-bold">
            {qualityScore}%
          </h3>
        </div>

      </div>

    </div>
  );
}