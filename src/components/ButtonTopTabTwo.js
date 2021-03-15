import React, { useState, useEffect} from 'react'
import { View, Text, TouchableOpacity, ToastAndroid, StatusBar } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
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
    TunaiScreen,
    NonTunaiScreen,
    
} from '../screen';
import {createStackNavigator} from '@react-navigation/stack';
import  Icon  from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import { styles, colors } from '../style';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const ButtonTopTabTwo = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const {cart} = useSelector((state) => state);
    const cartNew = cart.dataCart

    const toPrice = (price) => {
        return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
    }

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
    return (
        <View style={[styles.flex1]}>
            
            <View style={[styles.backgroundLight]}>
                <StatusBar backgroundColor={colors.blackBg} barStyle="light-content"/>
                <View style={[styles.container, styles.row, styles.backgroundLight]}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                    </TouchableOpacity>
                    <Text style={[
                        styles.marginHm,
                        styles.centerItem,
                        styles.textUpH3
                    ]}>Metode Pembayaran</Text>
                </View>

                <View style={[styles.underCross, {elevation: 3}]}/>
                <View style={[styles.marginHm, styles.marginVm]}>
                    <Text>Total Tagihan</Text>
                    <View>
                        <Text style={[styles.textH1]}>Rp {toPrice(total)}, -</Text>
                    </View>
                </View>

            </View>
            
            <View style={[styles.flex1]}>
                <Tab.Navigator tabBarOptions={{activeTintColor: colors.blackBg}}>
                    <Tab.Screen name="Tunai" component={TunaiScreen}/>
                    <Tab.Screen name="Non Tunai" component={NonTunaiScreen}/>
                </Tab.Navigator>
            </View>
        </View>
        
    )
}

export default ButtonTopTabTwo
