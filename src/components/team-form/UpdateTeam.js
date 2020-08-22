import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { getPlayers } from '../../actions/player'
import { updateTeam, getTeams, getPlayersParticipation } from '../../actions/team'
import { getLeagues, getLeague, getTeamParticipation } from '../../actions/league'
import Spinner from '../layout/Spinner'
import PlayerItem from '../player/PlayerItem'

const UpdateTeam = ({
    updateTeam,
    getLeague,
    league: { loading, league, teamParticipation },
    getPlayers,
    getPlayersParticipation,
    getTeamParticipation,
    player,
    auth,
    match,
    getTeams,
    team,
}) => {
    const [series, setSeries] = useState('')

    useEffect(() => {
        getPlayers()
        getLeague(match.params.leagueId)
        getTeams()
    }, [getPlayers, match, getLeague, getTeams])

    useEffect(() => {
        getTeamParticipation(match.params.leagueId, match.params.teamId)
        getPlayersParticipation(match.params.leagueId, match.params.teamId)
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()

        updateTeam({
            teamParticipation: {
                team: auth.user.team,
                league: league,
                series: series,
                ranking: 0,
                points: 0,
                group: 'UNASSIGN',
            },
            players: team.playerParticipations,
        })
    }

    return loading ||
        player.loading ||
        auth.loading ||
        !league ||
        !auth.user.team ||
        !team ||
        !teamParticipation ? (
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
                        <Link to={`/league/add-team/${league.leagueId}`}>
                            Add Team To League
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
                        Add Team To League
                    </h3>
                </div>

                <div className='card-body'>
                    <form onSubmit={onSubmit}>
                        <div className='form-row'>
                            <div className='form-group col-md-12'>
                                <label htmlFor='series'>Series</label>
                                <select
                                    id='series'
                                    name='series'
                                    className='form-control'
                                    value={series}
                                    onChange={(event) =>
                                        setSeries(event.target.value)
                                    }
                                >
                                    <option value=''>Choose Series</option>
                                    <option value='A'>A</option>
                                    <option value='B'>B</option>
                                </select>
                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-header'>
                                <h5>Choose Player</h5>
                            </div>

                            <div className='card-body card-content'>
                                {player.players.length > 0 ? (
                                    player.players.map((playerItem) => (
                                        <PlayerItem
                                            key={playerItem.playerId}
                                            player={playerItem}
                                            players={team.playerParticipations}
                                        />
                                    ))
                                ) : (
                                    <p>No player found</p>
                                )}
                            </div>
                        </div>

                        <div className='card'>
                            <div className='card-header'>
                                <h5>Chosen Player</h5>
                            </div>

                            <div className='card-body card-content'>
                                {team.playerParticipations &&
                                team.playerParticipations.length > 0 ? (
                                    team.playerParticipations.map(
                                        (playerParticipationItem) => (
                                            <PlayerItem
                                                key={
                                                    playerParticipationItem.playerId
                                                }
                                                player={playerParticipationItem}
                                                already={true}
                                                teamParticipationId={teamParticipation.teamParticipationId}
                                            />
                                        )
                                    )
                                ) : (
                                    <p>No player chosen</p>
                                )}
                            </div>
                        </div>

                        <button type='submit' className='btn btn-primary'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

UpdateTeam.propTypes = {
    updateTeam: PropTypes.func.isRequired,
    getLeagues: PropTypes.func.isRequired,
    getPlayers: PropTypes.func.isRequired,
    getLeague: PropTypes.func.isRequired,
    getPlayersParticipation: PropTypes.func.isRequired,
    getTeamParticipation: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    league: state.league,
    player: state.player,
    auth: state.auth,
    team: state.team,
})

export default connect(mapStateToProps, {
    updateTeam,
    getLeagues,
    getPlayers,
    getLeague,
    getTeams,
    getPlayersParticipation,
    getTeamParticipation
})(UpdateTeam)
