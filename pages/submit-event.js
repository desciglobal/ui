import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LocationSearchInput from "../components/modal-and-forms/EventLocationInput";
import { MixpanelTracking } from "../lib/mixpanel";
import Head from "next/head";
import { v4 as uuid } from "uuid";
import { useEventLocation } from "hooks/useEventLocation";
import toast from "react-hot-toast";
import HeaderForm from "components/HeaderForm";

const timezoneKey = process.env.NEXT_PUBLIC_GOOGLE_TIMEZONE_API_KEY;

const schema = yup
  .object({
    eventTitle: yup.string().required().max(80),
    eventLink: yup.string().required(),
    eventDescription: yup.string().required(),
    eventDate: yup.date().required(),
    eventEndDate: yup.date().required(),
    eventCity: yup.string(),
    eventImage: yup.string(),
    address: yup.string(),
  })
  .required();

const MAX_IMAGE_FILE_SIZE = 2147483648;
const SUPPORTED_IMAGE_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const uploadEventImage = async (file) => {
  const fileType = file.type.split("/")[1];
  const fileName = `${uuid()}.${fileType}`;

  try {
    console.log(fileType);
    console.log(fileName);
  } catch (err) {
    console.error(err);
  }
};

function SubmitEvent(props) {
  const [isOnline, setIsOnline] = useState(false);
  const [eventImageFile, setEventImageFile] = useState();
  const [fileError, setFileError] = useState();

  const {
    methods,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  console.log(errors);

  const { latLng, timeZone, address, setAddress, countryCode } =
    useEventLocation(timezoneKey);

  const onEventImageFileChange = (e) => {
    const file = e.target.files[0];
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  // posting data to Hygraph
  const onSubmit = async (data) => {
    console.log(data);

    data.fullAddress = address;
    const date = new Date(data.eventDate);
    data.eventDate = date.toISOString();
    data.eventTimezone = timeZone;
    data.eventCountry = countryCode;
    data.eventCity = data.eventCity;
    data.meetupType = isOnline ? "Online" : "Meetup";

    if (isOnline) {
      data.eventCity = "Online";
      data.eventCountry = "online";
    }

    try {
      // data.event_image = await uploadEventImage(eventImageFile);

      const response = await fetch("api/hygraph/formSubmission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const hygraphResponseData = await response.json();

      if (hygraphResponseData.createEvent.id) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Error posting Event to Hygraph", err);
      toast.error("Error submitting your Event", err);
    }
  };

  return (
    <>
      <Head>
        <title>Submit an event | Desci Global</title>
      </Head>
      <div className="bg-[#f8f8f8] min-w-screen pb-20">
        <HeaderForm />
        <div className="max-w-xl relative mt-[4rem]  mx-2 sm:mx-auto bg-white p-8 rounded-xl">
          {isSubmitted ? (
            <>
              <h1 className="text-4xl pt-10 pb-8">
                Event successfully submitted 🎉
              </h1>
              <p>It will be posted after ~ 24 hours.</p>
            </>
          ) : (
            <>
              <h1 className="text-3xl pt-4 pb-4">Submit an event 📆 🔬</h1>
              <p className="text-md mb-12">
                Submit your event and contribute to the descentralized science
                ecosystem.
              </p>
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h4 className="text-2xl mb-4">Basic Details</h4>
                  <Field
                    id="eventTitle"
                    label="Event Name"
                    type="text"
                    register={register}
                    errorMessage={errors.eventTitle?.message}
                  />
                  <Field
                    id="eventLink"
                    label="Event Website / Meetup Link"
                    type="url"
                    register={register}
                    errorMessage={errors.eventLink?.message}
                  />
                  <Field
                    id="eventDescription"
                    label="Short Event Description"
                    type="textarea"
                    register={register}
                    errorMessage={errors.eventDescription?.message}
                  />
                  <div className="divider my-8" />
                  <h4 className="text-2xl mb-4">Location</h4>
                  <div className="btn-group flex mb-4 ">
                    <button
                      type="button"
                      className={`w-1/2 max-h-[40px] btn${
                        isOnline ? " btn-outline" : ""
                      }`}
                      onClick={() => setIsOnline(false)}
                    >
                      Venue
                    </button>
                    <button
                      type="button"
                      className={`w-1/2 btn${isOnline ? "" : " btn-outline"}`}
                      onClick={() => setIsOnline(true)}
                    >
                      Online event
                    </button>
                  </div>
                  {isOnline ? (
                    <>
                      <LocationSearchInput
                        label="Search Time Zone"
                        value={address}
                        onChange={(val) => setAddress(val)}
                        register={register}
                      />
                      <div className="form-control w-full mb-4">
                        <label className="label">
                          <span className="label-text">Selected Time Zone</span>
                        </label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          value={timeZone}
                          disabled={true}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <LocationSearchInput
                        label="Search Venue Address"
                        value={address}
                        onChange={(val) => setAddress(val)}
                        className={"h-[40px]"}
                      />
                      <Field
                        id="eventCity"
                        label="Event City"
                        type="text"
                        register={register}
                        errorMessage={errors.eventCity?.message}
                      />
                    </>
                  )}
                  <div className="divider my-8" />
                  <h4 className="text-2xl mb-4">Date and time</h4>
                  <div className="flex  space-x-4">
                    <Field
                      id="eventDate"
                      label="Start Date"
                      type="datetime-local"
                      register={register}
                      errorMessage={errors.eventDate?.message}
                    />
                    <Field
                      id="eventEndDate"
                      label="End Date"
                      type="datetime-local"
                      register={register}
                      errorMessage={errors.eventEndDate?.message}
                    />
                  </div>
                  <div className="divider my-8" />
                  <h4 className="text-2xl mb-4">Image</h4>
                  <input
                    id="event_image_file"
                    type="file"
                    accept="image/png, image/jpeg"
                    className="file-input file-input-bordered w-full max-w-xs"
                    onChange={onEventImageFileChange}
                  />
                  <div className="divider my-8" />
                  <button type="submit" className="btn flex ml-auto mb-8">
                    {isSubmitting ? "Submitting" : "Submit"}
                  </button>
                </form>
              </FormProvider>
            </>
          )}
        </div>
      </div>
    </>
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
      className={`input-bordered input w-full rounded-4xl bg-base-200 p-[10px] text-[14px] tracking-wide h-[40px]  ${
        errorMessage ? "input-error" : ""
      }`}
      id={id}
      name={id}
      maxLength={id === "event_title" ? 80 : undefined}
      {...register(id)}
    />
    {errorMessage && (
      <label className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </label>
    )}
  </div>
);
