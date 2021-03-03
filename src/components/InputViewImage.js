import React from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, styles } from '../style'
import ButtonView from './ButtonView';

const InputViewImage = ({ 
    placeholder, 
    name, 
    onIconPress, 
    secure, 
    value, 
    onChangeText, 
    type, 
    editable ,
    disabled,
    image
}) => {
    return (
        <View style={[
            styles.row, 
            {borderWidth: 2, 
            borderRadius:10,
            borderColor: colors.primary},
        ]}>
            {/* <TextInput 
            editable={editable}
            secureTextEntry={secure}
            placeholder={placeholder}
            value={value}
            keyboardType={type}
            onChangeText={(i) => (onChangeText ? onChangeText(i) : null)}
            style={[styles.flex1, styles.marginHm]}
            /> */}
            {image ? 
            <>
                <View style={[
                    styles.img,
                    styles.marginVs,
                    styles.marginHs
                ]}>
                    <Image source={{uri: image}}/>
                </View>
            </> :
            <>
                <View style={[
                    styles.img,
                    styles.backgroundNine,
                    styles.marginVs,
                    styles.marginHs,
                    {borderRadius: 10}
                ]}>
                <View style={[styles.centercenter, styles.flex1,]}>
                    <Icon name="image-area" size={30} color={colors.white}/>
                </View>
                </View>
            </>
            }
            
            <View
            style={[
                styles.flex1,
                styles.textRight,
                styles.marginVs,
                styles.marginHs
            ]}>
            <ButtonView 
            disabled={disabled}
            title="Pilih Foto"
            />
            </View>
        </View>
    );
};

export default InputViewImage
