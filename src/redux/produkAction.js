export const setProduk = (data) => {
    console.log('redux produk :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_PRODUK',
        data: data,
    };
};

export const setAddProduk = (data) => {
    console.log('add Produk :', data ? 'success' : 'gagal')
    return {
        type: 'SET_ADD_PRODUK',
        data: data,
    };
};