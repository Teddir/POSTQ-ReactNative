import { api } from '../API/webApi';
import store from '../../redux/store';
import { setKategori }  from '../../redux/kategoriAction';

export const getKategori = () => {
    const data = {loading: true, dataKategori: {}, error: false};
    store.dispatch(setKategori(data));
    return api('GET', '/kategoris')
    .then((res) => {
        if (res.Status === "Succes") {
            data.dataKategori = res.data;
            console.log('Ambil kategori dari API', data.dataKategori ? 'berhasil' : 'gagal')
        } else {
            data.error = res.error
        }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
        data.loading = false,
        store.dispatch(setKategori(data));
    })
};

export const addKategori = () => {
    const data = {

    };
} 
