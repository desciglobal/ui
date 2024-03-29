import React from "react";
import AddToCalendarButtonTooltip from "./Tooltip/AddToCalendarButtonTooltip";
import { CalendarEvent } from "./cal-event";
import Backdrop from "../../../black-modal/Backdrop";

interface AddToCalendarButtonProps {
  calendarEvent: CalendarEvent;
  buttonText: JSX.Element;
}

export default function AddToCalendarButton({
  calendarEvent,
  buttonText,
}: AddToCalendarButtonProps) {
  const [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

  return (
    <React.Fragment>
      <div className="add-to-calendar-wrapper lg:flex lg:items-center">
        <button
          className="add-to-calendar-button text-sm"
          onClick={handleClick}
        >
          {buttonText}
        </button>
        {isTooltipVisible && (
          <>
            <Backdrop onClick={handleClick} />
            <AddToCalendarButtonTooltip calendarEvent={calendarEvent} />
          </>
        )}
      </div>
    </React.Fragment>
  );

  function handleClick(event: React.SyntheticEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsTooltipVisible(!isTooltipVisible);
  }
}
