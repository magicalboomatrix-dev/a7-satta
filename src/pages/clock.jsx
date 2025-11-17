import { useState, useEffect } from "react";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // update every second

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  // Format date as "Month Day, Year HH:MM:SS AM/PM"
  const formattedTime = currentTime.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return <div id="clockbox">{formattedTime}</div>;
}
