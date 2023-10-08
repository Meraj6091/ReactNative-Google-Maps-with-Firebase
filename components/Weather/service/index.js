import axios from 'axios';
import {OPEN_WEATHER_API_KEY, OPEN_WEATHER_API_URL} from '@env';
export const weatherDetails = () => {
  return axios.get(
    `${OPEN_WEATHER_API_URL}/onecall?lat=6.9288816&lon=79.9347619&exclude=current,minutely,hourly,alerts&units=metric&cnt=16&appid=${OPEN_WEATHER_API_KEY}`,
  );
};
