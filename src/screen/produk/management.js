import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import { getProduk } from '../../services/endpoint/produk';
import { colors, styles } from '../../style';
import InputView from '../../components/InputView';
import InputViewImage from '../../components/InputViewImage';
import InputViewButtom from '../../components/InputViewButtom';

const management = ({
    stok, setStok
}) => {
    const [open, setOpen] = useState(false);
    const [nameIcon, setNameIcon] = useState("toggle-off");
    const [disabled, setDisabled] = useState(true);

    const handleOpen = () => {
        if (open == false) {
            setOpen(true);
            setNameIcon("toggle-on")
        } 
    
        if (open == true) {
            setOpen(false);
            setNameIcon("toggle-off")
        }    
    }
    return (
        <View style={[styles.flex1, styles.grey]}>
            <StatusBar backgroundColor={colors.black} barStyle="light-content"/>
            <ScrollView>
            <View style={[styles.marginHm, styles.marginVm, styles.marginButton, {marginBottom:10}]}>
                <View style={[styles.row]}>
                    <Text style={[styles.textMinH2]}>Detail Produk</Text>
                    <View
                    style={[
                        styles.flex1,
                        styles.textRight,
                        styles.marginVs,
                        styles.marginHs
                    ]}>
                    <TouchableOpacity onPress={() => handleOpen()}>
                    <Icon name={nameIcon} size={25} />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.marginVs]} />
                <Text>Lacak pengurangan dan penambahan stok produk ini</Text>
                <View style={[styles.marginVm]}>
                    <View style={[styles.topCrossBg, styles.marginVm]} />
                    <InputViewButtom
                    disabled={disabled}
                    />
                    <View style={[styles.underCrossBg, styles.marginVm]} />
                </View>
                { open === true ?(
                <View>
                    <Text style={[styles.marginVm]}>Jumlah Stok</Text>
                    <InputView 
                    placeholder="10"
                    value={stok}
                    onChangeText={(b) => setStok(b)}
                    />
                    <Text style={[styles.marginVm]}>Stok Minimum</Text>
                    <InputView 
                    placeholder="0"
                    onChangeText={(b) => (0)}
                    />
                </View>
                ) : null}
            </View>
            </ScrollView>
        </View>
    )
}

export default management
