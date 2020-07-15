import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { connect } from 'react-redux'

import Spinner from '../layout/Spinner'

const PermissionRoute = ({
    component: Component,
    permissions,
    auth: { isAuthenticated, loading, user },
    ...rest
}) => {
    return loading || !user ? (
        <Spinner />
    ) : (
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated ? (
                    <Redirect to='/login' />
                ) : user.authorities.length > 0 ? (
                    user.authorities.map((item) =>
                        !permissions.includes(item.authority) ? (
                            <Redirect key={uuidv4} to='/403error' />
                        ) : (
                            <Component key={uuidv4} {...props} />
                        )
                    )
                ) : (
                    <Redirect to='/403error' />
                )
            }
        />
    )
}

PermissionRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps)(PermissionRoute)
