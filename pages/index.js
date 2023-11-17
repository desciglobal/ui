import { useEffect } from "react";

import Navigation from "../components/sections/hero/navigation";
import HeroSection from "../components/sections/hero/section-hero";
import AllEventsSection from "../components/sections/all-events/section-allevents";
import ResourcesSectionThree from "../components/sections/resources/section-resources-3";
import VideoSection from "../components/sections/videos/section-videos";
import ContributeSection from "../components/sections/contribute/s-contribute";
import ContributorsSection from "../components/sections/ contribute/s-contributors";
import PartnerLogoSection from "../components/sections/partners/section-partners";
import Footer from "../components/footer/footer";
import FeaturedSection from "../components/sections/featured/section-featured";
import FeaturedSectionMobile from "../components/sections/featured/section-featured-mobile";
import LocalGroupsSection from "../components/sections/local-groups";
import { MixpanelTracking } from "../lib/mixpanel";

import getFutureEvents from "../lib/hygraph/getFutureEvents";
import getPastEvents from "../lib/hygraph/getPastEvents";
import getFeaturedEvents from "../lib/hygraph/getFeaturedEvents";
import getContributors from "../lib/hygraph/getContributors";
import getLocalGroups from "../lib/hygraph/getLocalGroups";

function formatDate(dateString) {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function Home(props) {
  const {
    futureEvents,
    pastEvents,
    featuredEvents,
    contributors,
    localGroups,
  } = props;

  useEffect(() => {
    MixpanelTracking.getInstance().pageView();
  }, []);

  return (
    <>
      <Navigation />
      <HeroSection />
      <FeaturedSection featuredEvents={featuredEvents} />

      <FeaturedSectionMobile featuredEvents={featuredEvents} />
      <AllEventsSection futureEvents={futureEvents} pastEvents={pastEvents} />
      <LocalGroupsSection localGroups={localGroups} />
      <ResourcesSectionThree />
      <ContributeSection />
      <VideoSection />
      <ContributorsSection contributors={contributors} />
      <PartnerLogoSection />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const futureEvents = await getFutureEvents();
  const pastEvents = await getPastEvents();
  const featuredEvents = await getFeaturedEvents();
  const contributors = await getContributors();
  const localGroups = await getLocalGroups();

  futureEvents.forEach((event) => {
    event.eventDateConverted = formatDate(event.eventDate);
  });

  pastEvents.forEach((event) => {
    event.eventDateConverted = formatDate(event.eventDate);
  });

  featuredEvents.forEach((event) => {
    event.eventDateConverted = formatDate(event.eventDate);
  });

  if (!pastEvents) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  return {
    props: {
      futureEvents,
      pastEvents,
      featuredEvents,
      contributors,
      localGroups,
    },
    revalidate: 10,
  };
}
