import Link from "next/link";
import classes from "./button.module.css";

export function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a target="_blank" className={classes.btn}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;