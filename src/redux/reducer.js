import {combineReducers} from 'redux';

const tokenReducer = (state = '', action) => {
    switch (action.type) {
        case 'CHANGE':
            return action.data;
        case 'CLEAR':
            return null;
        default:
            return state;
    }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_DATA':
            return action.data;
        case 'SET_USER':
            return action.data;
        case 'CHANGE_ID':
            return {
                ...state,
                id: action.data.id,
            }
        case 'CLEAR':
            return null;
        default: 
        return state; 
    }
}

const produkReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PRODUK':
            return action.data;
        case 'SET_ADD_PRODUK':
            return action.data;
        default:
            return state;
    }
}

const kategoriReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_KATEGORI':
            return action.data;
        default:
            return state;
    }
}

const produkBuyReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PRODUK_BUY':
            return action.data
        case 'SET_ADD_PRODUK_BUY':
            return action.data    
        default:
            return state;
    }
}

const supplierReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SUPPLIER':
            return action.data    
        default:
            return state;
    };
}

const transaksiReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_TRANSAKSI':
            return action.data
        case 'SET_ADD_TRANSAKSI':
            return action.data
        default:
            return state;
    }
}

const cartReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CART':   //------------------> nyimpen item barang
            return action.data
        case 'SET_ADD_CART':
            return action.data
        default:
            return state;
    }
}

const buyerReducer = (state = {}, action) => {
    switch (action.type) {
        // case 'SET_PELANGGAN':
        //     return {dataPelanggan:[...(state.dataPelanggan ?? []), action.data]};  //---------> save tanpa endpoint
        case 'SET_BUYER':
            return action.data
        case 'CHANGE_BUYER':
            return action.data
        default:
            return state;
    }
}

const idCustomer = (state = null, action) => {
    switch (action.type) {
        case 'SET_ID_CUSTOMER':
            return action.data
        default:
            return state;
    }
}

export default combineReducers({
    user: userReducer,
    token: tokenReducer, 
    produk: produkReducer,
    produkBuy: produkBuyReducer,
    listKategori: kategoriReducer,
    supplier: supplierReducer,
    transaksi: transaksiReducer,
    cart: cartReducer,
    buyer: buyerReducer,
    idCustomer: idCustomer,
});