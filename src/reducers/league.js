import {
    GET_LEAGUE,
    GET_LEAGUES,
    GET_LEAGUE_ERROR,
    CLEAR_LEAGUE,
    CLEAR_LEAGUES,
    GET_TEAM_PARTICIPATION
} from '../actions/types'

const initialState = {
    league: null,
    leagues: [],
    teamParticipation: null,
    loading: true,
    error: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_LEAGUE:
            return {
                ...state,
                league: payload,
                loading: false,
                error: null,
            }

        case GET_LEAGUES:
            return {
                ...state,
                leagues: payload,
                loading: false,
                error: null,
            }

        case GET_LEAGUE_ERROR:
            return {
                ...state,
                error: payload,
                league: null,
                leagues: [],
                loading: false,
            }

        case CLEAR_LEAGUE: {
            return {
                ...state,
                league: null,
                error: null,
                loading: false,
            }
        }

        case CLEAR_LEAGUES: {
            return {
                ...state,
                leagues: [],
                error: null,
                loading: false,
            }
        }

        case GET_TEAM_PARTICIPATION: {
            return {
                ...state,
                teamParticipation: payload,
                error: null,
                loading: false
            }
        }

        default:
            return state
    }
}