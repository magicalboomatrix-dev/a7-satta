import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const cellStyle = {
  width: 40,
  height: 40,
  textAlign: "center",
  verticalAlign: "middle",
  border: "1px solid #ddd",
};

const stickyHeaderStyle = {
  ...cellStyle,
  position: "sticky",
  left: 0,
  zIndex: 3,
  background: "#FFC107",
};

const stickyBodyStyle = {
  ...cellStyle,
  position: "sticky",
  left: 0,
  zIndex: 2,
  background: "#fff",
};

const GamePage = () => {
  const params = useParams();
  let { year } = params;
  let gameSlug = params.gameSlug;

  if (!year && params.chartYear && params.chartYear.startsWith("chart-")) {
    const maybeYear = params.chartYear.replace("chart-", "");
    if (/^\d{4}$/.test(maybeYear)) {
      year = maybeYear;
    }
  }

  if (!gameSlug && params["*"]) {
    gameSlug = params["*"].split("/")[0];
    console.warn("GamePage: derived gameSlug from splat:", gameSlug);
  }

  const nameSlug = gameSlug ? gameSlug.replace(/-satta-king-result$/, "") : "";
  const decodedName = nameSlug.replace(/-/g, " ");

  const yearToUse = year ? Number(year) : new Date().getFullYear();

  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const months = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC",
  ];

  useEffect(() => {
    setLoading(true);

    const fetchChart = async () => {
      try {
        const res = await api.get(
          `/charts/yearly/${decodedName}?year=${yearToUse}`
        );
        setChartData(res.data?.data || {});
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChart();
  }, [decodedName, yearToUse]);

  const getDaysInMonth = (monthIndex) => {
    return new Date(yearToUse, monthIndex + 1, 0).getDate();
  };

  if (loading) return <div>Loading chart...</div>;

  return (
    <div>
      <section className="octoberresultchart">
        <div className="container text-center">
          <h1>
            {decodedName.toUpperCase()} YEARLY CHART {yearToUse}
          </h1>
        </div>
      </section>

      <div
        className="panel-body"
        style={{ overflow: "auto", width: "100%", paddingBottom: 0 }}
      >
        <table
          style={{
            textAlign: "center",
            tableLayout: "fixed",
            borderCollapse: "collapse",
            width: "100%",
          }}
        >
          <thead>
            <tr
              style={{
                lineHeight: 1,
                backgroundColor: "#FFC107",
                color: "#000",
              }}
            >
              <th style={stickyHeaderStyle}>{yearToUse}</th>
              {months.map((month, idx) => (
                <th key={idx} style={cellStyle}>
                  {month}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 31 }, (_, i) => (
              <tr key={i}>
                <th style={stickyBodyStyle} className="bluetext forfirtcolor">
                  {i + 1}
                </th>

                {months.map((month, mIdx) => {
                  const daysInMonth = getDaysInMonth(mIdx);
                  const value =
                    i < daysInMonth ? chartData[month]?.[i] ?? "-" : "";

                  return (
                    <th key={mIdx} style={cellStyle}>
                      <span style={{ color: value === "-" ? "#999" : "#000" }}>
                        {value}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GamePage;
