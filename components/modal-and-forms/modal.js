
function Modal(props) {
  

  return (
    <div
      className="bg-white p-4 lg:flex flex-col items-center calc w-[30rem] z-40 fixed top-[5vh] shadow-white-500/50 "
      id="modal"
    >
 
      <div className="h-full w-full">
      {props.children}
      </div>
      </div>

  );
}

export default Modal;
