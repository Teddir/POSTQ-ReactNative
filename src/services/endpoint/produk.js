import { api } from '../API/webApi';
import store from '../../redux/store';
import { setProduk } from '../../redux/produkAction';
// import axios from 'axios';

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

export const addProduk = (name, uid, hb, hj, kategori, merek, stok, diskon, avatar = null) => {
    const { token } = store.getState();
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
    if (avatar) {
        const data = new FormData();
        data.append('avatar', {
            name: avatar.fileName,
            type: avatar.type,
            uri: avatar.uri,
        });
    }
    return api('POST', '/barangs/create', body, avatar)

    // if (avatar) {
    //     const data = new FormData();
    //     data.append('avatar', {
    //         name: avatar.fileName,
    //         type: avatar.type,
    //         uri: avatar.uri,
    //     });
    //     Object.keys(body).forEach((key) => {
    //     data.append(key, body[key]);
    // });
    // //   return axios.post('https://app-postq.herokuapp.com/api' + '/api/barangs/create', data, {
    // //     headers: {
    // //       'Content-Type': 'multipart/form-data',
    // //       Authorization: 'Bearer ' + token,
    // //     },
    // //   });
    // } else {
    // //   return apiPrivate().post('/profil', body);
    // console.log('dsds');
    // }


        
}

