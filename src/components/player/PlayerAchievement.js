import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const PlayerAchievement = ({ playerAchievements }) => {
    const playerAchievementList = playerAchievements.map(
        (playerAchievement) => (
            <tr key={playerAchievement.updatedDate}>
                <td>{playerAchievement.playerCode}</td>
                <td>{playerAchievement.nickName}</td>
                <td>{playerAchievement.point}</td>
                <td>{playerAchievement.ranking}</td>
                <td>
                    <Moment format='YYYY/MM/DD'>
                        {playerAchievement.updatedDate}
                    </Moment>
                </td>
            </tr>
        )
    )

    return playerAchievements.length === 0 ? (
        <div className='card mt-4'>
            <div className='card-header'>
                This staff have no achievement information
            </div>
        </div>
    ) : (
        <div className='card mt-4 card-table-sm'>
            <div className='card-header'>
                <i className='far fa-file-alt'></i> Player Achievement
            </div>

            <div className='card-body'>
                <table className='table table-hover table-striped'>
                    <thead>
                        <tr>
                            <th>Player Code</th>
                            <th>Nickname</th>
                            <th>Point</th>
                            <th>Ranking</th>
                            <th>Updated Date</th>
                        </tr>
                    </thead>

                    <tbody>{playerAchievementList}</tbody>
                </table>
            </div>
        </div>
    )
}

PlayerAchievement.propTypes = {
    playerAchievement: PropTypes.array.isRequired,
}

export default PlayerAchievement
