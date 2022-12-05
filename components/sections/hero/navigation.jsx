function Navigation() {
  return (
    <nav>
      <div class="lg:grid grid-col-6 grid-flow-col gap-4 h-5 items-center text-sm hidden ">
        <div></div>
        <div className="flex justify-center">
          <a className="ml-4 hover:bg-black hover:text-white hover:ease-in duration-100 p-2" href="#events">
            Events
          </a>
          <a className="ml-4 hover:bg-black hover:text-white hover:ease-in duration-100 p-2" href="#resources">
            Resources
          </a>
          <a className="ml-4 hover:bg-black hover:text-white hover:ease-in duration-100 p-2" href="#partners">
            Bounties
          </a>
        </div>
        <div></div>
        <div></div>
        <div>
          <div>
            <a className="ml-4 hover:bg-black hover:text-white hover:ease-in duration-100 p-2" href="#contribute">
              Contributions
            </a>
          </div>
        </div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navigation;
