import React from 'react'
import { View, Text, TouchableNativeFeedback } from 'react-native'
import { styles, colors } from '../style';
import LottieView from 'lottie-react-native';
import Staff from '../assets/img/staff';

const ButtonLog = ({onPress, title, loading, dark, disabled, logo}) => {
    return (
        <TouchableNativeFeedback
        disabled={loading ? true : disabled}
        onPress={() => (onPress ? onPress() : null)}>
            <View
            style={[
                styles.buttonLog,
                dark ? styles.backgroundPrimary : styles.backgroundSecondary,
            ]}>
            
            <Text
            style={[
                styles.textWhite,
                styles.textUppercase,
                styles.textCenter,
                styles.textMedium
            ]}>
            {title}
            </Text>
            </View>
        </TouchableNativeFeedback>
    )
}

export default ButtonLog
