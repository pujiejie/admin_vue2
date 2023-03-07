import axios from 'axios';

const instanceAxios = axios.create({
    timeout: 5000,
    baseURL: 'https://www.chengzier.cn:8000'
})


export default instanceAxios;