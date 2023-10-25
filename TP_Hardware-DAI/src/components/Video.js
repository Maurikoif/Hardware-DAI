import { useState } from "react";
import { SafeAreaView, TextInput, Text} from "react-native";

const Video = () => {
    const [url, setUrl] = useState("")


    return(
        <SafeAreaView>
            <Text>Ingresa el URL del video</Text>
            <TextInput/>
        </SafeAreaView>
    )
}

export default Video