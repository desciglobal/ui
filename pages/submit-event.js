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
import Image from "next/image";
import Head from "next/head";
import {
  PutObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";

const client = new S3Client({
  region: process.env.NEXT_PUBLIC_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRETS_KEY,
  },
});

const MAX_IMAGE_FILE_SIZE = 2147483648;
const SUPPORTED_IMAGE_FILE_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const uploadEventImage = async (file) => {
  const fileType = file.type.split("/")[1];
  const fileName = `${uuid()}.${fileType}`;

  try {
    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: fileName,
      expiresIn: 60,
      ContentType: `image/${fileType}`,
    });
    const putObjectUrl = await getSignedUrl(client, putObjectCommand);
    await fetch(putObjectUrl, {
      method: "PUT",
      body: file,
    });

    const getObjectCommand = new GetObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: fileName,
      expiresIn: 300,
      ContentType: `image/${fileType}`,
    });
    const getObjectUrl = await getSignedUrl(client, getObjectCommand);

    return getObjectUrl;
  } catch (err) {
    console.error(err);
  }
};

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
      event_image: yup.string(),
      event_image_file: yup
        .mixed()
        .nullable()
        .notRequired()
        .test(
          "FILE_SIZE",
          "Uploaded file is too big. Max size: 2MB.",
          (value) => !value || (value && value.size <= MAX_IMAGE_FILE_SIZE)
        )
        .test(
          "FILE_FORMAT",
          "Uploaded file has unsupported format.",
          (value) =>
            !value ||
            (value && SUPPORTED_IMAGE_FILE_FORMATS.includes(value.type))
        ),
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
  const [eventImageFile, setEventImageFile] = useState();

  const [errorToastMessage, setErrorToastMessage] = useState();
  const onHideToast = () =>
    setTimeout(() => {
      setErrorToastMessage(undefined);
    }, 5000);

  const [isSubmitted, setIsSubmitted] = useState(false);

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
      data.event_image = await uploadEventImage(eventImageFile);

      await airtablePostEvent(data);
      MixpanelTracking.getInstance().eventSubmitted(data.event_title);

      setErrorToastMessage(undefined);
      setIsSubmitted(true);
    } catch (err) {
      setErrorToastMessage(
        `Error submitting event to Airtable: ${err.message}`
      );
    }
  };

  return (
    <>
      <Head>
        <title>Submit an event | Desci Global</title>
      </Head>
      <div className="max-w-xl relative mt-10 mb-2 mx-2 sm:mx-auto">
        <Image
          src="/images/desci-global-white-logo.png"
          alt="Desci Global Logo"
          width={200}
          height={200}
          className="mx-auto py-4"
        />
        {isSubmitted ? (
          <>
            <h1 className="text-4xl pt-10 pb-8">
              Event successfully submitted 🎉
            </h1>
            <p>It will be posted after ~ 24 hours.</p>
          </>
        ) : (
          <>
            <h1 className="text-3xl pt-10 pb-8">Submit an event 📆 🔬</h1>
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
              {isOnline ? (
                <>
                  <LocationSearchInput
                    label="Search Time Zone"
                    value={address}
                    onChange={(val) => setAddress(val)}
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
              <Field
                id="event_date"
                label="Start Date"
                type="datetime-local"
                register={register}
                errorMessage={errors.event_date?.message}
              />
              <Field
                id="event_end_date"
                label="End Date"
                type="datetime-local"
                register={register}
                errorMessage={errors.event_end_date?.message}
              />
              <div className="divider my-8" />
              <h4 className="text-2xl mb-4">Image</h4>
              <input
                id="event_image_file"
                type="file"
                accept="image/png, image/jpeg"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={(e) => setEventImageFile(e.target.files[0])}
              />
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
            <div
              class="alert alert-error indicator max-w-[80vw]"
              onMouseLeave={onHideToast}
              onTouchEnd={onHideToast}
            >
              <div>
                <span>{errorToastMessage.slice(0, 100)}...</span>
              </div>
            </div>
          </div>
        ) : null}
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
