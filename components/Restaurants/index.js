import React, {useEffect, useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Dimensions, Text, View} from 'react-native';
import styles from './restaurantStyles';
import Geolocation from 'react-native-geolocation-service';
import {requestLocationPermission} from '../Helpers/locationPermission';
import {getRestaurants} from './service';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Restaurants = () => {
  const [location, setLocation] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const initializeLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        getLocation();
      }
    };

    initializeLocation();
  }, []);

  useEffect(() => {
    if (location?.coords) {
      getNearbyRestaurants(location.coords.latitude, location.coords.longitude);
    }
  }, [location]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log('Location acquired', position);
        setLocation({
          coords: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          },
        });
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const getNearbyRestaurants = async (lat, lon) => {
    try {
      const {data} = await getRestaurants(lat, lon);
      if (data) {
        setRestaurants(data.results);
      }
    } catch (err) {
      console.log('Error fetching restaurants', err);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          {restaurants.map(restaurant => (
            <Marker
              key={restaurant.place_id}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
              title={restaurant.name}
            />
          ))}
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default Restaurants;
