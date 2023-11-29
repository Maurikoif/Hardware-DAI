import { useEffect, useState } from 'react'
import * as Contacts from 'expo-contacts';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
} from 'react-native';

//Falta mostrar contacto de emergencia

const Contactos = () => {
    const [contactos, setContactos] = useState([{}])
    const [ numeroEmergencia, setNumeroEmergencia] = useState('')

    useEffect(() => {
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.Name,
                        Contacts.Fields.LastName,
                        Contacts.Fields.PhoneNumbers,
                    ],
                })

                setContactos(data)
            }
        })();
    }, []);

    const Item = ({ Name, LastName, PhoneNumbers }) => (
        Name != '' ? (
        <View >

            <Text style={styles.Name}>
                {Name} {LastName}
            </Text>
            {PhoneNumbers.map((p) =>
                p.number === numeroEmergencia ? ( <Text style={styles.NumeroEmergencia}>{p.number}</Text>  ) : <Text >{p.number}</Text> 
             
                
            )}
        </View>): null
    );

    return (
        <>
        <Text style={styles.Titulo}>Lista de Contactos</Text>
            <FlatList
                data={contactos}
                renderItem={({ item}) =>
                    <Item
                        Name={item.firstName ?? ''}
                        LastName={item.lastName ?? ''}
                        PhoneNumbers={item.phoneNumbers ?? []} 
                        key={item.id}/>}

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
    }
})