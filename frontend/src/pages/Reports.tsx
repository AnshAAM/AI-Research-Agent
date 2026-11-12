import { useMemo, useState } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function Reports() {
  const history = JSON.parse(
    localStorage.getItem(
      "research_history"
    ) || "[]"
  );

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("Newest");

  const processedReports =
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

  const largestReport =
    history.length > 0
      ? Math.max(
          ...history.map(
            (item: any) =>
              item.report.split(
                " "
              ).length
          )
        )
      : 0;

  const latestResearch =
    history.length > 0
      ? history[0]?.date
      : "No reports";

  const chartData =
    history.map(
      (
        item: any,
        index: number
      ) => ({
        report:
          index + 1,
        words:
          item.report.split(" ")
            .length,
      })
    );

  const topicData =
    history.map(
      (item: any) => ({
        topic:
          item.topic.length > 20
            ? item.topic.slice(
                0,
                20
              ) + "..."
            : item.topic,

        words:
          item.report.split(" ")
            .length,
      })
    );

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Research Analytics
      </h1>

      {/* CARDS */}

      <div className="grid grid-cols-5 gap-4 mb-6">

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="text-slate-400">
            Total Reports
          </h2>

          <p className="text-4xl font-bold">
            {totalReports}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="text-slate-400">
            Total Words
          </h2>

          <p className="text-4xl font-bold">
            {totalWords}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="text-slate-400">
            Average Size
          </h2>

          <p className="text-4xl font-bold">
            {averageWords}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="text-slate-400">
            Largest Report
          </h2>

          <p className="text-4xl font-bold">
            {largestReport}
          </p>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <h2 className="text-slate-400">
            Latest Research
          </h2>

          <p className="text-sm font-bold">
            {latestResearch}
          </p>
        </div>

      </div>

      {/* SEARCH */}

      <div className="bg-slate-900 p-5 rounded-xl mb-6">

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
            className="flex-1 bg-slate-800 rounded p-3"
          />

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value
              )
            }
            className="bg-slate-800 rounded p-3"
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

      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-4 mb-6">

        <div className="bg-slate-900 rounded-xl p-5">

          <h2 className="text-xl font-semibold mb-4">
            Research Growth
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={chartData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="report"
              />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="words"
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="bg-slate-900 rounded-xl p-5">

          <h2 className="text-xl font-semibold mb-4">
            Report Size Analysis
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart
              data={topicData}
            >
              <XAxis
                dataKey="topic"
              />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="words"
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-slate-900 rounded-xl overflow-hidden">

        <div className="p-5 border-b border-slate-800">

          <h2 className="text-xl font-semibold">
            Recent Research Reports
          </h2>

        </div>

        {processedReports.length === 0 ? (
          <div className="p-5 text-slate-400">
            No reports found.
          </div>
        ) : (
          processedReports.map(
            (
              item: any,
              index: number
            ) => (
              <div
                key={index}
                className="p-5 border-b border-slate-800 hover:bg-slate-800 transition"
              >
                <h3 className="font-semibold text-lg">
                  {item.topic}
                </h3>

                <p className="text-slate-400 text-sm mt-1">
                  {item.date}
                </p>

                <p className="mt-2">
                  Words:{" "}
                  {
                    item.report.split(
                      " "
                    ).length
                  }
                </p>
              </div>
            )
          )
        )}

      </div>

    </div>
  );
}