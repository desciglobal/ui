import { useEffect } from "react";

const localGroups = [
  {
    name: "DeSci London",
    position: { lat: 51.5048913, lng: -0.1294337 },
    link: "https://www.meetup.com/en-AU/desci-london/",
  },
  {
    name: "DeSci Berlin",
    position: { lat: 52.5226342, lng: 13.4035831 },
    link: "https://www.desci.berlin/",
  },
];

function initMap() {
  const myLatLng = { lat: 30, lng: 0 };
  const map = new google.maps.Map(document.getElementById("local-groups-map"), {
    zoom: 1,
    center: myLatLng,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
  });

  const infoWindow = new google.maps.InfoWindow();

  localGroups.forEach(({ name, link, position }) => {
    const marker = new google.maps.Marker({
      position,
      map,
      title: name,
    });

    google.maps.event.addListener(marker, "click", () => {
      const content = document.createElement("div");
      const nameElement = document.createElement("a");

      nameElement.textContent = name;
      nameElement.setAttribute("href", link);
      nameElement.setAttribute("target", "_blank");
      nameElement.setAttribute(
        "style",
        "color:blue; font-weight:bold; text-decoration:underline"
      );
      content.appendChild(nameElement);

      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });
  });
}

const LocalGroups = () => {
  useEffect(() => {
    window.initMap = initMap;
    window.initMap();
  }, []);

  return (
    <div className="mt-40">
      <h2 className="ml-2 lg:ml-4 text-2xl lg:text-4xl mb-2 lg:mb-4">
        Local groups
      </h2>
      <div id="local-groups-map" className="h-96 lg:mx-4" />
    </div>
  );
};

export default LocalGroups;
