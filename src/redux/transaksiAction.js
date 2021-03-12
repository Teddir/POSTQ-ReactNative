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