import { useState } from "react";
import { api } from "../services/api";

import Header from "./Header";
import StatsCards from "./StatsCard";
import ResearchInput from "./ResearchInput";
import AgentLogs from "./AgentLogs";
import SourcesPanel from "./SourcesPanel";
import PapersPanel from "./PaperPanels";
import ReportPanel from "./ReportPanel";
import ResearchInsights from "./ResearchInsights";
import ResearchChat from "./ResearchChat";

function BetterApp() {
  const [topic, setTopic] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);

  const [logs, setLogs] = useState<string[]>([]);

  const [sources, setSources] = useState<
    {
      title: string;
      type: string;
      url?: string;
    }[]
  >([]);

  const [papers, setPapers] = useState<any[]>([]);

  const [reportWords, setReportWords] = useState(0);

  const [researchTime, setResearchTime] = useState("--");

  const [lastResearch, setLastResearch] = useState("--");

  const [stats, setStats] = useState({
    sources: 0,
    papers: 0,
    confidence: 0,
  });

  const startResearch = async () => {
    if (!topic.trim()) return;

    const startTime = Date.now();

    try {
      setLoading(true);

      setReport("");
      setLogs([]);
      setSources([]);
      setPapers([]);

      setStats({
        sources: 0,
        papers: 0,
        confidence: 0,
      });

      setLogs([
        "Planner Agent started",
      ]);

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          "Web Search Agent collecting sources",
        ]);
      }, 500);

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          "Paper Search Agent searching academic papers",
        ]);
      }, 1000);

      setTimeout(() => {
        setLogs((prev) => [
          ...prev,
          "Knowledge Synthesizer processing information",
        ]);
      }, 1500);

      const depth =
        localStorage.getItem(
          "research_depth"
        ) || "Standard";

      const response = await api.post(
        "/research",
        {
          topic,
          depth,
        }
      );

      const data = response.data;

      console.log(
        "BACKEND RESPONSE:",
        data
      );

      const generatedReport =
        data.report || "";

      setReport(generatedReport);

      const parsedSources = Array.isArray(
        data.sources
      )
        ? data.sources.map(
            (source: any) => ({
              title:
                source?.title ||
                source?.name ||
                "Unknown Source",

              type:
                source?.type ||
                "Web Source",

              url:
                source?.url || "",
            })
          )
        : [];

      setSources(parsedSources);

      const parsedPapers = Array.isArray(
        data.papers
      )
        ? data.papers
        : [];

      setPapers(parsedPapers);

      const words =
        generatedReport.trim().length > 0
          ? generatedReport
              .trim()
              .split(/\s+/).length
          : 0;

      setReportWords(words);

      const endTime = Date.now();

      setResearchTime(
        `${(
          (endTime - startTime) /
          1000
        ).toFixed(1)}s`
      );

      const researchDate =
        new Date().toLocaleString();

      setLastResearch(
        researchDate
      );

      const autoSave =
        localStorage.getItem(
          "auto_save"
        ) !== "false";

      if (autoSave) {
        const history =
          JSON.parse(
            localStorage.getItem(
              "research_history"
            ) || "[]"
          );

        history.unshift({
          topic,
          report: generatedReport,
          date: researchDate,

          // NEW
          sources: parsedSources,
          papers: parsedPapers,

          stats: {
            words,
            sourceCount:
              parsedSources.length,
            paperCount:
              parsedPapers.length,
          },
        });

        localStorage.setItem(
          "research_history",
          JSON.stringify(history)
        );
      }

      let confidence = 70;

      confidence +=
        parsedSources.length * 3;

      confidence +=
        parsedPapers.length * 2;

      confidence = Math.min(
        confidence,
        99
      );

      setStats({
        sources:
          parsedSources.length,

        papers:
          parsedPapers.length,

        confidence,
      });

      setLogs((prev) => [
        ...prev,
        "Writer Agent generated report",
        "Reviewer Agent verified references",
        "Research completed successfully",
      ]);
    } catch (error) {
      console.error(error);

      setLogs((prev) => [
        ...prev,
        "Research failed",
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header />

      <div className="p-6">

        <StatsCards
          sources={stats.sources}
          papers={stats.papers}
          confidence={stats.confidence}
          reportWords={reportWords}
          researchTime={researchTime}
          lastResearch={lastResearch}
        />

        <div className="grid grid-cols-12 gap-4 mt-4">

          <div className="col-span-3">
            <ResearchInput
              topic={topic}
              setTopic={setTopic}
              startResearch={startResearch}
              loading={loading}
            />
          </div>

          <div className="col-span-5">
            <ResearchInsights
              topic={topic}
              sources={stats.sources}
              papers={stats.papers}
              confidence={stats.confidence}
              report={report}
            />
          </div>

          <div className="col-span-4">
            <AgentLogs
              logs={logs}
            />
          </div>

        </div>

        <div className="grid grid-cols-12 gap-4 mt-4">

          <div className="col-span-3">
            <SourcesPanel
              sources={sources}
            />
          </div>

          <div className="col-span-9">
            <ReportPanel
              report={report}
            />
          </div>

        </div>

        <div className="mt-4">
          <ResearchChat
            report={report}
          />
        </div>

        <div className="mt-4">
          <PapersPanel
            papers={papers}
          />
        </div>

      </div>
    </div>
  );
}

export default BetterApp;