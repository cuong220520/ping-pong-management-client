import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { updatePlayer, getPlayer } from '../../actions/player'
import FileUpload from '../util/FileUpload'
import Spinner from '../layout/Spinner'

const UpdatePlayer = ({
    updatePlayer,
    history,
    player: { player, loading },
    match,
    getPlayer,
}) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        playerCode: '',
        nickName: '',
        dateOfBirth: '',
        ranking: '',
        updatedPoint: 0,
        accumulatedPoint: 0,
    })

    useEffect(() => {
        if (!player) getPlayer(match.params.playerId)

        if (player) {
            setFormData({
                firstName: loading || !player.firstName ? '' : player.firstName,
                lastName: loading || !player.lastName ? '' : player.lastName,
                playerCode:
                    loading || !player.playerCode ? '' : player.playerCode,
                nickName: loading || !player.nickName ? '' : player.nickName,
                dateOfBirth:
                    loading || !player.dateOfBirth ? '' : player.dateOfBirth,
                ranking: loading || !player.ranking ? '' : player.ranking,
                updatedPoint:
                    loading || !player.updatedPoint ? '' : player.updatedPoint,
                accumulatedPoint:
                    loading || !player.accumulatedPoint
                        ? ''
                        : player.accumulatedPoint,
            })
        }
    }, [player, getPlayer, loading, match])

    const [image, setImage] = useState('')

    const uploadImage = (newImage) => {
        setImage(newImage)
    }

    const {
        firstName,
        lastName,
        playerCode,
        nickName,
        dateOfBirth,
        ranking,
        updatedPoint,
        accumulatedPoint,
    } = formData

    const onChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }

    const onSubmit = (event) => {
        event.preventDefault()

        if (image === '') {
            updatePlayer(
                {
                    playerId: match.params.playerId,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    playerCode: formData.playerCode,
                    nickName: formData.nickName,
                    dateOfBirth: formData.dateOfBirth,
                    ranking: formData.ranking,
                    updatedPoint: formData.updatedPoint,
                    accumulatedPoint: formData.accumulatedPoint,
                    image: player.image,
                },
                history
            )
        } else {
            updatePlayer(
                {
                    playerId: match.params.playerId,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    playerCode: formData.playerCode,
                    nickName: formData.nickName,
                    dateOfBirth: formData.dateOfBirth,
                    ranking: formData.ranking,
                    updatedPoint: formData.updatedPoint,
                    accumulatedPoint: formData.accumulatedPoint,
                    image: image[0],
                },
                history
            )
        }
    }

    return loading || !player ? (
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
                        <Link to='/create-player'>Create Player</Link>
                    </li>
                </ol>
            </nav>

            <div className='card'>
                <div className='card-header bg-dark'>
                    <h3 className='ml-3'>
                        <span className='mr-3'>
                            <i className='fas fa-user-plus'></i>
                        </span>
                        Create Player
                    </h3>
                </div>

                <div className='card-body card-table'>
                    <form onSubmit={onSubmit}>
                        <input type='hidden' value={match.params.playerId} />
                        <div className='d-flex justify-content-center align-items-center mb-4'>
                            {image === '' || image.length === 0 ? (
                                <img
                                    src={`/uploads/${player.image}`}
                                    className='img-thumbnail'
                                    alt='user avatar'
                                />
                            ) : (
                                <img
                                    src={`/uploads/${image[0]}`}
                                    className='img-thumbnail'
                                    alt='user avatar'
                                />
                            )}

                            <label className='ml-4'>
                                <FileUpload refreshFunction={uploadImage} />
                                <i className='fas fa-edit fa-2x' />
                            </label>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='firstName'>First Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='firstName'
                                    name='firstName'
                                    value={firstName}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor='lastName'>Last Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='lastName'
                                    name='lastName'
                                    value={lastName}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='playerCode'>Player Code</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='playerCode'
                                    name='playerCode'
                                    value={playerCode}
                                    onChange={onChange}
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor='nickName'>Nickname</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    id='nickName'
                                    name='nickName'
                                    value={nickName}
                                    onChange={onChange}
                                />
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='dateOfBirth'>
                                    Date Of Birth
                                </label>
                                <input
                                    type='date'
                                    className='form-control'
                                    id='dateOfBirth'
                                    name='dateOfBirth'
                                    value={dateOfBirth}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='ranking'>Ranking</label>
                                <select
                                    id='ranking'
                                    name='ranking'
                                    value={ranking}
                                    onChange={onChange}
                                    className='form-control'
                                >
                                    <option value=''>Choose Ranking</option>
                                    <option value='F'>F</option>
                                    <option value='E'>E</option>
                                    <option value='D'>D</option>
                                    <option value='C'>C</option>
                                    <option value='B'>B</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='updatedPoint'>Point</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='updatedPoint'
                                    name='updatedPoint'
                                    value={updatedPoint}
                                    onChange={onChange}
                                />
                            </div>

                            <div className='form-group col-md-6'>
                                <label htmlFor='accumulatedPoint'>Point</label>
                                <input
                                    type='number'
                                    className='form-control'
                                    id='accumulatedPoint'
                                    name='accumulatedPoint'
                                    value={accumulatedPoint}
                                    onChange={onChange}
                                />
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

UpdatePlayer.propTypes = {
    updatePlayer: PropTypes.func.isRequired,
    player: PropTypes.object.isRequired,
    getPlayer: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    player: state.player,
})

export default connect(mapStateToProps, { updatePlayer, getPlayer })(
    UpdatePlayer
)
