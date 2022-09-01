import classes from "./hero.module.css";
import Announcements from "./announcements";

function Hero() {
    return <>
      <Announcements/>
      <div className={classes.wrapper}>
        <h1 className={classes.heading}>Upcoming Desci Events</h1>
        <p className={classes.paragraph}>
          This is the repo for the desci.global website, a resource for the
          DeSci community. The purpose of the site is to “Be the best overview
          of decentralized science events for our growing global community".
          desci.global is kept up to date by community members who submit
          upcoming events. If you are interested to support, you can make a
          pull request here or submit a desci event via this form.
      </p>
    </div>
  </>
}

export default Hero;
