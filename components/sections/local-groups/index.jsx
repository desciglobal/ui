import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindowF as InfoWindow,
  MarkerF as Marker,
} from "@react-google-maps/api";

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

const LocalGroups = () => {
  const { isLoaded } = useJsApiLoader({
    id: "local-groups-map",
    googleMapsApiKey: "AIzaSyB4IefstneiNw1cA3bTrhIXFti9IYfVP8A",
  });

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div className="mt-40">
      <h2 className="ml-2 lg:ml-4 text-2xl lg:text-4xl mb-2 lg:mb-4">
        Local groups
      </h2>
      <GoogleMap
        mapContainerClassName="h-96 lg:mx-4"
        center={{ lat: 30, lng: 0 }}
        zoom={2}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
        }}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {localGroups.map(({ name, link, position }) => (
          <Marker
            position={position}
            title={name}
            key={link}
            onClick={() => link !== activeMarker && setActiveMarker(link)}
          >
            {activeMarker === link ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <a
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-desciblue font-bold underline"
                >
                  {name}
                </a>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  ) : null;
};

export default LocalGroups;
