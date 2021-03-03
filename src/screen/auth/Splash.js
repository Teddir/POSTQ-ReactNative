import React from 'react'
import { View, Text, StatusBar, ActivityIndicator } from 'react-native'
import { colors, styles } from '../../style';
import Logo from '../../assets/img/Splash';

const Splash = () => {
    return (
        <View style={[styles.flex1, styles.centercenter]}>
            <StatusBar backgroundColor={colors.lightBg} barStyle="dark-content"/>
            <Logo />
            <Text style={[styles.textH2, styles.textSecondary]}>Kasir & Pembayaran</Text>
            <Text style={[
                styles.textH3,
                styles.textSecondary,
                styles.textCenter,
                styles.marginVXL,
            ]}>
            Ayo mulai usahamu dengan POSTQ, {'\n'} yang akan membantu proses transaksi anda {'\n'}lebih mudah dan tertata rapi.
            </Text>
            <ActivityIndicator color={colors.secondary} size="large"/>
        </View>
    );
};

export default Splash
