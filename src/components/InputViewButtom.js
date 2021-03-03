import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, styles } from '../style'
import ButtonView from './ButtonView';

const InputViewButtom = ({ 
    stok,
    disabled,
}) => {
    return (
        <View style={[
            styles.row, 
            {borderWidth: 2, 
            borderRadius:10,
            borderColor: colors.primary},
        ]}>
            <View style={[
                styles.marginVs,
                styles.marginHs
            ]}>
                {stok ? 
                <>
                <View style={[styles.marginVs]}>
                <Text style={[styles.marginHs]}>Stok Saat ini : {'\n'}
                <Text style={[styles.marginVs, styles.textUpH3]}>{stok}</Text></Text>
                </View>
                </> : <>
                <View style={[styles.marginVs]}>
                <Text style={[styles.marginHs]}>Stok Saat ini : {'\n'}
                <Text style={[styles.marginVs, styles.textUpH3]}>0</Text></Text>
                </View>
                </>}
            </View>
            {/* <View
            style={[
                styles.flex1,
                styles.textRight,
                styles.marginVs,
                styles.marginHs
            ]}>
            <ButtonView 
            off
            disabled={disabled}
            title="Riwayat"
            />
            </View> */}
        </View>
    );
};

export default InputViewButtom
