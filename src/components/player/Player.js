import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'

import { getPlayers } from '../../actions/player'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'

const Player = ({ getPlayers, player: { loading, players } }) => {
    useEffect(() => {
        getPlayers()
    }, [getPlayers])

    return loading ? (
        <Spinner />
    ) : (
        <div className='bg-content shadow-sm'>
            <nav aria-label='breadcrumb bg-dark'>
                <ol className='breadcrumb'>
                    <li className='breadcrumb-item'>
                        <Link href='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                        <Link href='/player'>All Players</Link>
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

                        <form class='form-inline my-2 my-lg-0 float-right'>
                            <input
                                class='form-control mr-sm-2'
                                type='search'
                                placeholder='Search'
                                aria-label='Search'
                            />
                            <button
                                class='btn btn-outline-success my-2 my-sm-0'
                                type='submit'
                            >
                                Search
                            </button>
                        </form>
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
                            {players.length > 0 ? (
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
                                                <i class='fas fa-user-edit fa-2x'></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>No player found</td>
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
}

const mapStateToProps = (state) => ({
    player: state.player,
})

export default connect(mapStateToProps, { getPlayers })(Player)
