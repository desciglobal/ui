import { useState, useEffect } from "react";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

// Custom hook to handle event location details
export function useEventLocation(mapsApiKey) {
  const [latLng, setLatLng] = useState(null);
  const [timeZone, setTimeZone] = useState("");
  const [address, setAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");

  useEffect(() => {
    if (address) {
      geocodeByAddress(address)
        .then((results) => {
          const countryComponent = results[0].address_components.find(
            (component) => component.types.includes("country")
          );
          setCountryCode(countryComponent?.short_name || "");
          return getLatLng(results[0]);
        })
        .then((latLng) => {
          setLatLng(latLng);
        })
        .catch((error) => console.error("Error", error));
    }
  }, [address]);

  useEffect(() => {
    if (latLng && mapsApiKey) {
      const { lat, lng } = latLng;
      fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=1331161200&key=${mapsApiKey}`
      )
        .then((response) => response.json())
        .then((data) => setTimeZone(data.timeZoneId))
        .catch((error) => console.error("Error", error));
    }
  }, [latLng, mapsApiKey]);

  return { latLng, timeZone, address, setAddress, countryCode };
}
