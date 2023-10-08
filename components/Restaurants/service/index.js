import axios from 'axios';
import {GOOGLE_MAP_API_KEY} from '@env';
export const getRestaurants = (lat, lon) => {
  return axios.post(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=600&type=restaurant&key=${GOOGLE_MAP_API_KEY}`,
  );
};
