import { useState } from "react";
import Logo from "../../Icons/Logo";
import Link from "next/link";

function Navigation() {
  const [isMenuOn, setIsMenuOn] = useState(false);
  const toggleMenu = (x) => setIsMenuOn(!isMenuOn);
  // trigger redeploy


  return (
    <nav className="sticky top-0 bg-white h-9 z-30">
      <div className="lg:grid grid-col-6 grid-flow-col gap-4 h-5 items-center text-sm hidden ">
        <div className="h-full w-full pl-4">
          <Logo />
        </div>
        <div className="flex justify-center">
          <a
            className="ml-4 hover:bg-black hover:text-white hover:ease-in duration-100 p-2"
            href="#events"
          >
            Events
          </a>
          <a
            className="ml-4 hover:bg-black hover:text-white hover:ease-in duration-100 p-2"
            href="#resources"
          >
            Resources
          </a>
          <a
            className="ml-4 hover:bg-black hover:text-white hover:ease-in duration-100 p-2"
            href="#videos"
          >
            Videos
          </a>
        </div>
        <div></div>
        <div></div>
        <div>
          <div>
            <Link
              href="/submit-event"
              className="ml-4 bg-desciblue hover:bg-black text-white hover:ease-in duration-100 p-2"
            >
              Submit Event!
            </Link>
          </div>
        </div>
      </div>
      <div className="lg:hidden flex justify-between items-center">
        <Logo />
        <button className="mr-2" onClick={toggleMenu}>
          Menu
        </button>
        {isMenuOn && <Menu onToggle={toggleMenu} />}
      </div>
    </nav>
  );
}

function Menu({ onToggle }) {
  const goTo = (elementId) => () => {
    document.getElementById(elementId).scrollIntoView(true);
    onToggle();
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full bg-[#1231D5] text-lg overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <Logo />
        <button className="mr-2 text-white" onClick={onToggle}>
          Close -
        </button>
      </div>
      <div className="text-white/[.60]">
        <MenuItem
          subitems={
            <>
              <div onClick={goTo("highlights")} className="py-3 px-2">
                Highlighted this week
              </div>
              <div
                onClick={goTo("upcoming")}
                className="py-3 px-2 flex items-center"
              >
                Upcoming
                <div className="rounded-full bg-red-600 w-2.5 h-2.5 mx-2"></div>
              </div>
              <div onClick={goTo("contribute")} className="py-3 px-2">
                Submit new event
              </div>
            </>
          }
          onClick={goTo("events")}
        >
          Events
        </MenuItem>
        <MenuItem onClick={goTo("resources")}>Resources</MenuItem>
        <MenuItem onClick={goTo("contribute")}>Participate</MenuItem>
        <MenuItem onClick={goTo("contributors")}>Contributors</MenuItem>
        <MenuItem>Support</MenuItem>
      </div>
    </div>
  );
}

function MenuItem({ children, subitems, onClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/[.40] mx-2">
      <div className="flex justify-between items-center text-white">
        <div className="grow py-3" onClick={onClick}>
          {children}
        </div>
        {!!subitems && (
          <button className="pl-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "-" : "+"}
          </button>
        )}
      </div>
      {isOpen ? <div>{subitems}</div> : null}
    </div>
  );
}

export default Navigation;
