import React from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const LocationSearchInput = ({ value, onChange }) => {
  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      // passing in the state to function from parent component and updating state there
      onSelect={onChange}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="form-control w-full mb-4 relative">
          <label className="label">
            <span className="label-text">Search Event Address</span>
          </label>
          <input
            {...getInputProps({
              id: "location-input",
              className: "form-input block input input-bordered w-full",
            })}
          />
          {!!suggestions.length && (
            <div
              class="absolute left-0 bottom-14 z-10 mt-2 w-full origin-bottom-right rounded-md bg-white shadow-lg shadow-zinc-400 ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="location-input"
              tabindex="-1"
            >
              <div class="py-1" role="none">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className: `text-gray-700 block px-4 py-2 text-sm cursor-pointer ${
                        suggestion.active ? "bg-slate-100" : "bg-white"
                      }`,
                    })}
                    key={suggestion.id}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
