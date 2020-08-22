import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import {
    getPlayers,
    searchPlayers,
    updateAchievement,
} from '../../actions/player'
import {
    getTeamParticipations,
    getLeagues,
    getTeamParticipation,
} from '../../actions/league'
import { getPlayersParticipation } from '../../actions/team'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const Player = ({
    getPlayers,
    player: { loading, players },
    searchPlayers,
    updateAchievement,
    getTeamParticipations,
    team,
    getLeagues,
    league,
    getPlayersParticipation,
    getTeamParticipation,
}) => {
    const [term, setTerm] = useState('')
    const [leagueId, setLeagueId] = useState(0)
    const [teamId, setTeamId] = useState(0)

    const leagueOnChange = (event) => {
        setLeagueId(event.target.value)
    }

    const teamOnChange = (event) => {
        setTeamId(event.target.value)
        getTeamParticipation(leagueId, event.target.value)
    }

    const onChange = (event) => {
        setTerm(event.target.value)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        searchPlayers({ term })
    }

    const onUpdateAchievement = () => {
        updateAchievement()
    }

    useEffect(() => {
        getPlayers()
    }, [getPlayers])

    useEffect(() => {
        getTeamParticipations(leagueId)
        getLeagues()
        getPlayersParticipation(leagueId, teamId)
    }, [leagueId, teamId])

    return loading || team.loading || league.loading ? (
        <Spinner />
    ) : (
        <div className='bg-content shadow-sm'>
            <nav aria-label='breadcrumb bg-dark'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        <Link to='/player'>Player</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        <Link to='/player'>All Players</Link>
                    </li>
                </ol>
            </nav>
            <div className='card'>
                <div className='card-header bg-dark'>
                    <h3 className='ml-3'>
                        <span className='mr-3'>
                            <i class='fas fa-users'></i>
                        </span>
                        All Players
                    </h3>
                </div>

                <div className='card-body card-table'>
                    <div class='d-flex justify-content-between pb-3'>
                        <Link
                            to='/player/create-player'
                            className='btn btn-primary'
                        >
                            Create Player
                        </Link>

                        <button
                            onClick={onUpdateAchievement}
                            className='btn btn-info'
                        >
                            Update Achievement
                        </button>

                        <form
                            class='form-inline my-2 my-lg-0 float-right'
                            onSubmit={onSubmit}
                        >
                            <input
                                class='form-control mr-sm-2'
                                type='text'
                                placeholder='Search'
                                aria-label='Search'
                                name='term'
                                value={term}
                                onChange={onChange}
                            />
                            <button
                                class='btn btn-outline-success my-2 my-sm-0'
                                type='submit'
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    <div className='form-row'>
                        <div className='form-group col-md-6'>
                            <select
                                id='leagueId'
                                name='leagueId'
                                onChange={leagueOnChange}
                                value={leagueId}
                                className='form-control'
                            >
                                <option value=''>Choose League</option>
                                {league.leagues.length > 0 ? (
                                    league.leagues.map((leagueItem) => (
                                        <option
                                            key={leagueItem.leagueId}
                                            value={leagueItem.leagueId}
                                        >
                                            {leagueItem.leagueName}
                                        </option>
                                    ))
                                ) : (
                                    <option>No league found</option>
                                )}
                            </select>
                        </div>

                        <div className='form-group col-md-6'>
                            <select
                                id='teamId'
                                name='teamId'
                                onChange={teamOnChange}
                                className='form-control'
                                value={teamId}
                            >
                                <option value=''>Choose Team</option>
                                {team.teams.length > 0 ? (
                                    team.teams.map((teamItem) => (
                                        <option
                                            key={teamItem.teamId}
                                            value={teamItem.teamId}
                                        >
                                            {teamItem.teamName}
                                        </option>
                                    ))
                                ) : (
                                    <option>No team found</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <table className='table table-striped table-hover'>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Nickname</th>
                                <th>Date Of Birth</th>
                                <th>Ranking</th>
                                <th>Updated Point</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {team.playerParticipations.length > 0 ? (
                                team.playerParticipations.map((playerItem) => (
                                    <tr key={playerItem.playerId}>
                                        <td>{playerItem.firstName}</td>
                                        <td>{playerItem.lastName}</td>
                                        <td>{playerItem.nickName}</td>
                                        <td>
                                            <Moment format='YYYY/MM/DD'>
                                                {playerItem.dateOfBirth}
                                            </Moment>
                                        </td>
                                        <td>{playerItem.ranking}</td>
                                        <td>{playerItem.updatedPoint}</td>
                                        <td>
                                            <Link
                                                to={`/player/update-player/${playerItem.playerId}`}
                                            >
                                                <i class='fas fa-user-edit'></i>
                                            </Link>

                                            <Link
                                                to={`/player/${playerItem.playerId}`}
                                                className='pl-2'
                                            >
                                                <i class='far fa-address-card'></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : players.length > 0 ? (
                                players.map((player) => (
                                    <tr key={player.playerId}>
                                        <td>{player.firstName}</td>
                                        <td>{player.lastName}</td>
                                        <td>{player.nickName}</td>
                                        <td>
                                            <Moment format='YYYY/MM/DD'>
                                                {player.dateOfBirth}
                                            </Moment>
                                        </td>
                                        <td>{player.ranking}</td>
                                        <td>{player.updatedPoint}</td>
                                        <td>
                                            <Link
                                                to={`/player/update-player/${player.playerId}`}
                                            >
                                                <i class='fas fa-user-edit'></i>
                                            </Link>

                                            <Link
                                                to={`/player/${player.playerId}`}
                                                className='pl-2'
                                            >
                                                <i class='far fa-address-card'></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='7'>No player found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

Player.propTypes = {
    getPlayers: PropTypes.func.isRequired,
    searchPlayers: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    updateAchievement: PropTypes.func.isRequired,
    getTeamParticipations: PropTypes.func.isRequired,
    team: PropTypes.object.isRequired,
    league: PropTypes.object.isRequired,
    getLeagues: PropTypes.func.isRequired,
    getPlayersParticipation: PropTypes.func.isRequired,
    getTeamParticipation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    player: state.player,
    team: state.team,
    league: state.league,
})

export default connect(mapStateToProps, {
    getPlayers,
    searchPlayers,
    updateAchievement,
    getTeamParticipations,
    getLeagues,
    getPlayersParticipation,
    getTeamParticipation,
})(Player)
