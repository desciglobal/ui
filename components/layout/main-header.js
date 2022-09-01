import Link from "next/link";
import classes from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <img
          className={classes.img}
          src={"images/desci-global-logo.svg"}
          alt="desci-global-logo"
        />
        <Link href="/">Desci.Global</Link>
      </div>
      <div className={classes.logo}>
        <a
          target="_blank"
          href="https://github.com/moleculeprotocol/desciglobal"
        >
          <img
            className={classes.img}
            src={"images/github.png"}
            alt="github-log"
          />
        </a>
      </div>
    </header>
  );
}

export default MainHeader;
