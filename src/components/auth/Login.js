import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const { username, password } = formData

    const onChange = event => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const onSubmit = event => {
        event.preventDefault()

        login(formData)
    }

    if (isAuthenticated) {
        return <Redirect to='/player' />
    }

    return (
        <div className='d-flex justify-content-center full-screen align-items-center'>
            <form onSubmit={onSubmit}>
                <div className='d-flex justify-content-center mb-4'>
                    <i className='fas fa-users-cog fa-3x'></i>
                </div>

                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        className='form-control'
                        id='username'
                        name='username'
                        onChange={onChange}
                        value={username}
                        placeholder='Enter your username'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        className='form-control'
                        id='password'
                        name='password'
                        onChange={onChange}
                        value={password}
                        placeholder='Enter your password'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>
                    Submit
                </button>
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
