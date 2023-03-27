import { useState, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  InfoWindowF as InfoWindow,
  MarkerF as Marker,
} from "@react-google-maps/api";

const LocalGroups = ({ localGroups }) => {
  const { isLoaded } = useJsApiLoader({
    id: "local-groups-map",
    googleMapsApiKey: "AIzaSyB4IefstneiNw1cA3bTrhIXFti9IYfVP8A",
  });

  console.log(localGroups);

  const [map, setMap] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded && localGroups && localGroups.length ? (
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
        {localGroups.map(({ name, link, position, recordId }) => (
          <Marker
            position={position}
            title={name}
            key={recordId}
            onClick={() => link !== activeMarker && setActiveMarker(recordId)}
          >
            {activeMarker === recordId ? (
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
