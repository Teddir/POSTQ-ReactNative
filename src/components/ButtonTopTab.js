import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    Splash,
    Intro,
    Login,
    LogStaff,
    LogKasir,
    Register,
    RegisterTwo,
    StaffScreen,
    ProdukInformationScreen,
    ProdukManagementScreen,
    ProdukKategoriScreen,
    
} from '../screen';
import {createStackNavigator} from '@react-navigation/stack';
import { styles, colors } from '../style';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import ButtonView from './ButtonView';
import { getProduk } from '../services/endpoint/produk';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const ButtonTopTab = (props) => {
    const [barang, setBarang] = useState(null);
    const [uid, setUid] = useState(null);
    const [beli, setBeli] = useState(null);
    const [jual, setJual] = useState(null);
    const [stok, setStok] = useState(null);
    const [merek, setMerek] = useState(null);
    const [kategori, setKategori] = useState(null);
    const [diskon, setDiskon] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();


    const handleSubmit = () => {
        console.log('sasasasas', avatar)
    };

    const getData = () => {
        getProduk();
    }

    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 1);
    }, []);

    const back = () => {
        getData();
        props.navigation.goBack()
    }

    return (
        <View style={[styles.flex1, styles.backgroundLight]}>
            <View style={[styles.container, styles.row]}>
                <TouchableOpacity onPress={() => back()}>
                    <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                </TouchableOpacity>
                <Text style={[
                    styles.marginHm,
                    styles.centerItem,
                    styles.textUpH3
                ]}>Buat Produk Baru</Text>
            </View>
            <Tab.Navigator tabBarOptions={{activeTintColor: colors.blackBg}}>
                <Tab.Screen name="Informasi Produk" 
                children={() => <ProdukInformationScreen 
                    barang={barang} setBarang={setBarang}
                    uid={uid} setUid={setUid}
                    beli={beli} setBeli={setBeli}
                    jual={jual} setJual={setJual}
                    merek={merek} setMerek={setMerek}
                    kategori={kategori} setKategori={setKategori}
                    diskon={diskon} setDiskon={setDiskon}
                    avatar={avatar} setAvatar={setAvatar}
                />} />
                <Tab.Screen name="Manajement Stok" 
                children={() => <ProdukManagementScreen
                    stok={stok} setStok={setStok}
                />} />
            </Tab.Navigator>
            <View style={[styles.marginVs, styles.marginHm,]}>
                <ButtonView
                
                title="Masuk"
                loading={loading}
                onPress={() => handleSubmit()}
                />
            </View>
        </View>
        
    )
}

export default ButtonTopTab
