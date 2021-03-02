import React from 'react'
import { View, Text, StatusBar, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colors, styles } from '../../style';

const information = (props) => {
    return (
        <View style={[styles.flex1]}>
            <StatusBar />
            <View style={[styles.marginHm, styles.marginVm]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name="chevron-left" size={24} color={colors.blackBg}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default information
