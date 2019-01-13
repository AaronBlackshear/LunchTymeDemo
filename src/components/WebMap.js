import React from 'react';
import { connect } from 'react-redux';
import GoogleMapReact from 'google-map-react';
import RestaurantInfoMarker from './RestaurantInfoMarker';

function WebMap({ restaurantsReducer, showFullMap }) {
  const getMapCenter = () => {
    let sumOfLat = 0;
    let sumOfLng = 0;
    restaurantsReducer.forEach(restaurant => {
      sumOfLat += restaurant.location.lat;
      sumOfLng += restaurant.location.lng;
    });
    return {
      lat: sumOfLat / restaurantsReducer.length,
      lng: sumOfLng / restaurantsReducer.length,
    }
  }

  return (
    <div className={`web-map ${showFullMap ? 'active' : ''}`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        center={getMapCenter()}
        zoom={13}
      >
        {restaurantsReducer.map((restaurant, ind) => (
          <RestaurantInfoMarker
            key={ind}
            lat={restaurant.location.lat}
            lng={restaurant.location.lng}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
const mapStateToProps = state => ({
  restaurantsReducer: state.restaurantsReducer,
});

export default connect(mapStateToProps)(WebMap);