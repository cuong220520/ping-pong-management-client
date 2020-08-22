import { combineReducers } from 'redux'
import auth from './auth'
import alert from './alert'
import player from './player'
import league from './league'
import team from './team'

export default combineReducers({
    auth,
    alert,
    player,
    league,
    team
})