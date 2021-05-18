import { Link } from 'react-router-dom'

import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux"
import { userService } from "../services/userService";
import { loadUser, onUserFollow } from "../store/actions/userActions";
import { ProfileHeader } from '../cmps/ProfileHeader';
import { UserPhotos } from '../cmps/UserPhotos';
import { Posts } from '../cmps/Posts';
import loadingGif from '../assets/gifs/page-loader.gif'
import { login } from '../store/actions/userActions.js'


export function Profile({ match, history }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)
    const feed = useSelector(state => state.userModule.feed)

    const [isFollowing, setIsFollowing] = useState(false)
    const [currUser, setCurrUser] = useState(null)
    const [isUser, setIsUser] = useState(false)


    useEffect(async () => {
        if (!user) {
            const loggedUser = await dispatch(login(null))
            if (!loggedUser) history.push('/login')
        }
        else await onMount()
    }, [user,match.params])
    
    const onMount = async () => {
        const { id } = match.params
        id === user._id ? setIsUser(true) : setIsUser(false)
        const foundedUser = await userService.getUser(id)
        setCurrUser(foundedUser)
        setFollowingState(id)
    }

    const setFollowingState = (id) => {
        const idx = user?.following.findIndex(follower => follower._id === id)
        idx >= 0 ? setIsFollowing(true) : setIsFollowing(false)
    }

    const toggleFollow = async () => {
        const { id } = match.params
        const copyUser = JSON.parse(JSON.stringify(user))
        const searchedUser = await userService.getUser(id)
        if (!isFollowing) await onFollow(copyUser, searchedUser)
        else await onUnFollow(copyUser, searchedUser)
        const currUser = await userService.getUser(id)
        setCurrUser(currUser)
    }


    const onFollow = async (copyUser, searchedUser) => {
        const following = createFollowr(searchedUser)
        const follower = createFollowr(copyUser)
        copyUser.following.unshift({ ...following })
        searchedUser.followers.unshift({ ...follower })
        await dispatch(onUserFollow(copyUser, searchedUser))
        setIsFollowing(true)
    }

    const onUnFollow = async (copyUser, searchedUser) => {
        const idx = user.following.findIndex(follower => follower._id === searchedUser.id)
        copyUser.following.splice(idx, 1)
        const follwerIdx = searchedUser.followers.findIndex(follower => follower._id === copyUser._id)
        searchedUser.followers.splice(follwerIdx, 1)
        await dispatch(onUserFollow(copyUser, searchedUser))
        setIsFollowing(false)

    }

    const createFollowr = (user) => {
        return {
            _id: user._id,
            nickName: user.nickName,
            profileImg: user.profileImg
        }
    }

    if (!currUser) return <img src={loadingGif} />
    return (
        <div className="profile-page-container">
            <div className='cover-img'>
                <img src={currUser.coverImg} alt="" />
            </div>
            <div className='header-container'>
                <ProfileHeader isUser={isUser} user={currUser} isFollowing={isFollowing} toggleFollow={toggleFollow} />
            </div>
            <div className="profile-feed-contaienr">
                <UserPhotos user={currUser} />
                <Posts posts={currUser.posts} />
            </div>
            <Link to={`/`} > go back </Link>
        </div>
    )
}
