export function Moment({ moment }) {
    return (
        <div className="moment-preview">
            <span className="profile-img"><img src={moment.createdBy.profileImg} alt="" /></span>
            <img src={moment.img} alt="" />
            <span className="nickName">{moment.createdBy.nickName}</span>
        </div>
    )
}