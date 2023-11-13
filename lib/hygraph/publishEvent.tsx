import toast from "react-hot-toast";
export default async function publishEvent(eventId: string) {
  //@ts-ignore
  if (!eventId) {
    return;
  }

  try {
    const response = await fetch(`/api/hygraph/eventPublish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //@ts-ignore

      body: JSON.stringify({ eventId: eventId }),
    });

    if (response.ok) {
      const publishedEvent = await response.json();
      toast.success("Event published");
      console.log("Publishes Event from Hook", publishedEvent);
      return publishedEvent;
    }
  } catch (err) {
    console.error("Error publishing event: ", err);
    toast.error("Error publishing event", err);
  }
}
