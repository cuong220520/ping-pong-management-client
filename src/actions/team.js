import axios from 'axios'

import {
    GET_TEAM,
    GET_TEAMS,
    GET_TEAM_ERROR,
    CLEAR_TEAM,
    CLEAR_TEAMS,
    GET_PLAYER_PARTICIPATION,
    GET_PLAYERS_PARTICIPATION,
    CLEAR_PLAYER_PARTICIPATION
} from './types'

import { setAlert } from './alert'

// get all teams action
export const getTeams = () => async (dispatch) => {
    dispatch({
        type: CLEAR_TEAM,
    })

    try {
        const res = await axios.get('/api/team/')

        dispatch({
            type: GET_TEAMS,
            payload: res.data,
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        dispatch({
            type: GET_TEAM_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// get team action
export const getTeam = (teamId) => async (dispatch) => {
    dispatch({
        type: CLEAR_TEAMS,
    })

    try {
        const res = await axios.get(`/api/team/${teamId}`)

        dispatch({
            type: GET_TEAM,
            payload: res.data,
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        dispatch({
            type: GET_TEAM_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

export const createTeam = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Types': 'application/json'
        }
    }

    try {
        await axios.post('/api/team/', formData, config)

        dispatch(setAlert('Save team successfully!', 'success'))

        dispatch(getTeams())
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

// update team action
export const updateTeam = (formData) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        console.log(formData.teamParticipation)
        const res = await axios.post('/api/team-participation/', formData.teamParticipation, config)

        formData.players.forEach(player => {
            dispatch(
                updatePlayerParticipation({
                    teamParticipation: res.data,
                    player: player,
                })
            )
        })

        dispatch(setAlert('Save team successfully!', 'success'))
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

// choose players to team action
export const choosePlayer = (player) => async (dispatch) => {
    try {
        dispatch({
            type: GET_PLAYER_PARTICIPATION,
            payload: player,
        })
    } catch (err) {
        console.error(err)
    }
}

export const removePlayer = (teamParticipationId, playerId) => async dispatch => {
    try {
        await axios.delete(`/api/player-participation/delete/${teamParticipationId}/${playerId}`)

        dispatch({
            type: CLEAR_PLAYER_PARTICIPATION,
            payload: playerId
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }
    }
}

// update player participation action
export const updatePlayerParticipation = (player) => async dispatch => {
    console.log(player)

    const config = {
        headers: {
            'Content-Types': 'application/json',
        },
    }

    try {
        await axios.post('/api/player-participation/', player, config)
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

// get players participation 
export const getPlayersParticipation = (leagueId, teamId) => async dispatch => {
    try {
        const res = await axios.get(`/api/team-participation/get-players/${leagueId}/${teamId}`)

        console.log(res)

        const players = []

        if (!res.data.message) {
            res.data.forEach(item => {
                players.unshift(item.player)
            })
        }

        dispatch({
            type: GET_PLAYERS_PARTICIPATION,
            payload: players
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }
    }
}
