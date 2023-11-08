import { useState, useRef, useEffect } from "react";
import * as React from 'react';
import { View, SafeAreaView, TextInput, Text, Button, StyleSheet } from "react-native";
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoFavorito = () => {
    const [url, setUrl] = useState()
    const video = useRef(null);
    const [status, setStatus] = useState({});
    
    useEffect(() => {
        obtenerUrl()
    }, []);

    const obtenerUrl = async () => {
        try  {
            const value = await AsyncStorage.getItem('url');
            if (value !== null) {
              setUrl(value);
            }
        } catch (error) {
            console.log("isdjidsaijdsai")
          }
    }
    
    const handleChange = (newUrl) => {
        setUrl(newUrl)
        AsyncStorage.setItem("url", newUrl);
    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Ingresa el URL del video</Text>

                <TextInput  style={styles.input} onChangeText={newUrl => handleChange(newUrl)} />
                <Text style={styles.title}>Ejemplo: https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4</Text>
                <Video
                    ref={video}
                    style={styles.video}
                    source={{
                        uri: url,
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
                <View style={styles.buttons}>
                    <Button
                        title={status.isPlaying ? 'Pause' : 'Play'}
                        onPress={() =>
                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }
                    />
                </View></View>
        </SafeAreaView>
    )
}


export default VideoFavorito

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    video: {
        flex: 0.2,
    }


})