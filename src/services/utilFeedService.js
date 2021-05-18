export const feedUtils = {
    getUserPosts,
    getFullPost
}

function getUserPosts(ids, user) {
    const stoaredUsers = JSON.parse(localStorage.getItem('user') || 'null')
    const followers = ids.map(id => stoaredUsers.find((user) => user._id === id))
    followers.unshift(user)
    const posts = []
    const moments = []
    followers.map(follower => {
        follower.posts.map(post => posts.push(post))
        follower.moments.map(moment => moments.push(moment))
    })
    return { posts, moments }

}


function getFullPost(userCopy, post) {
    const newPost = {
        ...post,
        id: Math.random(2220000),
        postLikes: [],
        postComments: [],
        createdAt: Date.now(),
        createdBy: {
            _id: userCopy._id,
            profileImg: userCopy.profileImg,
            nickName: userCopy.nickName
        }
    }
    return newPost
}

