import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import RoundArrowLeft from "../../icons/RoundArrowLeft";
import RoundArrowRight from "../../icons/RoundArrowRight";
import { MixpanelTracking } from "../../../lib/mixpanel";
import Image from "next/image";

function trackEventLinkClicked(eventName) {
  MixpanelTracking.getInstance().eventLinkClicked(eventName);
}

export default class withCustomStatusArrowsAndIndicators extends Component {
  render() {
    const { featuredEvents } = this.props;

    const carouselProp = {
      showStatus: true,
      useKeyboardArrows: true,
      infiniteLoop: true,
      autoPlay: false,
      stopOnHover: true,
      emulateTouch: false,
      transitionTime: 500,
      showThumbs: false,
      showArrows: false,
      selectedItem: 0,
      renderIndicator: (clickHandler, isSelected, index) => {
        if (isSelected == true) {
          return (
            <div>
              <div
                className="space-x-4 text-2xl h-10 flex items-center cursor-pointer text-[#0A22F5] leading-6	text-left"
                onClick={clickHandler}
              >
                <p className="break-words">
                  {featuredEvents[index].eventTitle}
                </p>
              </div>
            </div>
          );
        }
        if (isSelected == false) {
          return (
            <div>
              <div
                className="space-x-4 text flex items-center h-10 cursor-pointer text-[#464646ae] max-w-[15rem] leading-5	text-left"
                onClick={clickHandler}
              >
                <div className="h-6 w-6 hover:scale-110 duration-100 ">
                  <Image
                    src="/images/global.svg"
                    className="rounded-full"
                    alt=""
                    width={10}
                    height={10}
                  ></Image>
                </div>
              </div>
            </div>
          );
        }
      },

      renderArrowPrev: (clickHandler, hasPrev, label) => {
        return (
          <span className="arrow-left cursor-pointer" onClick={clickHandler}>
            <RoundArrowLeft />
          </span>
        );
      },
      renderArrowNext: (clickHandler, hasNext, label) => {
        return (
          <span className="arrow-right cursor-pointer" onClick={clickHandler}>
            <RoundArrowRight />
          </span>
        );
      },
    };

    return (
      <div>
        <Carousel {...carouselProp}>
          {featuredEvents.map((e) => (
            <div
              className="pl-4 min-h-[38rem] w-full lg:flex hidden"
              key={e.id}
            >
              <div className="w-2/4 pr-4 flex flex-col justify-between">
                <div className="h-20 flex items-center">
                  <p className="text-4xl text-black">Featured Events</p>
                </div>
                <div className="pt-2 pb-2 text-left text-descigreyfont absolute w-[45vw] top-[34%]">
                  <p className="text-l ">
                    {e.eventDescription.length > 600 ? (
                      <>{e.eventDescription.substring(0, 600) + "..."}</>
                    ) : (
                      <>{e.eventDescription}</>
                    )}
                  </p>
                </div>
                <div>
                  <div className="w-full bg-black text-white h-10 flex items-center justify-center rounded-full text-xl mb-6 hover:bg-descigreyfont hover:text-white cursor-pointer ">
                    <a
                      href={e.eventLink}
                      target={"_blank"}
                      onClick={() => trackEventLinkClicked(e.eventTitle)}
                      rel="noreferrer"
                    >
                      Event Website
                    </a>
                  </div>
                  <div className="pt-3">
                    <ul>
                      <li>
                        <div className="h-10 border-solid border-t border-black flex items-center justify-between">
                          <p>Location</p>
                          <p>{e.fullAddress}</p>
                        </div>
                      </li>
                      <li>
                        <div className="h-10 border-solid border-t border-black flex items-center justify-between">
                          <p>Date</p>
                          <div>{e.eventDateConverted}</div>
                        </div>
                      </li>
                      <li>
                        <div className="h-10 border-solid border-t border-b border-black flex items-center justify-between">
                          <p>Type</p>
                          <p>{e.meetupType}</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div
                className="w-2/4 bg-no-repeat bg-cover bg-center flex justify-end"
                style={{
                  backgroundImage: `url(${
                    (e.eventImageFile && e.eventImageFile.url) ||
                    e.eventImageFile ||
                    "/images/featured-bg.png"
                  })`,
                }}
              ></div>
            </div>
          ))}
        </Carousel>
      </div>
    );
  }
}
