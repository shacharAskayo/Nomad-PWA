import { httpService } from "./httpService"
import { storageService } from './asyncStorageService'
import { feedUtils } from '../services/utilFeedService.js'
import { compose } from "redux"


const baseUrl = '/auth'
const entityType = 'user'

export const feedService = {
    getPosts,
    addPost,
    onLike,
    onComment,
    onAddMoment,
    onDeletePost,
    onEditPost
}


async function getPosts(user) {
    try {
        // if (user) {
            var ids = []
            user.following.map(follow => ids.push(follow._id))
            const { posts, moments } = feedUtils.getUserPosts(ids, user)
            const feed = {
                posts,
                moments
            }
            return feed
        // }
    } catch (err) {
        console.log(err)
    }
}


async function onAddMoment(user, img) {
    try {
        const userCopy = JSON.parse(JSON.stringify(user))
        const moment = {
            id: Math.random(100000),
            img,
            createdAt: Date.now(),
            createdBy: {
                _id: userCopy._id,
                profileImg: userCopy.profileImg,
                nickName: userCopy.nickName
            }
        }
        userCopy.moments.unshift(moment)
        await storageService.put(entityType, userCopy)
        return { moment, userCopy }
    } catch (err) {
        // console.log(err)
    }
}
async function addPost(user, post) {
    try {
        const userCopy = JSON.parse(JSON.stringify(user))
        const postCopy = JSON.parse(JSON.stringify(post))
        const fullPost = feedUtils.getFullPost(userCopy, postCopy)
        userCopy.posts.unshift(fullPost)
        await storageService.put(entityType, userCopy)
        return { userCopy, fullPost }
    } catch (err) {
        console.log(err)
    }
}


async function onLike(user, post) {
    const postCopy = JSON.parse(JSON.stringify(post))
    const userCopy = JSON.parse(JSON.stringify(user))
    const likeKeys = {
        _id: userCopy._id,
        nickName: userCopy.nickName,
        createdAt: Date.now()
    }
    const {currPost,author} = await storageService.updateUserLikes(entityType, postCopy, likeKeys)
    var updatedUser;
    if(userCopy._id === author._id) updatedUser = JSON.parse(JSON.stringify(author))
    else updatedUser = null
    return { userCopy : updatedUser,  updatedPost:currPost  }
}


async function onComment(user, post, newComment) {
    const postCopy = JSON.parse(JSON.stringify(post))
    const userCopy = JSON.parse(JSON.stringify(user))
    const fullNewComment = {
        createdBy: {
            nickName: userCopy.nickName,
            _id: userCopy._id,
            profileImg: user.profileImg
        },
        commentsLikes: [],
        createdAt: Date.now(),
        txt: newComment.txt,
        id: Math.random(121312)
    }

    postCopy.postComments.push(fullNewComment)
    const author = await storageService.updateUserComments(entityType, postCopy)
    
    var updatedUser;
    if(userCopy._id === author._id) updatedUser = JSON.parse(JSON.stringify(author))
    else updatedUser = null
    return { userCopy : updatedUser, postCopy }
}


async function onDeletePost(user, post) {
    const postCopy = JSON.parse(JSON.stringify(post))
    const userCopy = JSON.parse(JSON.stringify(user))
    const idx = userCopy.posts.findIndex(post => post.id === postCopy.id)
    userCopy.posts.splice(idx, 1)
    await storageService.put(entityType, userCopy)
    return { postCopy, userCopy }
}
async function onEditPost(user, post) {
    const postCopy = JSON.parse(JSON.stringify(post))
    console.log('edit service');
    // const userCopy = JSON.parse(JSON.stringify(user))
    // const idx = userCopy.posts.findIndex(post => post.id === postCopy.id)
    // userCopy.posts.splice(idx, 1)
    // await storageService.put(entityType,userCopy)
    return postCopy
}

