export default async function discordSubmissionNotification(
  data,
  eventId,
  imageHandle
) {
  const discordNotificationWebhook =
    "https://discord.com/api/webhooks/1044217326188371998/v3E5MLRoAposTKUV_W8UouXgRVhWCC7I1WfEKHewItQyfuLNGhP9wYQErZlQd3_Gb-qX?wait=true";

  const eventStart = new Date(data.eventDate).toLocaleString();
  const eventEnd = new Date(data.eventEndDate).toLocaleString();
  console.log(imageHandle);
  // {
  //     "eventCity": "Berlin",
  //     "eventEndDate": "2023-11-15T10:00:00.000Z",
  //     "eventDate": "2023-11-14T10:00:00.000Z",
  //     "eventDescription": "A thriving state is one that is able to provide its citizens with the resources and opportunities they need to be successful. The state's government is effective and efficient, and its citizens are active and engaged in their communities. The state's economy is strong and its businesses are thriving. The state's infrastructure is well-developed and its tax system is fair and equitable.",
  //     "eventLink": "https://app.hygraph.com/2a5039479319412b8c01d3f04db1bf5d/master/content/4fd2a6ed53a241e59e054fe3c5a90c3d/view/f861cde82136412b94b0b0ed1f18a437",
  //     "eventTitle": "descier meetup",
  //     "eventImageId": "cloxd32994lce0auq8ydmv7sz",
  //     "fullAddress": "Berliner Dom, Am Lustgarten, Berlin, Germany",
  //     "eventTimezone": "Europe/Berlin",
  //     "eventCountry": "DE",
  //     "meetupType": "Meetup"
  // }

  const hygraphUrl = `https://app.hygraph.com/2a5039479319412b8c01d3f04db1bf5d/master/content/4fd2a6ed53a241e59e054fe3c5a90c3d/view/f861cde82136412b94b0b0ed1f18a437/${eventId}`;
  const imageUrl = `https://media.graphassets.com/${imageHandle}`;

  const message = {
    username: "desci.global",
    avatar_url:
      "https://em-content.zobj.net/thumbs/240/apple/354/dna_1f9ec.png",
    embeds: [
      {
        title: `New Event Submitted - ${data.eventTitle}`,
        description: `*${data.eventDescription}*`,
        color: 0x823bad,
        fields: [
          {
            name: "Event Start 🟩",
            value: `${eventStart}`,
            inline: true,
          },
          {
            name: "Event End 🟥",
            value: `${eventEnd}`,
            inline: true,
          },
          {
            name: "Event City",
            value: `${data.eventCity}`,
            inline: true,
          },
          {
            name: "Event Type",
            value: `${data.meetupType}`,
            inline: true,
          },
          {
            name: "Hygraph Link 🫙",
            value: `[Edit Events here](${hygraphUrl})`,
            inline: true,
          },
          {
            name: "Event Website",
            value: `[Event Website](${data.eventLink})`,
            inline: true,
          },
          {
            name: "Event Address",
            value: `${data.fullAddress}`,
            inline: false,
          },
        ],
        thumbnail: {
          url: "https://upload.wikimedia.org/wikipedia/commons/3/38/4-Nature-Wallpapers-2014-1_ukaavUI.jpg",
        },
        image: {
          url: "https://media.graphassets.com/U6CoMPlvRgWIgRYnCC2x",
        },
        footer: {
          text: "Please set the highlight option in hygraph to true if the event is special.",
          icon_url:
            "https://thumbs.dreamstime.com/b/analysis-icon-flat-style-isolated-white-background-data-analysis-symbol-market-research-sign-simple-abstract-marketing-118353500.jpg",
        },
      },
    ],
  };

  const response = await fetch(discordNotificationWebhook, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    throw new Error(
      `Discord API responded with status code ${response.status}`
    );
  }

  const messageId = (await response.json()).id;
  return messageId;
}
