import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';




const Scanner = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [nombres, setNombres] = useState();

  
  const handleBarCodeScanned = ({ type, data }) => {
    setNombres(data);
    setScanned(true);
  };

  const handlePress = () =>{
    setScanned(false) 
    setNombres("")
  }

  if(!permission){
    return <View/>
  }
  return (
    <View style={styles.container}>
      {!permission.granted ? (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>
            We need your permission to show the camera
          </Text>
          <Button onPress={requestPermission} title="Grant Permission" />
        </View>
      ) : (
        <View style={styles.scannerContainer}>
          {nombres && (
            <Text style={styles.nombres}>El proyecto es de {nombres}</Text>
          )}
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.scannerContainer}
          />
          {!nombres && <Text style={styles.placeholderText}>Escanea un QR</Text>}
          {scanned && (
            <Button
              style={styles.reescanear}
              title={'Tap to Scan Again'}
              onPress={() => handlePress()}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  messageText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scannerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end', // Alinea el contenido en la parte inferior
  },
  nombres: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  placeholderText: {
    textAlign: 'center',
  },
  reescanear: {
    marginTop: 20,
    backgroundColor: '#007bff',
    color: '#fff',
  },
});

export default Scanner;
