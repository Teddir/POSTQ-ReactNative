import { api } from '../API/webApi';

export const profile = () => {
    return api('GET', '/users/one');
}

export const register = (name, email, phone_number, password) => {
    console.log(name, email, phone_number, password);
    const body = {
        name,
        email,
        phone_number,
        password
    };
    return api('POST', '/register', body);
};

export const loginStaff = (email, password) => {
    console.log(email, password);
    const body = {
        email,
        password
    };
    return api('POST', '/login', body);
};
