import React, { Fragment } from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import { choosePlayer, removePlayer } from '../../actions/team'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PlayerItem = ({
    player,
    choosePlayer,
    players,
    chosen,
    already,
    removePlayer,
    teamParticipationId,
}) => {
    const handleChoosePlayer = () => {
        choosePlayer(player)
    }

    const handleRemovePlayer = () => {
        removePlayer(teamParticipationId, player.playerId)
    }

    return (
        <div className='card'>
            <div className='card-body d-md-flex justify-content-between align-items-center'>
                <img
                    src={`/uploads/${player.image}`}
                    alt='user avatar'
                    className='img-thumbnail'
                />

                <div className='form-group'>
                    <div>
                        <label>
                            <span className='font-weight-bold'>
                                First Name:
                            </span>{' '}
                        </label>
                        <p>{player.firstName}</p>
                    </div>

                    <div>
                        <label>
                            <span className='font-weight-bold'>Last Name:</span>{' '}
                        </label>
                        <p>{player.lastName}</p>
                    </div>
                </div>

                <div className='form-group'>
                    <div>
                        <label>
                            <span className='font-weight-bold'>Nick Name:</span>{' '}
                        </label>
                        <p>{player.nickName}</p>
                    </div>

                    <div>
                        <label>
                            <span className='font-weight-bold'>
                                Player Code:
                            </span>{' '}
                        </label>
                        <p>{player.playerCode}</p>
                    </div>
                </div>

                <div className='form-group'>
                    <div>
                        <label>
                            <span className='font-weight-bold'>
                                Date Of Birth:
                            </span>{' '}
                        </label>
                        <p>
                            <Moment format='YYYY/MM/DD'>
                                {player.dateOfBirth}
                            </Moment>
                        </p>
                    </div>

                    <div>
                        <label>
                            <span className='font-weight-bold'>Ranking:</span>{' '}
                        </label>
                        <p>{player.ranking}</p>
                    </div>
                </div>

                <div className='form-group'>
                    <div>
                        <label>
                            <span className='font-weight-bold'>
                                Updated Point:
                            </span>{' '}
                        </label>
                        <p>{player.updatedPoint}</p>
                    </div>

                    <div>
                        <label>
                            <span className='font-weight-bold'>
                                Accumulated Point:
                            </span>{' '}
                        </label>
                        <p>{player.accumulatedPoint}</p>
                    </div>
                </div>

                <div className='form-group'>
                    {already ? (
                        <Link to='#' onClick={handleRemovePlayer}>
                            <i className='fas fa-minus-circle fa-2x'></i>
                        </Link>
                    ) : (
                        <Fragment>
                            {players.map((playerItem) =>
                                playerItem.playerId === player.playerId
                                    ? (chosen = true)
                                    : chosen
                            )}

                            {chosen ? (
                                <Link to='#'>
                                    <i className='fas fa-check fa-2x'></i>
                                </Link>
                            ) : (
                                <Link to='#' onClick={handleChoosePlayer}>
                                    <i className='fas fa-plus fa-2x'></i>
                                </Link>
                            )}
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}

PlayerItem.defaultProps = {
    chosen: false,
    players: [],
    already: false,
    teamParticipationId: 0,
}

PlayerItem.propTypes = {
    choosePlayer: PropTypes.func.isRequired,
    removePlayer: PropTypes.func.isRequired,
    chosen: PropTypes.bool.isRequired,
    players: PropTypes.array.isRequired,
    player: PropTypes.object.isRequired,
    already: PropTypes.bool.isRequired,
}

export default connect(null, { choosePlayer, removePlayer })(PlayerItem)
