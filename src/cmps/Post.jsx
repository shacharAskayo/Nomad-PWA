import Moment from 'react-moment';
import 'moment-timezone';
import { feedService } from '../services/feedService';
import { connect, useDispatch, useSelector } from "react-redux"
import { onLike, onComment, onDelete, onEdit } from '../store/actions/feedAction.js'
import { useEffect, useRef, useState } from 'react';
import { Comments } from './Comments';
import { Link } from 'react-router-dom'
import { Menu } from './Menu';
import { Input } from '@material-ui/core';

export function Post({ post, ...props }) {

    const dispatch = useDispatch()
    const user = useSelector(state => state.userModule.user)

    const [likeClass, setLikeClass] = useState('')
    const [isComment, setIsComment] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const ref = useRef(null)

    useEffect(() => {
        const now = Date.now()
        const comments = post.postComments
        const comment = comments[comments.length - 1]
        if (comment?.createdBy._id === user._id && (now - comment.createdAt) < 1000) setIsComment(false)
        else setIsComment(false) // maybe close the comment section after a comment
    }, [])

    useEffect(() => {
        const idx = post.postLikes.findIndex(like => like._id === user._id)
        if (idx >= 0) setLikeClass('like')
        else setLikeClass('')
    }, [])

    const onUserLike = async () => {
        await dispatch(onLike(user, post))
    }

    const onMenuClicked = async (action) => {
        if (post.createdBy._id !== user._id) return
        else switch (action) {
            case 'delete':
                return await dispatch(onDelete(user, post))
            case 'edit':
                return enterEditMode()
            default:
                break;
        }
    }

    const enterEditMode = async () => {
        await setIsEdit(!isEdit)
        if (ref.current !== "" && ref.current !== null) ref.current.focus()
    }

    const handleChange = (ev) => {
        const { value } = ev.target
    }

    return (
        <div className="post-preview">
            <Menu onMenuClicked={onMenuClicked} />
            <div className="user-details">
                <Link to={`/profile/${post.createdBy._id}`}>
                    <img src={post.createdBy.profileImg} alt="" />
                </Link>
                <div>
                    <span> {post.createdBy.nickName} </span>
                    <div>
                        <Moment className="date" fromNow>{post.createdAt}</Moment>
                    </div>
                </div>
            </div>

            <div className="post-details">


                {!isEdit && <h2>{post.txt}</h2>}
                {isEdit && <input ref={ref} type='text' value={post.txt} onChange={handleChange} />}

                {post.imgs.length > 0 && <div className="imgs-container">
                    {post.imgs.map(img => {
                        return (
                            <img key={Math.random(22000000)} src={img} alt="" />
                        )
                    })}
                </div>}
            </div>

            <footer>
                <div className='comments-like-container'>

                    <span className={likeClass} onClick={onUserLike}>{post.postLikes.length >= 1 ? post.postLikes.length : 0} likes</span>
                    <span onClick={() => setIsComment(!isComment)}>  {post.postComments.length >= 1 ? post.postComments.length : 0} comments</span>
                </div>


            </footer>
            {isComment && <div >
                <Comments onComment={onComment} post={post} user={user} />
            </div>
            }

        </div>
    )
}




