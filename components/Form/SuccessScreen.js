import Link from "next/link";

export default function SuccessScreen({ submittedEvent }) {
  return (
    <div
      className="flex items-center justify-center min-w-screen min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('images/science.jpg')` }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 max-w-md mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Event Published 🎉
        </h1>
        <p className="text-gray-700 mb-6">
          Thank you! You earned some DeSci Karma.
        </p>

        {submittedEvent.eventTitle && (
          <h2 className="text-2xl font-semibold mb-2">
            {submittedEvent.eventTitle}
          </h2>
        )}

        {submittedEvent.meetupType && (
          <span className="inline-block bg-blue-600 text-white py-1 px-3 rounded-full text-sm mb-4">
            {submittedEvent.meetupType}
          </span>
        )}

        {submittedEvent.eventDescription && (
          <p className="bg-gray-100 rounded-md p-4 mb-4">
            {submittedEvent.eventDescription}
          </p>
        )}

        {submittedEvent.eventLink && (
          <Link href={submittedEvent.eventLink}>
            <div className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300 mb-4 block">
              View Event
            </div>
          </Link>
        )}

        {submittedEvent.fullAddress && (
          <p className="mb-2">{submittedEvent.fullAddress}</p>
        )}

        {submittedEvent.eventDate && (
          <p className="mb-1">
            Start: {new Date(submittedEvent.eventDate).toLocaleString()}
          </p>
        )}

        {submittedEvent.eventEndDate && (
          <p className="mb-4">
            End: {new Date(submittedEvent.eventEndDate).toLocaleString()}
          </p>
        )}

        {submittedEvent.eventTimezone && (
          <p className="mb-6">Timezone: {submittedEvent.eventTimezone}</p>
        )}

        <Link href="/">
          <div className="text-blue-600 hover:text-blue-800 transition duration-300">
            Back to Events
          </div>
        </Link>
      </div>
    </div>
  );
}
