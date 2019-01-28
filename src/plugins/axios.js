import axios from 'axios'

export const HTTP = axios.create({
    baseURL: 'http://lavarel.loc/'
})

export default ({ Vue }) => {
    Vue.prototype.$axios = axios
}