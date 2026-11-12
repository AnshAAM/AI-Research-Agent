import {
  FileText,
  History,
  Settings,
  Brain,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-5">

      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          Insight AI
        </h1>

        <p className="text-slate-400 text-sm">
          Research Studio
        </p>

      </div>

      <div className="space-y-4">

        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Brain size={18} />
          New Research
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <FileText size={18} />
          Reports
        </Link>

        <Link
          to="/history"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <History size={18} />
          History
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800"
        >
          <Settings size={18} />
          Settings
        </Link>

      </div>
    </div>
  );
}