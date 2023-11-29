import { Button, Vibration } from "react-native"
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Accelerometer } from 'expo-sensors';
import * as Linking from 'expo-linking';

const Home = ({navigation}) => {
    const [numeroEmergencia, setNumeroEmergencia] = useState('');

    useEffect(() => {
        
        const fetchNumero = async () => {
            try {
                const value = await AsyncStorage.getItem('numeroEmergencia');
                if (value) {
                  setNumeroEmergencia(value);
                }
              } catch (error) {
                console.log("Error retrieving emergency number:", error);
              }
            }
        fetchNumero()
  
      const subscription = Accelerometer.addListener(handleShake);
      return () => {
        subscription.remove();
        console.log("asdjsjd", numeroEmergencia)
      };
    }, []);
    
      const handleShake = ({ x, y, z }) => {
        // Detecta una sacudida basada en los valores del acelerómetro
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        if (acceleration > 2.5) { // Puedes ajustar este umbral según sea necesario
          sendWhatsAppMessage();
        }
      };
    
      const sendWhatsAppMessage = async () => {
        console.log(numeroEmergencia)
        try {
          // Obtiene el número de emergencia almacenado
          
    
          if (numeroEmergencia) {
            Vibration.vibrate();
            const message = "¡Emergencia! Necesito ayuda.";
            const whatsappLink = `https://wa.me/${numeroEmergencia}?text=${encodeURIComponent(message)}`;
    
            // Abre el enlace en WhatsApp
            Linking.openURL(whatsappLink);
          } else {
            console.log("Número de emergencia no válido");
          }
        } catch (error) {
          console.error("Error al enviar mensaje de WhatsApp:", error);
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