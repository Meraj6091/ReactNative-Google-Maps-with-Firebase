import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import styles from './weatherStyles';
import {weatherDetails} from './service';

export default function Weather() {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    getWeatherDetails();
  }, []);

  const getWeatherDetails = async () => {
    try {
      const {data} = await weatherDetails();
      if (data && data.daily) {
        setWeatherData(data.daily);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text style={styles.dateText}>
        Date: {new Date(item.dt * 1000).toLocaleDateString()}
      </Text>
      <Text style={styles.summaryText}>Summary: {item.summary}</Text>
      <Text style={styles.tempText}>Temperature: {item.temp.day} °C</Text>
      <Text style={styles.humidityText}>Humidity: {item.humidity}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>16-Day Weather Forecast</Text>
      <FlatList
        data={weatherData}
        renderItem={renderItem}
        keyExtractor={item => item.dt.toString()}
        style={styles.flatList}
      />
    </View>
  );
}
