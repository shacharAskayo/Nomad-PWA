import { useEffect, useState } from "react"
import { cloudinaryService } from "../services/cloudinaryService"
import { updateUser } from '../store/actions/userActions.js'
import { useDispatch } from "react-redux"


export function ProfileHeader({ user, isFollowing, toggleFollow, isUser }) {

    const dispatch = useDispatch()


    const uploadImg = async (ev) => {
        const copyUser = JSON.parse(JSON.stringify(user))
        const img = ev.target.files[0]
        const uploadedImg = await cloudinaryService.uploadImg(img)
        if (uploadedImg.width > 1300) {
            copyUser.coverImg = uploadedImg.secure_url
            await dispatch(updateUser(copyUser))
        }
    }

    return (
        <div className="profile-header">
            <div className="user-details">
                <img src={user.profileImg} alt="" />
                <div className="user-info">
                    <span>  {user.firstName} {user.lastName}</span>
                    <span> Mail: {user.email} </span>
                    <span> Im at {user.currentLocation.name} </span>
                    {isUser && <label htmlFor="img-icon">
                        <button> set img</button>
                        <input className="img-input" type="file" id="img-icon" onChange={uploadImg} />
                    </label>}
                </div>
            </div>
            <div className="followers-moments-container">
                <div className="followers-container">
                    <span>{user.following.length} following</span>
                    <span>{user.followers.length} followers</span>
                    {(!isFollowing && !isUser) && <button onClick={toggleFollow}> follow </button>}
                    {isFollowing && <button onClick={toggleFollow}> unfollow </button>}
                </div>
                <div className="moments-container">
                    {user.moments.map(moment => {
                        return (
                            <img src={moment.img} key={moment.img} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}