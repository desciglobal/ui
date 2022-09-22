import { useForm } from "react-hook-form";
import { AirtablePostEvent } from "../../services/airtable";
import { TextField, Alert } from "@mui/material";
import { useState } from "react";

import classes from "./SubmitForm.module.css";

function SubmitForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      date: "",
      link: "",
      image: "",
    },
  });

  return (
    <div className={classes.wrapper}>
      <form
        className={classes.form}
        onSubmit={handleSubmit((data) => {
          AirtablePostEvent(data);
          setSubmitted(true);
          reset();
        })}
      >
        {!submitted && (
          <>
            <TextField
              className={classes.textinput}
              id="outlined-basic"
              variant="outlined"
              {...register("title", { required: "Event Title is required" })}
              placeholder="Event Title"
            />
            <p>{errors.title?.message}</p>
            <TextField
              className={classes.textinput}
              type="date"
              id="outlined-basic"
              variant="outlined"
              {...register("date", { required: "Date is required" })}
              placeholder="Event Date"
            />
            <p>{errors.date?.message}</p>
            <TextField
              className={classes.textinput}
              id="outlined-basic"
              variant="outlined"
              {...register("link", { required: "Some Link is required" })}
              placeholder="Link to Event Page"
            />
            <p>{errors.link?.message}</p>
            <TextField
              className={classes.textinput}
              id="outlined-basic"
              variant="outlined"
              {...register("image")}
              placeholder="Link to Image"
            />
            <p></p>
            <button className={classes.btn} type="submit">
              Submit Form
            </button>
          </>
        )}
        {submitted && (
          <Alert severity="success">Your Event has been submitted!</Alert>
        )}
      </form>
    </div>
  );
}

export default SubmitForm;
