import React, { useState } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    ToastAndroid
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../../../style';
import { register } from '../../../services/endpoint/authServices';
import Auth from '../../../assets/img/auth';
import InputView2 from '../../../components/InputView2';
import ButtonView from '../../../components/ButtonView';

const RegisterTwo = (props) => {
    const [phone_number, setPhone_number] = useState(null);
    const [loading, setLoading] = useState(false);

    const selector = useSelector((state) => state);
    const data = {
        ...selector,
        phone_number
    }
    // console.log(data.user.password);
    const onClickRegister = () => {
        if (data) {
            setLoading(true);
            register(data.user.name, data.user.email, data.phone_number, data.user.password)
            .then((res) =>
                res.token1.original.code === 201 
                ? props.navigation.navigate('Login') 
                : ToastAndroid.show('Gagal register', ToastAndroid.LONG) 
            )
            .catch((e) => ToastAndroid.show(JSON.stringify(e), ToastAndroid.LONG))
            .finally(() => setLoading(false));
        }
    };

    return (
        <View style={[styles.flex1, styles.grey]}>
            <View style={[styles.flex1, styles.centerItem, styles.marginVs]}>
                <Text
                style={[
                    styles.marginVm,
                    styles.textH4,
                    styles.grey,
                    styles.textBlack
                ]}
                >Masukan nomor handphone untuk menjaga keamanan akunmu. </Text>
                <View style={[styles.flex1, styles.centercenter, styles.marginHm]}>
                    <Auth />
                    <Text
                    style={[
                        styles.textH3
                    ]}
                    > Masukan Nomor Handphone Kamu    
                    </Text>
                    <InputView2 
                    placeholder="Contoh : 089990400887"
                    value={phone_number}
                    onChangeText={(p) => setPhone_number(p)}
                    type="number-pad"
                    style={[styles.flex1, styles.marginHm],{textAlign: "center", width: "100%"}}
                    />
                </View>
            </View>
            <View style={[styles.marginVs, styles.marginHm]}>
            <ButtonView 
            dark
            loading={loading}
            title="Buat Akun"
            onPress={() => onClickRegister()}
            />
            </View>
        </View>
    )
}

export default RegisterTwo
