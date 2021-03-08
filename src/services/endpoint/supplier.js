import { api } from '../API/webApi';
import store from '../../redux/store';
import { setSupplier } from '../../redux/supplierAction';

export const getSupplier = () => {
    const data = {loading: true, dataSupplier: {}, error: false};
    store.dispatch(setSupplier(data));
    api('GET', '/suppliers')
    .then((res) => {
        if (res.Status === "Succes") {
            data.dataSupplier = res.data;
            console.log('Ambil Supplier dari API', data.dataSupplier ? 'berhasil' : 'gagal')
        } else {
            data.error = res.error
        }
    })
    .catch((e) => (data.error = e.message))
    .finally(() => {
        data.loading = false;
        store.dispatch(setSupplier(data));
    });
}