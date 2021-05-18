import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Comment } from "./Comment";


export function Comments({ post, user,...props }) {

const dispatch = useDispatch()

    const [comment, setComment] = useState({txt:''})


    const handleChange=(ev)=>{
        setComment({txt:ev.target.value})
    }


    useEffect(() => {
    }, [post])


    const onComment=async ()=>{
        await dispatch(props.onComment(user,post,{...comment}))
    }

    return (
        <div className= 'comments-input-container  '>
            <div className="add-comment-container">
                <img className="profile-img" src={user.profileImg} alt="" />
                <div className="post-comment">
                    {/* <textarea name="" id="" cols="30" rows="10"> */}
                    {/* </textarea> */}
                <input value={comment.txt} onChange={handleChange} type="text" placeholder="Add Comment..." />
                <button onClick={onComment}>post</button>
                </div>
            </div>

            <div className='comments-container  '>
                {post.postComments.map((comment, idx) => <Comment  user={user} comment={comment} key={idx} />)}
            </div>




        </div>
    )
}


