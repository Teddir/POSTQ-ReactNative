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
            return action.data
        default:
            return state;
    }
}

export default combineReducers({
    user: userReducer,
    token: tokenReducer, 
    produk: produkReducer,
});