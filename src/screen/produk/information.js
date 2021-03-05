import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView, ToastAndroid, Linking, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Entypo';
import LogoKategori from '../../assets/img/kategori.svg';

import { getProduk } from '../../services/endpoint/produk';
import { colors, styles } from '../../style';
import InputView from '../../components/InputView';
import InputViewImage from '../../components/InputViewImage';
import ButtonView from '../../components/ButtonView';
import { shadow } from 'react-native-paper';
import InputViewDisable from '../../components/InputViewDisable';
import ButtonViewMini from '../../components/ButtonViewMini';
import InputView2 from '../../components/InputView2';

const information = ({
    barang, setBarang, 
    uid, setUid,
    beli, setBeli,
    jual, setJual,
    merek, setMerek,
    diskon, setDiskon,
    kategori, setKategori,
    avatar, setAvatar,
}) => {
    const [open, setOpen] = useState(false);
    const [nameIcon, setNameIcon] = useState("chevron-up");
    const [uri, setUri] =useState(null);
    const [modal, setModal] = useState(false);
    const [scanType, setScanType] = useState('item');
    const [scanItem, setScanItem] = useState('');

    const [search, setSearch] = useState('');
    const [isiKate, setIsiKate] = useState(null);
    const [modalKate, setModalKate] = useState(false);
    const [modalAddKate, setModalAddKate] = useState(false);

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
                setAvatar(photo)
                setUri(response.uri)
                console.log('ini uri avatar :', avatar);
            } else {
                ToastAndroid.show('File gambar terlalu besar', 1200);
            }
        });
    };

    const handleSave = () => {
        setKategori(isiKate);
        setModalAddKate(false);
        // setModalKate(false);
    }

    const handleTakeKategori = () => {
        setModalKate(false);                        
    }

    const onScanSuccess = e => {
        // console.log(e)
        if (scanType === 'item') {
            setUid(e.data)
            setModal(false);
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
                    type="number-pad"
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
                    />
                    <Text style={[styles.marginVm]}>Kategori</Text>
                    <TouchableOpacity onPress={() => console.log('sas')}>
                    <View>
                    <InputViewDisable
                    value={kategori}
                    name={kategori ? 'chevron-right' : 'chevron-right'}
                    onPress={() => setModalKate(true)}
                    />
                    </View>
                    </TouchableOpacity>
                    <Text style={[styles.marginVm]}>Harga Modal</Text>
                    <InputView 
                    placeholder="10.000"
                    value={beli}
                    onChangeText={(b) => setBeli(b)}
                    type="number-pad"
                    />
                    <Text style={[styles.marginVm]}>Merek Produk</Text>
                    <InputView 
                    placeholder="IndoFood"
                    value={merek}
                    onChangeText={(b) => setMerek(b)}
                    />
                    <Text style={[styles.marginVm]}>Barcode Produk</Text>
                    <InputViewDisable
                    placeholder="AFgr456h#gfg"
                    value={uid}
                    name={uid ? 'barcode-scan' : 'barcode-scan'}
                    onPress={() => setModal(!modal)}
                    />
                    <Text style={[styles.marginVm]}>Diskon Produk</Text>
                    <InputView 
                    placeholder="10%"
                    value={diskon}
                    onChangeText={(b) => setDiskon(b)}
                    type="number-pad"
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
            <Modal onRequestClose={() => setModalKate(false)} visible={modalKate}>
                <View style={[styles.flex1, styles.backgroundLight]}>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content"/>
                
                <View style={[styles.container, styles.row]}>
                    <TouchableOpacity onPress={() => setModalKate(false)}>
                        <Icon1 name="chevron-left" size={25} color={colors.black}/>
                    </TouchableOpacity>
                    <Text style={[
                        styles.marginHm,
                        styles.centerItem,
                        styles.textUpH3
                    ]}>Pilih Kategori</Text>
                </View>

                <View style={[
                    styles.marginHs,
                    styles.marginHm,
                ]}>
                    <Text style={[styles.marginVm]}>Pilih Kategori Produk</Text>
                    <InputView 
                    placeholder="Search..."
                    name={search ? 'text-box-search-outline' : 'text-box-search-outline'}
                    onIconPress={() => setSearch(search)}
                    />
                </View>
                { kategori === null ? (
                <>
                <View style={[styles.flex1]}/>
                <View style={[styles.centercenter, styles.marginVXL]}>
                    <LogoKategori  width="50%" height="50%" />
                    <Text style={[styles.textMinH2, styles.marginVs]}>Kategori Kosong</Text>
                    <Text style={{color: colors.greyOne}}>Mulai dengan membuat kategori produk terlebih dahulu</Text>
                </View>
                </>
                ) : <>
                <TouchableOpacity onPress={() => handleTakeKategori()}>
                    <View style={[styles.marginVs]}/>
                    <View style={[styles.marginHm, styles.row]}>
                        <Text style={[
                            styles.flex1, 
                            styles.marginVm,
                            {fontWeight: "bold", fontSize: 18}
                        ]}>{kategori}</Text>
                        <View style={[styles.centercenter, styles.textRight]}>
                            <Icon2 name="chevron-small-right" size={25}/>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[styles.underCross]}/>
                </>}
                
                <View style={[styles.flex1, styles.centercenter]}/>
                <View style={[styles.marginVs, styles.marginHm,]}>
                    <ButtonView 
                    title="Masuk"
                    // loading={loading}
                    onPress={() => setModalAddKate(true)}
                    />
                </View>
                
                <Modal
                    statusBarTranslucent
                    transparent
                    visible={modalAddKate}
                    animationType={"fade"}
                    onRequestClose={() => setModalAddKate(false)}
                >
                    <KeyboardAvoidingView
                    behavior={"padding"}
                    style={{
                        flex: 1,
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#000000ab",
                    }}
                    >
                    <View
                        style={{
                        backgroundColor: "#F8F8F8",
                        padding: 10,
                        width: "80%",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 10,
                        }}
                    >
                        <Text style={{ fontSize: 25 }}>New</Text>
                        
                        <InputView2
                        value={isiKate}
                        onChangeText={setIsiKate}
                        multiline
                        style={{
                            // borderWidth: 1,
                            borderRadius: 5,
                            maxHeight: 200,
                            width: "95%",
                            padding: 5,
                            marginHorizontal: 10
                        }}
                        placeholder={"Kategori Baru"}
                        />
                    </View>
                    <View
                        style={{
                        // backgroundColor: "red",
                        padding: 10,
                        width: "80%",
                        borderRadius: 1,
                        
                        }}
                    >
                        <View style={[styles.row, styles.marginHm]}>
                        <ButtonViewMini
                        title="Simpan"
                        onPress={() => handleSave()}
                        />
                        <ButtonViewMini
                        dark
                        title="Batal"
                        
                        onPress={() => setModalAddKate(false)}
                        />
                        </View>
                    </View>
                    </KeyboardAvoidingView>
                </Modal>
            </View>
            </Modal>
        </View>
    )
}

export default information
