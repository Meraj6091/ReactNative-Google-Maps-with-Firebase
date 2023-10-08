import React from 'react';
import {StyleSheet, Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MapIcon from 'react-native-vector-icons/FontAwesome5';
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Weather from '../Weather';
import Restaurants from '../Restaurants';
import auth from '@react-native-firebase/auth';
import {showErrorMsg} from '../Helpers/toast';

export default function Navigation() {
  const Tab = createBottomTabNavigator();

  const handleSignout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('signout');
      })
      .catch(error => {
        showErrorMsg(error.message, 'error');
      });
  };
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Weather"
          component={Weather}
          options={({navigation}) => ({
            headerRight: () => (
              <View style={styles.headerButtonContainer}>
                <Button title="SignOut" onPress={handleSignout} color="red" />
              </View>
            ),
            tabBarBadge: 16,
            tabBarIcon: ({color, size}) => (
              <WeatherIcon
                name="weather-cloudy-clock"
                size={size}
                color={color}
              />
            ),
          })}
        />
        <Tab.Screen
          name="Restaurants"
          component={Restaurants}
          options={({navigation}) => ({
            headerRight: () => (
              <View style={styles.headerButtonContainer}>
                <Button title="SignOut" onPress={handleSignout} color="red" />
              </View>
            ),
            tabBarIcon: ({color, size}) => (
              <MapIcon name="map-marker-alt" size={size} color={color} />
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    marginRight: 10,
  },
});
