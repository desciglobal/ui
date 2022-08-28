import EventItem from "./event-item";

import classes from "./event-list.module.css";

function EventList(props) {
  const { items } = props;
  return (
    <div className={classes.container}>
    <ul className={classes.list}>
      {items.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          link={event.link}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
    </div>
  );
}

export default EventList;
