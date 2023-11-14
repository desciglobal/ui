import clsx from 'clsx';
import React from 'react';

export const DateTimeField = ({ id, label, register, errorMessage, setValue }) => {
  const dateId = `${id}_date`;
  const timeId = `${id}_time`;

  // Function to combine date and time inputs into a single DateTime string
  const handleDateTimeChange = (e, part) => {
    const dateElement = document.getElementById(dateId);
    const timeElement = document.getElementById(timeId);

    const dateValue = dateElement.value;
    const timeValue = timeElement.value;

    if (dateValue && timeValue) {
      // Adding milliseconds '.000' and 'Z' to denote UTC timezone
      const dateTimeValue = `${dateValue}T${timeValue}:00.000Z`;
      console.log("DATETIME", dateTimeValue);
      register(id).onChange({ target: { value: dateTimeValue } });
      setValue(id, dateTimeValue);
    }
  };

  return (
    <div className="form-control w-full mb-4">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="flex space-x-2">
        <input
          type="date"
          id={dateId}
          name={dateId}
          className={clsx("input-bordered bg-slate-100 input w-2/3", { "input-error": errorMessage })}
          onChange={(e) => handleDateTimeChange(e, 'date')}
        />
        <input
          type="time"
          id={timeId}
          name={timeId}
          className={clsx("input-bordered input bg-slate-100 w-1/3", { "input-error": errorMessage })}
          onChange={(e) => handleDateTimeChange(e, 'time')}
        />
      </div>
      {errorMessage && (
        <label className="label">
          <span className="label-text-alt text-error">{errorMessage}</span>
        </label>
      )}
    </div>
  );
};
