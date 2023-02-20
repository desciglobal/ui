function Banner() {
  return (
    <div className="m-4 p-4 h-10  bg-[#FBC540] flex justify-center items-center">
      <p>Meet us in Denver on the 28th at</p>
      <a
        href="https://better-waste-5eb.notion.site/DAOs-in-DeSci-c74106dd70464133b2b095e68c573879"
        target={"blank"}
        className="font-semibold mx-1"
      >
        {" "}
        DAOs in DeSci 
      </a>
      <p>and join the </p>

      <a
        href="https://t.me/+z7KKTKvhvdVmZGZi"
        target={"blank"}
        className="font-semibold mx-1"
      >
        {" "}
        BioXYZ Telegram Chat
      </a>
    </div>
  );
}

export default Banner;
