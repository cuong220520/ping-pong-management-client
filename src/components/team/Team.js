import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { getTeams, createTeam } from '../../actions/team'
import { getTeamParticipations, getLeagues } from '../../actions/league'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import CreateTeam from '../team-form/CreateTeam'

const Team = ({
    getTeams,
    team: { loading, teams },
    createTeam,
    getTeamParticipations,
    getLeagues,
    league
}) => {
    const [term, setTerm] = useState('')

    const [leagueId, setLeagueId] = useState(0)

    const onChange = (event) => {
        setTerm(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()
    }

    console.log(leagueId)

    useEffect(() => {
        getTeams()
        getLeagues()
        if (leagueId !== 0) getTeamParticipations(leagueId)
    }, [getTeams, getLeagues, leagueId, getTeamParticipations])

    return loading || league.loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className='bg-content shadow-sm'>
                <nav aria-label='breadcrumb bg-dark'>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>
                            <Link to='/'>Home</Link>
                        </li>
                        <li
                            className='breadcrumb-item active'
                            aria-current='page'
                        >
                            <Link to='/team'>Team</Link>
                        </li>
                        <li
                            className='breadcrumb-item active'
                            aria-current='page'
                        >
                            <Link to='/team'>All Teams</Link>
                        </li>
                    </ol>
                </nav>
                <div className='card'>
                    <div className='card-header bg-dark'>
                        <h3 className='ml-3'>
                            <span className='mr-3'>
                                <i className='fas fa-users'></i>
                            </span>
                            All Teams
                        </h3>
                    </div>

                    <div className='card-body card-table'>
                        <div className='d-md-flex justify-content-between pb-3'>
                            <button
                                type='button'
                                className='btn btn-primary'
                                data-toggle='modal'
                                data-target='#createTeam'
                            >
                                Create League
                            </button>

                            <div>
                                <select
                                    id='leagueId'
                                    name='leagueId'
                                    className='form-control'
                                    value={leagueId}
                                    onChange={(event) => setLeagueId(event.target.value)}
                                >
                                    <option value=''>Choose League</option>
                                    {league.leagues.length > 0 ? (
                                        league.leagues.map(leagueItem => (
                                            <option key={leagueItem.leagueId} value={leagueItem.leagueId}>{leagueItem.leagueName}</option>
                                        ))
                                    ) : (
                                        <option>No league found</option>
                                    )}
                                </select>
                            </div>

                            <form
                                className='form-inline my-2 my-lg-0 float-right'
                                onSubmit={onSubmit}
                            >
                                <input
                                    className='form-control mr-sm-2'
                                    type='text'
                                    placeholder='Search'
                                    aria-label='Search'
                                    name='term'
                                    value={term}
                                    onChange={onChange}
                                />
                                <button
                                    className='btn btn-outline-success my-2 my-sm-0'
                                    type='submit'
                                >
                                    Search
                                </button>
                            </form>
                        </div>

                        <table className='table table-striped table-hover'>
                            <thead>
                                <tr>
                                    <th>Team Name</th>
                                    <th>Team Code</th>
                                    <th>TP</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {teams.length > 0 ? (
                                    teams.map((team) => (
                                        <tr key={team.teamId}>
                                            <td>{team.teamName}</td>
                                            <td>{team.teamCode}</td>
                                            <td>{team.tP}</td>
                                            <td>
                                                <Link
                                                    to={`/team/update-team/${team.teamId}`}
                                                >
                                                    <i className='fas fa-user-edit'></i>
                                                </Link>

                                                <Link
                                                    to={`/team/${team.teamId}`}
                                                    className='pl-2'
                                                >
                                                    <i className='far fa-address-card'></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='4'>No team found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateTeam createTeam={createTeam} />
        </Fragment>
    )
}

Team.propTypes = {
    getTeams: PropTypes.func.isRequired,
    createTeam: PropTypes.func.isRequired,
    getTeamParticipations: PropTypes.func.isRequired,
    getLeagues: PropTypes.func.isRequired,
    league: PropTypes.object.isRequired,
    team: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    team: state.team,
    league: state.league
})

export default connect(mapStateToProps, {
    getTeams,
    createTeam,
    getTeamParticipations,
    getLeagues,
})(Team)
