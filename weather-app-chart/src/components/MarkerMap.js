import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import loader from './GoogleMapsLoader';

const mapContainerStyle = {
  width: '70vw',
  height: '70vh',
  margin: '50px'
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const customIcon = '/house.png';
const currentLocationIcon = {
  path: window.google?.maps?.SymbolPath.CIRCLE || 'M0,0',
  fillColor: 'black',
  fillOpacity: 1,
  scale: 6,
  strokeColor: 'white',
  strokeWeight: 1
};

const MapWithClickableCustomMarkers = () => {
  const mapRef = useRef(null);
  const [locationArray, setLocationArray] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  const handleLocationError = (browserHasGeolocation, infoWindow, pos, map) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  useEffect(() => {
    loader.load().then(() => {
      if (!window.google?.maps) {
        console.error('Google Maps API is not available.');
        return;
      }

      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: center,
        zoom: 8,
      });

      const directionsRendererInstance = new window.google.maps.DirectionsRenderer();
      directionsRendererInstance.setMap(map);
      setDirectionsRenderer(directionsRendererInstance);

      map.addListener('click', (event) => {
        const clickedLocation = event.latLng;

        new window.google.maps.Marker({
          position: clickedLocation,
          map: map,
          icon: customIcon,
          title: 'Clicked Location',
        });

        const newLocation = { lat: clickedLocation.lat(), lng: clickedLocation.lng() };
        setLocationArray((prevArray) => {
          const updatedArray = [...prevArray, newLocation];
          console.log('Updated location array:', updatedArray);
          return updatedArray;
        });

        toast.success('Successfully placed marker');
      });

      const infoWindow = new window.google.maps.InfoWindow();
      const locationButton = document.createElement('button');

      locationButton.textContent = 'Pan to Current Location';
      locationButton.classList.add('custom-map-control-button');
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);

      locationButton.addEventListener('click', () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setCurrentLocation(pos);
              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              infoWindow.open(map);
              map.setCenter(pos);

              new window.google.maps.Marker({
                position: pos,
                map: map,
                title: 'You',
                icon: currentLocationIcon
              });
            },
            () => {
              handleLocationError(true, infoWindow, map.getCenter(), map);
            }
          );
        } else {
          handleLocationError(false, infoWindow, map.getCenter(), map);
        }
      });

      mapRef.current = map;
    }).catch(error => {
      console.error('Error loading Google Maps API:', error);
    });
  }, []);

  const findNearestLocation = () => {
    if (!currentLocation || locationArray.length === 0) {
      toast.error('Current location or locations array is not available');
      return;
    }

    const distanceService = new window.google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [currentLocation],
        destinations: locationArray,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status !== 'OK') {
          toast.error('Error calculating distances');
          return;
        }

        const distances = response.rows[0].elements;
        let minDistance = Infinity;
        let nearestLocationIndex = -1;

        distances.forEach((element, index) => {
          if (element.status === 'OK' && element.distance.value < minDistance) {
            minDistance = element.distance.value;
            nearestLocationIndex = index;
          }
        });

        if (nearestLocationIndex !== -1) {
          const nearestLocation = locationArray[nearestLocationIndex];
          console.log('Nearest Location in array index = : ', nearestLocation);
          calculateAndDisplayRoute(nearestLocation);
        } else {
          toast.error('No nearest location found');
        }
      }
    );
  };

  const calculateAndDisplayRoute = (destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    if (directionsRenderer) {
      directionsRenderer.set('directions', null); // Clear previous route
    }

    directionsService.route(
      {
        origin: currentLocation,
        destination: destination,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          toast.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  return (
    <div>
      <div id="map" style={mapContainerStyle}></div>
      <button type="button" onClick={findNearestLocation}>
        Get Nearest Route
      </button>
      <button type="button" onClick={() => console.log(locationArray)}>
        Get all locations
      </button>
    </div>
  );
};

export default MapWithClickableCustomMarkers;
