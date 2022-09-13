import Hero from "../components/hero/hero";
import Head from "next/head";
import classes from "./event-submission.module.css";
import { useForm } from 'react-hook-form';
import {postEvent} from '../services/airtable';
import {TextField, Button} from '@mui/material';


function eventSubmission() {

  const { register, handleSubmit, formState: {errors}, reset} = useForm({
    defaultValues: {
      title: "",
      date: "",
      link: "",
      image: ""
    }
  });


  return (
    <>
      <Head>
        <title>Desci events around the globe</title>
        <meta
          name="description"
          content="A list of descentralized science events around the globe. Contribute and share Events"
        />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content="desci.global" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Desci events around the globe" />
        <meta
          property="og:description"
          content="A list of descentralized science events around the globe. Contribute and share Events"
        />
        <meta
          property="og:image"
          content="https://desciglobal.vercel.app/images/og-image.png"
        />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="desci.global" />
        <meta property="twitter:url" content="desci.global" />
        <meta name="twitter:title" content="Desci events around the globe" />
        <meta
          name="twitter:description"
          content="A list of descentralized science events around the globe. Contribute and share Events"
        />
        <meta
          name="twitter:image"
          content="https://desciglobal.vercel.app/images/og-image.png"
        />
      </Head>

      <Hero headingText="Submit an event" />
      <div className={classes.wrapper}>
        
        <form onSubmit={handleSubmit((data)=> {
          postEvent(data);
          reset();
          console.log(data)
        })}>

          <TextField className={classes.TextInput} id="outlined-basic" variant="outlined" {...register("title", {required: "Event Title is required"})} placeholder="Event Title" />
          <p>{errors.title?.message}</p>
          <TextField className={classes.TextInput} type="date" id="outlined-basic"  variant="outlined" {...register("date", {required: "Date is required"})} placeholder="Event Date" />
          <p>{errors.date?.message}</p>
          <TextField className={classes.TextInput} id="outlined-basic" variant="outlined" {...register("link", {required: "Some Link is required"})} placeholder="Link to Event Page" />
          <p>{errors.link?.message}</p>
          <TextField className={classes.TextInput} id="outlined-basic" variant="outlined" {...register("image")} placeholder="Link to Image" />
          <p></p>
          <Button><input type="submit"/></Button>
          
        </form>
      </div>
    </>
  );
}

export default eventSubmission;
