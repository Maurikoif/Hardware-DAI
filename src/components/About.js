import { Camera, CameraType } from "expo-camera";
import { useState} from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-qr-code";

const About = ({ navigation }) => {
  const handleQR=()=>{
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        ></Modal>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.qrContainer}>
        <QRCode
          className="QR"
          size={256}
          value="Federico Chediex y Mauri Koifman"
          viewBox={`0 0 256 256`}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Escanear QR"
          onPress={() => navigation.navigate("ScanQr")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%', // Puedes ajustar el ancho según tus preferencias
  },
  QR: {
    height: 'auto',
    maxWidth: 64,
    width: '100%',
  },
});

export default About;
