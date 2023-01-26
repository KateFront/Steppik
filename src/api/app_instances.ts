import axios from 'axios';

export const auth = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/auth',
    withCredentials: true
})

export const cards = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/cards/pack',
    withCredentials: true
})


