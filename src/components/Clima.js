import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const Clima = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [temperatura, setTemperatura] = useState(null);
  
    useEffect(() => {
      (async () => {
        if (Platform.OS === 'android' && !Device.isDevice) {
          setErrorMsg(
            'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
          );
          return;
        }
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    useEffect(() => {
      // Renderizar el componente nuevamente cuando la temperatura cambie
      // Esto asegurará que la temperatura se muestre siempre que esté disponible
      if (temperatura) {
        // Renderizar el componente
      }
    }, [temperatura]);
  
    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=b5606a622aaee26d1e6f3b7d32745e7a`;
      axios
        .get(url)
        .then((response) => {
          const Temperatura = response.data.main.temp;
          setTemperatura(`${Temperatura} °C`);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = `Temperatura: ${temperatura}`;
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Clima;