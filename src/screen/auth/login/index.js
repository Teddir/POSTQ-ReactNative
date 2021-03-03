import React from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import ButtonLog from '../../../components/ButtonLog'
import { colors, styles } from '../../../style'
import Kasir from '../../../assets/img/kasir';

const index = (props) => {
    return (
        <View style={[styles.flex1, styles.grey]}>
            <StatusBar backgroundColor={colors.grey} barStyle="dark-content"/>
            <View style={[styles.container]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="chevron-left" size={20} color={colors.blackBg}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.marginVs, styles.marginHm]}>
                <Text
                style={[
                    styles.textH2,
                    styles.marginHm, 
                ]}>
                Selamat Datang</Text>
                <Text
                style={[
                    styles.textH4,
                    styles.marginHm, 
                ]}>
                Untuk melanjutkan, pilih masuk sebagai :
                </Text>
                <View style={[styles.marginVm]}>
                <ButtonLog
                title="Owner / Staff"
                onPress={() => props.navigation.navigate('LogStaff')}
                />
                <ButtonLog
                title="Kasir"
                onPress={() => props.navigation.navigate('LogKasir')}
                />
                <Text style={[styles.marginHm]}>
                    Belum punya akun ? 
                    <Text
                    style={{color: 'blue'}}
                    onPress={() => props.navigation.navigate('Register')}
                    > Daftar Akun</Text>
                </Text>
                </View>
            </View>
        </View>
    )
}

export default index
