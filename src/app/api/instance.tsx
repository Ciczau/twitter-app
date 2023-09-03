import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://ciczau-twitter-backend-e83fca20f698.herokuapp.com',
    withCredentials: true,
});

export default instance;
