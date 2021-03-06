import { api, host } from '../API/webApi';
import store from '../../redux/store';
import { setProduk } from '../../redux/produkAction';
import axios from 'axios';
import { setCart } from '../../redux/transaksiAction';

export const getProduk = () => {
    const data = {loading: true, dataProduk: {}, error: false};
    store.dispatch(setCart(data));
    store.dispatch(setProduk(data));
    api('GET', '/barangs')
        .then((res) => {
            if (res.Status === "Succes") {
                data.dataProduk = res.data
                console.log('Ambil Produk dari API', data.dataProduk ? 'berhasil' : 'gagal')
            } else {
                data.error = res.error
            }
        })
        .catch((e) => (data.error = e.message))
        .finally(() => {
            data.loading = false;
            store.dispatch(setCart(data));
            store.dispatch(setProduk(data));
        });
};

export const addProduk = (name, uid, hb, hj, kategori, merek, stok, diskon, avatar) => {
    
    // console.log('ini token ===',token)
    const body = {
        name,
        uid,
        hb,
        hj,
        kategori,
        merek,
        stok,
        diskon,
    };
    console.log(body);
    if (avatar) {
        const data = new FormData();
        data.append('avatar', {
            name: avatar.name,
            type: avatar.type,
            uri: avatar.uri,
        });
        Object.keys(body).forEach((key) => {
        data.append(key, body[key]);
    });
    console.log(avatar.name)
      return api('POST', '/barangs/create', data, avatar)
    } else {
        return api('POST', '/barangs/create', body)
    }

}
