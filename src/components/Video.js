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
    <View >
      <Text>Ingresa el URL del video</Text>

      <TextInput
        
        placeholder="Ingrese un URL"
        onChangeText={(newUrl) => handleChange(newUrl)}
      />
      <Text >Ejemplo: https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4</Text>
      <View >
        <Video
          ref={video}
          
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


export default VideoFavorito;
