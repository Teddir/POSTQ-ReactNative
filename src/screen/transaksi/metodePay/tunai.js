import React, { useState, useEffect} from 'react';
import { View, Text, TextInput, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import ButtonViewIcon from '../../../components/ButtonViewIcon';
import { styles } from '../../../style';
import LogoPembayaran from '../../../assets/img/metodePembayaran.svg';
import ButtonView from '../../../components/ButtonView';
import { addTransaksi } from '../../../services/endpoint/transaksi';
import store from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProduk } from '../../../services/endpoint/produk';
import { getKategori } from '../../../services/endpoint/kategori';
import { getProdukBuy } from '../../../services/endpoint/produkBuy';
import { getSupplier } from '../../../services/endpoint/supplier';


const tunai = () => {
    const navigation = useNavigation();
    const [pay, setPay] = useState(null);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const {cart, idCustomer} = useSelector((state) => state);
    const cartNew = cart.dataCart

    const getData = () => {
        getProduk();
        getKategori();
        getProdukBuy();
        getSupplier();
    }

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getData();
        });
        return unsub;
    }, [navigation]);

    useEffect(() => {
        // console.log(listData);
        try {
            if (cartNew !== null) {
                const totalJual = cartNew.reduce((acumu, current) => {
                    return (
                        acumu + parseFloat(current.subtotal)
                    )
                },0)
                setTotal(totalJual);
            }
        } catch (error) {
            console.log(error);
        }
    },[cartNew]);

    const handleSubmit = () => {
        setLoading(true);
        addTransaksi(pay, idCustomer ? idCustomer.id : null)
        .then((res) => {
            console.log(res)
            if (res.Status === "Sucess") {
                AsyncStorage.removeItem('idCustomer');
                getData();
                ToastAndroid.show("Berhasil melakukan pembayaran", 1200);
                navigation.navigate("StaffScreen");
                setLoading(false)
            } else {
                ToastAndroid.show(`Maaf uang anda kurang `, 1200);
                setLoading(false)
            }
        })
        .catch((e) => {
            ToastAndroid.show(e, 1200),
            setLoading(false)
        })
    }

    const handleMoneyPas = () => {
        addTransaksi(total, idCustomer ? idCustomer.id : null)
        .then((res) => {
            console.log(res)
            if (res.Status === "Sucess") {
                ToastAndroid.show("Berhasil melakukan pembayaran", 1200);
                navigation.navigate("StaffScreen")
            } else {
                ToastAndroid.show(`Maaf uang anda kurang `, 1200);
            }
        })
        .catch((e) => {
            ToastAndroid.show(e, 1200)
        })
    }

    return (
        <View style={[styles.flex1, styles.grey]}>
            <View style={[styles.centercenter, styles.marginVm]}>
                <LogoPembayaran width="50%" height="50%" />
            </View>
            <View style={[styles.flex1, styles.centercenter]} />
            <View style={[styles.marginHm, styles.marginVm]}>
                <Text>Uang di terima</Text>
                <TextInput
                style={[styles.textH2]}
                placeholder="Rp.0"
                keyboardType="number-pad"
                value={pay}
                onChangeText={(e) => setPay(e)}
                />
            <View style={[styles.underCross]}/>
            </View>
            <View style={[styles.marginHm, styles.marginVs]}>
                <ButtonView
                title="Lanjut"
                // loading={loading}
                onPress={() => handleSubmit()}
                />
            </View>

            <View style={[styles.flex1, {alignItems: 'center'}]}>
                <View style={[styles.marginHm, styles.marginVXL]}>
                    <ButtonViewIcon
                    title="Uang Pas"
                    dark
                    name="money-bill"
                    // loading={loading}
                    onPress={() => handleMoneyPas()}
                    />
                </View>
            </View>
        
        </View>
    )
}

export default tunai
