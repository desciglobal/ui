
import classes from "./event-list-heading.module.css";

function EventListHeading(props) {

  return (
    <div className={classes.wrapper}>
    <h2 className={classes.eventheading}>{props.EventCount} {props.text}</h2>
    </div>
  );
}

export default EventListHeading;
