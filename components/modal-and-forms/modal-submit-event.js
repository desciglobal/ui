import React, { useState, useEffect } from "react";
// import CountrySelector from "./CountrySelect";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LocationSearchInput from "./EventLocationInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { airtablePostEvent } from "../../services/airtable";
import { MixpanelTracking } from "../../services/mixpanel";

function ModalSubmitEvent(props) {
  const schema = yup
    .object({
      event_title: yup.string().required().max(80),
      contact_email: yup.string().required().email(),
      contact_name: yup.string().required().max(80),
      event_title: yup.string().required().max(80),
      event_link: yup.string().required(),
      event_description: yup.string().required(),
      event_date: yup.date().required(),
      event_end_date: yup.date().required(),
    })
    .required();

  const [latLng, setlatLng] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [address, setAddress] = useState("");

  const getAddress = (a) => {
    setAddress(a.address);
  };

  useEffect(() => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setlatLng(latLng));
  }, [address]);

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/timezone/json?location=${latLng.lat}%2C${latLng.lng}&timestamp=1331161200&key=AIzaSyB4IefstneiNw1cA3bTrhIXFti9IYfVP8A`
    )
      .then((response) => response.json())
      .then((r) => setTimeZone(r.timeZoneId));
    // .catch((error) => console.error("Error", error));
  }, [latLng]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // posting data to Airtable and catching errors
  const onSubmit = async (data) => {
    data.event_address = address;
    const date = new Date(data.event_date);
    data.event_date = date.toISOString();
    data.event_timezone = timeZone;
    // airtablePostEvent(data);

    try {
      await airtablePostEvent(data);
      MixpanelTracking.getInstance().eventSubmitted(data.event_title);
      alert("Your Event was submitted, you can close the modal now!");
    } catch (err) {
      alert(`Error submitting event to Airtable: ${err.message}`);
    }
  };

  return (
    <div
      className="bg-white flex flex-col items-center z-40 fixed shadow-white-500/50 left-0 top-0 w-full h-full lg:w-1/2 lg:h-5/6 lg:left-[50%] lg:top-[50%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2"
      id="modal"
    >
      <div className="h-full w-full relative">
        <h2 className="text-2xl pt-10 pb-8 px-4">Submit an Event ???? ????</h2>
        <div>
          <p className="text-lg px-4 lg:w-2/3">
            Submit your event and contribute to the descentralized science
            ecosystem.{" "}
          </p>
          <p className="px-4 mt-2 text-[#B1B1B1]" htmlFor="email">
              your Event will be posted after ~ 24 hours
            </p>
        </div>

        <div className="my-14 bg-white w-full p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            {console.log(errors)}
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="text"
                className="w-[80%] h-10 placeholder:text-black placeholder:text-l focus:outline-none focus:placeholder:opacity-0"
                placeholder="Event Name"
                id="event_title"
                name="event_title"
                {...register("event_title")}
              />
              {errors.event_title?.message}
            </div>
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="text"
                className="w-[80%] h-10 placeholder:text-black placeholder:text-l focus:outline-none focus:placeholder:opacity-0 "
                placeholder="Your full name"
                id="contact_name"
                name="contact_name"
                {...register("contact_name")}
              />
              {errors.contact_name && "Name is required."}
            </div>
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="email"
                className="w-[80%] h-10 placeholder:text-black placeholder:text-l focus:outline-none focus:placeholder:opacity-0"
                placeholder="your@email.com"
                id="contact_email"
                name="contact_email"
                {...register("contact_email")}
              />
              {errors.contact_email?.message}
            </div>
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="url"
                className="w-[80%] h-10 placeholder:text-black placeholder:text-l focus:outline-none focus:placeholder:opacity-0"
                placeholder="Event Website / Meetup Link"
                id="event_link"
                name="event_link"
                {...register("event_link")}
              />
              {errors.event_link?.message}
            </div>
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="textarea"
                className="w-[80%] h-10 placeholder:text-black placeholder:text-l focus:outline-none focus:placeholder:opacity-0"
                placeholder="Short Event Description"
                id="event_description"
                name="event_description"
                {...register("event_description")}
              />
              {errors.event_description?.message}
            </div>
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="datetime-local"
                className="w-[80%] grow h-10 placeholder:text-black placeholder:text-l focus:outline-none focus:placeholder:opacity-0"
                id="event_date"
                name="event_date"
                {...register("event_date")}
              />
              {errors.event_date?.message}
            </div>
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="datetime-local"
                className="w-[80%] grow h-10 placeholder:text-black placeholder:text-l focus:outline-none focus:placeholder:opacity-0"
                id="event_end_date"
                name="event_end_date"
                {...register("event_end_date")}
              />
              {errors.event_end_date?.message}
            </div>
            <LocationSearchInput setAddress={getAddress} />
            <button type="submit" className="text-l mt-5">
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </form>
        </div>
        <div
          className="absolute top-0 right-0 p-4 cursor-pointer"
          onClick={props.onClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ModalSubmitEvent;
