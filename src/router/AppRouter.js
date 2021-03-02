import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
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
import { View, Text, TouchableOpacity } from 'react-native';
import AsynStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { profile } from '../services/endpoint/authServices';
import { changeToken, setUser } from '../redux/action';
import { colors, styles } from '../style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppRouter = () => {
    const [splash, setSplash] = useState(true);
    const {token, user} = useSelector((state)=> state);
    const disPatch = useDispatch();

    const getTokenStorage = () => {
        console.log('getting token');
        AsyncStorage.getItem('token')
        .then((data) => {
            if (data !== null) {
                disPatch(changeToken(data));
                getProfile();
            } else {
                setSplash(false);
            }
        })
    }
    const getProfile = () => {
        profile()
        .then((res) => {
            // console.log('hy Profie',res);
            if (res.status === "succes") {
                disPatch(setUser(res))
                console.log('isi User :', user.data[0].name)
            }
            setSplash(false);
        })
        .catch((e) => {
            console.log(e)
            setSplash(false);
        });
    };

    useEffect(() => {
        setTimeout(() => {
            if (token !== null || token !== '') {
                getTokenStorage()
            }
        }, 1000);
    }, []);

    if (splash) {
        return <Splash />;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator
            headerMode={false}
            screenOptions={{animationEnable: false}}
            >
            { token === null || token === '' ? (
                <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="LogKasir" component={LogKasir} />
                <Stack.Screen name="RegisterTwo" component={RegisterTwo} />
                <Stack.Screen name="Register" component={Register} />
                </>
            ) : (
                <>
                <Stack.Screen name="StaffScreen" component={StaffScreen} />
                <Stack.Screen name="ProdukInScreen" component={ProdukInformationScreen}/>
                <Stack.Screen name="ProdukMaScreen" component={ProdukManagementScreen}/>
                <Stack.Screen name="ProdukKaScreen" component={ProdukKategoriScreen}/>
                </>
            )}
                            <Stack.Screen name="LogStaff" component={LogStaff} />
            <Stack.Screen name="Intro" component={Intro} />
            </Stack.Navigator>
        </NavigationContainer>
        // <View>
        //     <Text>Hy Teddi</Text>
        // </View>
    )
}

export default AppRouter
