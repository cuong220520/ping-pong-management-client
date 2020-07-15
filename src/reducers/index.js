import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import player from './player'

export default combineReducers({
    auth,
    alert,
    player
})