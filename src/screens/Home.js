import { Button } from "react-native"

const Home = ({navigation}) => {


    return(
        <>
        <Button title = "Video" onPress={()=> navigation.navigate('Video')}/>
        <Button title = "About" onPress={() => navigation.navigate('About')}/>
        
        </>
    )
}

export default Home