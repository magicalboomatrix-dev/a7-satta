import React, { useEffect, useState } from "react";
import api from "../utils/api";

const LiveGameResult = ({ gameName, imgArrow, imgWait }) => {
  const [latestResult, setLatestResult] = useState(null);
  const [previousResult, setPreviousResult] = useState(null);
  const [resultTime, setResultTime] = useState("--");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchResult = async () => {
      try {
        const res = await api.get(`/result/${gameName}`);
        if (!isMounted) return;

        setLatestResult(res.data.latestResult);
        setPreviousResult(res.data.previousResult);
        setResultTime(res.data.resultTime || "--");
      } catch (err) {
        if (!isMounted) return;
        console.error("Error fetching result:", err);
        setLatestResult(null);
        setPreviousResult(null);
        setResultTime("--");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchResult();
    const interval = setInterval(fetchResult, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [gameName]);

  return (
    <div className="wrapper-yellow">
      <section className="sattadividerr">
        <div className="container">
          <div className="col-md-12 text-center" style={{ paddingBottom: 15 }}>
            <h4
              style={{
                fontSize: 24,
                fontWeight: "normal",
                textTransform: "uppercase",
                margin: 0,
                paddingTop:0,
              }}
            >
              <b>{gameName}</b>
            </h4>
            <p style={{ fontSize: 18 }}>{loading ? "--" : resultTime}</p>

            {/* Previous → Arrow → Latest / Wait */}
            {!loading && (
              <div
                style={{
                  fontSize: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {/* Previous result or fallback */}
                <span>
                  {" "}
                  <strong style={{ fontSize: 20, letterSpacing: 2 }}>
                    {previousResult}
                  </strong>
                </span>

                {/* Arrow always visible */}
                <img src={imgArrow} alt="arrow icon" height="30" width="30" />

                {/* Latest result or wait icon */}
                {latestResult ? (
                  <span>
                    {" "}
                    <strong style={{ fontSize: 20, letterSpacing: 2 }}>
                      {latestResult}
                    </strong>
                  </span>
                ) : (
                  <img src={imgWait} alt="wait icon" height={60} width={60} />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveGameResult;
