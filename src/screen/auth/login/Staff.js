import React, { useState, useEffect } from 'react';
import { View, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';

import ButtonView from '../../../components/ButtonView';
import InputView from '../../../components/InputView';
import InputView2 from '../../../components/InputView2';
import { colors, styles } from '../../../style'
import { changeToken, setUser } from '../../../redux/action';
import { loginStaff }  from '../../../services/endpoint/authServices';
import { getProduk } from '../../../services/endpoint/produk';

const Staff = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [secure, setSecure] = useState(true);
    const dispatch = useDispatch();

    const getData = () => {
        getProduk();
    }

    useEffect(() => {
        setTimeout(() => {
            getData();
        }, 1000);
    }, []);

    const onClickLogin = () => {
        setLoading(true)

        if (!email) {
            ToastAndroid.show('Email wajib diisi', ToastAndroid.LONG);
        } else if (!password) {
            ToastAndroid.show('Password wajib diisi', ToastAndroid.LONG);
        }
        loginStaff(email, password)
        .then((res) => {
            console.log(res.token1.original.code)
            if (res.token1.original.code === 201) {
                const {role} = res.user;
                console.log(role);
                if (role === "1") {
                    dispatch(setUser(res.user));
                    dispatch(changeToken(res.token1.original.token));
                    getData();
                    props.navigation.navigate('StaffScreen');
                } else {
                    ToastAndroid.show('Harap login di web', ToastAndroid.LONG);
                }
            } else {
                ToastAndroid.show(res.message, ToastAndroid.LONG)
            }
        })
        .catch((e) => console.log(e))
        .finally(() => setLoading(false))
    }

    return (
        <View style={[styles.flex1]}>
            <View style={[styles.container]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="chevron-left" size={20} color={colors.primary}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.marginVXL]}>
                <View style={[styles.marginHm, styles.marginVs]}>
                    <Text>Email</Text>
                    <InputView 
                    placeholder="Email"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                    type="email-address"
                    />
                </View>
                <View style={[styles.marginHm, styles.marginVs]}>
                    <Text>Password</Text>
                    <InputView
                    placeholder="Password"
                    value={password}
                    onChangeText={(p) => setPassword(p)}
                    secure={secure}
                    name={secure ? 'eye-off' : 'eye'}
                    onIconPress={() => setSecure(!secure)}
                    />
                </View>
                <Text 
                style={{color: 'blue', marginHorizontal: 16}}
                onPress={() => props.navigation.navigate()}>
                Lupa Password
                </Text>
            </View>
            <View style={[styles.flex1, styles.centercenter]}/>
            <View style={[styles.marginVs, styles.marginHm,]}>
                <ButtonView 
                title="Masuk"
                loading={loading}
                onPress={() => onClickLogin()}
                />
            </View>
        </View>
    )
}

export default Staff
