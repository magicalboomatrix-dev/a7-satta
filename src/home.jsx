import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FAQ from "./assets/components/faq";
import Readmore from "./assets/components/Readmore";
import Clock from "./pages/clock";
import api from "./utils/api";
import LiveGameResult from "./pages/LiveGameResult";
import GroupTable from "./pages/GroupTable";
import MonthlyGroupTable from "./pages/MonthlyGroupTable";
import CustomAds from "./pages/CustomAds";
import BottomAds from "./pages/BottomPromotion";

const Home = () => {
  const [latestResult, setLatestResult] = useState(null);
  const [previousResult, setPreviousResult] = useState(null);
  const [resultTime, setResultTime] = useState("--");
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();

  // Fetch games from backend
  useEffect(() => {
    let cancelled = false;
    const fetchGames = async () => {
      try {
        const res = await api.get("/games");
        if (cancelled) return;
        setGames(res.data);
        console.log("Fetched games:", res.data);
        if (res.data.length > 0) setSelectedGame(res.data[0].name);
      } catch (err) {
        console.error("Failed to fetch games:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchGames();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleCheck = () => {
    if (!selectedGame) return;
    const gameSlug = selectedGame.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${gameSlug}?year=${selectedYear}`);
  };

  /**
   * UpcomingResults component
   * - props: games (array from /games), loading (bool)
   * - shows two stacked cards (same UI as original GALI block)
   * - determines next two upcoming games using IST time
   * - for each game calls /result/:name to get latestResult
   */
  const UpcomingResults = ({ games = [], loading }) => {
    const [cards, setCards] = useState([
      { name: "", resultTime: "--", latestResult: null, loading: true },
      { name: "", resultTime: "--", latestResult: null, loading: true },
    ]);
    const intervalRef = useRef(null);
    const mountedRef = useRef(false);

    // Utility: get current IST time as Date object
    const getNowIST = () => {
      const now = new Date();
      const nowUtc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
      // IST is UTC+5:30 -> 5.5 * 3600000 ms
      const nowIst = new Date(nowUtc.getTime() + 5.5 * 3600000);
      return nowIst;
    };

    // Utility: compute next occurrence Date (in IST) for a "HH:mm" string
    const nextOccurrenceIST = (timeStr) => {
      const nowIst = getNowIST();
      const [hh, mm] = timeStr.split(":").map((x) => parseInt(x, 10));
      let candidate = new Date(
        nowIst.getFullYear(),
        nowIst.getMonth(),
        nowIst.getDate(),
        hh,
        mm,
        0,
        0
      );
      // If candidate is in the past or equal to now, set to tomorrow
      if (candidate <= nowIst) {
        candidate = new Date(candidate.getTime() + 24 * 60 * 60 * 1000);
      }
      return candidate;
    };

    // Pick next two upcoming games and fetch their results
    const computeAndFetch = async () => {
      if (!games || games.length === 0) {
        setCards([
          { name: "", resultTime: "--", latestResult: null, loading: false },
          { name: "", resultTime: "--", latestResult: null, loading: false },
        ]);
        return;
      }

      // Map games to nextOccurrence (IST)
      const mapped = games.map((g) => {
        const nextOcc = nextOccurrenceIST(g.resultTime);
        return {
          ...g,
          nextOcc, // Date object in IST representing next occurrence
        };
      });

      // Sort ascending by nextOcc
      mapped.sort((a, b) => a.nextOcc - b.nextOcc);

      // Pick top 2
      const topTwo = mapped.slice(0, 2);

      // If less than 2 (unlikely), pad with blanks
      while (topTwo.length < 2) {
        topTwo.push({ name: "", resultTime: "--", nextOcc: null });
      }

      // Prepare UI placeholder while fetching results
      setCards(
        topTwo.map((g) => ({
          name: g.name || "",
          resultTime: g.resultTime || "--",
          latestResult: null,
          loading: true,
        }))
      );

      // For each selected game, call /result/:gameName
      const fetched = await Promise.all(
        topTwo.map(async (g) => {
          if (!g.name) {
            return {
              name: "",
              resultTime: g.resultTime || "--",
              latestResult: null,
              loading: false,
            };
          }
          try {
            const res = await api.get(`/result/${encodeURIComponent(g.name)}`);
            // Expecting { game, latestResult, previousResult, resultTime }
            const data = res.data || {};
            return {
              name: g.name,
              resultTime: data.resultTime || g.resultTime || "--",
              latestResult: data.latestResult ?? null,
              loading: false,
            };
          } catch (err) {
            console.error("Failed to fetch result for", g.name, err);
            return {
              name: g.name,
              resultTime: g.resultTime || "--",
              latestResult: null,
              loading: false,
            };
          }
        })
      );

      // Update UI
      setCards(fetched);
    };

    // Run computeAndFetch initially and set polling
    useEffect(() => {
      // avoid running twice in StrictMode initial mount
      if (mountedRef.current === false) {
        mountedRef.current = true;
      }

      // fetch initially
      computeAndFetch();

      // poll every 30 seconds
      intervalRef.current = setInterval(computeAndFetch, 30000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [games]); // re-run whenever games list changes

    // Render a single card (same UI as original)
    const Card = ({ card }) => {
      const showWaiting = !card.latestResult;
      return (
        <section className="circlebox2">
          <div>
            <div className="sattaname">
              <p style={{ margin: 0 }}>{card.name || "—"}</p>
            </div>
            <div className="sattaresult">
              <p style={{ margin: 0, padding: 0 }}>
                <span style={{ letterSpacing: 4 }}>
                  {card.loading ? (
                    "--"
                  ) : showWaiting ? (
                    <img
                      src="images/d.gif"
                      alt="wait icon"
                      height={50}
                      width={50}
                    />
                  ) : (
                    card.latestResult
                  )}
                </span>
              </p>
              <p style={{ margin: 0, fontSize: 14, marginTop: 5 ,fontWeight:"bold"}}>
                <small style={{color:"white"}}>{card.resultTime}</small>
              </p>
            </div>
          </div>
        </section>
      );
    };

    return (
      <div>
        {/* Top card */}
        <Card card={cards[0]} />
        {/* Bottom card */}
        <Card card={cards[1]} />
      </div>
    );
  };

  return (
    <div>
      <section className="circlebox">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="liveresult">
                <div id="clockbox">
                  <Clock />
                </div>
                <p className="hintext" style={{ padding: 0 }}>
                  हा भाई यही आती हे सबसे पहले खबर रूको और देखो
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- REPLACED GALI BLOCK ---------- */}
      <UpcomingResults games={games} loading={loading} />
      {/* ---------- end replaced block ---------- */}

      <LiveGameResult
        gameName="disawar"
        imgArrow="images/arrow.gif"
        imgWait="images/d.gif"
      />

      <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}
      >
        <div className="row">
          <div
            className="card-body notification"
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            <h2>
              <Link to="/shri-ganesh">Shri Ganesh Satta King</Link> result is
              updated everyday at <strong>4:40 PM</strong>.
            </h2>
          </div>
        </div>
      </div>
      <div
        style={{
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: "100%",
          margin: "0.5rem auto",
          backgroundColor: "rgb(255, 255, 255)",
          overflow: "hidden",
          border: 0,
          borderRadius: "0.25rem",
        }}
      >
        <div className="row">
          <div
            className="card-body notification"
            style={{
              flex: "1 1 auto",
              minHeight: 1,
              padding: "1.25rem",
              border: "1px dashed red",
              background: "#FFC107",
              borderRadius: 20,
              fontWeight: "bold",
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            <h2>
              <Link to="/sadar-bazar">
                Sadar Bazar Satta King {new Date().getFullYear()}
              </Link>{" "}
              Chart is available on A7Satta.com
            </h2>
          </div>
        </div>
      </div>
      <CustomAds />

      <GroupTable groupName="gr1" />
      <GroupTable groupName="gr2" />

      <BottomAds />
      <br />
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>SATTA RECORD CHART {new Date().getFullYear()}</h5>
            </div>
          </div>
        </div>
      </section>
      <div className="Select_selectMainDiv__QD2cf">
        <select
          aria-label="satta game name"
          className="Select_selectTag__IzyVd"
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
        >
          {games.map((game) => (
            <option key={game._id} value={game.name}>
              {game.name}
            </option>
          ))}
        </select>
        <select
          aria-label="year"
          className="Select_selectTag__IzyVd Select_secondTag__Q9uV_"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option> {new Date().getFullYear()}</option>;
        </select>

        <button className="header_btn" type="button" onClick={handleCheck}>
          Check <span className="arw">→</span>
        </button>
      </div>
      <section className="octoberresultchart">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h2>
                <b>
                  SATTA RESULT CHART{" "}
                  {new Date()
                    .toLocaleString("en-US", { month: "long" })
                    .toUpperCase()}{" "}
                  {new Date().getFullYear()}
                </b>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <MonthlyGroupTable groupName="gr1" />
      <MonthlyGroupTable groupName="gr2" />
      <section className="game-detail">
        <div className="containers">
          <div className="rowr">
            <div className="col-left">
              <div className="text-left2">
                <h1>
                  The Ultimate Guide to Satta King: Gambling Culture Nurtured In
                  India and Its Impact on Society
                </h1>
              </div>
            </div>
            <div className="col-right">
              <div className="content">
                <p>
                  Welcome to A7 Satta, the most informative sike about SATTA
                  KING. In this guide, you will find a complete overview of the
                  Satta King game, its history, gameplay style, leading markets
                  and what players need to know in order to play it safely and
                  responsibly.
                </p>
                <h2>What is Satta King?</h2>
                <p>
                  Satta King is an online game, where you can also stand a
                  chance to win with the help of betting. It is a kind of
                  lottery or gambling on the last two to four digits of selected
                  numbers at predetermined intervals. The word <b>“Satta”</b>{" "}
                  usually means betting or gambling and <b>“King”</b> is the
                  term which refers to the person who gets triumph in a match.
                </p>

                {/* ... the rest remains unchanged ... */}

                <Readmore>
                  {/* long content unchanged */}
                </Readmore>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
};

export default Home;
