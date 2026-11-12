import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
} from "docx";
import { saveAs } from "file-saver";

export default function History() {
  const [history, setHistory] = useState(
    JSON.parse(
      localStorage.getItem(
        "research_history"
      ) || "[]"
    )
  );

  const [selectedReport, setSelectedReport] =
    useState<any>(null);

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("Newest");

  const filteredHistory =
    useMemo(() => {
      let data = [...history];

      if (search.trim()) {
        data = data.filter(
          (item: any) =>
            item.topic
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            item.report
              ?.toLowerCase()
              .includes(
                search.toLowerCase()
              )
        );
      }

      switch (sortBy) {
        case "Oldest":
          data.reverse();
          break;

        case "Largest":
          data.sort(
            (a: any, b: any) =>
              b.report.split(" ")
                .length -
              a.report.split(" ")
                .length
          );
          break;

        case "Smallest":
          data.sort(
            (a: any, b: any) =>
              a.report.split(" ")
                .length -
              b.report.split(" ")
                .length
          );
          break;

        default:
          break;
      }

      return data;
    }, [history, search, sortBy]);

  const totalReports =
    history.length;

  const totalWords =
    history.reduce(
      (
        acc: number,
        item: any
      ) =>
        acc +
        item.report.split(" ")
          .length,
      0
    );

  const averageWords =
    totalReports > 0
      ? Math.round(
          totalWords /
            totalReports
        )
      : 0;

  const clearHistory = () => {
    localStorage.removeItem(
      "research_history"
    );

    setHistory([]);
    setSelectedReport(null);
  };

  const getFileName = () => {
    if (!selectedReport)
      return "report";

    return selectedReport.topic
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");
  };

  const exportPDF = () => {
    if (!selectedReport) return;

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      selectedReport.topic,
      10,
      15
    );

    doc.setFontSize(10);

    doc.text(
      `Generated: ${selectedReport.date}`,
      10,
      25
    );

    const lines =
      doc.splitTextToSize(
        selectedReport.report,
        180
      );

    doc.setFontSize(11);

    doc.text(
      lines,
      10,
      40
    );

    doc.save(
      `${getFileName()}.pdf`
    );
  };

  const exportMarkdown =
    () => {
      if (!selectedReport)
        return;

      const blob =
        new Blob(
          [
            selectedReport.report,
          ],
          {
            type: "text/markdown",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download =
        `${getFileName()}.md`;

      a.click();

      URL.revokeObjectURL(
        url
      );
    };

  const exportDOCX =
    async () => {
      if (!selectedReport)
        return;

      const doc =
        new Document({
          sections: [
            {
              children: [
                new Paragraph(
                  selectedReport.topic
                ),
                new Paragraph(""),
                new Paragraph(
                  selectedReport.report
                ),
              ],
            },
          ],
        });

      const blob =
        await Packer.toBlob(
          doc
        );

      saveAs(
        blob,
        `${getFileName()}.docx`
      );
    };

  const handleExport =
    async () => {
      const format =
        localStorage.getItem(
          "export_format"
        ) || "PDF";

      if (
        format === "PDF"
      ) {
        exportPDF();
      } else if (
        format === "DOCX"
      ) {
        await exportDOCX();
      } else if (
        format ===
        "Markdown"
      ) {
        exportMarkdown();
      }
    };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Research History
        </h1>

        <button
          onClick={clearHistory}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
        >
          Clear All
        </button>

      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-slate-400">
            Total Reports
          </p>

          <p className="text-3xl font-bold">
            {totalReports}
          </p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-slate-400">
            Total Words
          </p>

          <p className="text-3xl font-bold">
            {totalWords}
          </p>
        </div>

        <div className="bg-slate-900 p-4 rounded-xl">
          <p className="text-slate-400">
            Average Size
          </p>

          <p className="text-3xl font-bold">
            {averageWords}
          </p>
        </div>

      </div>

      <div className="bg-slate-900 p-4 rounded-xl mb-6">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="flex-1 bg-slate-800 p-3 rounded"
          />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="bg-slate-800 p-3 rounded"
          >
            <option>
              Newest
            </option>

            <option>
              Oldest
            </option>

            <option>
              Largest
            </option>

            <option>
              Smallest
            </option>

          </select>

        </div>

      </div>

      <div className="grid grid-cols-12 gap-4">

        <div className="col-span-4">

          {filteredHistory.length === 0 ? (
            <div className="bg-slate-900 p-4 rounded-xl">
              No reports found
            </div>
          ) : (
            filteredHistory.map(
              (
                item: any,
                index: number
              ) => (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedReport(
                      item
                    )
                  }
                  className="bg-slate-900 p-4 rounded-xl mb-3 cursor-pointer hover:bg-slate-800 transition"
                >
                  <h2 className="font-bold">
                    {item.topic}
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    {item.date}
                  </p>

                  <p className="text-xs text-slate-500 mt-2">
                    {
                      item.report.split(
                        " "
                      ).length
                    }{" "}
                    words
                  </p>
                </div>
              )
            )
          )}

        </div>

        <div className="col-span-8">

          <div className="bg-slate-900 p-5 rounded-xl min-h-[700px]">

            {selectedReport ? (
              <>

                <div className="flex justify-between items-center mb-4">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {selectedReport.topic}
                    </h2>

                    <p className="text-slate-400 text-sm">
                      {selectedReport.date}
                    </p>

                    <p className="text-xs text-slate-500">
                      Export Format:
                      {" "}
                      {localStorage.getItem(
                        "export_format"
                      ) || "PDF"}
                    </p>

                  </div>

                  <button
                    onClick={
                      handleExport
                    }
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
                  >
                    Export
                  </button>

                </div>

                <div className="max-h-[600px] overflow-y-auto whitespace-pre-wrap">
                  {selectedReport.report}
                </div>

              </>
            ) : (
              <div className="text-slate-400">
                Select a report to preview
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}