import { useState } from 'react'
import * as Contacts from 'expo-contacts';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const Contactos = () => {
    const [contactos, setContactos] = useState([{}])
    const [ numeroEmergencia, setNumeroEmergencia] = useState('')

    const getNumeroEmergencia = async () => {
        try {
            const value = await AsyncStorage.getItem('numeroEmergencia');
            
            if (value) {
                return value
            }
        } catch (error) {
            alert("Error retrieving emergency number:", error);
        }
    }
    const requestPermissionsAsync = async () => {
        try {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.Name,
                        Contacts.Fields.LastName,
                        Contacts.Fields.PhoneNumbers,
                    ],
                });
                
                return data
            }
        } catch (error) {
            alert("Error retrieving contacts:", error);
        }
    };

    


    
    
    useFocusEffect(
        
        useCallback(() => {
            const fetchData = async () => {
                try {
                    setNumeroEmergencia(await getNumeroEmergencia());
                    setContactos(await requestPermissionsAsync());
                } catch (error) {
                    console.error('Error en fetchData:', error);
                }
            };
            
            fetchData();        
        },[]))

    const Item = ({ Name, LastName, PhoneNumbers}) => (
        
        Name != '' ? (
        <View style={styles.container} >

            <Text style={styles.Name}>
                Nombre: {Name} {LastName}
            </Text>
            {PhoneNumbers.map((p) =>
                p.number === numeroEmergencia ? ( 
                <Text style={styles.NumeroEmergencia} key={p.id}> {p.number}</Text>  
                ) : (
                    <Text key={p.id} >{p.number} </Text>
                )
            )}
            <Text> ----------------------------- </Text>
        </View>): null
    );

    return (
        <>
        <Text style={styles.Titulo}>Lista de Contactos</Text>
            <FlatList
                data={contactos}
                renderItem={({item}) =>
                    <Item
                        Name={item.firstName ?? ''}
                        LastName={item.lastName ?? ''}
                        PhoneNumbers={item.phoneNumbers ?? []} 
                        key={item.id}
                        />}

            />
        </>
    )
}

export default Contactos

const styles = StyleSheet.create({
    Name:{
        fontSize: 17,
        
    },
    Titulo:{
        fontSize: 40,
    },
    NumeroEmergencia:{
        backgroundColor: "red",
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1,
      },
    
})