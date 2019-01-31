import axios from 'axios'
import store from '../store'


const HTTP = axios.create({
    baseURL: 'http://lavarel.loc/'
})

HTTP.interceptors.request.use(
    function(config){
        if (store.state.user.token){
            config.headers.Authorization = 'Bearer ' + store.state.user.token;
        }
        return config;
    }
)

export default HTTP

