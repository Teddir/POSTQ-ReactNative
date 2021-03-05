import { api } from '../API/webApi';

export const getKategori = () => {
    return api('GET', '/kategoris');
};

export const addKategori = () => {
    const data = {

    };
} 
