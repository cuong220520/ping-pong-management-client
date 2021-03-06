import {
    GET_PLAYER,
    GET_PLAYERS,
    GET_PLAYER_ERROR,
    CLEAR_PLAYER,
    CLEAR_PLAYERS,
    GET_PLAYER_ACHIEVEMENT
} from '../actions/types'

const initialState = {
    player: null,
    players: [],
    playerAchievements: [],
    loading: true,
    error: null,
}

export default function (state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case GET_PLAYER:
            return {
                ...state,
                player: payload,
                loading: false,
                error: null,
            }

        case GET_PLAYERS:
            return {
                ...state,
                players: payload,
                loading: false,
                error: null,
            }

        case GET_PLAYER_ERROR:
            return {
                ...state,
                error: payload,
                player: null,
                players: [],
                loading: false,
            }

        case GET_PLAYER_ACHIEVEMENT:
            return {
                ...state,
                playerAchievements: payload.reverse(),
                loading: false,
                error: null
            }

        case CLEAR_PLAYER: {
            return {
                ...state,
                player: null,
                error: null,
                loading: false,
            }
        }

        case CLEAR_PLAYERS: {
            return {
                ...state,
                players: [],
                error: null,
                loading: false,
            }
        }

        default:
            return state
    }
}
