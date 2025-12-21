import React, { useEffect, useState } from "react";
import api from "../utils/api";

export default function MonthlyGroupTable({ groupName }) {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to safely extract display value
  const getDisplayValue = (item) => {
    if (typeof item === "object" && item !== null && item.value !== undefined) {
      return item.value;
    }
    return item || "-";
  };

  useEffect(() => {
    if (!groupName) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/group/name/${groupName}/monthly`);
        const data = res.data?.tableData || [];
        setTableData(data);

        // Extract columns dynamically from first object keys (excluding "date")
        if (data.length > 0) {
          const cols = Object.keys(data[0]).filter((key) => key !== "date");
          setColumns(cols);
        }

        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load group data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupName]);

  if (loading) {
    return (
      <section className="tablebox1" style={{ margin: "0px 0px 5px" }}>
        <p style={{ textAlign: "center" }}>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="tablebox1" style={{ margin: "0px 0px 5px" }}>
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      </section>
    );
  }

  if (!tableData.length) {
    return (
      <section className="tablebox1" style={{ margin: "0px 0px 5px" }}>
        <p style={{ textAlign: "center" }}>No games found</p>
      </section>
    );
  }

  return (
    <section className="newtable">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 nopadding">
            <div
              className="table-responsive marginBottom"
              style={{ overflowX: "auto" }}
            >
              <table className="table table-bordered table-extra">
                <thead>
                  <tr>
                    <td
                      className="table_chart_section_01 forfirtcolor date col-md-2 text-center"
                      style={{
                        position: "sticky",
                        left: 0,
                        zIndex: 3,
                        background: "#f5f5f5",
                        minWidth: "120px",
                      }}
                    >
                      <strong className="fon">Date</strong>
                    </td>
                    {columns.map((col, idx) => (
                      <td
                        key={idx}
                        className="table_chart_section forfirtcolor text-center"
                        style={{ textTransform: "uppercase" }}
                      >
                        {col}
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => (
                    <tr key={idx}>
                      <td
                        className="forfirtcolor text-center"
                        style={{
                          position: "sticky",
                          left: 0,
                          zIndex: 2,
                          background: "#fff",
                          minWidth: "120px",
                        }}
                      >
                        <span className="fon">{row.date}</span>
                      </td>
                      {columns.map((col, i) => (
                        <td key={i}>
                          <span className="table_chart_section_02">
                            {getDisplayValue(row[col])}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
