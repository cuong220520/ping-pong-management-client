import {
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN,
    AUTH_ERROR,
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    loading: true,
    user: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                token: localStorage.getItem('accessToken'),
                isAuthenticated: true,
                loading: false,
                user: {
                    username: payload.username,
                    authorities: payload.grantedAuthorityList,
                    team: payload.team
                },
            }

        case LOGIN_SUCCESS:
        case REFRESH_TOKEN:
            localStorage.setItem('accessToken', 'Bearer ' + payload.accessToken)
            localStorage.setItem('refreshToken', payload.refreshToken)
            localStorage.setItem('username', payload.username)
            localStorage.setItem('expiredAt', payload.expiredAt)
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
            }

        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            localStorage.removeItem('username')
            localStorage.removeItem('expiredAt')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            }

        case AUTH_ERROR:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}
