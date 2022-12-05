import Image from "next/image";
import VideoIcon from "../../icons/VideoIcon";
import { getVideos } from "../../../DATA-video";

function VideoSection() {
  const videos = getVideos();



  return (
    <section className="my-40">
      <div className="h-[100vh] mb-16 flex items-center justify-center">
        <div className="h-[100%] lg:w-[74%] p-2 ">
          <h2 className="lg:text-4xl text-2xl text-black pt-5 min-h-[15%]">Videos</h2>
          <div className="grid grid-rows-2 grid-cols-2 lg:gap-10 gap-2 h-[85%] border border-white">
            <div>
              <a href={videos[0].link} target={"_blank"}>
                <div className=" lg:h-[80%] h-32  relative group/video">
                  <Image
                    src={videos[0].image}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="lg:w-12 lg:h-12  w-8 h-8 lg:right-4 lg:bottom-4 bottom-2 right-2 flex items-center justify-center absolute group-hover/video:scale-105 transition">
                    <VideoIcon />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="w-full">
                    <h3 className="lg:text-xl leading-5">{videos[0].title}</h3>
                  </div>
                  <div className="lg:block  pt-1 lg:text-base text-xs w-full">
                    <p className="text">
                      {videos[0].description.substring(0, 100) + "..."}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div>
              <a href={videos[1].link} target={"_blank"}>
                <div className=" lg:h-[80%] h-32 relative group/video">
                  <Image
                    src={videos[1].image}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="lg:w-12 lg:h-12  w-8 h-8 lg:right-4 lg:bottom-4 bottom-2 right-2 flex items-center justify-center absolute group-hover/video:scale-105 transition">
                    <VideoIcon />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="w-full">
                    <h3 className="lg:text-xl leading-5">{videos[1].title}</h3>
                  </div>
                  <div className="lg:block  pt-1 lg:text-base text-xs w-full">
                    <p className="text">
                      {videos[1].description.substring(0, 100) + "..."}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div>
              <a href={videos[2].link} target={"_blank"}>
                <div className=" lg:h-[80%] h-32 relative group/video">
                  <Image
                    src={videos[2].image}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="lg:w-12 lg:h-12  w-8 h-8 lg:right-4 lg:bottom-4 bottom-2 right-2 flex items-center justify-center absolute group-hover/video:scale-105 transition">
                    <VideoIcon />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="w-full">
                    <h3 className="lg:text-xl leading-5">{videos[2].title}</h3>
                  </div>
                  <div className="lg:block  pt-1 lg:text-base text-xs w-full">
                    <p className="text">
                      {videos[2].description.substring(0, 100) + "..."}
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div>
            <a href={videos[3].link} target={"_blank"}>
                <div className=" lg:h-[80%] h-32 relative group/video">
                  <Image
                    src={videos[3].image}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="lg:w-12 lg:h-12  w-8 h-8 lg:right-4 lg:bottom-4 bottom-2 right-2 flex items-center justify-center absolute group-hover/video:scale-105 transition">
                    <VideoIcon />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="w-full">
                    <h3 className="lg:text-xl leading-5">{videos[3].title}</h3>
                  </div>
                  <div className="lg:block  pt-1 lg:text-base text-xs w-full ">
                    <p className="text">
                      {videos[3].description.substring(0, 100) + "..."}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
