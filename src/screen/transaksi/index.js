import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';

import { styles, colors } from '../../style';
import { getProduk } from '../../services/endpoint/produk';
import { getKategori } from '../../services/endpoint/kategori';
const index = () => {

    const navigation = useNavigation();

    const getData = () => {
        getProduk();
        getKategori();
    }

    useEffect(() => {
        const unsub = navigation.addListener('focus', () =>{
            getData();
        });
        return unsub;
    }, [navigation]);

    return (
        <View style={[styles.flex1]}>
            <StatusBar backgroundColor={colors.blackBg} barStyle="light-content"/>
            <View style={[styles.container, styles.row]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                </TouchableOpacity>
                <Text style={[
                    styles.marginHm,
                    styles.centerItem,
                    styles.textUpH3
                ]}>Detail Pesanan</Text>
            </View>
            <View style={[styles.underCross, {elevation: 3}]}/>
            <Text>hy Teddi</Text>
        </View>
    )
}

export default index
