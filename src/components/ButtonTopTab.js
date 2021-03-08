import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
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
    
} from '../screen';
import {createStackNavigator} from '@react-navigation/stack';
import { styles, colors } from '../style';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import ButtonView from './ButtonView';
import { getProduk, addProduk } from '../services/endpoint/produk';
import { getKategori } from '../services/endpoint/kategori';
import { getProdukBuy } from '../services/endpoint/produkBuy';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    const handleSubmit = () => {
        // console.log('avatar masuk', barang, uid, beli, jual, kategori, merek, stok, diskon, avatar)
        setLoading(true);
        addProduk(barang ? barang.barang : null, uid, beli ? beli.tbayar : null, jual, kategori ? kategori.id : null, merek, stok ? stok.tbarang : null, diskon, avatar)
        .then((res) => {
            ToastAndroid.show('Berhasil ditambah', 1200);
            console.log(res)
            if (res.Status === "Sucess") {
                props.navigation.navigate('StaffScreen');
                setLoading(false);
            } else {
                ToastAndroid.show('Gagal menambah', 1200);
                setLoading(false);
            }
        })
        .catch((e) => {
            ToastAndroid.show('Gagal melakukan permintaan', 1200);
            console.log(e);
            setLoading(false);
        });
    };

    const getData = () => {
        getProduk();
        getKategori();
        getProdukBuy();
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
                    stok={stok} setStok={setStok}
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
