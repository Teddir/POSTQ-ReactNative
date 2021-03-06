export const setKategori = (data) => {
    console.log('redux kategori :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_KATEGORI',
        data: data,
    };
};