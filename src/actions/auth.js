import axios from 'axios'

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    USER_LOADED,
    AUTH_ERROR,
    REFRESH_TOKEN
} from './types'

import setAuthToken from '../util/setAuthToken'
import { setAlert } from './alert'


// load user action
export const loadUser = () => async (dispatch) => {
    if (localStorage.accessToken) {
        setAuthToken(localStorage.accessToken)
    }

    try {
        const res = await axios.get('/api/auth/')

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

// login action
export const login = (formData) => async (dispatch) => {
    const config = {
        header: {
            'Content-Type': 'application/json',
        },
    }

    try {
        const res = await axios.post('/api/auth/login', formData, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        })

        dispatch(loadUser())

        dispatch(setAlert('Login successfully!', 'success'))
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        if (errors && !errors.message) {
            errors.forEach((error) =>
                dispatch(setAlert(error.defaultMessage, 'danger'))
            )
        }

        dispatch({
            type: LOGIN_FAIL,
        })
    }
}


// refresh token action
export const refreshToken = () => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json',
        },
    }

    let formData = {}

    formData.refreshToken = localStorage.refreshToken
    formData.username = localStorage.username

    console.log(formData)

    try {
        const res = await axios.post('/api/auth/refresh', formData, config)

        dispatch({
            type: REFRESH_TOKEN,
            payload: res.data
        })

        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        if (errors && !errors.message) {
            errors.forEach((error) =>
                dispatch(setAlert(error.defaultMessage, 'danger'))
            )
        }

        dispatch({
            type: LOGIN_FAIL,
        })
    }
}


// logout action
export const logout = () => async dispatch => {
    const config = {
        header: {
            'Content-Type': 'application/json',
        },
    }

    let formData = {}

    formData.refreshToken = localStorage.refreshToken
    formData.username = localStorage.username

    console.log(formData)

    try {
        await axios.post('/api/auth/logout', formData, config)

        dispatch({
            type: LOGOUT
        })

        dispatch(setAlert('Logout successfully!', 'success'))
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        if (errors && !errors.message) {
            errors.forEach((error) =>
                dispatch(setAlert(error.defaultMessage, 'danger'))
            )
        }
    }
}
