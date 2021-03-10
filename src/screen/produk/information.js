import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar, TouchableOpacity, Image, ScrollView, ToastAndroid, Linking, Modal, KeyboardAvoidingView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/Entypo';
import _ from 'lodash';

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
import { getKategori } from '../../services/endpoint/kategori';
import { addProdukBuy, getProdukBuy } from '../../services/endpoint/produkBuy';
import { getSupplier } from '../../services/endpoint/supplier';

const information = ({
    barang, setBarang, 
    uid, setUid,
    beli, setBeli,
    jual, setJual,
    merek, setMerek,
    diskon, setDiskon,
    kategori, setKategori,
    avatar, setAvatar,
    stok, setStok
}) => {
    const [open, setOpen] = useState(false);
    const [openSupplier, setOpenSupplier] = useState(false);
    const [nameIcon, setNameIcon] = useState("chevron-up");
    const [uri, setUri] =useState(null);
    const [modal, setModal] = useState(false);         //-----------------------> scanner modal
    const [scanItem, setScanItem] = useState('');  
    const [scanType, setScanType] = useState('item');
    const [editable, setEditable] = useState(false);
    
    const [search, setSearch] = useState('');          //-----------------------> add kategori and take kategori
    const [isiKate, setIsiKate] = useState(null);
    const [modalKate, setModalKate] = useState(false);
    const [modalAddKate, setModalAddKate] = useState(false);
    const [loading, setLoading] = useState(false);

    const [modalBarang, setModalBarang] = useState(false);   //-----------------------> take barang from buys and put in produk
    const [modalAddBarang, setModalAddBarang] = useState(false);

    const [buyBarang, setBuyBarang] = useState(null);  //-----------------------> buys produk with supplier
    const [buyPhone, setBuyPhone] = useState(null);
    const [buyPrice, setBuyPrice] = useState(null);
    const [buyTotalBarang, setBuyTotalBarang] = useState(null);
    const [buyTotalBayar, setBuyTotalBayar] = useState(null);

    const toPrice = (price) => {
        return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
    }

    const navigation = useNavigation();
    const { user, produk, listKategori, produkBuy, supplier } = useSelector((state) => state)
    console.log('kategori', listKategori.dataKategori ? 'ada' : 'tidak ada' ); 
    console.log('ProdukBuy', produkBuy.dataProdukBuy ? 'ada' : 'tidak ada' );
    console.log('supplier', supplier.dataSupplier ? 'ada' : 'tidak ada' );    


    const getData = () => {
        getProduk();
        getKategori();
        getProdukBuy();
        getSupplier();
    }

    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getData();
        });
        return unsub;
    }, [navigation]);

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

    const handleSaveAddKate = () => {
        setKategori(isiKate);
        setModalAddKate(false);
    }
    

    const handleSaveAddBarang = () => {
        setLoading(true);
        addProdukBuy(buyBarang, buyPhone, buyPrice, buyTotalBarang, buyTotalBayar)
        .then((res) => {
            ToastAndroid.show('Berhasil ditambah', 1200);
            console.log(res)
            if (res.Status === "Sucess") {
                setLoading(false);
                getData();
                setModalAddBarang(false);
                setBuyBarang(null);
                setBuyPhone(null);
                setBuyPrice(null);
                setBuyTotalBarang(null);
            } else {
                ToastAndroid.show('Gagal menambah', 1200);
                setLoading(false);
                setModalAddBarang(false);
            }
        })
        .catch((e) => {
            ToastAndroid.show('Gagal melakukan permintaan', 1200);
            console.log(e);
            setLoading(false);
            setModalAddBarang(false);
        });
    }

    const handleSavePhoneSupplier = (data) => {
        setBuyPhone(data.phone_number);
        setOpenSupplier(false)
        setNameIcon("chevron-up")
    }
    
    const handleTakeKategori = (data) => {
        // console.log(data);
        setKategori(data);
        setModalKate(false);                        
    }

    const handleTakeBarang = (data) => {
        console.log(data);
        setBarang(data);
        setBeli(data);
        setStok(data);
        setModalBarang(false);
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

    const handleTakeSupplier = () => {
        if (openSupplier == false) {
            setOpenSupplier(true);
            setNameIcon("chevron-down")
        } 
    
        if (openSupplier == true) {
            setOpenSupplier(false);
            setNameIcon("chevron-up")
        }    
    }

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
                    <Text style={[styles.marginVm]}>Produk</Text>
                    <TouchableOpacity onPress={() => console.log('sas')}>
                    <View>
                    <InputViewDisable
                    value={barang ? barang.barang : null}
                    name={barang ? 'chevron-right' : 'chevron-right'}
                    onPress={() => setModalBarang(true)}
                    />
                    </View>
                    </TouchableOpacity>
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
                    value={kategori ? kategori.name : null}
                    name={kategori ? 'chevron-right' : 'chevron-right'}
                    onPress={() => setModalKate(true)}
                    />
                    </View>
                    </TouchableOpacity>
                    <Text style={[styles.marginVm]}>Harga Modal</Text>
                    <InputView 
                    editable={editable}
                    placeholder="10.000"
                    value={beli ? toPrice(beli.tbayar) : null}
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
                {user && listKategori?.dataKategori?.length > 0 ? (
                    <>
                    {listKategori.dataKategori ? (
                        <>
                        <View>
                            {listKategori.dataKategori.map((kategoris) => {
                                return (
                                    <>
                                    <View style={[styles.marginVs]} key={kategoris.id}/>
                                    <TouchableOpacity onPress={() => handleTakeKategori(kategoris)} >
                                    <View style={[styles.marginHm, styles.row]}>
                                        <Text style={[
                                            styles.flex1, 
                                            styles.marginVm,
                                            {fontWeight: "bold", fontSize: 18}
                                        ]}>{kategoris.name}</Text>
                                        <View style={[styles.centercenter, styles.textRight]}>
                                            <Icon2 name="chevron-small-right" size={25}/>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                    <View style={[styles.underCross]}/>
                                    </>
                                )
                            })}
                        </View>
                        </>
                    ): loading}
                    </>
                ) : 
                <>
                    <View style={[styles.flex1]}/>
                    <View style={[styles.centercenter, styles.marginVXL]}>
                        <LogoKategori  width="50%" height="50%" />
                        <Text style={[styles.textMinH2, styles.marginVs]}>Kategori Kosong</Text>
                        <Text style={{color: colors.greyOne}}>Mulai dengan membuat kategori produk terlebih dahulu</Text>
                    </View>
                </>
                }
                

                <View style={[styles.flex1, styles.centercenter]}/>
                <View style={[styles.marginVs, styles.marginHm,]}>
                    <ButtonView 
                    title="Tambah Kategori"
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
                        onPress={() => handleSaveAddKate()}
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

            <Modal onRequestClose={() => setModalBarang(false)} visible={modalBarang}>
                <View style={[styles.flex1, styles.backgroundLight]}>
                <StatusBar backgroundColor={colors.white} barStyle="dark-content"/>
                
                <View style={[styles.container, styles.row]}>
                    <TouchableOpacity onPress={() => setModalBarang(false)}>
                        <Icon name="chevron-left" size={25} color={colors.black}/>
                    </TouchableOpacity>
                    <Text style={[
                        styles.marginHm,
                        styles.centerItem,
                        styles.textUpH3
                    ]}>Pilih Produk</Text>
                </View>

                <View style={[
                    styles.marginHs,
                    styles.marginHm,
                ]}>
                    <Text style={[styles.marginVm]}>Pilih Produk</Text>
                    <InputView 
                    placeholder="Search..."
                    name={search ? 'text-box-search-outline' : 'text-box-search-outline'}
                    onIconPress={() => setSearch(search)}
                    />
                </View>
                {user && produkBuy?.dataProdukBuy?.length > 0 ? (
                    <>
                    {produkBuy.dataProdukBuy ? (
                        <>
                        <View>
                            {produkBuy.dataProdukBuy.map((produkBuys) => {
                                return (
                                    <>
                                    <View style={[styles.marginVs]} key={produkBuys.id}/>
                                    <TouchableOpacity onPress={() => handleTakeBarang(produkBuys)} >
                                    <View style={[styles.marginHm, styles.row]}>
                                        <Text style={[
                                            styles.flex1, 
                                            styles.marginVm,
                                            {fontWeight: "bold", fontSize: 18}
                                        ]}>{produkBuys.barang}</Text>
                                        <View style={[styles.centercenter, styles.textRight]}>
                                            <Icon2 name="chevron-small-right" size={25}/>
                                        </View>
                                    </View>
                                    </TouchableOpacity>
                                    <View style={[styles.underCross]}/>
                                    </>
                                )
                            })}
                        </View>
                        </>
                    ): loading}
                    </>
                ) : 
                <>
                    <View style={[styles.flex1]}/>
                    <View style={[styles.centercenter, styles.marginVXL]}>
                        <LogoKategori  width="50%" height="50%" />
                        <Text style={[styles.textMinH2, styles.marginVs]}>Produk Kosong</Text>
                        <Text style={{color: colors.greyOne}}>Mulai dengan membuat produk terlebih dahulu</Text>
                    </View>
                </>
                }
                

                <View style={[styles.flex1, styles.centercenter]}/>
                <View style={[styles.marginVs, styles.marginHm,]}>
                    <ButtonView 
                    title="Tambah Produk"
                    // loading={loading}
                    onPress={() => setModalAddBarang(true)}
                    />
                </View>
                
                <Modal
                    statusBarTranslucent
                    transparent
                    visible={modalAddBarang}
                    animationType={"fade"}
                    onRequestClose={() => setModalAddBarang(false)}
                >
                    <KeyboardAvoidingView
                    behavior={"padding"}
                    style={{
                        flex: 1,
                        padding: 1,
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
                        value={buyBarang}
                        onChangeText={setBuyBarang}
                        multiline
                        style={{
                            // borderWidth: 1,
                            borderRadius: 5,
                            maxHeight: 200,
                            width: "95%",
                            padding: 5,
                            marginHorizontal: 10
                        }}
                        placeholder={"Name Produk"}
                        />
                        <InputView2
                        value={buyPrice}
                        onChangeText={setBuyPrice}
                        multiline
                        type="number-pad"
                        style={{
                            // borderWidth: 1,
                            borderRadius: 5,
                            maxHeight: 200,
                            width: "95%",
                            padding: 5,
                            marginHorizontal: 10
                        }}
                        placeholder={"Harga Barang"}
                        />
                        <InputView2
                        value={buyTotalBarang}
                        onChangeText={setBuyTotalBarang}
                        multiline
                        type="number-pad"
                        style={{
                            // borderWidth: 1,
                            borderRadius: 5,
                            maxHeight: 200,
                            width: "95%",
                            padding: 5,
                            marginHorizontal: 10
                        }}
                        placeholder={"Total Barang"}
                        />
                        <InputView2
                        value={buyPhone}
                        onChangeText={setBuyPhone}
                        multiline
                        name={nameIcon}
                        onIconPress={() => handleTakeSupplier()}
                        type="number-pad"
                        style={{
                            // borderWidth: 1,
                            borderRadius: 5,
                            maxHeight: 200,
                            width: "84%",
                            padding: 5,
                            marginHorizontal: 10
                        }}
                        placeholder={"noHp Supplier"}
                        />
                        {openSupplier === true ? (
                            <View style={{
                                maxHeight: 200,
                                width: "95%",
                                padding: 5,
                            }}>
                                    <>
                                    {supplier.dataSupplier?.length > 0 ? (
                                        <>
                                        {supplier.dataSupplier.map((suppliers) => {
                                            return (
                                                <View key={suppliers.id} style={{margin:4}}>
                                                    <TouchableOpacity style={[styles.row]} onPress={() => handleSavePhoneSupplier(suppliers)}>
                                                        <Text style={[styles.marginHs]}>{suppliers.id}. {suppliers.name}</Text>
                                                        <Text style={[styles.flex1, styles.marginHs, {textAlign: "right"}]}>{suppliers.phone_number}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )
                                        })}
                                        </> 
                                    ): loading}
                                    </>
                            </View>
                        ):null}
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
                        onPress={() => handleSaveAddBarang()}
                        loading={loading}
                        />
                        <ButtonViewMini
                        dark
                        title="Batal"
                        
                        onPress={() => setModalAddBarang(false)}
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
