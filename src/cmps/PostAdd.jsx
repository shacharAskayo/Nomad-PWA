
import { useEffect, useState } from 'react';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { cloudinaryService } from '../services/cloudinaryService';
import { feedService } from '../services/feedService';
import { userService } from '../services/userService';
// import {loading} from '../assets/gifs/loading.gif'
import { useTypewriter } from '../services/use-typewriter.js'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export function PostAdd({ user, addPost, addMoment }) {

    const dispatch = useDispatch()

    const [isLoading, setIsLoading] = useState(false)
    const [isPost, setIsPost] = useState(true)
    const [post, setPost] = useState({
        txt: '',
        imgs: []
    })

    const uploadImage = async (ev) => {
        const img = ev.target.files[0]
        setIsLoading(true)
        const uploadedImg = await cloudinaryService.uploadImg(img)
        var imgs = JSON.parse(JSON.stringify(post.imgs))
        imgs.push(uploadedImg.secure_url)
        setPost({ ...post, imgs })
        setIsLoading(false)
    }

    const handleType = (ev) => {
        setPost({ ...post, txt: ev.target.value })
    }
    const onPost = (ev) => {
        if (isPost) {
            ev.preventDefault()
            dispatch(addPost(user, post))
            setPost({ txt: '', imgs: [] })
        } else {
            dispatch(addMoment(user, post.imgs[post.imgs.length - 1]))
            setPost({ txt: '', imgs: [] })
            setIsPost(true)
        }
    }
    return (
        <div className="post-add-container">

            <div className="user-details">

                <Link to={`/profile/${user._id}/${user._id}`}><img className="profile-img" src={user?.profileImg} alt="" /></Link>
                <span>{user?.firstName}</span>
                <span>{user?.lastName}</span>
                {isPost ? <button onClick={() => setIsPost(false)}> moment</button> : <button onClick={() => setIsPost(true)}>post</button>}
            </div>
            {isPost &&
                <div className="input-and-imgs">
                    <form action="">
                        <input className="add-input" placeholder="Whats Up?" type="text" onChange={handleType} value={post.txt} />
                        <button onClick={onPost} > Post </button>
                        <label htmlFor="img-icon">
                            <PhotoLibraryIcon />
                            <input className="img-input" type="file" id="img-icon" onChange={uploadImage} />
                        </label>
                    </form>
                    <div className="imgs-preview-container">
                        {post.imgs.length > 0 && post.imgs.map(img => <img src={img} key={Math.random(1000000)} alt="" />)}
                        {isLoading && <img className="gif" src="https://res.cloudinary.com/askayo/image/upload/v1618156227/lw3u1tatr665b0jlc9o7.gif" />}
                    </div>
                </div>}
            {!isPost &&
                <div className="moment-add-container" >
                    <label htmlFor="img-icon">
                        <PhotoLibraryIcon />
                        <input className="img-input" type="file" id="img-icon" onChange={uploadImage} />
                    </label>
                    <div className="moment-add-preview">
                        <img src={post.imgs[post.imgs.length - 1]} alt="" />
                        <button onClick={onPost}>post</button>
                    </div>
                </div>
            }

        </div>
    )
}