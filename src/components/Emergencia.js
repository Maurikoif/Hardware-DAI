import { useState, useEffect } from 'react'
import { Button, Text, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Emergencia = ({navigation}) => {
    const [numeroEmergencia, setNumeroEmergencia] = useState('')
   

    useEffect(() => {
        console.log('Propiedad navigation:', navigation);
        // Use AsyncStorage.getItem inside useEffect to retrieve the value
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
    }, []);


    const handleChange = (number) => {
        if (validarTelefono(number) == true) {
            setNumeroEmergencia(number)
            console.log('Numero Valido', number);
        }


    };

    const validarTelefono = (numeroEmergencia) => {
        const re = /^\+?[0-9]{1,15}$/;
        return re.test(numeroEmergencia);
    };

    const handleGuardar = async () => {
        try {
          await AsyncStorage.setItem('numeroEmergencia', numeroEmergencia);
          console.log('Número de emergencia guardado con éxito');
          navigation.navigate('Home')
        } catch (error) {
          console.error('Error al guardar el número de emergencia:', error);
        }
        
      };
    

    return (
        <>
            <Text>Configurar Numero de Emergencia</Text>
            <Text>Numero Emergencia Actual : {numeroEmergencia}</Text>
            <TextInput

                placeholder="Ingrese un numero de Emergencia"
                onChangeText={(number) => handleChange(number)}
            />
            <Button title="Guardar" onPress={handleGuardar} />
        </>
    )
}

export default Emergencia
