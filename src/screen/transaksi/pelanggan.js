import React, { useState, useEffect} from 'react'
import { View, Text, StatusBar, TouchableOpacity, TouchableWithoutFeedback, TextInput, Modal } from 'react-native'
import Icon  from 'react-native-vector-icons/FontAwesome5'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector} from 'react-redux'; 
import { useNavigation } from '@react-navigation/native'

import { colors, styles } from '../../style'
import InputView from '../../components/InputView'
import ButtonView from '../../components/ButtonView';
import LogoCustomer from '../../assets/img/noCustomer.svg';
import InputViewBig from '../../components/InputViewBig';

const pelanggan = () => {
    const navigation = useNavigation();
    const {pelanggan} = useSelector((state) => state)
    const [loading, setLoading] = useState(false);
    const [addCustomer, setAddCustomer] = useState(null);
    const [modalAdd, setModalAdd] = useState(false);
    const [name, setName] = useState(null);
    const [nomor, setNomor] = useState(null);
    const [email, setEmail] = useState(null);
    const [alamat, setAlamat] = useState(null);

    const handleAddCustomer = () => {
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
                {/* <View style={[styles.underCross, styles.marginVs, styles.marginHm]}>
                        <View style={[styles.row, styles.centerItem,]}>
                            <View style={{margin:10}}>
                                <Icon1 name="account-search" size={25}/>
                            </View>
                            <TextInput
                            maxLength={50}
                            placeholder="Cari name, nomor telepon, email"
                            />
                        </View>
                </View> */}
                <View style={[styles.flex1, styles.centercenter]} />
                <View style={[styles.centerItem, styles.centercenter]}>
                    <LogoCustomer width="50%" height="50%" />
                    <Text style={{marginTop:1,fontSize:20, textAlign: 'center', fontWeight: 'bold'}}>Belum ada pelanggan {`\n`}
                    <Text style={{color: 'grey', fontSize:15}}>Mulai dengan menambah pelanggan baru terlebih dahulu</Text></Text>
                </View>

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
                    type="number-pad"
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
                    type="number-pad"
                    />
                    <Text style={[styles.marginVs]}>Alamat</Text>
                    <InputViewBig
                    placeholder="Contoh: Jln wadidaw street"
                    value={alamat}
                    onChangeText={(n) => setAlamat(n)}
                    type="number-pad"
                    />
                </View>

                <View style={[styles.flex1, styles.centercenter]}/>
                <View style={[styles.marginVs, styles.marginHm,]}>
                    <ButtonView 
                    title="Simpan"
                    loading={loading}
                    onPress={() => setModal(true)}
                    />
                </View>
                
            </View>
            </Modal>

        </View>
    )
}

export default pelanggan
