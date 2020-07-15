import axios from 'axios'

import {
    GET_PLAYER,
    GET_PLAYERS,
    GET_PLAYER_ERROR,
    CLEAR_PLAYER,
    CLEAR_PLAYERS,
    UPDATE_PLAYER,
} from './types'

import { setAlert } from './alert'

// get players action
export const getPlayers = () => async dispatch => {
    dispatch({
        type: CLEAR_PLAYER
    })

    try {
        const res = await axios.get('/api/player/')

        dispatch({
            type: GET_PLAYERS,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_PLAYER_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status
            }
        })
    }
} 

// get player action
export const getPlayer = (playerId) => async dispatch => {
    dispatch({
        type: CLEAR_PLAYERS
    })

    try {
        const res = await axios.get(`/api/player/${playerId}`)

        dispatch({
            type: GET_PLAYER,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: GET_PLAYER_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status
            }
        })
    }
} 

// update player action
export const updatePlayer = (formData, history) => async dispatch => {
    const config = {
        headers: {
            'Content-Types': 'application/json'
        }
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
