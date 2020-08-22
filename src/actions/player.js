import axios from 'axios'

import {
    GET_PLAYER,
    GET_PLAYERS,
    GET_PLAYER_ERROR,
    CLEAR_PLAYER,
    CLEAR_PLAYERS,
    GET_PLAYER_ACHIEVEMENT,
} from './types'

import { setAlert } from './alert'

// get players action
export const getPlayers = () => async (dispatch) => {
    dispatch({
        type: CLEAR_PLAYER,
    })

    try {
        const res = await axios.get('/api/player/')

        dispatch({
            type: GET_PLAYERS,
            payload: res.data,
        })
    } catch (err) {
        dispatch({
            type: GET_PLAYER_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// get player action
export const getPlayer = (playerId) => async (dispatch) => {
    dispatch({
        type: CLEAR_PLAYERS,
    })

    try {
        const res = await axios.get(`/api/player/${playerId}`)

        dispatch({
            type: GET_PLAYER,
            payload: res.data,
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        dispatch({
            type: GET_PLAYER_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// update player action
export const updatePlayer = (formData, history) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.post('/api/player/', formData, config)

        dispatch(setAlert('Save player successfully!', 'success'))

        history.push('/player')
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

// search players action
export const searchPlayers = (term) => async (dispatch) => {
    dispatch({
        type: CLEAR_PLAYER,
    })

    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        const res = await axios.post('/api/player/search', term, config)

        dispatch({
            type: GET_PLAYERS,
            payload: res.data,
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        dispatch({
            type: GET_PLAYER_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// delete player action
export const deletePlayer = (playerId, history) => async (dispatch) => {
    if (window.confirm('Are you sure? This CANNOT be undone')) {
        try {
            await axios.delete(`/api/player/delete/${playerId}`)

            dispatch(setAlert('Delete player successfully!', 'success'))

            history.push('/player')
        } catch (err) {
            const errors = err.response.data

            if (errors && errors.message) {
                dispatch(setAlert(errors.message, 'danger'))
            }
        }
    }
}

// update player achievement action
export const updateAchievement = () => async (dispatch) => {
    if (window.confirm('Are you sure? This CANNOT be undone')) {
        try {
            await axios.put('/api/player/update-achievement')

            dispatch(getPlayers())

            dispatch(
                setAlert(
                    'Update all players achievement successfully!',
                    'success'
                )
            )
        } catch (err) {
            const errors = err.response.data

            if (errors && errors.message) {
                dispatch(setAlert(errors.message, 'danger'))
            }
        }
    }
}

// get player achievement action
export const getPlayerAchievement = (playerId) => async (dispatch) => {
    try {
        console.log('aa')

        const res = await axios.get(`/api/player/achievement/${playerId}`)

        dispatch({
            type: GET_PLAYER_ACHIEVEMENT,
            payload: res.data,
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        dispatch({
            type: GET_PLAYER_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}
