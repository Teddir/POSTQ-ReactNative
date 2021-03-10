import React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { styles, colors } from '../style';
import LottieView from 'lottie-react-native';

const ButtonView = ({onPress, title, loading, dark, disabled, off}) => {
    return (
        <TouchableNativeFeedback
        disabled={loading ? true : disabled}
        onPress={() => (onPress ? onPress() : null)}>
            <View
            style={[
                dark ? {
                    borderWidth:1,
                    borderColor:"grey", 
                    backgroundColor:"white",
                    borderRadius: 5,
                    paddingVertical: 16,
                    alignItems: 'center',
                    // elevation: 20,
                } : {
                    borderRadius: 5,
                    paddingVertical: 16,
                    alignItems: 'center',
                    elevation: 20,
                    backgroundColor: colors.asli,                    
                },
                off ? styles.backgroundTen : null
            ]}>
            {loading ? (
                <LottieView
                    source={require('../assets/lottie/8308-loading.json')}
                    autoPlay
                    loop
                    style={{paddingVertical:10, height:10, justifyContent: 'center'}}
                />
            ) : (
                <Text
                style={[
                    dark ?
                    {
                        color:"grey",
                        textTransform: "uppercase",
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "700"
                    } : {
                        color:"white",
                        textTransform: "uppercase",
                        textAlign: "center",
                        fontSize: 14,
                        fontWeight: "700"
                    }
                ]}>
                {title}
                </Text>
            )}
            </View>
        </TouchableNativeFeedback>
    )
}

export default ButtonView
