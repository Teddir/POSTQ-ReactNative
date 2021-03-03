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
    nine: '#4b4b4b',
    ten: '#b2bec3'
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
    backgroundTen: {
        backgroundColor: colors.ten
    },
    centercenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    centerItem: {alignItems: 'center'},
    textRight: {alignItems: 'flex-end'},
    textH1: {
        fontWeight: 'bold',
        fontSize: 36,
    },
    textH2: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    textMinH2: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    textUpH3: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    textH3: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    textH4: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    textMedium: {
        fontWeight: '700', 
        fontSize: 14
    },
    textInput: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: colors.grey,
        borderWidth: 2,  //----------------> untuk border 
        borderRadius:10,
        borderColor: colors.primary
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
    marginMini: {
        marginVertical: 4
    },  

    marginHs: {
        marginHorizontal: 8,
    },
    marginHm: {
        marginHorizontal: 16,
    },
    marginButton: {
        marginVertical: 5,
    },
    lottieButton: {width: 19, height: 19},
    button: {
        borderRadius: 10,
        paddingVertical: 16,
        alignItems: 'center',
        elevation: 20,
    },
    buttonTrans: {
        // borderRadius: 10,
        borderBottomWidth:1,
        borderColor: colors.nine,
        paddingVertical: 16,
        alignItems: 'center',
        width: "50%",
        // elevation: 20,
    },
    buttonLog: {
        borderRadius: 5,
        paddingVertical: 30,
        alignItems: 'center',
        elevation: 5,
        margin: 10,
    },
    lingkaran: {
        position: 'absolute',
        bottom: 10,
        alignSelf: "center",
        borderRadius: 80,
        borderWidth: 1,
        borderColor: colors.white,
        width: 50,
        height: 50,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {width:0, height:12},
        shadowOpacity: 0.58,
        shadowRadius: 16.84,
        elevation: 24,

    },
    img: {
        width: 50,
        height: 50,
    },
    underCross: {
        borderBottomWidth: 1,
        borderColor: colors.greyOne,
        backgroundColor: colors.backgroundNine,
    },
    underCrossBg: {
        borderBottomWidth: 3,
        borderColor: colors.primary,
        backgroundColor: colors.backgroundNine,
    },
    topCrossBg: {
        borderTopWidth: 3,
        borderColor: colors.primary,
        backgroundColor: colors.backgroundNine,
    },
})