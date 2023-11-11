import Link from "next/link";

function HeaderForm() {
  const logoUrl = "/images/desci-global-white-logo.png";

  return (
    <div className="flex justify-between items-center w-full bg-white h-[4rem]">
      <div className="flex justify-start pl-10">
        <img
          src={logoUrl}
          alt="DAO Logo"
          width={200}
          height={50} // Adjust the height to maintain aspect ratio if needed
        />
      </div>
      <div className="flex justify-end pr-10">
        <Link
          className="text-desciblue inline-flex items-center hover:underline"
          href="/"
        >
          Events
        </Link>{" "}
      </div>
    </div>
  );
}

export default HeaderForm;
