import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: 'AIzaSyDF2rKGbY2nhUoe1rKcI3DhUKM_HZu2oUY',
  libraries: ['places'],
  id: '__googleMapsScriptId',
});

export default loader;
