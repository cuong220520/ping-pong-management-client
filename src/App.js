import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import { loadUser, refreshToken } from './actions/auth'
import setAuthToken from './util/setAuthToken'
import store from './store'

import NavBar from './components/layout/NavBar'
import Home from './components/layout/Home'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Player from './components/player/Player'
import isTokenExpired from './util/isTokenExpired'
import PermissionPage from './components/routing/PermissionPage'
import PermissionRoute from './components/routing/PermissionRoute'
import CreatePlayer from './components/player-form/CreatePlayer'
import UpdatePlayer from './components/player-form/UpdatePlayer'
import PlayerProfile from './components/player/PlayerProfile'
import League from './components/league/League'
import UpdateLeague from './components/league-form/UpdateLeague'
import Team from './components/team/Team'
import UpdateTeam from './components/team-form/UpdateTeam'

function validateToken() {
    if (
        localStorage.accessToken &&
        localStorage.refreshToken &&
        localStorage.username
    ) {
        return true
    } else {
        return false
    }
}

if (validateToken()) {
    setAuthToken(localStorage.accessToken)
}

const App = () => {
    useEffect(() => {
        if (validateToken() && !isTokenExpired()) {
            store.dispatch(loadUser())
        }
        if (validateToken() && isTokenExpired()) {
            store.dispatch(refreshToken())
        }
    }, [])

    return (
        <Provider store={store}>
            <Router>
                <NavBar />

                <div className='fixed-top alert-position'>
                    <Alert />
                </div>

                <div className='container margin-content'>
                    <Switch>
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/' component={Home} />
                        <Route
                            exact
                            path='/403error'
                            component={PermissionPage}
                        />

                        <PermissionRoute exact path='/player' component={Player} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />
                        <PermissionRoute exact path='/player/create-player' component={CreatePlayer} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />
                        <PermissionRoute exact path='/player/update-player/:playerId' component={UpdatePlayer} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />
                        <PermissionRoute exact path='/player/:playerId' component={PlayerProfile} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />

                        <PermissionRoute exact path='/league' component={League} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />
                        <PermissionRoute exact path='/league/update-league/:leagueId' component={UpdateLeague} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />

                        <PermissionRoute exact path='/team' component={Team} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />
                        <PermissionRoute exact path='/league/:leagueId/:teamId' component={UpdateTeam} permissions={ ['ROLE_ADMIN', 'ROLE_LEADER'] } />

                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}

export default App
