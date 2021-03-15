import React from 'react'
import { View, Text, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { styles, colors } from '../style';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ButtonViewIcon = ({onPress, title, loading, dark, disabled, off, name}) => {
    return (
        <TouchableNativeFeedback
        disabled={loading ? true : disabled}
        onPress={() => (onPress ? onPress() : null)}>
            
            <View
            style={[styles.centercenter,
                dark ? {
                    borderWidth:1,
                    borderColor:"grey", 
                    // backgroundColor:"grey",
                    borderRadius: 5,
                    paddingVertical: 10,
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
                <View style={[styles.marginHm]}>
                {name ? (
                    <View style={[styles.row]}>
                    <View style={[styles.marginHs]}>
                        <Icon name={name} size={15} color={colors.blackBg}/>  
                    </View>
                    <Text
                    style={[
                        dark ?
                        {
                            color:"black",
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
                    </View>
                ):  
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
                } 
                </View>                
            )}
            </View>
        </TouchableNativeFeedback>
    )
}

export default ButtonViewIcon
