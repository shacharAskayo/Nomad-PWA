import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { NomadHeader } from '../cmps/Header/NomadHeader'
import { logout, login } from '../store/actions/userActions.js'

function Friends({ history }) {

    const user = useSelector(state => state.userModule.user)
    const dispatch = useDispatch()

    useEffect(async () => {
        if (!user) {
            const loggedUser = await dispatch(login(null))
            if (!loggedUser) history.push('/login')
        }
    }, [])

    const arr = [1, 2, 3, 4]
    if (!user) return <h2>loading</h2>
    return (
        <div className="friends-page-container">
            <NomadHeader user={user} logout={logout} />
            <button>switch look</button>
            <div className="friends-container">
                {arr.map(friend => <div key={friend} className="friend-preview">
                    {/* <div className='preview-profile' style={{ backgroundImage: `url(${user.coverImg})` }} >
                        <div className="profile-container">

                            <img className='profile-img' src={user.profileImg} alt="" />
                            <div className='profile-and-follow'>
                                <button>unfollow</button>
                                <h3>{user.firstName} {user.lastName}</h3>
                            </div>

                        </div>
                    </div>

                    <div>

                    </div> */}
                </div>)}
            </div>
        </div>
    )
}


export default withRouter(Friends)