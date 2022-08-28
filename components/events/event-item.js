import Button from "../ui/button";
import classes from "./event-item.module.css";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Link from 'next/link';

function EventItem(props) {
  const { title, image, date, location, id, link } = props;
  const humanReadableDate = new Date(date).toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = location.replace(", ", "\n");
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <div className={classes.positioninga}>
      <img src={"/" + image} alt={title} />
          <h2>{title}</h2>
          </div>

        <div className={classes.positioningb}>
        <div className={classes.date}>
          <time>{humanReadableDate}</time>
        </div>
        <div className={classes.actions}>
          <Button link={link}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
