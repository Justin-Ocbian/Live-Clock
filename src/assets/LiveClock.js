import React, { useState, useEffect } from "react";

const LiveClock = () => {
  const [time, setTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(false);
  const [format24Hour, setFormat24Hour] = useState(true);
  let intervalId = null;

  useEffect(() => {
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startClock = () => setIsRunning(true);
  const stopClock = () => setIsRunning(false);
  const toggleFormat = () => setFormat24Hour((prev) => !prev);

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !format24Hour,
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.clock}>{formattedTime}</h1>
      <div>
        <button onClick={startClock} disabled={isRunning} style={styles.button}>
          Start
        </button>
        <button onClick={stopClock} disabled={!isRunning} style={styles.button}>
          Stop
        </button>
        <button onClick={toggleFormat} style={styles.button}>
          {format24Hour ? "12-Hour" : "24-Hour"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    marginTop: "50px",
  },
  clock: {
    fontSize: "3rem",
    marginBottom: "20px",
  },
  button: {
    fontSize: "1rem",
    padding: "10px",
    margin: "5px",
    cursor: "pointer",
  },
};

export default LiveClock;
