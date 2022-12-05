import Image from "next/image";

function ResourcesSectionThree() {
  return (
    <section className="mt-40">
      <h2 className="lg:text-4xl text-2xl pb-10 lg:ml-4 ml-2 ">Resources</h2>
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className=" h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="/images/resources-1.png"
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Overview
            </h2>
            <p className="text-base leading-relaxed mt-2">
              Explore this summary of decentralized science to better understand
              what this movement is about.
            </p>
            <a className="text-desciblue inline-flex items-center mt-3" href="https://ethereum.org/en/desci/" target="_blank">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="/images/resources-2.png"
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Community
            </h2>
            <p className="text-base leading-relaxed mt-2">
              Join the Blockchain for Science community to stay connected with
              others.
            </p>
            <a className="text-desciblue inline-flex items-center mt-3" href="https://t.me/BlockchainForScience" target="_blank">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="/images/resources-3.jpg"
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
              Working Group
            </h2>
            <p className="text-base leading-relaxed mt-2">
              DeSci WG - Check out this working group to get the most up to date
              alpha on what’s happening across the DeSci ecosystem.
            </p>
            <a className="text-desciblue inline-flex items-center mt-3" href="https://t.me/BlockchainForScience" target="_blank">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
          <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
            <div className="h-64 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full"
                src="images/resources-4.jpg"
              />
            </div>
            <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
            Landscape
            </h2>
            <p className="text-base leading-relaxed mt-2">
            Explore all of the organizations and sectors that make up the DeSci space.
            </p>
            <a className="text-desciblue inline-flex items-center mt-3" href="https://twitter.com/UltraRareBio/status/1580988333693730821?s=20&t=9eCaWimS9cyzpc-dn4N6GQ" target="_blank">
              Learn More
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ResourcesSectionThree;
