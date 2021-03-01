import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, styles } from '../style'

const InputView = ({ 
    placeholder, 
    name, 
    onIconPress, 
    secure, 
    value, 
    onChangeText, 
    type, 
    editable 
}) => {
    return (
        <View style={[styles.textInput, styles.row]}>
            <TextInput 
            editable={editable}
            secureTextEntry={secure}
            placeholder={placeholder}
            value={value}
            keyboardType={type}
            onChangeText={(i) => (onChangeText ? onChangeText(i) : null)}
            style={[styles.flex1, styles.marginHm]}
            />
            {name ? (
                <TouchableOpacity
                    onPress={()=> onIconPress()}
                    style={[styles.centercenter, styles.marginHs]}>
                    <Icon name={name} size={24} color={colors.primary}/>
                </TouchableOpacity>
            ): null }
        </View>
    );
};

export default InputView
