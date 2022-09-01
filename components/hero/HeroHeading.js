import classes from "./hero.module.css";

function HeroHeading(props) {
  return (
    <>
        <h1 className={classes.heading}>{props.headingText}</h1>
    </>
  );
}

export default HeroHeading;
