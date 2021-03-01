import { StyleSheet, Dimensions } from "react-native";
import { color } from "react-native-reanimated";

export const widthScreen = Dimensions.get('screen').width;

export const colors = {
    primary: '#84817a',
    secondary: '#8c6500',
    thirty: '#F1EA23',
    fourty: '#00C343',
    lightBg: '#FFF',
    white: '#FEFEFE',
    grey: '#F2F2F2',
    greyOne: '#5F5F5F',
    blackBg: '#000',
    black: '#1F1F1F',
    opacity: '#1F1F1F99',
    nine: '#4b4b4b'
};

export const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    row: {flexDirection: 'row'},
    container: {padding: 15},
    backgroundLight: {
        backgroundColor: colors.lightBg
    },
    backgroundWhite: {
        backgroundColor: colors.white
    },
    backgroundPrimary: {
        backgroundColor: colors.blackBg
    },
    backgroundSecondary: {
        backgroundColor: colors.black
    },
    backgroundThirty: {
        backgroundColor: colors.thirty
    },
    backgroundOpacity: {
        backgroundColor: colors.opacity
    },
    backgroundNine: {
        backgroundColor: colors.nine
    },
    centercenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerItem: {alignItems: 'center'},
    textH1: {
        fontWeight: 'bold',
        fontSize: 36,
    },
    textH2: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    textH3: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    textH4: {
        fontWeight: 'bold',
        fontSize: 10,
    },
    textMedium: {
        fontWeight: '700', 
        fontSize: 14
    },
    textInput: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: colors.grey
    },
    textUppercase: {textTransform: 'uppercase'},
    textWhite: {color: colors.white},
    textBlack: {color: colors.blackBg},
    textPrimary: {color: colors.primary},
    textSecondary: {color: colors.secondary},
    textCenter: {textAlign: 'center'},
    marginHxl: {
        marginHorizontal: 42
    },
    marginVXL: {
        marginVertical: 30,
    },
    marginVm: {
        marginVertical: 16
    },
    marginVs: {
        marginVertical: 8
    },  
    marginHs: {
        marginHorizontal: 8,
    },
    marginHm: {
        marginHorizontal: 16,
    },
    marginButton: {
        marginVertical: 5
    },
    lottieButton: {width: 19, height: 19},
    button: {
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',
        elevation: 20,
    },
    buttonLog: {
        borderRadius: 5,
        paddingVertical: 30,
        alignItems: 'center',
        elevation: 5,
        margin: 10,
    },
})