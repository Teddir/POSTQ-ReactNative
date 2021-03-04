import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView, ToastAndroid, Linking, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

import { getProduk } from '../../services/endpoint/produk';
import { colors, styles } from '../../style';
import InputView from '../../components/InputView';
import InputViewImage from '../../components/InputViewImage';
import ButtonView from '../../components/ButtonView';
import { shadow } from 'react-native-paper';
import InputViewDisable from '../../components/InputViewDisable';

const information = ({
    barang, setBarang, 
    uid, setUid,
    beli, setBeli,
    jual, setJual,
    merek, setMerek,
    kategori, setKategori,
    diskon, setDiskon,
    avatar, setAvatar,
}) => {
    const [open, setOpen] = useState(false);
    const [nameIcon, setNameIcon] = useState("chevron-up");
    const [uri, setUri] =useState(null);
    const [modal, setModal] = useState(false);
    const [scanType, setScanType] = useState('item');
    const [scanItem, setScanItem] = useState('');

    const navigation = useNavigation();

    const handleChoosePhoto = () => {
        const options = {
            includeBase64: false,
        };
        launchImageLibrary(options, (response) => {
            console.log('response image picker ===', response);
            if (response.fileSize < 1000000) {
                const photo = {
                    name: response.fileName,
                    type: response.type,
                    uri: response.uri,
                };
                console.log(photo)
                setAvatar(response.uri)
                setUri(response.uri)
                console.log('ini uri avatar :', avatar);
            } else {
                ToastAndroid.show('File gambar terlalu besar', 1200);
            }
        });
    };

    const handleKategori = () => {
        navigation.navigate('ProdukKaScreen')
    }

    const onScanSuccess = e => {
        // console.log(e.type)
        if (scanType === 'item') {
            setScanItem(e);
        } else {
            setModal(false);
        }
    };

    console.log('data Scan', scanItem); 

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
                    onPress={() => handleChoosePhoto()}
                    uri={uri}
                    value={avatar}
                    onChangeText={() => setAvatar()}
                    />
                    <Text style={[styles.marginVm]}>Kategori</Text>
                    <TouchableOpacity onPress={() => console.log('sas')}>
                    <View>
                    <InputViewDisable
                    value={kategori}
                    name={kategori ? 'chevron-right' : 'chevron-right'}
                    onPress={() => handleKategori()}
                    />
                    </View>
                    </TouchableOpacity>
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
                    onIconPress={() => setModal(!modal)}
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
            <Modal onRequestClose={() => setModal(false)} visible={modal}>
            <QRCodeScanner
                vibrate
                showMarker
                reactivate
                reactivateTimeout={5000}
                onRead={onScanSuccess}
                topContent={
                <Text >
                    your computer and scan the QR code.
                </Text>
                }
                bottomContent={
                <TouchableOpacity onPress={() => setModal(false)}>
                    <Text >Back { scanType === 'item' ? 'barang' : null } </Text>
                </TouchableOpacity>
                }
            />
            </Modal>
        </View>
    )
}

export default information
