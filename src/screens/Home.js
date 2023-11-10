import { Button } from "react-native"

const Home = ({navigation}) => {


    return(
        <>
        <Button title = "Video" onPress={()=> navigation.navigate('Video')}/>
        <Button title = "IdApp"/>
        <Button title = "Fondo de Pantalla" onPress={() => navigation.navigate('FondoPantalla')}/>
        <Button title = "Clima" onPress={() => navigation.navigate('Clima')}/>
        
        </>
    )
}

export default Home