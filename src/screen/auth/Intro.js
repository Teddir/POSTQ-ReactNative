import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import { colors, styles } from "../../style";
import Logo from '../../assets/img/catWelcome';
import LottieView from 'lottie-react-native';
import ButtonView from '../../components/ButtonView';

const Intro = (props) => {
    return (
        <View style={[styles.flex1, styles.backgroundNine]}>
            <StatusBar backgroundColor={colors.nine } barStyle="dark-content"/>
            <View style={[styles.flex1]}>
                <Text
                    style={[
                        styles.textH3,
                        styles.textCenter,
                        styles.textWhite,
                        styles.marginVXL
                    ]}>
                    Jadikan management bisnis anda lebih unggul.
                    </Text>
                <View style={[styles.flex1, styles.centercenter]}>
                <Logo />
                </View>
            </View>
            <View style={[styles.marginHxl]}>
                <View style={[styles.marginButton]}>
                    <ButtonView 
                    onPress={() => props.navigation.navigate('Login')}
                    title="Login"
                    />
                </View>
                <View style={[styles.marginButton]}>
                    <ButtonView 
                    onPress={() => props.navigation.navigate('Register')}
                    title="Register"
                    />
                </View>
            </View>
            {/* <Text>Hy Intro</Text> */}
        </View>
    )
}

export default Intro
