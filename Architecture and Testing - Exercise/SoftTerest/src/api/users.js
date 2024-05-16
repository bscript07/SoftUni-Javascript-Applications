import { get, post } from './api.js';

const endpointsURL = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout',
}

export async function login(email, password) {
    const user = await post(endpointsURL.login, {email,password});
    localStorage.setItem('user', JSON.stringify(user));
}

export async function register(email, password) {
    const user = await post(endpointsURL.register, {email,password});
    localStorage.setItem('user', JSON.stringify(user));
}

export async function logout() {
    get(endpointsURL.logout);
    localStorage.removeItem('user');
}