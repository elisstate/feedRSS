import axios from 'axios'
import {API_URL} from './constants'

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}

export const getUserFeed = (userId) => {
    return axios.get(API_URL + `/rssUrl/${userId}`, { headers: authHeader() });
};