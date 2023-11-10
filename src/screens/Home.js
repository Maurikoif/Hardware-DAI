import { Button } from "react-native"

const Home = ({navigation}) => {


    return(
        <>
        <Button title = "Video" onPress={()=> navigation.navigate('Video')}/>
        <Button title = "About" onPress={() => navigation.navigate('About')}/>
        <Button title = "Clima" onPress={() => navigation.navigate('Clima')}/>
        
        </>
    )
}

export default Home