import { useState } from "react";
import Image from "next/image";

function ModalEventCalender(props) {
  const [isCopied, setIsCopied] = useState(false);
  const copyText =
    "https://airtable.com/shrIhTjQHeNcUbVUo/iCal?timeZone=Europe%2FLisbon&userLocale=en-gb";

  // This is the function we wrote earlier
  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="bg-white p-4 flex flex-col items-center calc w-[30rem] z-20 fixed top-[20vh] shadow-white-500/50">
      <div className="h-full w-full">
        <h2 className="text-4xl pt-4 pb-12">
          sync desci events to your calendar 📆
        </h2>
        <div>
          <p className="text-lg">
            Copy the URL below and sync desci.global events to your personal or
            work calendar.{" "}
            <a
              className="italic text-descigreyfont text-xs"
              href="https://support.airtable.com/docs/integrating-airtable-with-external-calendar-applications"
              target={"_blank"}
            >
              (Learn more here...)
            </a>
          </p>
        </div>
        <div className=" w-full bg-blue-200">
          <Image
            src="/images/calender.gif"
            alt="calendar"
            width={1670}
            height={798}
          />
        </div>
        <div className="flex flex-col my-5">
          {/* Bind our handler function to the onClick button property */}
          <button onClick={handleCopyClick}>
            <span>{isCopied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEventCalender;
