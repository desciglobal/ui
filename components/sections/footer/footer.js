import Image from "next/image";

function Footer() {
  return (
    <footer>
      <div className="h-[40vh] flex">
        <div className="h-full w-full bg-footer bg-no-repeat bg-cover lg:flex hidden items-end">
          <div className="lg:flex w-full h-24 relative justify-between items-end bottom-20">
            <div className="bg-black h-full w-[60%] flex pl-20 ">
              <Image
                src="/images/desci-global-logo.svg"
                alt="desci global logo"
                width="140"
                height="140"
              />
            </div>
            <div className="bg-white h-[60%] w-[20%]"></div>
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-end">
          <div className=" h-full w-full flex lg:flex-row flex-col lg:pl-0 pl-2">
            <div className="h-full min-w-[50%] flex items-center lg:justify-end  lg:pb-0 pb-5">
              <ul className="flex flex-col lg:items-end text-lg">
                <li>
                  <a href="" target="_blank" rel={"noreferrer"}>
                    about
                  </a>
                </li>
                <li>
                  <a
                    href="https://molecule.to/"
                    target="_blank"
                    rel={"noreferrer"}
                  >
                    molecule
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel={"noreferrer"}>
                    about
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel={"noreferrer"}>
                    faq
                  </a>
                </li>
              </ul>
            </div>
            <div className="h-full w-full flex items-center lg:justify-end text-lg pr-[8%] lg:pb-0 pb-5 ">
              <ul className="flex flex-col lg:items-end text-lg lg:pb-0 pb-5 ">
                <li>
                  <a
                    href="https://twitter.com/desci_global"
                    target="_blank"
                    rel={"noreferrer"}
                  >
                    twitter
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel={"noreferrer"}>
                    instagram
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel={"noreferrer"}>
                    privacy policy
                  </a>
                </li>
                <li>
                  <a href="" target="_blank" rel={"noreferrer"}>
                    terms & conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex w-full h-24 justify-between lg:text-lg text-sm lg:items-end mb-20">
            <div className="bg-black h-[100%] w-[50%] flex  items-center pl-4 text-white">
              Copyright 2022 Desci.Global ©
            </div>
            <div className="bg-white h-[100%] w-[50%] flex items-center justify-end  lg:pl-0 pl-10 pr-[8%]">
              <a
                href="https://molecule.to/"
                target="_blank"
                rel={"noreferrer"}
              >
                Initiated by Molecule
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
