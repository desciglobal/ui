

function FeaturedSectionMobile(props) {
  const { featuredEvents } = props;



  return (
    <section className="lg:hidden">
      <div className="px-2">
        <div className="">
          <div className="h-20 flex items-center">
            <p className="text-xl text-black">Higlighted this week</p>
          </div>
          <div className=" bg-featured bg-no-repeat h-[20rem] bg-cover flex justify-end">
          </div>
          <div className="flex w-full space-x-4 text-2xl my-5 items-center">
            <p>{featuredEvents[0].event_title}</p>
          </div>
          <div className="pt-2 pb-2">
            <p className="lg:text-lg">
              {featuredEvents[0].event_description}
            </p>
          </div>
          <div>
            <div className="lg:w-full w-[] bg-black text-white lg:h-10 h-8 flex items-center my-8 justify-center rounded-full text-xl">
              <a href={featuredEvents[0].event_link} target={"_blank"}>Event Website</a>
            </div>
            <div className="">
              <ul>
                <li>
                  <div className="h-10 border-solid border-t border-black flex items-center justify-between">
                    <p>Location</p>
                    <div className="flex">
                      <img
                        className="h-5 w-5 mr-2 rounded-full"
                        src={`/images/flags/${featuredEvents[0].event_country.toLowerCase()}.svg`}
                        alt=""
                        variant="flag"
                      ></img>
                      <p>{featuredEvents[0].event_city}</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="h-10 border-solid border-t border-black flex items-center justify-between">
                    <p>Date</p>
                    <date>{featuredEvents[0].event_date}</date>
                  </div>
                </li>
                <li>
                  <div className="h-10 border-solid border-t border-b border-black flex items-center justify-between">
                    <p>Type</p>
                    <p>{featuredEvents[0].meetup_type}</p>
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
