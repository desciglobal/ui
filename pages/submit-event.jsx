import React, { useState } from "react";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LocationSearchInput from "../components/Form/EventLocationInput";
import { MixpanelTracking } from "../lib/mixpanel";
import Head from "next/head";
import { useEventLocation } from "hooks/useEventLocation";
import { useFileUpload } from "hooks/useFileUpload";
import toast from "react-hot-toast";
import HeaderForm from "components/Form/HeaderForm";
import FileUpload from "../components/Form/FileUpload";
import { Field } from "../components/Form/Field";
import SuccessScreen from "../components/Form/SuccessScreen";
import publishEvent from "../lib/hygraph/publishEvent";
import { DateTimeField } from "../components/Form/DateTime";
import discordSubmissionNotification from "../lib/notifyDiscord";
import Toogle from "../components/Toogle";

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

function SubmitEvent(props) {
  const [isOnline, setIsOnline] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEvent, setSubmittedEvent] = useState();
  const [featured, setFeatured] = useState(false);

  const { latLng, timeZone, address, setAddress, countryCode } =
    useEventLocation(timezoneKey);

  const {
    uploadedFile,
    isUploading,
    fileUpload,
    onEventImageFileChange,
    fileDelete,
    isDeleting,
    eventImageFile,
    filePublish,
  } = useFileUpload();

  const {
    methods,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  // posting data to Hygraph
  const onSubmit = async (data) => {
    console.log(data);
    data.eventImageId = "cloxd32994lce0auq8ydmv7sz"; // using the standard image stored in hygraph and overwriting it below if the user uploaded an image
    if (uploadedFile) {
      filePublish(uploadedFile.id);
      data.eventImageId = uploadedFile.id;
    }

    data.fullAddress = address;
    const date = new Date(data.eventDate);
    const endDate = new Date(data.eventEndDate);
    data.eventDate = date.toISOString();
    data.eventEndDate = endDate.toISOString();
    data.eventTimezone = timeZone;
    data.eventCountry = countryCode;
    data.eventCity = data.eventCity;
    data.meetupType = isOnline ? "Online" : "Meetup";
    data.isFeatured = featured;

    if (isOnline) {
      data.eventCity = "Online";
      data.eventCountry = "online";
    }

    try {
      const response = await fetch("api/hygraph/formSubmission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      const hygraphResponseData = await response.json();
      console.log(hygraphResponseData);

      if (hygraphResponseData.createEvent.id) {
        setIsSubmitted(true);
        setSubmittedEvent(data);
        const imageHandle =
          hygraphResponseData.createEvent.eventImageFile.handle;
        await publishEvent(hygraphResponseData.createEvent.id);
        // await discordSubmissionNotification(
        //   data,
        //   hygraphResponseData.createEvent.id,
        //   imageHandle
        // );
      }
    } catch (err) {
      console.error("Error posting Event to Hygraph", err);
      toast.error("Error submitting your Event", err);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <SuccessScreen submittedEvent={submittedEvent} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Submit an event | Desci Global</title>
      </Head>
      <div
        className="bg-[#f8f8f8] min-w-screen min-h-screen lg:pb-20"
        style={{ background: "linear-gradient(to bottom, #f8f8f8, #e0e0e0)" }}
      >
        {" "}
        <HeaderForm />
        <div className="max-w-xl relative lg:mt-[4rem]  mx-2 sm:mx-auto bg-white p-8 rounded-xl">
          <>
            <h1 className="text-3xl pt-4 pb-4">Submit an event 📆 🔬</h1>
            <p className="text-md mb-12">
              Submit your event and contribute to the descentralized science
              ecosystem.
            </p>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                <div className="flex text-xs items-center">
                  <Toogle featured={featured} setFeatured={setFeatured} />
                  <p className="ml-2">
                    Request Event to appear in featured section
                  </p>
                </div>

                <div className="divider" />
                <h4 className="text-2xl">Location</h4>
                <div className="">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="location"
                      value="venue"
                      checked={!isOnline}
                      onChange={() => setIsOnline(false)}
                      className="form-radio"
                    />
                    <span className="ml-2">Venue</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="location"
                      value="online"
                      checked={isOnline}
                      onChange={() => setIsOnline(true)}
                      className="form-radio"
                    />
                    <span className="ml-2">Online event</span>
                  </label>
                </div>

                {isOnline ? (
                  <>
                    <LocationSearchInput
                      label="Search Time Zone"
                      value={address}
                      onChange={(val) => setAddress(val)}
                    />
                    <div className="form-control w-full">
                      <label className="label">
                        <span className="label-text">Selected Time Zone</span>
                      </label>
                    </div>
                    <span className="bg-desciblue rounded-full px-2 py-1 font-semibold text-white text-xs">
                      {" "}
                      {timeZone}{" "}
                    </span>
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
                <h4 className="text-2xl">Date and time</h4>
                <div className="flex flex-col">
                  <DateTimeField
                    id="eventDate"
                    label="Start Date"
                    type="datetime-local"
                    register={register}
                    errorMessage={errors.eventDate?.message}
                    setValue={setValue}
                  />
                  <DateTimeField
                    id="eventEndDate"
                    label="End Date"
                    type="datetime-local"
                    register={register}
                    errorMessage={errors.eventEndDate?.message}
                    setValue={setValue}
                  />
                </div>
                <div className="divider my-8" />
                <h4 className="text-2xl mb-4">Image</h4>
                <FileUpload
                  onEventImageFileChange={onEventImageFileChange}
                  eventImageFile={eventImageFile}
                  fileUpload={fileUpload}
                  fileDelete={fileDelete}
                  isUploading={isUploading}
                  uploadedFile={uploadedFile}
                  isDeleting={isDeleting}
                />
                <div className="divider my-8" />
                <button
                  type="submit"
                  disabled={eventImageFile || !address}
                  className="btn flex ml-auto mb-8  w-full"
                >
                  {isSubmitting ? "Submitting" : "Submit"}
                </button>
              </form>
            </FormProvider>
          </>
        </div>
      </div>
    </>
  );
}

export default SubmitEvent;
