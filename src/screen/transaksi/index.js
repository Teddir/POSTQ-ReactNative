import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon1 from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
``
import { styles, colors } from '../../style';
import { getProduk } from '../../services/endpoint/produk';
import { getKategori } from '../../services/endpoint/kategori';
import ButtonView from '../../components/ButtonView';
import { getCart, deleteCart } from '../../services/endpoint/cart';
import { getProfileBuyer } from '../../services/endpoint/buyer';

const index = ({route}) => {
    const navigation = useNavigation();
    const { produk, kategori, cart, buyer } = useSelector((state) => state);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0); 

    console.log('Buyer', buyer.dataBuyer ? 'ada' : 'tidak');

    const toPrice = (price) => {
        return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
    }
    
    const getData = () => {
        getProduk();
        getKategori();
        getCart();
        getProfileBuyer();
    }

    useEffect(() => {
        const unsub = navigation.addListener('focus', () =>{
            getData();
        });
        return unsub;
    }, [navigation]);


    console.log('ini listData', route.params);

    useEffect(() => {
        // console.log(listData);
        try {
            if (route.params.length > 0) {
                const totalJual = route.params.reduce((acumu, current) => {
                    return (
                        acumu + parseFloat(current.subtotal)
                    )
                },0)
                setTotal(totalJual);
            }
        } catch (error) {
            console.log(error);
        }
    },[route.params]);

    const goback = () => {
        getData();
        navigation.goBack();
    };

    const handleDeleteOneCart = (data) => {
        setLoading(true)
        console.log(data);
        deleteCart(data)
        .then((res) => {
            if (res.Status === "Succes") {
                navigation.goBack();
                ToastAndroid.show('Berhasil dihapus', 1500);
                getData();
                setLoading(false);
            } else {
                ToastAndroid.show('Gagal dihapus', 1200);
                setLoading(false);
            };
        })
        .catch((e) => ToastAndroid.show(e, 1200));
    } 

    const handlePelanggan = () => {
        getData();
        navigation.navigate("PelangganScreen")
    };

    // const handleDeleteAllCart = (data) => {
    //     setLoading(true)
    //     console.log(data);
    //     deleteCart(data)
    //     .then((res) => {
    //         if (res.Status === "Succes") {
    //             navigation.goBack();
    //             ToastAndroid.show('Berhasil dihapus', 1500);
    //             getData();
    //             setLoading(false);
    //         } else {
    //             ToastAndroid.show('Gagal dihapus', 1200);
    //             setLoading(false);
    //         };
    //     })
    //     .catch((e) => ToastAndroid.show(e, 1200));
    // }

    return (
        <View style={[styles.flex1]}>
            <StatusBar backgroundColor={colors.blackBg} barStyle="light-content"/>
            <View style={[styles.container, styles.row, styles.backgroundLight]}>
                <TouchableOpacity onPress={() => goback()} >
                    <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                </TouchableOpacity>
                <Text style={[
                    styles.marginHm,
                    styles.centerItem,
                    styles.textUpH3
                ]}>Detail Pesanan</Text>
            </View>
            <View style={[styles.underCross, {elevation: 3}]}/>
            <ScrollView>

            <View style={[styles.marginHm, styles.marginVs,]}>
                <TouchableOpacity onPress={() => handlePelanggan()}>
                <View style={[styles.row]}>
                <Text style={[styles.textUpH3]}>Pelanggan / Member</Text>
                    <View style={[
                        styles.flex1,
                        styles.centercenter,
                        styles.textRight,
                        styles.marginHm                    
                    ]}>
                            <Icon1 name="chevron-small-right" size={24} color={colors.black}/>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={[styles.underCross, styles.marginVs]}/>
            </View>

            {route.params.map((data) => {
                console.log('ini data ku',data.barang);
                return (
                    <View key={data.id} style={[styles.grey]}>
                        <View style={[styles.row,  styles.marginVm, styles.marginHm]}>

                            <View>
                                <TouchableOpacity onPress={() => handleDeleteOneCart(data.id)}>
                                    <View style={[{
                                        height:22, 
                                        width:23, 
                                        alignItems:'center', 
                                        borderRadius:5}, 
                                        styles.backgroundTen
                                    ]}>
                                    <Text style={[styles.textWhite]}>X</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={[styles.marginHs]}>
                                <View style={[{
                                    height:22, 
                                    width:23, 
                                    alignItems:'center', 
                                    borderRadius:5,
                                    elevation:5}, 
                                    styles.backgroundAsli
                                ]}>
                                <Text style={[styles.textWhite]}>{data.qty}</Text>
                                </View>
                            </View>

                            <View style={[styles.marginHs]}>
                                <Text style={[styles.marginHm,, {fontWeight:"bold"}]}>{data.barang}</Text>
                            </View>
                            
                            <View style={[
                                styles.flex1,
                                styles.centercenter,
                                styles.textRight,
                            ]}>
                                <Text>Rp.{toPrice(data.subtotal)}, -</Text>
                            </View>
                        </View>
                        <View style={[styles.underCross]}/>
                    </View>
                )
            })}
            <View style={[styles.marginHm, styles.marginVs]}>
                <View style={[styles.row, styles.marginVs]}>
                    <Text style={[{fontSize:15, fontWeight: 'bold'}]}>Subtotal</Text>

                    <View style={[
                        styles.flex1,
                        styles.textRight,
                    ]}> 
                        <Text style={{fontWeight: "bold", color:'red'}}>Rp.{toPrice(total)}, -</Text>
                    </View>

                </View>
                <View style={[styles.underCross]} />

                {/* <View style={[styles.flex1, styles.centercenter, styles.marginVm]}>
                    <TouchableOpacity onPress={() => handleDeleteAllCart(0)}>
                        <Text style={{color:'grey'}}>Hapus Pesanan</Text>
                    </TouchableOpacity>
                </View> */}
            </View>
            </ScrollView>
            <View style={[styles.flex1, styles.centercenter]} />
                <View style={[styles.marginVs, styles.marginHm]}>
                    <ButtonView
                    title="Bayar"
                    onPress={() => navigation.navigate("BayarTransaksiScreen")}
                    />
                </View>
        </View>
    )
}

export default index
