export const setTransaksi = (data) => {
    console.log('redux Transaksi :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_TRANSAKSI',
        data: data,
    };
}

export const setAddTransaksi = (data) => {
    console.log('redux AddTransaksi :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_ADD_TRANSAKSI',
        data: data
    };
}

export const setCart = (data) => {                                //------------------> nyimpen item barang
    console.log('redux cart :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_CART',
        data: data,
    };
}

export const setAddCart = (data) => {
    console.log('redux Addcart :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_ADD_CART',
        data: data,
    };
}

export const setDeleteCart = (data) => {
    console.log('redux delete :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_DELETE_CART',
        data: data,
    }
}