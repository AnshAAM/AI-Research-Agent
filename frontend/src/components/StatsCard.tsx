interface Props {
  sources: number;
  papers: number;
  confidence: number;
  reportWords: number;
  researchTime: string;
  lastResearch: string;
}

export default function StatsCards({
  sources,
  papers,
  confidence,
  reportWords,
  researchTime,
  lastResearch,
}: Props) {
  return (
    <div className="grid grid-cols-6 gap-4">

      <div className="bg-slate-900 p-4 rounded-xl">
        <p className="text-slate-400">
          Sources Found
        </p>

        <p className="text-3xl font-bold">
          {sources}
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl">
        <p className="text-slate-400">
          Academic Papers
        </p>

        <p className="text-3xl font-bold">
          {papers}
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl">
        <p className="text-slate-400">
          Confidence
        </p>

        <p className="text-3xl font-bold">
          {confidence}%
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl">
        <p className="text-slate-400">
          Report Words
        </p>

        <p className="text-3xl font-bold">
          {reportWords}
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl">
        <p className="text-slate-400">
          Research Time
        </p>

        <p className="text-3xl font-bold">
          {researchTime}
        </p>
      </div>

      <div className="bg-slate-900 p-4 rounded-xl">
        <p className="text-slate-400">
          Last Research
        </p>

        <p className="text-sm font-bold">
          {lastResearch}
        </p>
      </div>

    </div>
  );
}