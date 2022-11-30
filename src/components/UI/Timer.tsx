import { useState, useEffect } from "react";

type PropsTimer = {
  initMins: number;
  initSecs: number;
  onTimerExpires: () => void;
};

const Timer = ({ initMins, initSecs, onTimerExpires }: PropsTimer) => {
  // Combining useState values together for brevity
  const [[mins, secs], setCountdown] = useState([initMins, initSecs]);

  /**
   * Triggers each second and whenever mins/seconds updates itself.
   */
  useEffect(() => {
    // Timer that decrements itself each second and updates the mins/seconds downwards
    let timerInterval = setInterval(() => {
      // Countdown timer up, clear timer and do nothing
      if (mins <= 0 && secs <= 0) {
        clearInterval(timerInterval);
        onTimerExpires();
      } else if (secs === 0) {
        // Might be correct to set seconds to 59, but not sure
        // should decrement from 60 seconds yeah?
        setCountdown([mins - 1, 60]);
      } else {
        setCountdown([mins, secs - 1]);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [mins, secs, onTimerExpires]);

  return (
    <div>
      {mins <= 0 && secs <= 0 ? null : ( // <h3>Tijd is voorbij</h3>
        <h3>
          {" "}
          {mins}:{secs < 10 ? `0${secs}` : secs}
        </h3>
      )}
    </div>
  );
};

export default Timer;
