import Image from "next/image";

import { getAllContributors } from "../../../DATA-contributor.js";

function ContributorsSection() {
  const contributors = getAllContributors();

  return (
    <section className="pb-20 lg:mt-0 mt-20">
      <div className="lg:p-4 p-2 flex">
        <div className="lg:w-2/4 lg:h-[70%] flex flex-col justify-between">
          <h2 className="lg:text-4xl text-2xl pb-10">Contribute</h2>
          <p className="lg:text-lg">
            Contribute to this global movement to uplift the DeSci Ecosystem
            through connection, events, and resources. Whether you’d be an
            amazing Github maintainer, event curator, fiscal or in kind sponsor,
            or regional connector, your skillsets can make a massive impact.
            Let’s shift the world together.
          </p>
        </div>
      </div>
      <ul>
        <div className="flex flex-wrap  lg:justify-start justify-center lg:mt-0 mt-8 lg:p-4">
          {contributors.map((contributor) => (
            <li className="mr-4 mb-4" key={contributor.id}>
              <a
                href={contributor.twitterLink}
                target="_blank"
                rel={"noreferrer"}
              >
                <div className="grid h-40 w-40">
                  <div className=" h-[100%] relative grayscale">
                    <Image
                      alt={contributor.name}
                      src={contributor.image}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="bg-black hidden absolute h-40 w-40 z-1 opacity-0 text-white items-center lg:flex justify-center lg:hover:opacity-80 ease-in duration-100">
                    {contributor.twitter}
                  </div>
                  
                </div>
                <div className="flex items-center justify-center">{contributor.name}</div>
              </a>
            </li>
          ))}
        </div>
      </ul>
    </section>
  );
}

export default ContributorsSection;
