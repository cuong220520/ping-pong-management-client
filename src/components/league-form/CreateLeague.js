import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateLeague = ({ updateLeague }) => {
    const [formData, setFormData] = useState({
        leagueName: '',
        startDate: '',
        endDate: '',
        reward: 0,
    })

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { leagueName, startDate, endDate, reward } = formData

    const clearInput = () => {
        setFormData({
            leagueName: '',
            startDate: '',
            endDate: '',
            reward: 0,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        updateLeague(formData)

        clearInput()
    }

    return (
        <div
            className='modal fade'
            id='createLeague'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='createLeagueLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='createLeagueLabel'>
                            Create League
                        </h5>
                        <button
                            type='button'
                            className='close'
                            data-dismiss='modal'
                            aria-label='Close'
                        >
                            <span aria-hidden='true'>&times;</span>
                        </button>
                    </div>

                    <div className='modal-body'>
                        <form onSubmit={onSubmit}>
                            <div className='form-group'>
                                <label htmlFor='leagueName'>League Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='leagueName'
                                    name='leagueName'
                                    value={leagueName}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='startDate'>Start Date</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    id='startDate'
                                    name='startDate'
                                    value={startDate}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='endDate'>End Date</label>
                                <input
                                    type='date'
                                    className='form-control'
                                    id='endDate'
                                    name='endDate'
                                    value={endDate}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='reward'>Reward</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='reward'
                                    name='reward'
                                    value={reward}
                                    onChange={onChange}
                                />
                            </div>

                            <button type='submit' className='btn btn-primary'>
                                Submit
                            </button>
                        </form>
                    </div>

                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            data-dismiss='modal'
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

CreateLeague.propTypes = {
    updateLeague: PropTypes.func.isRequired,
}

export default CreateLeague
