import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    ToastAndroid,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch } from 'react-redux';
import { colors, styles } from "../../../style";
// import { register } from '../../services/endpoint/authServices';
import InputView from '../../../components/InputView';
import ButtonView from '../../../components/ButtonView';

const Register = (props) => {
    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [secure, setSecure] = useState(true);
    const [errors, setRrrors] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = () => {
        if (!name) {
            ToastAndroid.show('Nama wajib diisi', ToastAndroid.LONG)
        } else if (name.length < 5) {
            ToastAndroid.show('Nama terlalu pendek', ToastAndroid.LONG)
        } else if (!email) {
            ToastAndroid.show('Email wajib diisi', ToastAndroid.LONG)
        } else if (!password) {
            ToastAndroid.show('Password wajib diisi', ToastAndroid.LONG)
        } else if (password.length < 6) {
            ToastAndroid.show('Password minimal 6 karakter', ToastAndroid.LONG)
        } else {
            try {
                    setLoading(true);
                    dispatch({type:"ADD_DATA", data:{
                        name,
                        email,
                        password
                    }})
                    props.navigation.navigate('RegisterTwo');
                    setLoading(false);
            } catch (error) {
                ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
                setLoading(false);
            }
        }
    };

    return (
        <View style={[styles.flex1, styles.grey]}>
            <View style={[styles.container]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="chevron-left" size={20} color={colors.secondary}/>
                </TouchableOpacity>
            </View>
            <View style={[styles.marginVm]} />
            <View style={[styles.marginVs, styles.marginHm]}>
                <Text style={[styles.textBlack]}>Nama Lengkap</Text>
                <InputView
                placeholder="Masukan Nama Lengkap"
                onChangeText={(n) => setName(n)}
                value={name}
                />
            </View>
            <View style={[styles.marginVs, styles.marginHm]}>
                <Text style={[styles.textBlack]}>Email</Text>
                <InputView 
                placeholder="Masukan Email"
                type="email-address"
                value={email}
                onChangeText={(e) => setEmail(e)}
                />
            </View>
            <View style={[styles.marginVs, styles.marginHm]}>
                <Text style={[styles.textBlack]}>Password</Text>
                <InputView 
                placeholder="Masukan Password"
                name={ secure ? 'eye-off' : 'eye'}
                secure={ secure }
                value={password}
                onIconPress={() => setSecure(false)}
                onChangeText={(p) => setPassword(p)}
                />
            </View>
            <View style={[styles.flex1, styles.centercenter]}/>
            <View style={[styles.marginVs, styles.marginHm]}>
                <ButtonView 
                title="Lanjut"
                dark
                loading={loading}
                onPress={() => handleSubmit()}
                />
            </View>
        </View>
    )
}

export default Register
