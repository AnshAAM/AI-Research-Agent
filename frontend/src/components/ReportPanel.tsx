import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
} from "docx";
import { saveAs } from "file-saver";

interface Props {
  report: string;
}

export default function ReportPanel({
  report,
}: Props) {
  const wordCount =
    report.trim().length > 0
      ? report.trim().split(/\s+/).length
      : 0;

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / 200)
  );

  const getFileName = () => {
    return `research-report-${Date.now()}`;
  };

  const downloadPDF = () => {
    if (!report) return;

    const doc = new jsPDF();

    const pageWidth =
      doc.internal.pageSize.getWidth();

    const pageHeight =
      doc.internal.pageSize.getHeight();

    doc.setFontSize(22);

    doc.text(
      "AI Research Report",
      pageWidth / 2,
      25,
      {
        align: "center",
      }
    );

    doc.setFontSize(11);

    doc.text(
      `Generated: ${new Date().toLocaleString()}`,
      pageWidth / 2,
      35,
      {
        align: "center",
      }
    );

    doc.text(
      `Words: ${wordCount}`,
      pageWidth / 2,
      43,
      {
        align: "center",
      }
    );

    doc.text(
      `Reading Time: ${readingTime} min`,
      pageWidth / 2,
      51,
      {
        align: "center",
      }
    );

    doc.addPage();

    const cleanReport = report
      .replace(/#/g, "")
      .replace(/\*/g, "");

    const lines =
      doc.splitTextToSize(
        cleanReport,
        180
      );

    let y = 20;

    doc.setFontSize(11);

    lines.forEach(
      (line: string) => {
        if (
          y >
          pageHeight - 20
        ) {
          doc.addPage();
          y = 20;
        }

        doc.text(
          line,
          10,
          y
        );

        y += 7;
      }
    );

    const totalPages =
      doc.getNumberOfPages();

    for (
      let i = 1;
      i <= totalPages;
      i++
    ) {
      doc.setPage(i);

      doc.setFontSize(9);

      doc.text(
        `Page ${i} of ${totalPages}`,
        pageWidth - 40,
        pageHeight - 10
      );
    }

    doc.save(
      `${getFileName()}.pdf`
    );
  };

  const downloadMarkdown =
    () => {
      if (!report) return;

      const blob =
        new Blob(
          [report],
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

  const downloadDOCX =
    async () => {
      if (!report) return;

      const doc =
        new Document({
          sections: [
            {
              children: [
                new Paragraph({
                  text: "AI Research Report",
                  heading:
                    HeadingLevel.TITLE,
                }),

                new Paragraph({
                  text: `Generated: ${new Date().toLocaleString()}`,
                }),

                new Paragraph({
                  text: `Words: ${wordCount}`,
                }),

                new Paragraph({
                  text: `Reading Time: ${readingTime} min`,
                }),

                new Paragraph(""),

                new Paragraph(
                  report
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
      if (!report) return;

      const format =
        localStorage.getItem(
          "export_format"
        ) || "PDF";

      if (
        format === "PDF"
      ) {
        downloadPDF();
      } else if (
        format ===
        "Markdown"
      ) {
        downloadMarkdown();
      } else if (
        format === "DOCX"
      ) {
        await downloadDOCX();
      }
    };

  return (
    <div className="bg-slate-900 rounded-xl p-5 h-full">

      <div className="flex justify-between items-center mb-4">

        <div>

          <h2 className="text-xl font-semibold">
            Research Report
          </h2>

          <p className="text-sm text-slate-400">
            Export Format:{" "}
            {localStorage.getItem(
              "export_format"
            ) || "PDF"}
          </p>

        </div>

        <button
          onClick={
            handleExport
          }
          disabled={!report}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:bg-slate-700"
        >
          Export
        </button>

      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">

        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-slate-400 text-sm">
            Words
          </p>

          <p className="text-xl font-bold">
            {wordCount}
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-slate-400 text-sm">
            Reading Time
          </p>

          <p className="text-xl font-bold">
            {readingTime} min
          </p>
        </div>

        <div className="bg-slate-800 rounded-lg p-3">
          <p className="text-slate-400 text-sm">
            Status
          </p>

          <p className="text-xl font-bold">
            {report
              ? "Ready"
              : "--"}
          </p>
        </div>

      </div>

      <div className="bg-slate-800 rounded-xl p-5 max-h-[700px] overflow-y-auto">

        <div className="prose prose-invert max-w-none">

          <ReactMarkdown>
            {report ||
              "Research report will appear here after analysis is completed."}
          </ReactMarkdown>

        </div>

      </div>

    </div>
  );
}