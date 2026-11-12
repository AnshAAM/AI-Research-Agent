interface Props {
  topic: string;
  sources?: number;
  papers?: number;
  confidence?: number;
  report?: string;
}

export default function ResearchInsights({
  topic,
  sources = 0,
  papers = 0,
  confidence = 0,
  report = "",
}: Props) {

  const topicWords =
    topic.trim().length > 0
      ? topic.trim().split(/\s+/).length
      : 0;

  const reportWords =
    report.trim().length > 0
      ? report.trim().split(/\s+/).length
      : 0;

  const readingTime =
    Math.max(
      1,
      Math.ceil(reportWords / 200)
    );

  const citationCount =
    sources + papers;

  const researchGrade =
    confidence >= 95
      ? "A+"
      : confidence >= 90
      ? "A"
      : confidence >= 80
      ? "B"
      : confidence >= 70
      ? "C"
      : "D";

  return (
    <div className="bg-slate-900 rounded-xl p-5 h-full">

      <h2 className="text-xl font-semibold mb-4">
        Research Intelligence
      </h2>

      <div className="space-y-3">

        <div className="bg-slate-800 p-3 rounded">
          <strong>Current Topic</strong>
          <p>
            {topic || "Waiting for input..."}
          </p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Topic Length</strong>
          <p>{topicWords} words</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Report Size</strong>
          <p>{reportWords} words</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Estimated Reading Time</strong>
          <p>{readingTime} min</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Web Sources</strong>
          <p>{sources}</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Academic Papers</strong>
          <p>{papers}</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Total Citations</strong>
          <p>{citationCount}</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Confidence Score</strong>
          <p>{confidence}%</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Research Grade</strong>
          <p>{researchGrade}</p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Source Reliability</strong>
          <p>
            {Math.min(
              100,
              70 + papers * 3
            )}
            %
          </p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Research Type</strong>
          <p>
            Academic & Web Intelligence
          </p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Agents Active</strong>
          <p>
            Planner • Search • Papers • Writer
          </p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Data Sources</strong>
          <p>
            DuckDuckGo + arXiv
          </p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Research Pipeline</strong>
          <p>
            Plan → Search → Papers → Report
          </p>
        </div>

        <div className="bg-slate-800 p-3 rounded">
          <strong>Status</strong>
          <p>
            {report
              ? "Research Completed"
              : "Ready"}
          </p>
        </div>

      </div>

    </div>
  );
}