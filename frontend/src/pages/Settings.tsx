import { useState } from "react";

export default function Settings() {
  const [depth, setDepth] = useState(
    localStorage.getItem("research_depth") ||
      "Standard"
  );

  const [exportFormat, setExportFormat] =
    useState(
      localStorage.getItem(
        "export_format"
      ) || "PDF"
    );

  const [citationStyle, setCitationStyle] =
    useState(
      localStorage.getItem(
        "citation_style"
      ) || "APA"
    );

  const [autoSave, setAutoSave] =
    useState(
      localStorage.getItem("auto_save") !==
        "false"
    );

  const saveSettings = () => {
    localStorage.setItem(
      "research_depth",
      depth
    );

    localStorage.setItem(
      "export_format",
      exportFormat
    );

    localStorage.setItem(
      "citation_style",
      citationStyle
    );

    localStorage.setItem(
      "auto_save",
      autoSave.toString()
    );

    alert("Settings Saved");
  };

  const clearHistory = () => {
    localStorage.removeItem(
      "research_history"
    );

    alert(
      "Research history cleared"
    );
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">
        Settings
      </h1>

      <div className="space-y-6 max-w-3xl">

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="font-semibold mb-3">
            Research Depth
          </h2>

          <select
            value={depth}
            onChange={(e) =>
              setDepth(e.target.value)
            }
            className="bg-slate-800 p-2 rounded w-full"
          >
            <option>Quick</option>
            <option>Standard</option>
            <option>Deep</option>
          </select>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="font-semibold mb-3">
            Export Format
          </h2>

          <select
            value={exportFormat}
            onChange={(e) =>
              setExportFormat(
                e.target.value
              )
            }
            className="bg-slate-800 p-2 rounded w-full"
          >
            <option>PDF</option>
            <option>DOCX</option>
            <option>Markdown</option>
          </select>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="font-semibold mb-3">
            Citation Style
          </h2>

          <select
            value={citationStyle}
            onChange={(e) =>
              setCitationStyle(
                e.target.value
              )
            }
            className="bg-slate-800 p-2 rounded w-full"
          >
            <option>APA</option>
            <option>MLA</option>
            <option>IEEE</option>
            <option>Chicago</option>
          </select>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={autoSave}
              onChange={() =>
                setAutoSave(
                  !autoSave
                )
              }
            />
            Auto Save Research History
          </label>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="font-semibold mb-4">
            Data Management
          </h2>

          <button
            onClick={clearHistory}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Clear Research History
          </button>
        </div>

        <button
          onClick={saveSettings}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold"
        >
          Save Settings
        </button>

      </div>
    </div>
  );
}