import { useState, useRef, useEffect } from "react";
import * as React from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VideoFavorito = () => {
  const [url, setUrl] = useState();
  const video = useRef(null);
  const [status, setStatus] = useState({});

  useEffect(() => {
    obtenerUrl();
  }, []);

  const obtenerUrl = async () => {
    try {
      const value = await AsyncStorage.getItem("url");
      if (value !== null) {
        setUrl(value);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (newUrl) => {
    setUrl(newUrl);
    AsyncStorage.setItem("url", newUrl);
    console.log(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingresa el URL del video</Text>

      <TextInput
        style={styles.urlInput}
        placeholder="Ingrese un URL"
        onChangeText={(newUrl) => handleChange(newUrl)}
      />
      <Text style={styles.exampleText}>Ejemplo: https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4</Text>
      <View style={styles.videoContainer}>
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: url,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </View>
      <View>
        <Button
          title={status.isPlaying ? 'Pausa' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  urlInput: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    textAlign: 'center',
  },
  exampleText: {
    textAlign: 'center',
  },
  videoContainer: {
    //Falta centrarlo
    width: '100%',
    display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: '67%',
  },
  video: {
    width: '100%',
    height: 400,
  },
});

export default VideoFavorito;
