import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, styles } from '../style'

const InputViewDisable = ({ 
    placeholder, 
    name, 
    onIconPress, 
    secure, 
    value, 
    onChangeText,
    onPress, 
    type, 
    editable,
    disable
}) => {
    return (
        <View style={[styles.textInput]}>
            <TouchableOpacity  onPress={() => (onPress ? onPress() : null)}>
                <View style={[styles.row]}>
                    <Text style={[
                        styles.flex1, 
                        styles.marginHm, 
                        styles.marginVm
                    ]}>{value ? value : "Pilihh Kategori"}</Text>
                    {name ? (
                        <View style={[styles.centercenter, styles.marginHs]}>
                            <Icon name={name} size={24} color={colors.primary} />
                        </View>
                    ): null }
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default InputViewDisable
