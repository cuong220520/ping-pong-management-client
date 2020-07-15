import axios from 'axios'
import isTokenExpired from './isTokenExpired'

const setAuthToken = (accessToken) => {
    if (accessToken && !isTokenExpired()) {
        axios.defaults.headers.common['Authorization'] = accessToken
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export default setAuthToken
