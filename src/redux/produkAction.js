export const setProduk = (data) => {
    console.log('ini produk :', data);
    return {
        type: 'SET_PRODUK',
        data: data,
    };
};
console.log('setProduk :', setProduk());

export const setAddProduk = (data) => {
    return {
        type: 'SET_ADD_PRODUK',
        data: data,
    };
};