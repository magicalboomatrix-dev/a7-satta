import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQ from "../assets/components/faq";
import api from "../utils/api";

const Chart = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch games from backend
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await api.get("/games");
        setGames(res.data);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  return (
    <>
      <section className="circlebox">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="liveresult">
                <h1 className="hintext2">
                  A7satta provides all kind of satta king results everyday.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>SATTA KING CHART {new Date().getFullYear()}</h2>
            </div>
          </div>
        </div>
      </section>
      <div className="pills-for-chart">
        {games.map((game) => {
          const slug = game.name.toLowerCase().replace(/\s+/g, "-");
          const year = new Date().getFullYear();
          return (
            <Link
              key={game._id}
              className="single-pill"
              to={`/chart-${year}/${slug}-satta-king-result`}
            >
              {game.name}
            </Link>
          );
        })}
      </div>

      <br />
    </>
  );
};

export default Chart;
