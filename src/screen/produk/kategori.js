import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, TouchableOpacity, Modal, KeyboardAvoidingView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import LogoKategori from '../../assets/img/kategori.svg';
import { useNavigation } from '@react-navigation/native';

import ButtonView from '../../components/ButtonView'
import InputView from '../../components/InputView'
import { colors, styles } from '../../style'
import ButtonViewMini from '../../components/ButtonViewMini';
import InputView2 from '../../components/InputView2';

const kategori = ({kategori, setKategori}) => {
    const [search, setSearch] = useState('');
    const [modal, setModal] = useState(false);
    
    const navigation = useNavigation();


    return (
        <View style={[styles.flex1, styles.backgroundLight]}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content"/>
            
            <View style={[styles.container, styles.row]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={25} color={colors.black}/>
                </TouchableOpacity>
                <Text style={[
                    styles.marginHm,
                    styles.centerItem,
                    styles.textUpH3
                ]}>Pilih Kategori</Text>
            </View>

            <View style={[
                styles.flex1,
                styles.marginHs,
                styles.marginHm
            ]}>
                <Text style={[styles.marginVm]}>Pilih Kategori Produk</Text>
                <InputView 
                placeholder="Search..."
                name={search ? 'text-box-search-outline' : 'text-box-search-outline'}
                onIconPress={() => setSearch(search)}
                />
            </View>

            <View style={[styles.marginVs, styles.marginHm]}>
                {/* <LogoKategori /> */}
                <ButtonView
                title="Tambah Baru"
                onPress={() => setModal(true)}
                />
            </View>
            
            <Modal
                statusBarTranslucent
                transparent
                visible={modal}
                animationType={"fade"}
                onRequestClose={() => setModal(false)}
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
                    value={kategori}
                    onChangeText={setKategori}
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
                    onPress={() => setModal(true)}
                    />
                    <ButtonViewMini
                    dark
                    title="Batal"
                    
                    onPress={() => setModal(false)}
                    />
                    </View>
                </View>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    )
}

export default kategori
