import AsynStorage from '@react-native-async-storage/async-storage';

const storeToken = async (token) => {
    try {
        AsynStorage.setItem('token', token)
    } catch (error) {
        console.log(error);
    }
};

const getToken = async () => {
    try {
        AsynStorage.getItem('getStarted', true);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error);
    }
};

const removeToken = async () => {
    try {
        AsyncStorage.removeItem('token');
        console.log('Done, delete token');
    } catch (error) {
        console.log(error);
    }
};

export {storeToken, getToken, removeToken};