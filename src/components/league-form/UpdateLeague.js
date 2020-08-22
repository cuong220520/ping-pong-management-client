import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { updateLeague, getLeague } from '../../actions/league'

const UpdateLeague = ({
    updateLeague,
    match,
    getLeague,
    league: { loading, league },
}) => {
    const [formData, setFormData] = useState({
        leagueName: '',
        startDate: '',
        endDate: '',
        reward: 0,
    })

    useEffect(() => {
        if (!league) getLeague(match.params.leagueId)

        if (league) {
            setFormData({
                leagueName: !league.leagueName ? '' : league.leagueName,
                startDate: !league.startDate ? '' : league.startDate.substring(0, 10),
                endDate: !league.endDate ? '' : league.endDate.substring(0, 10),
                reward: !league.reward ? 0 : league.reward,
            })
        }
    }, [league, getLeague, match])

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const { leagueName, startDate, endDate, reward } = formData

    const onSubmit = (event) => {
        event.preventDefault()

        updateLeague({
            leagueId: match.params.leagueId,
            leagueName: formData.leagueName,
            startDate: formData.startDate,
            endDate: formData.endDate,
            reward: formData.reward,
        })
    }

    return loading || !league ? (
        <Spinner />
    ) : (
        <div className='bg-content shadow-sm'>
            <nav aria-label='breadcrumb bg-dark'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        <Link to='/league'>League</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        <Link to={`/league/update-league/${league.leagueId}`}>
                            Update League
                        </Link>
                    </li>
                </ol>
            </nav>

            <div className='card'>
                <div className='card-header bg-dark'>
                    <h3 className='ml-3'>
                        <span className='mr-3'>
                            <i className='fas fa-user-plus'></i>
                        </span>
                        Update League
                    </h3>
                </div>

                <div className='card-body card-table'>
                    <form onSubmit={onSubmit}>
                        <div className='form-row'>
                            <div className='form-group col-md-8'>
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

                            <div className='form-group col-md-4'>
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

                            <div className='form-group col-md-6'>
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

                            <div className='form-group col-md-6'>
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

                            <button type='submit' className='btn btn-primary'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

UpdateLeague.propTypes = {
    updateLeague: PropTypes.func.isRequired,
    getLeague: PropTypes.func.isRequired,
    league: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    league: state.league,
})

export default connect(mapStateToProps, { updateLeague, getLeague })(
    UpdateLeague
)
