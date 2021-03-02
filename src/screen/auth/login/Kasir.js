import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, TouchableOpacity, ToastAndroid} from 'react-native';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import ButtonView from '../../../components/ButtonView';
import InputView from '../../../components/InputView';
import { changeToken, setUser } from '../../../redux/action';
import { loginKasir, profile } from '../../../services/endpoint/authServices';
import { colors, styles } from '../../../style';

const Kasir = (props) => {
    const [email, setEmail] = useState(null);
    const [pin_kasir, setPin_kasir] = useState(null);
    const [loading, setLoading] = useState(false);
    const [secure, setSecure] = useState(true);
    const dispatch = useDispatch();

    const handleSubmit = () => {
        setLoading(true)
        loginKasir(email, pin_kasir, pin_kasir)
        .then((res) => {
            if (res.token1.original.code === 201) {
                const {role} = res.user;
                if (role === "2") {
                    dispatch(setUser(res.user));
                    dispatch(changeToken(res.token1.original.token));
                    props.navigation.navigate('RegisterTwo');
                } else {
                    ToastAndroid.show('Harap Login lewat web', ToastAndroid.LONG)
                }
            } else {
                ToastAndroid.show(res.message, ToastAndroid.LONG);
            }
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false))
    }
    return (
        <View style={[styles.flex1]}>
            <StatusBar backgroundColor={colors.grey} barStyle="dark-content"/>
            <View style={[styles.marginHm, styles.marginVs]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color={colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.marginHm, styles.marginVs]}>
                <Text style={[
                    styles.textH4
                ]}>Dengan kode akses kasir, karyawan bisa masuk akun tanpa {'\n'}menggunakan email dan password owner.</Text>
            </View>
            <View style={[ styles.marginHm, styles.backgroundTen]}>
                <Text style={[
                    styles.textH4,
                    styles.marginHm,
                    styles.marginVs
                ]}>Buat kode akses kasir dari akun owner pada {'\n'}kelola toko {'->'} Kode Akses Kasir</Text>
            </View>
            <View style={[styles.marginHm, styles.marginVXL]}>
                <Text style={[styles.textBlack]}>Email</Text>
                    <InputView 
                    placeholder="Masukan Email"
                    value={email}
                    onChangeText={(k) => setEmail(k)}
                    />
                <View style={{margin:5}}/>
                <Text style={[styles.textBlack, ]}>Kode Akses Kasir</Text>
                    <InputView 
                    placeholder="Masukan Kode"
                    value={pin_kasir}
                    onChangeText={(k) => setPin_kasir(k)}
                    name={secure ? 'eye-off' : 'eye'}
                    secure={secure}
                    onIconPress={() => setSecure(!secure)}
                    />
                </View>
            <View style={[styles.flex1, styles.centercenter]} />
            <View style={[styles.marginVs, styles.marginHm]}>
                <ButtonView 
                title="Masuk"
                loading={loading}
                onPress={() => handleSubmit()}
                />
            </View>
        </View>
    )
}

export default Kasir
