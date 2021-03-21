import React, { useState, useEffect} from 'react'
import { View, Text, StatusBar, TouchableOpacity, TouchableWithoutFeedback, TextInput, Modal, ToastAndroid } from 'react-native'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector} from 'react-redux'; 
import { useNavigation } from '@react-navigation/native'

import { colors, styles } from '../../style'
import InputView from '../../components/InputView'
import ButtonView from '../../components/ButtonView';
import LogoCustomer from '../../assets/img/noCustomer.svg';
import InputViewBig from '../../components/InputViewBig';
import store from '../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addBuyer, getProfileBuyer, updateBuyer } from '../../services/endpoint/buyer';
import { setIdCustomer } from '../../redux/action';

const pelanggan = () => {
    const navigation = useNavigation();
    const {buyer} = useSelector((state) => state)
    const [loading, setLoading] = useState(false);
    const [addCustomer, setAddCustomer] = useState(null);
    const [modalDetail, setModaDetail] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalAdd, setModalAdd] = useState(false);
    const [name, setName] = useState(null);
    const [nomor, setNomor] = useState(null);
    const [email, setEmail] = useState(null);
    const [alamat, setAlamat] = useState(null);

    // console.log(JSON.stringify(pelanggan));
    // const handleAddCustomer = () => {
    //     // AsyncStorage.removeItem(pelanggan)
    //     const dataNew = {name, nomor, alamat, email}
    //     store.dispatch(setPelanggan(dataNew));
    //     // // const data = {dataPelanggan:[]}
    //     // // data.dataPelanggan.push(dataNew);
    //     // // console.log(data);
    // }

    console.log('Buyer', buyer.dataBuyer ? 'ada' : 'tidak');
    console.log(buyer)
    const getData = () => {
        getProfileBuyer();
    }

    useEffect(() => {
        const unsub = navigation.addListener('focus', () =>{
            getData();
        });
        return unsub;
    }, [navigation]);

    const handleAddCustomer = () => {
        setLoading(true);
        addBuyer(name, nomor, alamat, email)
        .then((res) => {
            console.log(res);
            if (res.Status === "Sucess") {
                ToastAndroid.show('Berhasil menambah pelanggan', 1200);
                navigation.navigate('DetailTransaksiScreen')
                setLoading(false);
            } else {
                ToastAndroid.show('data tidak boleh duplicat', 1200);
                setLoading(false);
            }
        })
        .catch((err) => {
            ToastAndroid.show(err, 1200);
            setLoading(false);
        })
    }

    const handleUpdateCustomer = () => {
        setLoading(true);
        updateBuyer(dataDetail.id, name, nomor, alamat, email)
        .then((res) => {
            if (res.Status === "Succes") {
                ToastAndroid.show('Berhasil mengubah pelanggan', 1200);
                navigation.navigate('DetailTransaksiScreen')
                setLoading(false);
            } else {
                ToastAndroid.show('data tidak bisa di ubah', 1200);
                setLoading(false);
            }
        })
        .catch((err) => {
            ToastAndroid.show(err, 1200);
            setLoading(false);
        })
    }

    const handleSavePelanggan = (data) => {
        // console.log(data);
        // navigation.navigate("DetailTransaksiScreen", data);
        console.log(data);
        setDataDetail(data);
        setModaDetail(true);
    }

    const handleIdCustomer = (data) => {
        console.log(data);
        store.dispatch(setIdCustomer(data));
        navigation.navigate("DetailTransaksiScreen");
    }

    return (
        <View style={[styles.flex1]}>
                <View>
                    <StatusBar backgroundColor={colors.blackBg} barStyle="light-content"/>
                    <View style={[styles.container, styles.row, styles.backgroundLight]}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                        </TouchableOpacity>
                        <Text style={[
                            styles.marginHm,
                            styles.centerItem,
                            styles.textUpH3
                        ]}>Pilih Pelanggan</Text>
                    </View>
                    <View style={[styles.underCross, {elevation: 3}]}/>
                </View>
                {buyer.dataBuyer.length > 0 ? (
                <>
                    <View style={[styles.marginVs, styles.marginHm, {borderWidth:1, borderRadius:5, borderColor:'grey'}]}>
                            <View style={[styles.row, styles.centerItem,]}>
                                <View style={{margin:10}}>
                                    <Icon1 name="account-search" size={25}/>
                                </View>
                                <TextInput
                                maxLength={50}
                                placeholder="Cari name, nomor telepon, email"
                                />
                            </View>
                    </View>
                    {buyer.dataBuyer.map((item) => {
                        return (
                            <>
                            <View key={item.id} style={styles.marginVs}>
                                <TouchableOpacity onPress={() => handleSavePelanggan(item)}>
                                    <View style={styles.marginHm}>
                                        <Text style={styles.textH3}>{item.name}</Text>
                                        <Text style={{color: 'grey', fontSize:11, margin:1}}>{item.phone_number} | {item.email}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                                <View style={[styles.underCross]}/>
                            </>
                        )
                    })}
                </>
                ) : 
                <>
                    <View style={[styles.flex1, styles.centercenter]} />
                    <View style={[styles.centerItem, styles.centercenter]}>
                        <LogoCustomer width="50%" height="50%" />
                        <Text style={{marginTop:1,fontSize:20, textAlign: 'center', fontWeight: 'bold'}}>Belum ada pelanggan {`\n`}
                        <Text style={{color: 'grey', fontSize:15}}>Mulai dengan menambah pelanggan baru terlebih dahulu</Text></Text>
                    </View>
                </>
                }

                <View style={[styles.flex1, styles.centercenter]} />
                <View style={[styles.marginVs, styles.marginHm]}>
                    <ButtonView 
                    title="Tambah Pelanggan"
                    onPress={() => setModalAdd(true)}
                    />
                </View>

                <Modal onRequestClose={() => setModal(false)} visible={modalAdd}>
                <View style={[styles.flex1, styles.backgroundLight]}>
                <View>
                    <StatusBar backgroundColor={colors.blackBg} barStyle="light-content"/>
                    <View style={[styles.container, styles.row, styles.backgroundLight]}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                        </TouchableOpacity>
                        <Text style={[
                            styles.marginHm,
                            styles.centerItem,
                            styles.textUpH3
                        ]}>Tambah Pelanggan</Text>
                    </View>
                    <View style={[styles.underCross, {elevation: 3}]}/>
                </View>
                
                <View style={[styles.marginHm, styles.marginVs]}>
                    <Text style={[styles.marginVs]}>Name</Text>
                    <InputView 
                    placeholder="Contoh: wadidaw is one"
                    value={name}
                    onChangeText={(n) => setName(n)}
                    />
                    <Text style={[styles.marginVs]}>Nomor Telepon</Text>
                    <InputView 
                    placeholder="Contoh: 0899083432842"
                    value={nomor}
                    onChangeText={(o) => setNomor(o)}
                    type="number-pad"
                    />
                    <Text style={[styles.marginVs]}>Email</Text>
                    <InputView 
                    placeholder="contoh: wadidaw@gmail.com"
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                    />
                    <Text style={[styles.marginVs]}>Alamat</Text>
                    <InputViewBig
                    placeholder="Contoh: Jln wadidaw street"
                    value={alamat}
                    onChangeText={(n) => setAlamat(n)}
                    />
                </View>

                <View style={[styles.flex1, styles.centercenter]}/>
                <View style={[styles.marginVs, styles.marginHm,]}>
                    <ButtonView 
                    title="Simpan"
                    loading={loading}
                    onPress={() => handleAddCustomer()}
                    />
                </View>
                
            </View>
            </Modal>
                <Modal onRequestClose={() => setModalDetail(false)} visible={modalDetail}>
                    <View style={[styles.flex1, styles.backgroundLight]}>
                    <View>
                        <StatusBar backgroundColor={colors.blackBg} barStyle="light-content"/>
                        <View style={[styles.container, styles.row, styles.backgroundLight]}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                            </TouchableOpacity>
                            <Text style={[
                                styles.marginHm,
                                styles.centerItem,
                                styles.textUpH3
                            ]}>{dataDetail ? dataDetail.name : null}</Text>
                        </View>
                        <View style={[styles.underCross, {elevation: 3}]}/>
                    </View>
                    
                    <View style={[styles.marginHm, styles.marginVs]}>
                        <View style={[
                            styles.centercenter,
                            {elevation: 5},
                            {backgroundColor:"#FFBBDC"}
                        ]}>
                            <View  style={[styles.row, styles.marginHm, styles.marginVs]}>
                            <Text style={{fontWeight: "bold"}}>Data Pelanggan</Text>
                            <View style={[styles.flex1, styles.textRight]}>
                            <TouchableOpacity onPress={() => setModalUpdate(true)}>
                            <Text style={{color: 'blue'}}>Update</Text>
                            </TouchableOpacity>
                            </View>
                            </View>
                            <View style={[
                                styles.marginHm,{marginVertical:2},styles.row
                            ]}>
                            <Text style={[styles.m]}>Name </Text>
                            <Text style={{flex:1,marginHorizontal:60}}>{dataDetail ? dataDetail.name : null}</Text>
                            </View>
                            <View style={[
                                styles.marginHm,{marginVertical:2},styles.row
                            ]}>
                            <Text>Email </Text>
                            <Text style={{flex:1,marginHorizontal:60}}> {dataDetail ? dataDetail.email : null}</Text>
                            </View>
                            <View style={[
                                styles.marginHm,{marginVertical:2},styles.row
                            ]}>
                            <Text>Nomor</Text>
                            <Text style={{flex:1,marginHorizontal:60}}>{dataDetail ? dataDetail.phone_number : null}</Text>
                            </View>
                            <View style={[
                                styles.marginHm,{marginVertical:2},styles.row
                            ]}>
                            <Text>Alamat</Text>
                            <Text style={{flex:1,marginHorizontal:60, marginBottom:5}}>{dataDetail ? dataDetail.alamat : null}</Text>
                            </View>
                        </View>
                        <View style={[{backgroundColor:"#FFBBDC"}, {elevation: 5}, styles.marginVs]}>
                            <View style={[styles.marginVs]}>
                            <View  style={[styles.marginHm]}>
                            <Text style={{fontWeight: "bold"}}>Riwayat Kunjungan</Text>
                            </View>
                            <View style={[
                                styles.marginHm,{marginVertical:5},styles.row
                            ]}>
                            <Text>Total Kunjungan</Text>
                            <Text style={{flex:1, textAlign:"right"}}>{dataDetail ? dataDetail.kunjungan == null ? 0 : null : 0}</Text>
                            </View>
                            <View style={[
                                styles.marginHm,{marginVertical:2},styles.row
                            ]}>
                            <Text>Kunjungan Terakhir</Text>
                            <Text style={{flex:1,textAlign:"right"}}>{dataDetail ? dataDetail.updated_at : null}</Text>
                            </View>
                            </View>
                        </View>
                    </View>

                    <View style={[styles.flex1, styles.centercenter]}/>
                    <View style={[styles.marginVs, styles.marginHm,]}>
                        <ButtonView 
                        title="Tambah Ke Pesanan"
                        loading={loading}
                        onPress={() => handleIdCustomer(dataDetail)}
                        />
                    </View>
                    
                </View>
                </Modal>
                <Modal onRequestClose={() => setModalUpdate(false)} visible={modalUpdate}>
                <View style={[styles.flex1, styles.backgroundLight]}>
                <View>
                    <StatusBar backgroundColor={colors.blackBg} barStyle="light-content"/>
                    <View style={[styles.container, styles.row, styles.backgroundLight]}>
                        <TouchableOpacity onPress={() => setModalUpdate(false)}>
                            <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                        </TouchableOpacity>
                        <Text style={[
                            styles.marginHm,
                            styles.centerItem,
                            styles.textUpH3
                        ]}>Update Pelanggan</Text>
                    </View>
                    <View style={[styles.underCross, {elevation: 3}]}/>
                </View>
                
                <View style={[styles.marginHm, styles.marginVs]}>
                    <Text style={[styles.marginVs]}>Name</Text>
                    <InputView 
                    placeholder={dataDetail ? dataDetail.name : null}
                    value={name}
                    onChangeText={(n) => setName(n)}
                    />
                    <Text style={[styles.marginVs]}>Nomor Telepon</Text>
                    <InputView 
                    placeholder={dataDetail ? dataDetail.phone_number : null}
                    value={nomor}
                    onChangeText={(o) => setNomor(o)}
                    type="number-pad"
                    />
                    <Text style={[styles.marginVs]}>Email</Text>
                    <InputView 
                    placeholder={dataDetail ? dataDetail.email : null}
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                    />
                    <Text style={[styles.marginVs]}>Alamat</Text>
                    <InputViewBig
                    placeholder={dataDetail ? dataDetail.alamat : null}
                    value={alamat}
                    onChangeText={(n) => setAlamat(n)}
                    />
                </View>

                <View style={[styles.flex1, styles.centercenter]}/>
                <View style={[styles.marginVs, styles.marginHm,]}>
                    <ButtonView 
                    title="Simpan"
                    loading={loading}
                    onPress={() => handleUpdateCustomer()}
                    />
                </View>
                
            </View>
            </Modal>
        </View>
    )
}

export default pelanggan
