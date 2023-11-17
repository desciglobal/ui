import { useState } from "react";
import Link from "next/link";

import AddToCalendarButton from "./add-to-calendar-button/AddToCalendarButton";
import { MixpanelTracking } from "../../../lib/mixpanel";
import CalendarIcon from "../../icons/CalendarIcon";
import Image from "next/image";

function AllEventsSection(props) {
  const { futureEvents, pastEvents } = props;

  const [showAllPastEvents, setShowAllPastEvents] = useState(false);

  const shownPastEvents = showAllPastEvents
    ? pastEvents
    : pastEvents.slice(0, 10);

  function trackEventLinkClicked(eventName) {
    MixpanelTracking.getInstance().eventLinkClicked(eventName);
  }

  return (
    <section id="events">
      <div className="lg:px-4 px-2 lg:pt-40 py-10 flex justify-between items-start flex-col sm:flex-row sm:items-end">
        <div className="lg:w-2/4 h-[70%] flex flex-col justify-between">
          <h2 className="lg:text-4xl text-xl py-10">
            All Events in your local time{" "}
          </h2>
          <p className="text-lg">
            DeSci global is the global hub for all DeSci events; a schelling
            point to collect, share, and uplift all DeSci events across the
            globe. Explore the events that have happened and get involved with
            new ones coming up.
          </p>
        </div>
        <Link
          href="/submit-event"
          className="text-desciblue inline-flex items-center mt-3 sm:ml-3 whitespace-nowrap"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Event
        </Link>
      </div>
      <div
        id="upcoming"
        className="lg:bg-desciblue bg-descigrey w-full lg:px-4 px-2 h-10 grid grid-cols-12 items-center lg:text-white text-lg"
      >
        <div className="col-span-8 lg:col-span-6 xl:col-span-7">UPCOMING</div>
        <div className="lg:block lg:col-span-2 hidden">LOCATION</div>
        <div className="lg:block lg:col-span-2 hidden">TYPE</div>
        <div className="col-span-4 lg:block lg:col-span-2 xl:col-span-1 flex justify-end">
          DATE
        </div>
      </div>
      <div className="pt-4 pb-4">
        <ul>
          {futureEvents.map((e) => {
            const CALENDAR_EVENT = {
              title: e.eventTitle,
              description: e.eventDescription,
              startDate: new Date(e.eventDate),
              endDate: new Date(e.eventEndDate),
              durationInMinutes: 120,
              address: e.fullAddress,
            };

            const month = CALENDAR_EVENT.startDate.toLocaleString("default", {
              month: "long",
            });

            const year = CALENDAR_EVENT.startDate.getFullYear();

            return (
              <li key={e.id}>
                <div className="w-full lg:px-4 px-2 grid grid-cols-12 lg:items-center lg:text-xl text-l leading-5 mb-6">
                  <div className="col-span-8 sm:col-span-8 lg:col-span-5 xl:col-span-6">
                    <a
                      className="lg:hover:underline lg:font-normal md:text-base"
                      target={"_blank"}
                      href={e.eventLink}
                      onClick={() => trackEventLinkClicked(e.eventTitle)}
                      rel="noreferrer"
                    >
                      {e.eventTitle.slice(0, 80)}
                    </a>
                  </div>
                  <div className="lg:flex justify-center items-center hidden">
                    {e.meetupType == "to_be_finalized" ? (
                      ""
                    ) : (
                      <AddToCalendarButton
                        calendarEvent={CALENDAR_EVENT}
                        buttonText={<CalendarIcon />}
                      />
                    )}
                  </div>
                  {/* https://codesandbox.io/s/8g6dl?file=/src/AddToCalendarButton/AddToCalendarButton.tsx:0-911 */}

                  <div className="items-center lg:flex hidden text-base lg:col-span-2">
                    <Image
                      className="h-4 w-4 mr-2 rounded-full"
                      src={`/images/flags/${e.eventCountry.toLowerCase()}.svg`}
                      alt=""
                      width={10}
                      height={10}
                      variant="flag"
                    ></Image>
                    <p className="lg:block hidden">{e.eventCity}</p>
                  </div>
                  <p className="lg:block hidden text-base lg:col-span-2">
                    {e.meetupType}
                  </p>
                  {e.meetupType == "to_be_finalized" ? (
                    <p className="lg:block hidden text-base lg:col-span-2 xl:col-span-1">
                      {month} {year}
                    </p>
                  ) : (
                    <p className="lg:block hidden text-base lg:col-span-2 xl:col-span-1">
                      {e.eventDateConverted}
                    </p>
                  )}

                  <div className="lg:hidden text-l flex justify-end col-span-4 lg:col-span-2">
                    {" "}
                    {e.meetupType == "to_be_finalized" ? (
                      <p className="block lg:hidden text-s">To be Finalized</p>
                    ) : (
                      <AddToCalendarButton
                        calendarEvent={CALENDAR_EVENT}
                        buttonText={e.eventDateConverted}
                      />
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {/*  . here invisible on mobile */}
      <div className="hidden lg:block">
        <div className="bg-descigrey w-full mt-5 pr-4 pl-4 h-10 grid grid-cols-12 items-center text-lg">
          <div className="col-span-6 xl:col-span-7">PREVIOUS</div>
          <div className="col-span-2">LOCATION</div>
          <div className="col-span-2">TYPE</div>
          <div className="col-span-2 xl:col-span-1">DATE</div>
        </div>
        <div className="pt-4 pb-4">
          <ul>
            <div className="pt-4 pb-4 text-descigreyfont">
              <ul>
                {shownPastEvents.map((e) => {
                  return (
                    <li key={e.id + Math.random()}>
                      <div className="w-full pr-4 pl-4 grid grid-cols-12 items-center mb-6">
                        <div className="col-span-2 lg:col-span-6 xl:col-span-7">
                          <a
                            className="hover:underline"
                            target={"_blank"}
                            href={e.eventLink}
                            rel="noreferrer"
                          >
                            {e.eventTitle.slice(0, 80)}
                          </a>
                        </div>
                        <div className="flex items-center grayscale lg:col-span-2">
                          <Image
                            className="h-4 w-4 mr-2 rounded-full"
                            src={`/images/flags/${e.eventCountry.toLowerCase()}.svg`}
                            alt=""
                            width={10}
                            height={10}
                            variant="flag"
                          ></Image>
                          <p>{e.eventCity}</p>
                        </div>
                        <p className="text-base lg:col-span-2">
                          {e.meetupType}
                        </p>
                        <p className="text-base lg:col-span-2 xl:col-span-1">
                          {e.eventDateConverted}
                        </p>
                      </div>
                    </li>
                  );
                })}
                <button
                  className="text-desciblue inline-flex items-center mt-3 ml-4 cursor-pointer"
                  onClick={() => setShowAllPastEvents(!showAllPastEvents)}
                >
                  Show {showAllPastEvents ? "Less" : "More"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 ml-2"
                  >
                    {showAllPastEvents ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    )}
                  </svg>
                </button>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AllEventsSection;
