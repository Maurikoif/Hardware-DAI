import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

const Clima = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [temperatura, setTemperatura] = useState(null);
  const [fechaHora, setFechaHora] = useState(null);
  const [pais, setPais] = useState(null);
  const [ciudad, setCiudad] = useState(null);
  const [barrio, setBarrio] = useState(null);

  useEffect(() => {
    (async () => 
    
    {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      
      const fechaHoraActual = new Date();
      const fechaHoraFormateada = `${fechaHoraActual.toLocaleDateString()} ${fechaHoraActual.toLocaleTimeString()}`;
      setFechaHora(fechaHoraFormateada);

      
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}&addressdetails=1`;
      await axios.get(url)
      .then((response) => {
        const address = response.data.address;
        console.log("ADDRESS", response.data.address)
        setPais(address.country);
      setCiudad(address.city || address.town || address.village || address.hamlet || address.state);
      setBarrio(address.neighbourhood || address.suburb || address.suburb || address.state_district);
      })
      .catch((error) => {
        alert(error);
      });
      
      
      
    if (location) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&APPID=0cd4c845628a93ee3dd46acea3646046&units=metric`;
      await axios.get(url)
        .then((response) => {
          const Temperatura = response.data.main.temp;
          setTemperatura(`${Temperatura} °C`);
        })
        .catch((error) => {
          alert(error);
        });
    }
    })();
  }, []);

  

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Fecha y Hora: ${fechaHora}\nUbicación: ${pais} ${ciudad}, ${barrio} \nTemperatura: ${temperatura}`;
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
