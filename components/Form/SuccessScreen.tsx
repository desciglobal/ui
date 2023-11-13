import Link from "next/link";

export default function SuccessScreen({ submittedEvent }) {
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-4xl pt-8 pb-4">
          Your Event got successfully submitted 🎉
        </h1>
        <p className="text-slate-600">
          You earned yourself some DeSci Karma, thank you!.
        </p>
        <p className="text-2xl mt-10">{submittedEvent.eventTitle}</p>
        <p className="mt-2 text-white bg-desciblue py-1 px-2 rounded-full ">
          {submittedEvent.meetupType}
        </p>
      </div>
      <div>
        <Link
          className="text-desciblue inline-flex items-center hover:underline"
          href="/"
        >
          Events
        </Link>
      </div>
    </>
  );
}
