import React, { useEffect, useState } from "react";
import { getTimezonesByTime } from "./getIANATimezones";

const selectableHoursOfDay = [...Array(12).keys()].map((m) => {
  const hour = m + 1;
  return hour + ":00";
});

// get h:00 + am/pm string e.g. "1:00 pm"
const getDisplayTime = (hour: string, amOrPm: string) => `${hour} ${amOrPm}`;

export function GetIANATimezonesDropdown() {
  const [selectedDisplayHour, setSelectedDisplayHour] = useState<string>(
    "1:00"
  );
  const [amOrPm, setAmOrPm] = useState<string>("am");
  const [ianaTimezones, setIanaTimezones] = useState<(string | null)[]>();

  const handleDisplayTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const displayHour = e.target.value;
    setSelectedDisplayHour(displayHour);
  };

  const handleAmPmToggle = () => {
    const val = amOrPm === "am" ? "pm" : "am";
    setAmOrPm(val);
  };

  useEffect(() => {
    const displayTime = getDisplayTime(selectedDisplayHour, amOrPm);
    const timezone = getTimezonesByTime(displayTime);

    setIanaTimezones(timezone);
  }, [selectedDisplayHour, amOrPm]);

  return (
    <div className="App">
      <h2>Get Canonical IANA Timezone names by time</h2>

      <h4>
        Change the time to get a list of canonical IANA timezone names that
        currently have that time
      </h4>

      <select name="cars" id="cars" onChange={handleDisplayTimeChange}>
        {selectableHoursOfDay.map((displayHour) => (
          <option key={displayHour} value={displayHour}>
            {displayHour}
          </option>
        ))}
      </select>

      <button onClick={handleAmPmToggle}> {amOrPm} </button>

      {ianaTimezones && ianaTimezones.map((tz) => <p>{tz}</p>)}
    </div>
  );
}
