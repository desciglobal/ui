import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
 
export default class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', suggestion: ''};

  }


// nach unten props, nach oben events
 
  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = (address) => {
   this.setState({ address })
   this.props.setAddress({address})
   console.log(address)
  }




  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        // passing in the state to function from parent component and updating state there
        onSelect={this.handleSelect}
        
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

          <div className="relative">
            <input
              {...getInputProps({
                id: 'location-input',
                placeholder: 'Search Event Locations and Addresses ...',
                className: 'form-input block w-[97%] px-0.5 border-0 border-b border-black focus:ring-0 focus:border-black',
              })}
            />
            {!!suggestions.length && <div class="absolute left-0 bottom-[110%] z-10 mt-2 w-[97%] origin-bottom-right rounded-md bg-white shadow-lg shadow-zinc-400 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="location-input" tabindex="-1">
              <div class="py-1" role="none">
                {loading && <div>Loading...</div>}
                {suggestions.map(suggestion => (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className: `text-gray-700 block px-4 py-2 text-sm cursor-pointer ${suggestion.active ? 'bg-slate-100' : 'bg-white'}`,
                      })}
                      key={suggestion.id}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                ))}
              </div>
            </div>}
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}