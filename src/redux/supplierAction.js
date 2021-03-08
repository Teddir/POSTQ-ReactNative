export const setSupplier = (data) => {
    console.log('redux Supplier :', data ? 'isi' : 'tidak isi');
    return {
        type: 'SET_SUPPLIER',
        data: data,
    };
}