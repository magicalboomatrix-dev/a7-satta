import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const GamePage = () => {
  const { gameName } = useParams();
  const decodedName = gameName ? gameName.replace(/-/g, " ") : "";

  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  const months = [
    "JAN","FEB","MAR","APR","MAY","JUN",
    "JUL","AUG","SEP","OCT","NOV","DEC"
  ];

  const cellStyle = { width: 40, height: 40, textAlign: "center", verticalAlign: "middle", border: "1px solid #ddd" };

  useEffect(() => {
    const fetchChart = async () => {
      try {
        const year = new Date().getFullYear();
        const res = await api.get(`/charts/yearly/${decodedName}?year=${year}`);
        setChartData(res.data.data);
      } catch (err) {
        console.error("Failed to fetch chart data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchChart();
  }, [decodedName]);

  const getDaysInMonth = (monthIndex) => {
    const year = new Date().getFullYear();
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  if (loading) return <div>Loading chart...</div>;

  return (
    <div>
      <section className="octoberresultchart">
        <div className="container text-center">
          <h1>{decodedName.toUpperCase()} YEARLY CHART {new Date().getFullYear()}</h1>
        </div>
      </section>

      <div className="panel-body" style={{ overflow: "auto", width: "100%", paddingBottom: 0 }}>
        <table style={{ textAlign: "center", tableLayout: "fixed", borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ lineHeight: 1, backgroundColor: "#FFC107", color: "#000" }}>
              <th style={cellStyle}>{new Date().getFullYear()}</th>
              {months.map((month, idx) => <th key={idx} style={cellStyle}>{month}</th>)}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 31 }, (_, i) => (
              <tr key={i}>
                <th style={cellStyle} className="bluetext forfirtcolor">{i + 1}</th>
                {months.map((month, mIdx) => {
                  const daysInMonth = getDaysInMonth(mIdx);
                  const value = i < daysInMonth ? chartData[month]?.[i] ?? "-" : "";
                  return (
                    <th key={mIdx} style={cellStyle}>
                      <span style={{ color: value === "-" ? "#999" : "#000" }}>{value}</span>
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
