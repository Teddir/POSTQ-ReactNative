import React from 'react'
import { View, Text, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native';


const index = () => {
    const navigation = useNavigation();

    return (
        <View>
            <Text>Hy Teddi This is screen user</Text>
            <Button title="Open" onPress={() => navigation.openDrawer()}/>
        </View>
    )
}

export default index
