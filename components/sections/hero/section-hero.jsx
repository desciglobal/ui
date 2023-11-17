import ArrowDownRight from "../../icons/ArrowUpRight";
import Backdrop from "../../modal/Backdrop";
import ModalSubmitMail from "../../modal/ModalSubmitMail";
import { MixpanelTracking } from "../../../lib/mixpanel";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";

function HeroSection() {
  const [emailIsOpen, setEmailisOpen] = useState(false);

  function openEmailHandler() {
    setEmailisOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeEmailHandler() {
    setEmailisOpen(false);
    document.body.style.overflow = "scroll";
  }

  function trackCalendarSubscribed() {
    MixpanelTracking.getInstance().calendarSubscribed("hero");
  }

  return (
    <section>
      <div className=" lg:px-4 pl-2 pr-2 lg:h-screen">
        <div className="">
          <div className=" lg:h-auto lg:min-w-[100%] ">
            <Image src="/images/hero-bg.png" alt="" width={1600} height={140}></Image>

            {/* */}
          </div>
        </div>
        <div className="lg:h-2/5">
          <div className="lg:grid grid-cols-3 gap-0 h-full">
            <div className="col-span-2 flex items-center pr-1.5 py-4">
              <p className="lg:text-2xl font-normal">
                Desci.global provides you an calendar overview of upcoming and
                past descentralized science events. You can add events to your
                calendar and submit your own event. Join this schelling point to
                help extend DeSci to the ends of the globe.{" "}
              </p>
            </div>
            <div className="lg:bg-black lg:text-white lg:ml-2 flex items-center  pb-10">
              <ul className="w-full lg:mt-6 mt-2">
                <li>
                  <Link
                    className="w-full flex flex-row group/edit  hover:bg-white hover:text-black ease-in duration-200 hover:cursor-pointer"
                    href="/submit-event"
                  >
                    <div className="w-full lg:text-xl lg:font-normal font-semibold border-solid lg:border-white lg:p-2 py-2 border-t">
                      <href>Submit an Event</href>
                    </div>
                    <div className="w-12 h-12 ml-2 bg-desciblue flex items-center justify-center">
                      <div className="lg:group-hover/edit:rotate-45 duration-200">
                        {" "}
                        <ArrowDownRight color="white" />{" "}
                      </div>
                    </div>
                  </Link>
                </li>
                <li
                  className="w-full flex flex-row group/edit hover:bg-white hover:text-black ease-in duration-200 hover:cursor-pointer"
                  onClick={openEmailHandler}
                >
                  <div className="w-full lg:text-xl lg:font-normal font-semibold border-solid lg:border-white lg:p-2 py-2 border-t border-b ">
                    <href>Subscribe to future events</href>
                  </div>
                  <div className="w-12 h-12 ml-2 bg-descired flex items-center justify-center">
                    <div className="lg:group-hover/edit:rotate-45 duration-200">
                      {" "}
                      <ArrowDownRight color="white" />{" "}
                    </div>
                  </div>
                </li>
                <li className="w-full flex flex-row group/edit hover:bg-white hover:text-black ease-in duration-200 hover:cursor-pointer">
                  <div className="w-full lg:text-xl lg:font-normal font-semibold border-solid lg:border-white lg:p-2 py-2 border-b">
                    <a
                      href="https://calendar.google.com/calendar/u/0/r?cid=3lql6qf1smr21uaf4kb7hdfg8btdq6v2@import.calendar.google.com"
                      target="_blank"
                      onClick={trackCalendarSubscribed}
                      rel="noreferrer"
                    >
                      Subscribe to event calendar
                    </a>
                  </div>
                  <div className="w-12 h-12 ml-2 bg-black flex items-center justify-center">
                    <div className="lg:group-hover/edit:rotate-45 duration-200">
                      {" "}
                      <ArrowDownRight color="white" />
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {emailIsOpen && <ModalSubmitMail onClick={closeEmailHandler} />}
      {emailIsOpen && <Backdrop onClick={closeEmailHandler} />}
    </section>
  );
}

export default HeroSection;
