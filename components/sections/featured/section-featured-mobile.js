import defaultEventImage from "./../../../public/images/featured-bg.png";

function FeaturedSectionMobile(props) {
  const { featuredEvents } = props;

  return (
    <section className="lg:hidden">
      <div className="px-2">
        <div className="">
          <div className="h-20 flex items-center">
            <p id="highlights" className="text-xl text-black">
              Highlighted this week
            </p>
          </div>
          <div
            className="bg-no-repeat h-[20rem] bg-contain bg-center flex justify-end"
            style={{
              backgroundImage: `url(${
                featuredEvents[0].eventImage
                  ? (featuredEvents[0].eventImageFile && featuredEvents[0].eventImageFile[0].url) || defaultEventImage.src
                  : defaultEventImage.src
              })`,
            }}
          ></div>
          <div className="flex w-full space-x-4 text-2xl my-5 items-center">
            <p>{featuredEvents[0].eventTitle}</p>
          </div>
          <div className="pt-2 pb-2">
            <p className="lg:text-lg">{featuredEvents[0].eventDescritpion}</p>
          </div>
          <div>
            <div className="lg:w-full w-[] bg-black text-white lg:h-10 h-8 flex items-center my-8 justify-center rounded-full text-xl">
              <a
                href={featuredEvents[0].eventLink}
                target={"_blank"}
                rel="noreferrer"
              >
                Event Website
              </a>
            </div>
            <div className="">
              <ul>
                <li>
                  <div className="h-10 border-solid border-t border-black flex items-center justify-between">
                    <p>Location</p>
                    <div className="flex">
                      <img
                        className="h-5 w-5 mr-2 rounded-full"
                        src={`/images/flags/${featuredEvents[0].eventCountry.toLowerCase()}.svg`}
                        alt=""
                        variant="flag"
                      ></img>
                      <p>{featuredEvents[0].eventCity}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="h-10 border-solid border-t border-black flex items-center justify-between">
                    <p>Date</p>
                    <date>{featuredEvents[0].eventDateConverted}</date>
                  </div>
                </li>
                <li>
                  <div className="h-10 border-solid border-t border-b border-black flex items-center justify-between">
                    <p>Type</p>
                    <p>{featuredEvents[0].meetupType}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedSectionMobile;
