export const setProdukBuy = (data) => {
    console.log('redux PordukBuy :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_PRODUK_BUY',
        data: data,
    };
}

export const setAddProdukBuy = (data) => {
    console.log('redux AddPordukBuy :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_ADD_PRODUK_BUY',
        data: data,
    };
} 