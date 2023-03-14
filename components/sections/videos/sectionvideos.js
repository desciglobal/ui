import Image from "next/image";

function VideoSection() {
  return (
    <section className="my-40 px-4" id="videos">
      <h2 className="lg:text-4xl text-2xl mb-4 lg:mb-10">Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 container mx-auto">
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/qtBsL90-J_4"
            title="Vitalik Buterin on Decentralized Science, Aging, AI and Scientific Progress"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/5ORvbCIW39o"
            title="FSS #5 The DeSci Movement with Juan Benet"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src="/images/videos/desciboston.png"
            alt="DeSci Boston"
            width={756}
            height={425}
          />
          <div className="w-full h-min text-lg leading-5 bg-gradient-to-b from-black/75 to-transparent p-5 text-white whitespace-nowrap">
            <span className="mr-2">DeSci Boston @ MIT</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 inline-block align-text-bottom"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </div>
          <a
            href="https://web.mit.edu/webcast/bitcoin-22/1/"
            target="_blank"
            className="absolute w-full h-full"
            rel="noreferrer"
          />
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLYCWARA8YNdpVj31TutmnxptlK8Wy7O6D"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          />
        </div>
      </div>
    </section>
  );
}

export default VideoSection;
