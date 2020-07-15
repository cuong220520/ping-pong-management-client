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
        store.dispatch(loadUser())
        if (validateToken() && isTokenExpired()) {
            store.dispatch(refreshToken())
            store.dispatch(loadUser())
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

                        <PermissionRoute exact path='/player' component={Player} permissions={ ['ROLE_ADMIN'] } />
                        <PermissionRoute exact path='/player/create-player' component={CreatePlayer} permissions={ ['ROLE_ADMIN'] } />
                        <PermissionRoute exact path='/player/update-player/:playerId' component={UpdatePlayer} permissions={ ['ROLE_ADMIN'] } />

                    </Switch>
                </div>
            </Router>
        </Provider>
    )
}

export default App
