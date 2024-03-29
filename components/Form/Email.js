import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MixpanelTracking } from "../../lib/mixpanel";
import { airtablePostEmail } from "../../lib/airtable/airtablePostEmail";

function EmailandEventCalForm() {
  const [submitted, setSubmitted] = useState(false);

  const schema = yup
    .object({
      email: yup.string().required().email(),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await airtablePostEmail(data);
      setSubmitted(true);
    } catch (err) {
      alert(`Error submitting Email to Airtable: ${err.message}`);
    }
  };

  function trackCalendarSubscribed() {
    MixpanelTracking.getInstance().calendarSubscribed("form");
  }

  return (
    <>
      <div className="lg:px-4 px-2 lg:py-20 py-10">
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-5 text-[#B1B1B1]" htmlFor="email">
            GET THE LATEST DESCI NEWS
          </label>
          <div className="flex justify-between border-solid border-b text-xl border-black mr-[3%]">
            <input
              type="email"
              className="w-[80%] h-10 placeholder:text-black lg:placeholder:text-xl focus:outline-none focus:text-xl focus:placeholder:opacity-0"
              placeholder="your@email.com"
              id="first"
              name="first"
              {...register("email")}
            />
            <button type="submit" className="lg:text-2xl">
              {submitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </form>
      </div>
      <div className="lg:p-4 p-2">
        <form>
          {console.log(errors)}
          <label className="mb-5 text-[#B1B1B1]" htmlFor="email">
            SUBSCRIBE TO CALENDAR
          </label>
          <div className="flex justify-between border-solid border-b border-black mr-[3%] text-xl">
            <input
              type="email"
              className="w-[80%] h-10 placeholder:text-black lg:placeholder:text-2xl focus:outline-none"
              placeholder="https://calendar.google.com/calendar/u/0/r?cid=3lql6qf1smr21uaf4kb7hdfg8btdq6v2@import.calendar.google.com"
              id="first"
              name="first"
            />
            <a
              href="https://calendar.google.com/calendar/u/0/r?cid=3lql6qf1smr21uaf4kb7hdfg8btdq6v2@import.calendar.google.com"
              target={"_blank"}
              rel="noreferrer"
              type="submit"
              className="lg:text-2xl bg-white"
              onClick={trackCalendarSubscribed}
            >
              Add
            </a>
          </div>
        </form>
      </div>
    </>
  );
}

export default EmailandEventCalForm;
