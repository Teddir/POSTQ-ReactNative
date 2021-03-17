import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, styles } from '../style'

const InputViewBig = ({ 
    placeholder, 
    name, 
    onIconPress, 
    secure, 
    value, 
    onChangeText, 
    type, 
    editable,
    disable
}) => {
    return (
        <View style={[styles.textInput]}>
            <TextInput 
            disableFullscreenUI={disable}
            editable={editable}
            secureTextEntry={secure}
            placeholder={placeholder}
            value={value}
            keyboardType={type}
            onChangeText={(i) => (onChangeText ? onChangeText(i) : null)}
            style={[styles.marginHm, {textAlignVertical:"top"}]}
            multiline
            numberOfLines={4}
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

export default InputViewBig
