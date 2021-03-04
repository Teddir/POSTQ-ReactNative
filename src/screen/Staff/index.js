import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StatusBar, 
    TouchableOpacity, 
    ScrollView, 
    RefreshControl, 
    Image, 
    TextInput, 
    ToastAndroid 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';

import ButtonView from '../../components/ButtonView';
import InputView2 from '../../components/InputView2';
import { getProduk } from '../../services/endpoint/produk';
import { styles, colors } from '../../style';

const index = ({navigation}) => {
    const [ loading, setLoading ] = useState(false);
    const { user, produk } = useSelector((state) => state)
    console.log('Produk', produk.dataProduk ? 'ada' : 'tidak ada');    
    
    const getData = () => {
        getProduk();
    }
    useEffect(() => {
        const unsub = navigation.addListener('focus', () => {
            getData();
        });
        return unsub;
    }, [navigation]);

    return (
        <View style={[styles.flex1, styles.backgroundLight]}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
                <View style={[styles.underCross, styles.marginVs]}>
                    <View style={[ styles.marginHm ]}>
                    <Icon1 name="dehaze" size={24}/>
                    <View style={[styles.row, styles.marginVs, styles.centerItem, ]}>
                        <Icon name="text-box-search-outline" size={25}/>
                        <TextInput 
                        placeholder="Cari produk di semua kategori"

                        />
                    </View>
                </View>
            </View>
            <ScrollView
                refreshControl={
                    <RefreshControl 
                    refreshing={produk?.dataProduk?.length > 0 ? produk.dataProduk.loading : null}
                    onPress={() => {
                        getData();
                    }}
                    />
                }
            >
            { user && produk?.dataProduk?.length > 0 ? (
                <>
                {produk.dataProduk ? (
                    <>
                    <View>
                        {produk.dataProduk.map((produk) => {
                            return (
                                <View
                                key={produk.id}
                                style={[
                                    styles.row,
                                ]}
                                >
                                    <View style={[
                                        styles.flex1,
                                        styles.underCross,
                                        styles.marginHm, 
                                    ]}>
                                        <TouchableOpacity>
                                        <View 
                                        style={[
                                            styles.marginMini,
                                            styles.row,
                                            styles.centerItem,
                                        ]}>
                                            <Image 
                                            source={{uri: produk.avatar}}
                                            style={[styles.img, styles.marginHs]}
                                            />
                                            <Text>
                                            {produk.name}{'\n'}
                                            {produk.stok ? (
                                                <>
                                                <Text style={{color: 'red', fontSize: 10}}>{produk.stok} Stok</Text>
                                                </>
                                            ): <Text>-</Text>}
                                            </Text>
                                            <View
                                            style={[
                                                styles.flex1,
                                                styles.marginVm,
                                                styles.textRight
                                            ]}>
                                                <Text>Rp.{produk.hj}</Text>
                                            </View>
                                        </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    </>
                ): loading}
                </>
            ): null}
            <View style={[styles.flex1, styles.marginHxl]}>
                <View style={[styles.marginButton, {marginBottom: 50}]}>
                    <ButtonView
                    title="Tambah Produk"
                    onPress={() => {navigation.navigate('ProdukInScreen')}}
                    />
                </View>
            </View>
            </ScrollView>
            <View style={[styles.flex1, styles.centerItem]}/>
            <View style={[styles.lingkaran, styles.backgroundPrimary]}>
            <TouchableOpacity onPress={() => console.log('dsd')}>
                <View style={[styles.centerItem]}>
                    <Icon name="barcode-scan" size={25} color={colors.white}/>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default index
