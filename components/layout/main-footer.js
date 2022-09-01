import classes from "./main-footer.module.css";

function MainFooter() {
  return (
    <footer className={classes.footer}>
    <p>Made and maintained with 💙 by <a style={{fontWeight: "bold"}}href="molecule.to"> Molecule. </a></p>
    </footer>
  );
}

export default MainFooter;