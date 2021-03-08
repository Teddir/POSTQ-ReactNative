import { api } from '../API/webApi';
import store from '../../redux/store';
import { setProdukBuy } from '../../redux/produkBuyAction';

export const getProdukBuy = () => {
    const data = {loading : true, dataProdukBuy : {}, error : false};
    store.dispatch(setProdukBuy(data));
    api('GET', '/buys')
    .then((res) => {
        if (res.Status === 'Succes') {
            data.dataProdukBuy = res.data;
            console.log('Ambil ProdukBuy dari API', data.dataProdukBuy ? 'berhasil' : 'gagal')
        } else {
            data.error = res.error
        }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
        data.loading = false;
        store.dispatch(setProdukBuy(data));
    });
};

export const addProdukBuy = (barang, phone_supplier, harga, tbarang, tbayar) => {
    const body = {
        barang,
        phone_supplier,
        harga,
        tbarang,
        tbayar
    }
    return api('POST', '/buys/create', body);
}