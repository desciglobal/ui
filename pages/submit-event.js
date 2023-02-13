import React, { useState, useEffect } from "react";
// import CountrySelector from "./CountrySelect";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LocationSearchInput from "../components/modal-and-forms/EventLocationInput";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { airtablePostEvent } from "../services/airtable";
import { MixpanelTracking } from "../services/mixpanel";
import Link from "next/link";

function SubmitEvent(props) {
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
      event_city: yup.string().required(),
    })
    .required();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const [latLng, setlatLng] = useState("");
  const [timeZone, setTimeZone] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isOnline, setIsOnline] = useState(false);

  const [errorToastMessage, setErrorToastMessage] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getAddress = (a) => {
    setAddress(a.address);
  };

  useEffect(() => {
    geocodeByAddress(address)
      .then((results) => {
        const cityNameObj = results[0].address_components.find(
          (address_component) =>
            ["locality", "sublocality", "colloquial_area"].some(
              (word) => ~address_component.types.indexOf(word)
            )
        );
        cityNameObj && setValue("event_city", cityNameObj.long_name);

        const countyObj = results[0].address_components.find(
          (address_component) =>
            address_component.types.find((type) => type === "country")
        );
        countyObj && setCountryCode(countyObj.short_name);

        return getLatLng(results[0]);
      })
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

  // posting data to Airtable and catching errors
  const onSubmit = async (data) => {
    data.event_address = address;
    const date = new Date(data.event_date);
    data.event_date = date.toISOString();
    data.event_timezone = timeZone;
    data.event_country_code = countryCode;
    data.event_city = data.event_city;
    data.event_meetupType = isOnline ? "Online" : "Meetup";

    try {
      await airtablePostEvent(data);
      MixpanelTracking.getInstance().eventSubmitted(data.event_title);

      setErrorToastMessage(undefined);
      setIsSubmitted(true);
    } catch (err) {
      setErrorToastMessage(
        `Error submitting event to Airtable: ${err.message}`
      );
      setTimtout(() => {
        setErrorToastMessage(undefined);
      }, 10000);
    }
  };

  return (
    <div className="max-w-xl relative mt-10 mb-2 mx-2 sm:mx-auto">
      {isSubmitted ? (
        <>
          <h1 className="text-4xl pt-10 pb-8">Your Event was submitted! 🎉</h1>
          <p>It will be posted after ~ 24 hours.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl pt-10 pb-8">Submit an Event 📆 🔬</h1>
          <p className="text-md mb-12">
            Submit your event and contribute to the descentralized science
            ecosystem.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="text-2xl mb-4">Basic details</h4>
            <Field
              id="event_title"
              label="Event Name"
              type="text"
              register={register}
              errorMessage={errors.event_title?.message}
            />
            <Field
              id="contact_name"
              label="Your Full Name"
              type="text"
              register={register}
              errorMessage={errors.contact_name?.message}
            />
            <Field
              id="contact_email"
              label="Your Email"
              type="email"
              register={register}
              errorMessage={errors.contact_email?.message}
            />
            <Field
              id="event_link"
              label="Event Website / Meetup Link"
              type="url"
              register={register}
              errorMessage={errors.event_link?.message}
            />
            <Field
              id="event_description"
              label="Short Event Description"
              type="textarea"
              register={register}
              errorMessage={errors.event_description?.message}
            />
            <div className="divider my-8" />
            <h4 className="text-2xl mb-4">Location</h4>
            <div className="btn-group flex mb-4">
              <button
                type="button"
                className={`btn${isOnline ? " btn-outline" : ""}`}
                onClick={() => setIsOnline(false)}
              >
                Venue
              </button>
              <button
                type="button"
                className={`btn${isOnline ? "" : " btn-outline"}`}
                onClick={() => setIsOnline(true)}
              >
                Online event
              </button>
            </div>
            {isOnline ? null : (
              <>
                <LocationSearchInput
                  value={address}
                  onChange={(val) => setAddress(val)}
                />
                <Field
                  id="event_city"
                  label="Event City"
                  type="text"
                  register={register}
                  errorMessage={errors.event_city?.message}
                />
              </>
            )}
            <div className="divider my-8" />
            <h4 className="text-2xl mb-4">Date and time</h4>
            {[
              { id: "event_date", label: "Start Date", type: "datetime-local" },
              {
                id: "event_end_date",
                label: "End Date",
                type: "datetime-local",
              },
            ].map(({ id, label, type }) => (
              <Field
                id={id}
                label={label}
                type={type}
                register={register}
                errorMessage={errors.event_title?.message}
                key={id}
              />
            ))}
            <div className="divider my-8" />
            <button type="submit" className="btn flex ml-auto mb-8">
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
          </form>
        </>
      )}
      <Link
        className="absolute bottom-full sm:bottom-unset md:-left-20 text-desciblue inline-flex items-center mt-3 text-sm"
        href="/"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
        Home
      </Link>
      {errorToastMessage ? (
        <div class="toast toast-end">
          <div class="alert alert-error indicator">
            <div>
              <span>{errorToastMessage}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SubmitEvent;

const Field = ({ id, label, type, register, errorMessage }) => (
  <div className="form-control w-full mb-4" key={id}>
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type={type}
      className="input input-bordered w-full"
      id={id}
      name={id}
      {...register(id)}
    />
    {errorMessage && (
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    )}
  </div>
);
