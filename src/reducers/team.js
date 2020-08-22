import {
    GET_TEAM,
    GET_TEAMS,
    GET_TEAM_ERROR,
    GET_PLAYER_PARTICIPATION,
    GET_PLAYERS_PARTICIPATION,
    CLEAR_TEAM,
    CLEAR_TEAMS,
    CLEAR_PLAYER_PARTICIPATION,
} from '../actions/types'

const initialState = {
    team: null,
    teams: [],
    playerParticipations: [],
    loading: true,
    error: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_TEAM:
            return {
                ...state,
                team: payload,
                loading: false,
                error: null,
            }

        case GET_TEAMS:
            return {
                ...state,
                teams: payload,
                loading: false,
                error: null,
            }

        case GET_TEAM_ERROR:
            return {
                ...state,
                error: payload,
                league: null,
                leagues: [],
                loading: false,
            }

        case CLEAR_TEAM: {
            return {
                ...state,
                team: null,
                error: null,
                loading: false,
            }
        }

        case CLEAR_TEAMS: {
            return {
                ...state,
                teams: [],
                error: null,
                loading: false,
            }
        }

        case GET_PLAYER_PARTICIPATION: {
            return {
                ...state,
                playerParticipations: [...state.playerParticipations, payload],
                error: null,
                loading: false,
            }
        }

        case GET_PLAYERS_PARTICIPATION: {
            return {
                ...state,
                playerParticipations: payload,
                error: null,
                loading: false,
            }
        }

        case CLEAR_PLAYER_PARTICIPATION: {
            return {
                ...state,
                playerParticipations: state.playerParticipations.filter(
                    (item) => item.playerId !== payload
                ),
                error: null,
                loading: false,
            }
        }

        default:
            return state
    }
}
