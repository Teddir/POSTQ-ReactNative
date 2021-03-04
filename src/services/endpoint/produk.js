import { api } from '../API/webApi';
import store from '../../redux/store';
import { setProduk } from '../../redux/produkAction';

export const getProduk = () => {
    const data = {loading: true, dataProduk: {}, error: false};
    store.dispatch(setProduk(data));
    api('GET', '/barangs')
        .then((res) => {
            if (res.Status === "Succes") {
                data.dataProduk = res.data
                console.log('Ambil Produk dari API', data.dataProduk ? 'berhasil' : 'gagal')
            } else {
                data.error = res.error;
            }
        })
        .catch((e) => (data.error = e.message))
        .finally(() => {
            data.loading = false;
            store.dispatch(setProduk(data));
        });
};