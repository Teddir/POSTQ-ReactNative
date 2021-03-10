import { api } from '../API/webApi';
import store from '../../redux/store';
import { setTransaksi, setAddTransaksi } from '../../redux/transaksiAction';

export const getTransaksi = () => {
    const data = {loading: true, dataTransaksi: {}, error: false};
    store.dispatch(setTransaksi(data));
    api("GET", "/transaksis")
    .then((res) => {
        if (res.Status === "Succes") {
            data.dataTransaksi = res.data;
            console.log('Ambil Transaksi dari API', data.dataTransaksi ? 'berhasil' : 'gagal')
        } else {
            data.error = res.error;
        };
    })
    .catch((err) => (data.error = err.message))
    .finally(() => {
        data.loading = false;
        store.dispatch(setTransaksi(data));
    });
}

export const addTransaksi = (name_barang, barcode_barang, pay, jb) => {
    const body = {
        name_barang,
        barcode_barang,
        pay,
        jb
    };
    return api('POST', '/transaksis/create', body);
}