import { useState, useEffect } from "react";

export default function Clock() {

  const [date, setDate] = useState(new Date("en-IN"));

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
    <small style={{color:"gray"}}>{date.toLocaleString("en-IN")}</small>
  );
}
