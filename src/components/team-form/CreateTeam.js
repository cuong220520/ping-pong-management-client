import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateTeam = ({ createTeam }) => {
    const [formData, setFormData] = useState({
        teamName: '',
        teamCode: '',
        tP: 0,
    })

    const { teamName, teamCode, tP } = formData

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const clearInput = () => {
        setFormData({
            teamName: '',
            teamCode: '',
            tP: 0
        })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        createTeam(formData)

        clearInput()
    }

    return (
        <div
            className='modal fade'
            id='createTeam'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='createTeamLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog' role='document'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='createTeamLabel'>
                            Create Team
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
                                <label htmlFor='teamName'>Team Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='teamName'
                                    name='teamName'
                                    value={teamName}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='teamCode'>Team Code</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='teamCode'
                                    name='teamCode'
                                    value={teamCode}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='tP'>TP</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='tP'
                                    name='tP'
                                    value={tP}
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

CreateTeam.propTypes = {
    createTeam: PropTypes.func.isRequired,
}

export default CreateTeam
