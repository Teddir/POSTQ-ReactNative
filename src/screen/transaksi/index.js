import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from '@react-navigation/native';

import { styles, colors } from '../../style';
import { getProduk } from '../../services/endpoint/produk';
import { getKategori } from '../../services/endpoint/kategori';

const index = ({route}) => {
    const navigation = useNavigation();
    const [total, setTotal] = useState(0); 

    const getData = () => {
        getProduk();
        getKategori();
    }

    console.log('ini listData', route.params);

    useEffect(() => {
        // console.log(listData);
        try {
            if (route.params.length > 0) {
                const totalJual = route.params.reduce((acumu, current) => {
                    return (
                        acumu + parseFloat(current.hj)
                    )
                },0)
                setTotal(totalJual);
            }
        } catch (error) {
            console.log(error);
        }
    },[route.params]);

    const goback = () => {
        getData();

        navigation.goBack();
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
                <TouchableOpacity onPress={() => goback()}>
                    <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                </TouchableOpacity>
                <Text style={[
                    styles.marginHm,
                    styles.centerItem,
                    styles.textUpH3
                ]}>Detail Pesanan</Text>
            </View>
            <View style={[styles.underCross, {elevation: 3}]}/>
            {route.params.map((data) => {
                return (
                    <View key={data.id} style={[styles.backgroundAsli]}>
                    <View>
                            <View style={[styles.marginHm]}>
                            <Text>{data.hj}</Text>
                            </View>
                            <View style={[styles.underCross]}/>
                        </View>
                    </View>
                )
            })}
            <Text>Subtotal {total}</Text>
            <Text></Text>
        </View>
    )
}

export default index
