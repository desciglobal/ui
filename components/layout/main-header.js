import Link from "next/link";

import classes from './main-header.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
      <img className={classes.img} src={"images/desci-global-logo.svg"} alt="desci-global-logo" />
        <Link href="/">Desci.Global</Link>
      </div>
      <nav className={classes.navigation}>
        <ul>
          <li><Link href='/events'>Browse all Events</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
