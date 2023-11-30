import { Button, Vibration } from "react-native"
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Accelerometer } from 'expo-sensors';
import * as Linking from 'expo-linking';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const Home = ({navigation}) => {
    const [numeroEmergencia, setNumeroEmergencia] = useState('');

    
    useFocusEffect(     
      useCallback(() => {
        let isActive = true;
        const fetchNumero = async () => {
            try {
                const value = await AsyncStorage.getItem('numeroEmergencia');
                
                if (value) {
                  setNumeroEmergencia(value);
                }
              } catch (error) {
                alert("Error retrieving emergency number:", error);
              }
            }
        fetchNumero()
        
      const subscription = Accelerometer.addListener(handleShake)
      return () => {
        subscription.remove();
        isActive = false;
      }
      },[numeroEmergencia]))
    
      const handleShake = ({ x, y, z }) => {
        
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        if (acceleration > 5) { 
          sendWhatsAppMessage();
        }
      };
    
      const sendWhatsAppMessage = async () => {
        
        try {
          if (numeroEmergencia) {
            Vibration.vibrate();
            const message = "¡Emergencia! Necesito ayuda.";
            const whatsappLink = `https://wa.me/${numeroEmergencia}?text=${encodeURIComponent(message)}`;
    
            // Abre el enlace en WhatsApp
            Linking.openURL(whatsappLink);
          } else {
            console.log("oasldkoasd", numeroEmergencia)
            alert("Número de emergencia no válido");
          }
        } catch (error) {
          alert("Error al enviar mensaje de WhatsApp:", error);
        }
      };
    return(
        <>
        <Button title = "Video" onPress={()=> navigation.navigate('Video')}/>
        <Button title = "About" onPress={() => navigation.navigate('About')}/>
        <Button title = "Clima" onPress={() => navigation.navigate('Clima')}/>
        <Button title = "Contactos" onPress={() => navigation.navigate('Contactos')}/>
        <Button title = "Emergencia" onPress={() => navigation.navigate('Emergencia')}/>
        </>
    )
}

export default Home