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
          
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Event Locations and Addresses ...',
                className: 'form-input block w-[97%] px-0.5 border-0 border-b border-black focus:ring-0 focus:border-black',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {

                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}