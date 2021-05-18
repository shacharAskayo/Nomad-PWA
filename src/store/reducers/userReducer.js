

const initialState = {
    user: null,
    feed: {
        moments: [],
        posts: []
    },
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.user }
        case 'LOGOUT':
            return { ...state, user: null }
        case 'LOAD_USER':
            return { ...state, user: action.user }
        case 'UPDATE_USER':
            return { ...state,  user: action.user }
        case 'LOAD_FEED':
            return { ...state, feed: action.feed }
        case 'UPDATE_POSTS':
            return { ...state, feed: { ...state.feed, posts: state.feed.posts.map(post => (post.id === action.postCopy.id) ? action.postCopy : post) } }
        case 'ADD_POST':
            return { ...state, feed: { ...state.feed, posts: [action.postCopy, ...state.feed.posts] } }
        case 'ADD_MOMENT':
            return { ...state, feed: { ...state.feed, moments: [action.moment, ...state.feed.moments] } }
        case 'DELETE_POST':
            return {...state,feed:{...state.feed,posts:state.feed.posts.filter(post=>post.id!==action.post.id)}}
        default:
            return state
    }
}