import { useState } from "react";

import AddToCalendarButton from "./AddToCalendarButton/AddToCalendarButton";
import EmailandEventCalForm from "../../modal-and-forms/email-event-cal-form";
import { MixpanelTracking } from "../../../services/mixpanel";
import Link from "next/link";

function AllEventsSection(props) {
  const { upComingEvents, pastEvents } = props;

  const [showAllPastEvents, setShowAllPastEvents] = useState(false);

  const shownPastEvents = showAllPastEvents
    ? pastEvents
    : pastEvents.slice(0, 15);

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
        className="lg:bg-desciblue bg-descigrey w-full lg:px-4 px-2 h-10 grid lg:grid-cols-6 grid-cols-2 items-center lg:text-white text-lg"
      >
        <div className="lg:col-span-3 ">UPCOMING</div>
        <div className="lg:block hidden">LOCATION</div>
        <div className="lg:block hidden">TYPE</div>
        <div className="lg:block flex justify-end">DATE</div>
      </div>
      <div className="pt-4 pb-4">
        <ul>
          {upComingEvents.map((event) => {
            const CALENDAR_EVENT = {
              title: event.event_title,
              description: event.event_description,
              startDate: new Date(event.event_gmt_date),
              endDate: new Date(event.event_gmt_end_date),
              durationInMinutes: 120,
              address: event.full_address,
            };

            const month = CALENDAR_EVENT.startDate.toLocaleString("default", {
              month: "long",
            });

            const year = CALENDAR_EVENT.startDate.getFullYear();

            return (
              <li key={event.id}>
                <div className="lg:h-10 h-20 w-full lg:px-4 px-2 grid lg:grid-cols-6 grid-cols-4 lg:items-center lg:text-xl text-l leading-5  mb-2">
                  <div className="col-span-2">
                    <a
                      className="lg:hover:underline lg:font-normal font-medium md:text-base"
                      target={"_blank"}
                      href={event.event_link}
                      onClick={() => trackEventLinkClicked(event.event_title)}
                      rel="noreferrer"
                    >
                      {event.event_title}
                    </a>
                  </div>
                  <div className="lg:block hidden">
                    {event.meetup_type == "To be Finalized" ? (
                      ""
                    ) : (
                      <AddToCalendarButton
                        calendarEvent={CALENDAR_EVENT}
                        buttonText={"Add to Calendar"}
                      />
                    )}
                  </div>
                  {/* https://codesandbox.io/s/8g6dl?file=/src/AddToCalendarButton/AddToCalendarButton.tsx:0-911 */}

                  <div className="items-center lg:flex hidden text-base">
                    <img
                      className="h-4 w-4 mr-2 rounded-full"
                      src={`/images/flags/${event.event_country.toLowerCase()}.svg`}
                      alt=""
                      variant="flag"
                    ></img>
                    <p className="lg:block hidden">{event.event_city}</p>
                  </div>
                  <p className="lg:block hidden text-base">
                    {event.meetup_type}
                  </p>
                  {event.meetup_type == "To be Finalized" ? (
                    <p className="lg:block hidden">
                      {month} {year}
                    </p>
                  ) : (
                    <p className="lg:block hidden text-base">
                      {event.event_date}
                    </p>
                  )}

                  <div className="lg:hidden text-l  flex justify-end col-span-2">
                    {" "}
                    {event.meetup_type == "To be Finalized" ? (
                      <p className="block lg:hidden text-s">To be Finalized</p>
                    ) : (
                      <AddToCalendarButton
                        calendarEvent={CALENDAR_EVENT}
                        buttonText={event.event_local_date}
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
        <div className="bg-descigrey w-full mt-5 pr-4 pl-4 h-10 grid grid-cols-6 items-center text-lg">
          <div className="col-span-3">PREVIOUS</div>
          <div>LOCATION</div>
          <div>TYPE</div>
          <div className="">DATE</div>
        </div>
        <div className="pt-4 pb-4">
          <ul>
            <div className="pt-4 pb-4 text-descigreyfont">
              <ul>
                {shownPastEvents.map((event) => {
                  return (
                    <li key={event.id}>
                      <div className="h-10 w-full pr-4 pl-4 grid grid-cols-6 items-center">
                        <div className="col-span-3">
                          <a
                            className="hover:underline "
                            target={"_blank"}
                            href={event.event_link}
                            rel="noreferrer"
                          >
                            {event.event_title}
                          </a>
                        </div>
                        <div className="flex items-center grayscale">
                          <img
                            className="h-4 w-4 mr-2 rounded-full"
                            src={`/images/flags/${event.event_country.toLowerCase()}.svg`}
                            alt=""
                            variant="flag"
                          ></img>
                          <p>{event.event_city}</p>
                        </div>
                        <p className="text-base">{event.meetup_type}</p>
                        <p className="text-base">{event.event_date}</p>
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
      <EmailandEventCalForm />
    </section>
  );
}

export default AllEventsSection;
