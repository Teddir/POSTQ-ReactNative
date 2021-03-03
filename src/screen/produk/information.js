import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Feather';

import { getProduk } from '../../services/endpoint/produk';
import { colors, styles } from '../../style';
import InputView from '../../components/InputView';
import InputViewImage from '../../components/InputViewImage';

const information = (props) => {
    const [barang, setBarang] = useState(null);
    const [uid, setUid] = useState(null);
    const [beli, setBeli] = useState(null);
    const [jual, setJual] = useState(null);
    const [stok, setStok] = useState(null);
    const [merek, setMerek] = useState(null);
    const [kategori, setKategori] = useState(null);
    const [diskon, setDiskon] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [open, setOpen] = useState(false);
    const [nameIcon, setNameIcon] = useState("chevron-up");

    
    const handleOpen = () => {
        if (open == false) {
            setOpen(true);
            setNameIcon("chevron-down")
        } 
    
        if (open == true) {
            setOpen(false);
            setNameIcon("chevron-up")
        }    
    }
    return (
        <View style={[styles.flex1, styles.grey]}>
            <StatusBar backgroundColor={colors.black} barStyle="light-content"/>
            <ScrollView>
            <View style={[styles.marginHm, styles.marginVm, styles.marginButton, {marginBottom:10}]}>
                <Text style={[styles.textMinH2]}>Detail Produk</Text>
                <View style={[styles.marginVs]} />
                <View>
                    <Text style={[styles.marginVm]}>Nama Produk</Text>
                    <InputView 
                    placeholder="Angsa Geprek"
                    value={barang}
                    onChangeText={(b) => setBarang(b)}
                    />
                    <Text style={[styles.marginVm]}>Harga Jual</Text>
                    <InputView 
                    placeholder="10.000"
                    value={jual}
                    onChangeText={(j) => setJual(j)}
                    />
                </View>
                <View style={[styles.marginVm]} />
                <View style={[styles.topCrossBg,styles.row,]}>
                        <Text style={[
                            styles.marginVs, 
                            styles.textMinH2,
                        ]}>
                        Detail Tambahan (Opsional)
                        </Text>
                    <View style={[
                        styles.flex1,
                        styles.centercenter,
                        styles.textRight,
                        styles.marginHm
                    ]}>
                    <TouchableOpacity onPress={() => handleOpen()}>
                        <Icon1 name={nameIcon} size={25}/>
                    </TouchableOpacity>
                    </View>
                </View>
                {open === true ? (
                <View>
                    <Text style={[styles.marginVm]}>Foto Produk</Text>
                    <InputViewImage 
                    image={avatar}
                    onChangeText={() => setAvatar()}
                    />
                    <Text style={[styles.marginVm]}>Kategori</Text>
                    <InputView 
                    placeholder="Pilih Kategori"
                    value={kategori}
                    name={kategori ? 'chevron-right' : 'chevron-right'}
                    onIconPress={() => console.log('tmKategori')}
                    onChangeText={(k) => setKategori(k)}
                    />
                    <Text style={[styles.marginVm]}>Harga Modal</Text>
                    <InputView 
                    placeholder="10.000"
                    value={beli}
                    onChangeText={(b) => setBeli(b)}
                    />
                    <Text style={[styles.marginVm]}>Merek Produk</Text>
                    <InputView 
                    placeholder="IndoFood"
                    value={merek}
                    onChangeText={(b) => setMerek(b)}
                    />
                    <Text style={[styles.marginVm]}>Barcode Produk</Text>
                    <InputView 
                    placeholder="AFgr456h#gfg"
                    value={uid}
                    name={uid ? 'barcode-scan' : 'barcode-scan'}
                    onIconPress={() => console.log('tmBarcode')}
                    onChangeText={(b) => setUid(b)}
                    />
                    <Text style={[styles.marginVm]}>Diskon Produk</Text>
                    <InputView 
                    placeholder="10%"
                    value={diskon}
                    onChangeText={(b) => setDiskon(b)}
                    />
                </View>
                ) : <View style={[styles.underCrossBg]}>
                    </View>}
            </View>
            </ScrollView>
        </View>
    )
}

export default information
