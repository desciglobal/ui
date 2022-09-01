import Link from "next/link";
import classes from './main-header.module.css';

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img className={classes.img}
          src={"images/desci-global-logo.svg"}
          alt="desci-global-logo"
        />
        <Link href="/">Desci.Global</Link>
      </div>
    </header>
  );
}

export default MainHeader;
