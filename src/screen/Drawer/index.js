import React, { useState } from 'react';
import {View, Text, Image, TouchableNativeFeedback, StatusBar} from 'react-native';
import {styles, colors} from '../../style';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {clearToken} from '../../redux/action';
import ButtonView from '../../components/ButtonView';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = ({navigation}) => {
    const dispatch = useDispatch();
    const {user, token} = useSelector((state) => state);
    const rolee = user.data?.[0].role === "1" ? "Owner" : "Kasir";
    
    const handleRemoveToken = () => {
      console.log(token);
      AsyncStorage.removeItem('token');
    }



  return (
    <View style={[styles.flex1]}>
      <StatusBar backgroundColor={colors.blackBg} barStyle="light-content" />
      <View style={[styles.container, styles.underCross]}>
        <View style={[styles.centerCenter,styles.marginVm, styles.marginHs,]}>
          <View style={[styles.backgroundAsli,{borderColor: 'black', borderWidth:1, borderRadius:10, alignContent:"center",}, styles.centerItem]}>
            <Text style={[styles.textH3, styles.textBlack]}>
              POSTQ
            </Text>
          </View>
        </View>

        <TouchableNativeFeedback onPress={() => navigation.navigate('Profile')}>
          <View style={[styles.row, styles.paddingS, styles.centerItem]}>
            <MaterialIcon name="account-tie-outline" size={28} color={colors.blackBg} />
            <Text style={[styles.textH4, styles.marginHm, styles.marginVs]}>{user.data?.[0].name}{'\n'}
            <Text style={[styles.textH4, styles.textSecondary]}>{rolee}</Text></Text>
          </View>
        </TouchableNativeFeedback>

      </View>
      
      <View>
        <View style={[styles.container]}>
        <TouchableNativeFeedback
            onPress={() => navigation.closeDrawer()}>
            <View style={[styles.row, styles.centerItem]}>
              <MaterialIcon name="cash-register" size={25} color={colors.black} />
              <Text style={[styles.textH4, styles.marginHm, styles.marginVm]}>Kasir</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Settings')}>
            <View style={[styles.row, styles.centerItem]}>
              <MaterialIcon name="history" size={25} color={colors.black} />
              <Text style={[styles.textH4, styles.marginHm, styles.marginVm]}>Riwayat Transaksi</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Settings')}>
            <View style={[styles.row, styles.centerItem]}>
              <Icon1 name="receipt-outline" size={25} color={colors.black} />
              <Text style={[styles.textH4, styles.marginHm, styles.marginVm]}>Laporan</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Settings')}>
            <View style={[styles.row, styles.centerItem]}>
              <MaterialIcon name="cogs" size={25} color={colors.black} />
              <Text style={[styles.textH4, styles.marginHm, styles.marginVm]}>Kelola Produk</Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={() => navigation.navigate('Settings')}>
            <View style={[styles.row, styles.centerItem]}>
              <MaterialIcon name="warehouse" size={25} color={colors.black} />
              <Text style={[styles.textH4, styles.marginHm, styles.marginVm]}>Kelola Toko</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => handleRemoveToken()}>
            <View style={[styles.row, styles.centerItem]}>
              <Icon1 name="md-help-circle-outline" size={25} color={colors.black} />
              <Text style={[styles.textH4, styles.marginHm, styles.marginVm]}>Bantuan</Text>
            </View>
          </TouchableNativeFeedback>
          {/* <TouchableNativeFeedback onPress={() => dispatch(clearToken())}>
            <View style={[styles.row, styles.centerItem]}>
              <MaterialIcon name="logout" size={25} color={colors.black} />
              <Text style={[styles.textH4, styles.marginHs, styles.marginVm]}>Keluar</Text>
            </View>
          </TouchableNativeFeedback> */}
        </View>
      </View>
      <View style={[styles.flex1,{justifyContent:"flex-end"}]}>
        <View style={[styles.backgroundAsli]}>
          <View style={[styles.marginButton, styles.row, styles.centerItem, styles.marginHxl]}>
            <View style={[styles.backgroundAsli, styles.marginHs, styles.marginVs, {borderRadius:5}, styles.centercenter]}>
              <Icon1 name="logo-github" size={15}/>
            </View>
            <Text style={{fontSize:8}}>@Teddir_</Text>
            <View style={[styles.backgroundAsli, styles.marginHs, styles.marginVs, {borderRadius:5}, styles.centercenter]}>
              <Icon1 name="logo-twitter" size={15}/>
            </View>
            <Text style={{fontSize:8}}>@Teddir</Text>
            <View style={[styles.backgroundAsli, styles.marginHs, styles.marginVs, {borderRadius:5}, styles.centercenter]}>
              <Icon1 name="logo-linkedin" size={15}/>
            </View>
            <Text style={{fontSize:8}}>@teddi-rahman</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Drawer;