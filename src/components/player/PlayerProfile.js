import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import { getPlayer, getPlayerAchievement } from '../../actions/player'
import Spinner from '../layout/Spinner'
import PlayerAchievement from './PlayerAchievement'

const PlayerProfile = ({
    getPlayer,
    match,
    player: { player, loading, playerAchievements },
    getPlayerAchievement,
}) => {
    useEffect(() => {
        getPlayer(match.params.playerId)
        getPlayerAchievement(match.params.playerId)
    }, [getPlayer, getPlayerAchievement, match])

    return loading || !player || !playerAchievements ? (
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
                        <Link to={`/player/${player.playerId}`}>
                            Player Profile
                        </Link>
                    </li>
                </ol>
            </nav>

            <div className='card mt-4 mb-4'>
                <div className='card-header bg-dark'>
                    <h4>
                        <i className='far fa-id-card'></i> Player Profile
                    </h4>
                </div>

                <div className='card-body'>
                    <div className='row'>
                        <div className='col-lg-3'>
                            <img
                                src={`/uploads/${player.image}`}
                                alt='user avatar'
                                className='img-thumbnail'
                            />
                            <Link
                                to={`/player/update-player/${player.playerId}`}
                                className='btn btn-info btn-equal mt-4'
                            >
                                Update Player
                            </Link>

                            <Link
                                to={`/player/update-achievement/${player.playerId}`}
                                className='btn btn-primary btn-equal mt-2'
                            >
                                Update Achievement
                            </Link>
                        </div>

                        <div className='col-lg-9'>
                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    First Name
                                </label>
                                <div className='border-bottom pl-2'>
                                    {player.firstName}
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Last Name
                                </label>
                                <div className='border-bottom pl-2'>
                                    {player.lastName}
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Player Code
                                </label>
                                <div className='border-bottom pl-2'>
                                    {player.playerCode}
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Nickname
                                </label>
                                <div className='border-bottom pl-2'>
                                    {player.nickName}
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Date of Birth
                                </label>
                                <div className='border-bottom pl-2'>
                                    <Moment format='YYYY/MM/DD'>
                                        {player.dateOfBirth}
                                    </Moment>
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Ranking
                                </label>
                                <div className='border-bottom pl-2'>
                                    {player.ranking}
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Updated Point
                                </label>
                                <div className='border-bottom pl-2'>
                                    {player.updatedPoint}
                                </div>
                            </div>

                            <div className='form-group'>
                                <label className='font-weight-bold'>
                                    Accumulated Point
                                </label>
                                <div className='border-bottom pl-2'>
                                    {player.accumulatedPoint}
                                </div>
                            </div>
                        </div>
                    </div>

                    <PlayerAchievement
                        playerAchievements={playerAchievements}
                    />
                </div>
            </div>
        </div>
    )
}

PlayerProfile.propTypes = {
    getPlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    getPlayerAchievement: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    player: state.player,
})

export default connect(mapStateToProps, { getPlayer, getPlayerAchievement })(PlayerProfile)
