import { Link } from "react-router-dom";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleIcon from '@material-ui/icons/Sms';
export function Comment({ comment, user }) {
    return (
        <div className="user-comment">
            <Link to={`/profile/${comment.createdBy._id}/${user._id}`}><img className='profile-img' src={comment.createdBy.profileImg} alt="" /></Link>
            <div className="comment">
                <span className="nickname">{comment.createdBy.nickName}</span>
                <span> {comment.txt}</span>
                {comment.commentsLikes?.length > 0 && <ThumbUpIcon />}
                {comment.commentsLikes?.length === 0 && <ThumbUpIcon  className="gray-like"/>}
                {/* <ChatBubbleIcon className='comment'/> */}
            </div>
        </div>
    )
}