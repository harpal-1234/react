import axios from 'axios';
const instance = axios.create({
    baseURL: `https://api.traintab.com/`,
});
export default instance;