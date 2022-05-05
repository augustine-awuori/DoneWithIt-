import client from './client';

const logIn = (email, password) => client.post('/auth', { email, password });

export default {
    logIn
}