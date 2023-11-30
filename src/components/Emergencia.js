import { useState, useEffect } from 'react'
import { Button, Text, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Emergencia = ({ navigation }) => {
  const [numeroEmergencia, setNumeroEmergencia] = useState('')


 

    useEffect(() => {
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
  },[])


  const handleChange = (number) => {

    setNumeroEmergencia(number)

  };

  const validarTelefono = (number) => {
    const re = /^\+?[0-9]{1,15}$/;
    return re.test(number);

  };

  const handleGuardar = async () => {
    if (validarTelefono(numeroEmergencia) == true && numeroEmergencia.length == 14 && numeroEmergencia.charAt(0) == "+") {
      try {

        await AsyncStorage.setItem('numeroEmergencia', numeroEmergencia);
        
        alert("Numero de Emergencia Guardado")
        navigation.navigate('Home')

      } catch (error) {
        alert('Error al guardar el número de emergencia:');
      }
    }
    else{
      alert('Error al guardar el número de emergencia:  Debe tener 14 digitos y empezar con +');
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
