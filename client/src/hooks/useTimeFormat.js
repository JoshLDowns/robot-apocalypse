import { useState, useEffect } from "react";

export const useTimeFormat = (time) => {
  const [currentTime, setCurrentTime] = useState(time);
  const [modifiedTime, setModifiedTime] = useState(null)

  useEffect(() => {
    if (time !== currentTime) {
      setCurrentTime(time);
      let newSeconds;
      let newMinutes;
      let newHours;

      if (time < 60) {
        setModifiedTime({
          hours: "00",
          minutes: "00",
          seconds: time < 10 ? `0${time}` : `${time}`
        })
      } else if (time >= 60 && time < 3600) {
        newMinutes = Math.floor(time/60);
        newSeconds = time%60;
        setModifiedTime({
          hours: "00",
          minutes: newMinutes < 10 ? `0${newMinutes}` : `${newMinutes}`,
          seconds: newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`,
        })
      } else if (time >= 3600) {
        newHours = Math.floor(time/3600);
        newMinutes = time%3600 < 60 ? 0 : Math.floor((time%3600) / 60);
        newSeconds = time - (newHours * 3600) - (newMinutes * 60);
        setModifiedTime({
          hours: newHours < 10 ? `0${newHours}` : `${newHours}`,
          minutes: newMinutes < 10 ? `0${newMinutes}` : `${newMinutes}`,
          seconds: newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`,
        })
      }
    }
  }, [time, currentTime])
  if (modifiedTime) {
    return modifiedTime;
  } else {
    let newSeconds;
      let newMinutes;
      let newHours;

      if (time < 60) {
        return {
          hours: "00",
          minutes: "00",
          seconds: time < 10 ? `0${time}` : `${time}`
        }
      } else if (time >= 60 && time < 3600) {
        newMinutes = Math.floor(time/60);
        newSeconds = time%60;
        return {
          hours: "00",
          minutes: newMinutes < 10 ? `0${newMinutes}` : `${newMinutes}`,
          seconds: newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`,
        }
      } else if (time >= 3600) {
        newHours = Math.floor(time/3600);
        newMinutes = time%3600 < 60 ? 0 : Math.floor((time%3600) / 60);
        newSeconds = time - (newHours * 3600) - (newMinutes * 60);
        return {
          hours: newHours < 10 ? `0${newHours}` : `${newHours}`,
          minutes: newMinutes < 10 ? `0${newMinutes}` : `${newMinutes}`,
          seconds: newSeconds < 10 ? `0${newSeconds}` : `${newSeconds}`,
        }
      }
  }
}