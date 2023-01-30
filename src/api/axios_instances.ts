import axios from 'axios';

export const auth = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/auth',
    withCredentials: true
})

export const cardsInstance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/cards',
    withCredentials: true
})


