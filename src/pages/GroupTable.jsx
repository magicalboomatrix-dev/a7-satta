import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function GroupTable({ groupName }) {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to safely extract display value
  const getDisplayValue = (item) => {
    if (typeof item === 'object' && item !== null && item.value !== undefined) {
      return item.value;
    }
    return item || "-";
  };

  useEffect(() => {
    if (!groupName) return;

    const fetchGroup = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/group/name/${encodeURIComponent(groupName)}`
        );
        setGroup(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load group data");
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
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

  if (!group || !group.games || group.games.length === 0) {
    return (
      <section className="tablebox1" style={{ margin: "0px 0px 5px" }}>
        <p style={{ textAlign: "center" }}>No games found</p>
      </section>
    );
  }

  return (
    <section className="tablebox1" style={{ margin: "0px 0px 5px" }}>
      <div className="container-fluid">
        <div className="row">
          <article style={{ padding: 0 }}>
            <div className="col-md-12 nopadding" style={{ marginBottom: 20 }}>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="forblack">
                    <tr>
                      <th
                        className="col-md-4 text-center"
                        style={{
                          width: "37%",
                          background: "rgb(0, 0, 0)",
                          color: "rgb(255, 255, 255)",
                        }}
                      >
                        सट्टा का नाम
                      </th>
                      <th
                        className="col-md-4 text-center"
                        style={{
                          background: "rgb(0, 0, 0)",
                          color: "rgb(255, 255, 255)",
                        }}
                      >
                        कल आया था
                      </th>
                      <th
                        className="col-md-4 text-center"
                        style={{
                          background: "rgb(0, 0, 0)",
                          color: "rgb(255, 255, 255)",
                        }}
                      >
                        आज का रिज़ल्ट
                      </th>
                    </tr>
                  </thead>

                  {group.games.map((game, idx) => (
                    <tbody key={idx}>
                      <tr>
                        <td className="foryellow">
                          <Link
                            className="gamenameeach"
                            to={`/chart-${new Date().getFullYear()}/${game.name
                              .toLowerCase()
                              .replace(/\s+/g, "-")}-satta-king-result`}
                          >
                            {game.name}
                          </Link>
                          <br />
                          {game.resultTime12h}
                          <br />
                        </td>
                        <td className="yesterday-number">
                          <div
                            className="special-bold"
                            style={{
                              marginBottom: 0,
                              letterSpacing: 2,
                              fontSize: 22,
                            }}
                          >
                            {getDisplayValue(game.yesterdayNumber)}
                          </div>
                        </td>
                        <td className="today-number">
                          <div
                            style={{
                              marginBottom: 0,
                              letterSpacing: 2,
                              fontSize: 22,
                            }}
                          >
                            {game.todayNumber == null ? (
                              <span
                                style={{
                                  boxSizing: "border-box",
                                  display: "inline-block",
                                  overflow: "hidden",
                                  width: "initial",
                                  height: "initial",
                                  background: "none",
                                  opacity: 1,
                                  border: 0,
                                  margin: 0,
                                  padding: 0,
                                  position: "relative",
                                  maxWidth: "100%",
                                }}
                              >
                                <img alt="wait icon" src="images/d.gif" />
                              </span>
                            ) : (
                              getDisplayValue(game.todayNumber)
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}