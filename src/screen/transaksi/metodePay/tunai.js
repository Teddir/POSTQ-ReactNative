import React, { useState, useEffect} from 'react';
import { View, Text, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ButtonViewIcon from '../../../components/ButtonViewIcon';
import { styles } from '../../../style';
import LogoPembayaran from '../../../assets/img/metodePembayaran.svg';
import ButtonView from '../../../components/ButtonView';


const tunai = () => {
    const navigation = useNavigation();
    const [pay, setPay] = useState(null);

    return (
        <View style={[styles.flex1, styles.grey]}>
            <View style={[styles.centercenter, styles.marginVm]}>
                <LogoPembayaran width="50%" height="50%" />
            </View>
            <View style={[styles.marginHm, styles.marginVm]}>
                <Text>Uang di terima</Text>
                <TextInput
                style={[styles.textH2]}
                placeholder="Rp.0"
                keyboardType="number-pad"
                value={pay}
                onChangeText={(e) => setPay(e)}
                />
            <View style={[styles.underCross]}/>
            </View>
            <View style={[styles.marginHm, styles.marginVs]}>
                <ButtonView
                title="Lanjut"
                // loading={loading}
                onPress={() => handleSubmit()}
                />
            </View>

            <View style={[styles.flex1, {alignItems: 'center'}]}>
                <View style={[styles.marginHm, styles.marginVXL]}>
                    <ButtonViewIcon
                    title="Uang Pas"
                    dark
                    name="money-bill"
                    />
                </View>
            </View>
        
        </View>
    )
}

export default tunai
