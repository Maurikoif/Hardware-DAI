import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/screens/Home'
import VideoFavorito from './src/components/Video';
import About from './src/components/About';
import Scanner from './src/components/QrCamara';
import Clima from './src/components/Clima'
import Contactos from './src/components/Contactos';
import Emergencia from './src/components/Emergencia'

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName = "Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Video" component={VideoFavorito}/>
        <Stack.Screen name="About" component={About}/>
        <Stack.Screen name="ScanQr"component={Scanner}/>
        <Stack.Screen name="Clima" component={Clima}/>
        <Stack.Screen name="Contactos" component={Contactos}/>
        
        <Stack.Screen name="Emergencia" component={Emergencia}/>
        
      </Stack.Navigator>
      
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
