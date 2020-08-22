import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import {
    getLeagues,
    searchLeagues,
    updateLeague,
} from '../../actions/league'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import CreateLeague from '../league-form/CreateLeague'

const League = ({
    getLeagues,
    league: { loading, leagues },
    searchLeagues,
    updateLeague,
    auth
}) => {
    const [term, setTerm] = useState('')

    const onChange = (event) => {
        setTerm(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        searchLeagues({ term })
    }

    useEffect(() => {
        getLeagues()
    }, [getLeagues])

    return loading || auth.loading ? (
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
                            <Link to='/league'>League</Link>
                        </li>
                        <li
                            className='breadcrumb-item active'
                            aria-current='page'
                        >
                            <Link to='/league'>All Leagues</Link>
                        </li>
                    </ol>
                </nav>
                <div className='card'>
                    <div className='card-header bg-dark'>
                        <h3 className='ml-3'>
                            <span className='mr-3'>
                                <i className='fas fa-users'></i>
                            </span>
                            All Leagues
                        </h3>
                    </div>

                    <div className='card-body card-table'>
                        <div className='d-md-flex justify-content-between pb-3'>
                            <button
                                type='button'
                                className='btn btn-primary'
                                data-toggle='modal'
                                data-target='#createLeague'
                            >
                                Create League
                            </button>

                            {/* <button
                            onClick={onUpdateAchievement}
                            className='btn btn-info'
                        >
                            Update Achievement
                        </button> */}

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
                                    <th>League Name</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Reward</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {leagues.length > 0 ? (
                                    leagues.map((league) => (
                                        <tr key={league.leagueId}>
                                            <td>{league.leagueName}</td>
                                            <td>
                                                <Moment format='YYYY/MM/DD'>
                                                    {league.startDate}
                                                </Moment>
                                            </td>
                                            <td>
                                                <Moment format='YYYY/MM/DD'>
                                                    {league.endDate}
                                                </Moment>
                                            </td>
                                            <td>{league.reward}</td>
                                            <td>
                                                <Link
                                                    to={`/league/update-league/${league.leagueId}`}
                                                >
                                                    <i className='fas fa-user-edit'></i>
                                                </Link>

                                                <Link
                                                    to={`/league/${league.leagueId}`}
                                                    className='pl-2'
                                                >
                                                    <i className='far fa-address-card'></i>
                                                </Link>

                                                <Link
                                                    to={`/league/${league.leagueId}/${auth.user.team.teamId}`}
                                                    className='pl-2'
                                                >
                                                    <i className="far fa-plus-square"></i>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan='5'>No league found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <CreateLeague updateLeague={updateLeague} />
        </Fragment>
    )
}

League.propTypes = {
    getLeagues: PropTypes.func.isRequired,
    league: PropTypes.object.isRequired,
    searchLeagues: PropTypes.func.isRequired,
    updateLeague: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    league: state.league,
    auth: state.auth
})

export default connect(mapStateToProps, {
    getLeagues,
    searchLeagues,
    updateLeague,
})(League)
