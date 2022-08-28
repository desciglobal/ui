import classes from "./announcements.module.css";
import ArrowUpRighIcon from "../icons/arrow-up-right-icon";



function Announcements() {
    return <div className={classes.announcement}>
        <p>publish events and contribute to the <a className={classes.link} href="https://github.com/moleculeprotocol/desciglobal">desci.global github <span className={classes.icon}><ArrowUpRighIcon/></span></a></p>
        </div>
}


export default Announcements;