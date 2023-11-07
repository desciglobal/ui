import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {airtablePostEmail} from "../../lib/airtable/airtablePostEmail";

function ModalSubmitMail(props) {
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
      alert("Your Email was submitted, you can close the modal now!");
    } catch (err) {
      alert(`Error submitting Email to Airtable: ${err.message}`);
    }

  };

  return (
    <div
      className="bg-white p-4 flex flex-col items-center z-40 fixed shadow-white-500/50 left-0 top-0 w-full h-full lg:w-1/2 lg:h-1/2 lg:left-[50%] lg:top-[50%] lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2"
      id="modal"
    >
      <div className="h-full w-full">
        <h2 className="text-2xl pt-4 pb-12">Get the latest desci news 💌</h2>
        <div>
          <p className="text-lg">
            Submit your email and stay up to date with the events and news in
            descentralized science.{" "}
          </p>
        </div>

        {/* ##email newsletter */}

        <div className="my-14">
          <form onSubmit={handleSubmit(onSubmit)}>
            {console.log(errors)}
            <label className="mb-5 text-[#B1B1B1]" for="email">
              you will recieve ~1 Mail per month
            </label>
            <div className="flex justify-between border-solid border-b border-black mr-[3%]">
              <input
                type="email"
                className="w-[80%] h-10 placeholder:text-black placeholder:text-l  focus:outline-none focus:placeholder:opacity-0"
                placeholder="your@email.com"
                id="first"
                name="first"
                {...register("email")}
              />
              {errors.email?.message}
              <button type="submit" className="text-l">
              {isSubmitting ? "Submitting" : "Submit"}
              </button>
            </div>
          </form>
        </div>
        <div className="absolute top-0 right-0 p-8 cursor-pointer" onClick={props.onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default ModalSubmitMail;
