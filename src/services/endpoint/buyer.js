import { api } from '../API/webApi';
import { setPelanggan } from '../../redux/action';
import store from '../../redux/store';

export const getProfileBuyer = () => {
    const data = {loading: true, dataBuyer: {}, error: false};
    store.dispatch(setPelanggan(data));
    return api('GET', '/buyers')
    .then((res) => {
        if (res.Status === "Succes") {
            data.dataBuyer = res.data;
            console.log('Ambil Buyer dari API', data.dataBuyer ? 'berhasil' : 'gagal')
        } else {
            data.error = res.error
        }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
        data.loading = false,
        store.dispatch(setPelanggan(data));
    })
}

export const addBuyer = (name, nomor, alamat, email) => {
    const data = {
        name,
        nomor,
        alamat,
        email
    }
    console.log(data);
    return api('POST', '/buyers/create', data)
}

export const deleteBuyer = (id) => {
    return api('DELETE', `/buyers/delete/${id}`)
}