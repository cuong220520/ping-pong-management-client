import axios from 'axios'

import {
    GET_LEAGUE,
    GET_LEAGUES,
    GET_LEAGUE_ERROR,
    CLEAR_LEAGUE,
    GET_TEAMS,
    GET_TEAM_ERROR,
    GET_TEAM_PARTICIPATION
} from './types'

import { setAlert } from './alert'

// get leagues action
export const getLeagues = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/league/')

        if (!res.data.message) {
            dispatch({
                type: GET_LEAGUES,
                payload: res.data
            })
        } else {
            dispatch({
                type: GET_LEAGUE_ERROR,
                payload: {
                    message: res.data
                },
            })
        }
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        dispatch({
            type: GET_LEAGUE_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// get league action
export const getLeague = (leagueId) => async dispatch => {
    try {
        const res = await axios.get(`/api/league/${leagueId}`)

        dispatch({
            type: GET_LEAGUE,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }

        dispatch({
            type: GET_LEAGUE_ERROR,
            payload: {
                message: err.response.statusText,
                status: err.response.status,
            },
        })
    }
}

// update league action
export const updateLeague = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Types': 'application/json'
        }
    }

    try {
        await axios.post('/api/league/', formData, config)

        dispatch(setAlert('Save league successfully!', 'success'))

        dispatch(getLeagues())

        //history.push('/league')
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

// delete league action
export const deleteLeague = (leagueId) => async dispatch => {
    try {
        await axios.delete(`/api/league/${leagueId}`)

        dispatch(setAlert('Delete league successfully!', 'success'))
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }
    }
}

// search leagues action
export const searchLeagues = (term) => async dispatch => {
    dispatch({
        type: CLEAR_LEAGUE
    })

    const config = {
        headers: {
            'Content-Types': 'application/json'
        }
    }

    try {
        const res = await axios.post('/api/league/search', term, config)

        dispatch({
            type: GET_LEAGUES,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }
    }
}

// update teams participation action
export const updateTeamParticipations = (teamParticipation) => async dispatch => {
    console.log(teamParticipation)
    const config = {
        headers: {
            'Content-Types': 'application/json'
        }
    }

    try {
        await axios.post('/api/team-participation/', teamParticipation, config)

        dispatch(setAlert('Added team to queue list!', 'info'))
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

// get teams participation action
export const getTeamParticipations = (leagueId) => async dispatch => {
    try {
        const res = await axios.get(`/api/team-participation/get-by-league/${leagueId}`)

        const teams = []

        console.log(res)

        if (res.data.message) {
            dispatch(setAlert(res.data.message, 'danger'))
        } else {
            res.data.forEach(item => {
                teams.unshift(item.team)
            })
        }

        dispatch({
            type: GET_TEAMS,
            payload: teams
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

// get team participation action
export const getTeamParticipation = (leagueId, teamId) => async dispatch => {
    try {
        const res = await axios.get(`/api/team-participation/${leagueId}/${teamId}`)

        dispatch({
            type: GET_TEAM_PARTICIPATION,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data

        if (errors && errors.message) {
            dispatch(setAlert(errors.message, 'danger'))
        }
    }
}
