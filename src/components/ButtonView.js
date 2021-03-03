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
                styles.button,
                dark ? styles.backgroundPrimary : styles.backgroundSecondary,
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
                    styles.textWhite,
                    styles.textUppercase,
                    styles.textCenter,
                    styles.textMedium
                ]}>
                {title}
                </Text>
            )}
            </View>
        </TouchableNativeFeedback>
    )
}

export default ButtonView
