import React, { useEffect, useRef, useState } from 'react';
import {toast } from 'react-hot-toast';
import { Loader } from "@googlemaps/js-api-loader"
import useGoogleMaps from './hooks/useMap';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const customIcon = '/house.png';

const MapWithClickableCustomMarkers = () => {
  const isLoaded = useGoogleMaps('AIzaSyDF2rKGbY2nhUoe1rKcI3DhUKM_HZu2oUY');
  const mapRef = useRef(null);

  function handleLocationError(browserHasGeolocation, infoWindow, pos, map) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(map);
  }

  useEffect(() => {
    if (!isLoaded) return;

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: center,
      zoom: 8,
    });

    const service = new window.google.maps.places.PlacesService(map);

    map.addListener('click', (event) => {
      const request = {
        location: event.latLng,
        radius: '50', 
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          

          const place = results[0];
            new window.google.maps.Marker({
              position: place.geometry.location,
              map: map,
              icon: customIcon,
              title: place.name,
            });

          // Log sorted place details or do something with them
          toast.success("successfully placed marker")
        } else {
          toast.error("couldn't place marker");
        }
      });
    });

    const infoWindow = new window.google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");
    map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);
    locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter(), map);
        },
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter(), map);
    }
  });

    mapRef.current = map;
  }, [isLoaded]);

  return <div id="map" style={mapContainerStyle}></div>;
};

export default MapWithClickableCustomMarkers;



/*import React, { Component } from 'react';

class MarkerMap extends Component {

    componentDidMount() {

        // Load the Google Maps JavaScript API

        const script = document.createElement('script');

        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDF2rKGbY2nhUoe1rKcI3DhUKM_HZu2oUY&libraries=places`;

        script.async = true;

        script.defer = true;

        script.onload = this.initMap;

        document.head.appendChild(script);
    }

    initMap() {

        // Initialize the map

        const map = new window.google.maps.Map(document.getElementById('map'), {    

            center: { lat: 37.7749, lng: -122.4194 }, // Set your initial map center coordinates

            zoom: 12, // Set the initial zoom level

        });

        // Add markers to the map

        const marker = new window.google.maps.Marker({

            position: { lat: 37.7749, lng: -122.4194 }, // Set marker coordinates

            map: map,

            icon: '/logo192.png', // Path to your custom marker icon

            title: 'Custom Marker',

        });

    }

    render() {

        return <div id="map" style={{ width: '50%', height: '50vh' }}></div>;

    }

}

export default MarkerMap;*/