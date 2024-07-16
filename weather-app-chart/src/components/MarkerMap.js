import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import useGoogleMaps from './hooks/useMap';
import loader from './GoogleMapsLoader'; 
import { storeShelterLocations, getShelterLocations } from '../helpers/api-comm';
import WeatherComponent from './CoordinateWeather';
import { alignProperty } from '@mui/material/styles/cssUtils';
import { useAuth } from '../context/AuthContext';
const mapContainerStyle = {
  width: '70vw',
  height: '70vh',
  margin: '50px auto',
  alignProperty: 'center',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const currentLocationIcon = {
  path: window.google?.maps?.SymbolPath.CIRCLE || 'M0,0',
  fillColor: 'black',
  fillOpacity: 1,
  scale: 6,
  strokeColor: 'white',
  strokeWeight: 1,
};

const customIcon = '/house.png';

const MapWithClickableCustomMarkers = () => {
  const mapRef = useRef(null);
  const [locationArray, setLocationArray] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [distance, setDistance] = useState(null)
  const [duration, setDuration] = useState(null);
  const [nearestCalc, setNearestCalc] = useState(false);

  const auth = useAuth();
  const role = auth.role;
  console.log('at the begin;;', role);


  const handleLocationError = (browserHasGeolocation, infoWindow, pos, map) => {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  };

  const handleSave = async () => {
    console.log("save func reached");
    const wholeResponse = await storeShelterLocations(locationArray);
    console.log(wholeResponse);
    toast.success(wholeResponse.message);
  };

  const getPlaceName = (lat, lng, callback) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlng = { lat, lng };
    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        callback(results[0].formatted_address);
      } else {
        callback('Unknown Location');
      }
    });
  };


  useEffect(() => {
  
   // setRole(auth.role);

    console.log('auth role is: ',auth.role);
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
      if(role === 'authority')
      {
        map.addListener('click', (event) => {
        const clickedLocation = event.latLng;
        getPlaceName(clickedLocation.lat(), clickedLocation.lng(), (name) => {
          new window.google.maps.Marker({
            position: clickedLocation,
            map: map,
            icon: customIcon,
            title: name,
          });

          const newLocation = { name, lat: clickedLocation.lat(), lng: clickedLocation.lng() };
          setLocationArray((prevArray) => {
            const updatedArray = [...prevArray, newLocation];
            console.log('Updated location array:', updatedArray);
            return updatedArray;
          });

          toast.success('Successfully placed marker');
        });
      });
    }

      const infoWindow = new window.google.maps.InfoWindow();
      const locationButton = document.createElement('button');

      locationButton.textContent = 'Pan to Current Location';
      locationButton.classList.add('custom-map-control-button');
      map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(locationButton);


      const getCurrentLocationAtLoad = () => {
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
              console.log( position.coords.accuracy )
            },
            /*async () => {
              const response = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDF2rKGbY2nhUoe1rKcI3DhUKM_HZu2oUY', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({ considerIp: true })
                  });
              const data = await response.json();

              console.log(data)

              const pos = {
                lat: data.location.lat,
                lng: data.location.lng,
              };

              setCurrentLocation(pos);
              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              infoWindow.open(map);
              map.setCenter(pos);

            },*/
            () => {
              handleLocationError(true, infoWindow, map.getCenter(), map);
            },{
              enableHighAccuracy: true,
            }
          );
        } else {
          handleLocationError(false, infoWindow, map.getCenter(), map);
        }
      }
      getCurrentLocationAtLoad();

      locationButton.addEventListener('click', 
        () => {
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
              console.log( position.coords.accuracy )
            },
            /*async () => {
              const response = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDF2rKGbY2nhUoe1rKcI3DhUKM_HZu2oUY', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({ considerIp: true })
                  });
              const data = await response.json();

              console.log(data)

              const pos = {
                lat: data.location.lat,
                lng: data.location.lng,
              };

              setCurrentLocation(pos);
              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              infoWindow.open(map);
              map.setCenter(pos);

            },*/
            () => {
              handleLocationError(true, infoWindow, map.getCenter(), map);
            },{
              enableHighAccuracy: true,
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

  const handleGet = async () => {
    console.log(locationArray);
    console.log("get func reached");
  
    try {
      const wholeResponse = await getShelterLocations(); 
      console.log(wholeResponse);
  
      const newShelters = wholeResponse.shelters.map((shelter) => ({
        name: shelter.name,
        lat: parseFloat(shelter.lat),
        lng: parseFloat(shelter.lng)
      }));
  
      setLocationArray((prev) => [...prev, ...newShelters]);

      if (mapRef.current) {
        newShelters.forEach((place) => {
          new window.google.maps.Marker({
            position: { lat: place.lat, lng: place.lng },
            map: mapRef.current,
            icon: customIcon,
            title: place.name,
          });
        });
      }

      console.log("location array from handleget", locationArray);
    } catch (error) {
      console.error('Error fetching shelters:', error);
    }
  };

  const findNearestLocation = () => {
    if (!currentLocation || locationArray.length === 0) {
      toast.error('Current location or locations array is not available');
      return;
    }

    const distanceService = new window.google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [currentLocation],
        destinations: locationArray.map(location => ({ lat: location.lat, lng: location.lng })),
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
          setDistance(response.routes[0].legs[0].distance.text);
          setDuration( response.routes[0].legs[0].duration.text );
          setNearestCalc(true);

          directionsRenderer.setDirections(response);
        } else {
          toast.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  async function getDisasterPredictions() {
    try {
        const earthquakeData = await fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-07-01&endtime=2023-07-11');
        const earthquakeJson = await earthquakeData.json();

        console.log('Earthquake Data:', earthquakeJson);
        
        // Process and display the data in your app
    } catch (error) {
        console.error('Error fetching disaster predictions:', error);
    }
      }


  return (
    <div>
      
      { nearestCalc?( <>
        <div id="map" style={mapContainerStyle}></div>
        <h3> Distance: {distance}     Duration: {duration} </h3>
        <button type="button" onClick={findNearestLocation}>
          Get Nearest Route
        </button>
        <button type="button" onClick={handleGet}>
          Get all locations
        </button>
        {role === 'authority' && (  <> <button type="button" onClick={handleSave}>
          Save all shelters
        </button>  </>)}
        <button type="button" onClick={getDisasterPredictions}>
          Get earthquake predictions
        </button>
        </>
      ) : 
      (
        <>
        <div id="map" style={mapContainerStyle}></div>
        <button type="button" onClick={findNearestLocation}>
          Get Nearest Route
        </button>
        <button type="button" onClick={handleGet}>
          Get all locations
        </button>
        {role === 'authority' && (  <> <button type="button" onClick={handleSave}>
          Save all shelters
        </button>  </>)}
        <button type="button" onClick={getDisasterPredictions}>
          Get earthquake predictions
        </button>
     
        </>
      )}
         {currentLocation && (
        <WeatherComponent lat={currentLocation.lat} lon={currentLocation.lng} />
        )}
    </div>
  );
};

export default MapWithClickableCustomMarkers;
