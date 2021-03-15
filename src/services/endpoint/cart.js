import { api } from '../API/webApi';
import store from '../../redux/store';
import { setCart, setAddCart, setDeleteCart } from '../../redux/transaksiAction';

export const getCart = () => {
    const data = { loading: true, dataCart: {}, error: false};
    store.dispatch(setCart(data));
    api('GET', '/carts')
    .then((res) => {
        if (res.Status === "Succes") {
            data.dataCart = res.data;
            console.log('Ambil Cart dari API', data.dataCart ? 'berhasil' : 'gagal')
        } else {
            data.error = res.error;
        }
    })
    .catch((err) => (data.error = err.message))
    .finally(() => {
        data.loading = false;
        store.dispatch(setCart(data));
    });
}

export const addCart = (barang, barcode) => {
    const body = {
        barang, 
        barcode
    }
    console.log(body);
    return api('POST', '/carts/create', body);
}

export const deleteCart = (id) => {
    return api("DELETE", `/carts/delete/${id}`);
}