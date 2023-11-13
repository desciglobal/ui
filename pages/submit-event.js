import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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

  console.log(errors);

  console.log(submittedEvent);

  // posting data to Hygraph
  const onSubmit = async (data) => {
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
        await publishEvent(hygraphResponseData.createEvent.id);
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
      <div className="bg-[#f8f8f8] min-w-screen min-h-screen pb-40">
        <HeaderForm />
        <div className="max-w-xl relative mt-[4rem]  mx-2 sm:mx-auto bg-white p-8 rounded-xl">
          {isSubmitted ? (
            <>
              <SuccessScreen submittedEvent={submittedEvent} />
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
                  <div className="mb-4">
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
