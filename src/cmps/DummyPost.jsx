import React from 'react'
import Moment from 'react-moment'
import { PostMenu } from './PostMenu'

export default function DummyPost({voice,user,onPost,onDelete}) {
    const time = new Date(Date.now())
    return (
        <div className="post-preview dummy">
            <PostMenu />
            <div className="user-details">
                <img src={user.profileImg} alt="" />
                <div>
                    <span> {user.nickName} </span>
                    <div>
                        <Moment className="date" fromNow>{time}</Moment>
                    </div>
                </div>
            </div>

            <div className="post-details">
                {!voice && <h3>Speak Into Post</h3>}
                {voice && <h3>{voice}</h3>}
            </div>

            <footer>
                <div className='comments-like-container'>

                    <span onClick={onPost} >  post</span>
                    <span onClick={onDelete}> delete </span>
                </div>


            </footer>
        </div>
    )
}
