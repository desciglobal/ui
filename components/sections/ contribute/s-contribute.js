import ArrowUpRight from "../../icons/ArrowUpRight";
import Backdrop from "../../modal-and-forms/backdrop";
import ModalSubmitEvent from "../../modal-and-forms/modal-submit-event";
import ModalSubmitMail from "../../modal-and-forms/modal-submit-mail";
import { useState } from "react";

function ContributeSection() {
  const [modalIsOpen, setModalisOpen] = useState(false);
  const [emailIsOpen, setEmailisOpen] = useState(false);

  function openModalHandler() {
    setModalisOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModalHandler() {
    setModalisOpen(false);
    document.body.style.overflow = "scroll";
  }

  function openEmailHandler() {
    setEmailisOpen(true);
    document.body.style.overflow = "hidden";
  }
  function closeEmailHandler() {
    setEmailisOpen(false);
    document.body.style.overflow = "scroll";
  }

  return (
    <section id="contribute">
      <div className="flex lg:flex-row flex-col items-top justify-center lg:px-4 px-2 lg:py-20 lg:space-x-20">
        <div className="w-full h-full bg-white">
          {" "}
          <div className="h-20  flex items-center">
            <h2 className="text-2xl text-black">Organize an Event</h2>
          </div>
          <div className="pt-2 pb-6 h-[10.7rem]">
            <p className="lg:text-lg text-descigreyfont">
              Be part of the movement to extend DeSci to your region. Whether
              it’s a one off networking event or a multi-day conference you are
              in a position to bring DeSci to your city.
            </p>
          </div>
          <div>
            <div
              onClick={openModalHandler}
              className="w-full hover:cursor-pointer bg-black text-white h-10 flex items-center justify-center rounded-full lg:text-xl text-lg mb-6"
            >
              <a>Submit an Event</a>
            </div>
            <div className="pt-3">
              <ul>
                <li>
                  <div className="flex w-full group/edit hover:cursor-pointer">
                    <a
                      href={"https://www.desci.berlin/"}
                      target={"_blank"}
                      className="h-10 border-solid border-t w-full border-black flex items-center justify-between"
                    >
                      <p>Inspiration for a Conference</p>

                      <div className="w-10 h-10 ml-2 bg-desciblue flex items-center justify-center">
                        <div className="group-hover/edit:rotate-45 duration-200">
                          <ArrowUpRight color="white" />
                        </div>
                      </div>
                    </a>
                  </div>
                </li>
                <div className="flex w-full group/edit hover:cursor-pointer">
                  <a
                    href="https://twitter.com/Molecule_dao/status/1586003432909033472?s=20&t=b66BvJaQjIP5_bHK20ucAg"
                    target={"_blank"}
                    className="h-10 border-solid border-t w-full border-black flex items-center justify-between"
                  >
                    <p>Inspiration for Workshops</p>

                    <div className="w-10 h-10 ml-2 bg-descired flex items-center justify-center">
                      <div className="group-hover/edit:rotate-45 duration-200">
                        <ArrowUpRight color="white" />
                      </div>
                    </div>
                  </a>
                </div>
                <li>
                  <div className="flex w-full group/edit hover:cursor-pointer">
                    <a
                      href="https://www.meetup.com/desci-london/"
                      target={"_blank"}
                      className="h-10 border-solid border-t border-b w-full border-black flex items-center justify-between"
                    >
                      <p>Inspiration for Events</p>

                      <div className="w-10 h-10 ml-2 bg-black flex items-center justify-center">
                        <div className="group-hover/edit:rotate-45 duration-200">
                          <ArrowUpRight color="white" />
                        </div>
                      </div>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full h-full bg-white lg:mt-0 mt-20 ">
          <div className="h-20 flex items-center">
            <h2 className="text-2xl text-black">Learn more about DeSci</h2>
          </div>
          <div className="pt-2 pb-6">
            <p className="lg:text-lg text-descigreyfont">
              DeSci (decentralized science) is an ecosystem of scientists,
              builders, and supporters laying a new foundation of incentive
              mechanisms to shift the future of scientific discovery. It’s
              building towards a future where new and unconventional ideas can
              flourish by decentralizing access to funding, scientific tools,
              and communication channels based in transparency, resiliency, and
              accessibility.
            </p>
          </div>
          <div>
            <div className="w-full bg-black text-white h-10 flex items-center justify-center rounded-full lg:text-xl text-lg mb-6">
              <a ahref="https://ethereum.org/en/desci/" target="_blank">
                Learn More
              </a>
            </div>
            <div className="pt-3">
              <ul>
                <li>
                  <div
                    className="flex w-full group/edit hover:cursor-pointer"
                    onClick={openModalHandler}
                  >
                    <div className="h-10 border-solid border-t w-full border-black flex items-center justify-between">
                      <p>Create an Event</p>
                    </div>
                    <div className="w-10 h-10 ml-2 bg-desciblue flex items-center justify-center">
                      <div className="group-hover/edit:rotate-45 duration-200">
                        <ArrowUpRight color="white" />
                      </div>
                    </div>
                  </div>
                </li>
                <div className="flex w-full group/edit hover:cursor-pointer">
                  <a
                    href="https://t.me/BlockchainForScience"
                    target={"_blank"}
                    className="h-10 border-solid border-t w-full border-black flex items-center justify-between"
                  >
                    <div>Telegram Group link</div>


                    <div className="w-10 h-10 ml-2 bg-descired flex items-center justify-center">
                      <div className="group-hover/edit:rotate-45 duration-200">
                        <ArrowUpRight color="white" />
                      </div>
                    </div>
                  </a>
                </div>
                <li>
                  <div
                    className="flex w-full group/edit hover:cursor-pointer"
                    onClick={openEmailHandler}
                  >
                    <div className="h-10 border-solid border-t border-b w-full border-black flex items-center justify-between">
                      <p>Get in touch with our team</p>
                    </div>
                    <div className="w-10 h-10 ml-2 bg-black flex items-center justify-center">
                      <div className="group-hover/edit:rotate-45 duration-200">
                        <ArrowUpRight color="white" />
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {emailIsOpen && <ModalSubmitMail />}
      {emailIsOpen && <Backdrop onClick={closeEmailHandler} />}
      {modalIsOpen && <ModalSubmitEvent onClick={closeModalHandler} closeModal={closeModalHandler}/>}
      {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
    </section>
  );
}

export default ContributeSection;
