import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { logout } from '../../actions/auth'

const NavBar = ({ logout, auth: { loading, isAuthenticated } }) => {
    const authLink = (
        <Fragment>
            <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                    <Link className='nav-link' to='/'>
                        Home <span className='sr-only'>(current)</span>
                    </Link>
                </li>

                <li className='nav-item dropdown'>
                    <Link
                        className='nav-link dropdown-toggle'
                        to='#'
                        id='navbarDropdownPlayer'
                        role='button'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >
                        Player
                    </Link>
                    <div
                        className='dropdown-menu'
                        aria-labelledby='navbarDropdownPlayer'
                    >
                        <Link className='dropdown-item' to='/player'>
                            All Players
                        </Link>
                        <Link className='dropdown-item' to='/player/create-player'>
                            Create Player
                        </Link>
                    </div>
                </li>

                <li className='nav-item dropdown'>
                    <Link
                        className='nav-link dropdown-toggle'
                        to='#'
                        id='navbarDropdownTeam'
                        role='button'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >
                        Dropdown
                    </Link>
                    <div
                        className='dropdown-menu'
                        aria-labelledby='navbarDropdownTeam'
                    >
                        <Link className='dropdown-item' to='#'>
                            Action
                        </Link>
                        <Link className='dropdown-item' to='#'>
                            Another action
                        </Link>
                        <Link className='dropdown-item' to='#'>
                            Something else here
                        </Link>
                    </div>
                </li>

                <li className='nav-item dropdown'>
                    <Link
                        className='nav-link dropdown-toggle'
                        to='#'
                        id='navbarDropdownLeague'
                        role='button'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'
                    >
                        Dropdown
                    </Link>
                    <div
                        className='dropdown-menu'
                        aria-labelledby='navbarDropdownLeague'
                    >
                        <Link className='dropdown-item' to='#'>
                            Action
                        </Link>
                        <Link className='dropdown-item' to='#'>
                            Another action
                        </Link>
                        <Link className='dropdown-item' to='#'>
                            Something else here
                        </Link>
                    </div>
                </li>
            </ul>

            <ul className='navbar-nav'>
                <li className='nav-item'>
                    <Link className='nav-link' to='#' onClick={logout}>
                        Logout
                    </Link>
                </li>
            </ul>
        </Fragment>
    )

    const guestLink = (
        <Fragment>
            <ul className='navbar-nav mr-auto'></ul>
            <ul className='nav navbar-nav'>
                <li className='nav-item'>
                    <Link className='nav-link' to='/login'>
                        Login
                    </Link>
                </li>
            </ul>
        </Fragment>
    )

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
            <Link className='navbar-brand' to='/'>
                Ping Pong Management
            </Link>
            <button
                className='navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarSupportedContent'
                aria-controls='navbarSupportedContent'
                aria-expanded='false'
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'></span>
            </button>

            <div
                className='collapse navbar-collapse'
                id='navbarSupportedContent'
            >
                {!loading && (
                    <Fragment>
                        {isAuthenticated ? authLink : guestLink}
                    </Fragment>
                )}
            </div>
        </nav>
    )
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export default connect(mapStateToProps, { logout })(NavBar)
