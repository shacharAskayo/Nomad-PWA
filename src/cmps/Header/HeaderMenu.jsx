import React, { useState } from 'react'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router';

 function HeaderMenu({ user, logout, history }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const dispatch = useDispatch()

    const onLogOut = async () => {
        await dispatch(logout())
         history.push('/login')
    }

    return (
        <div className='header-menu-container'>
            <span className='header-menu-button' onClick={() => setIsMenuOpen(!isMenuOpen)}> <ArrowDropDownOutlinedIcon /></span>

            {isMenuOpen && <div className="header-menu">
                <div className='header-menu-icons-container'>
                    <div className='profile-container' onClick={()=> history.push(`/profile/${user._id}`)}>
                        <img className="profile-img" src={user.profileImg} alt="" />
                        <span> {user.firstName} {user.lastName} </span>
                    </div>
                    <div className='line'></div>
                    <div className='header-menu-icon-circle'>
                        <div className="icon-and-name">
                            <div className="circle"><SettingsOutlinedIcon /></div>
                            <span> setting</span>
                        </div>
                        <ArrowForwardIosOutlinedIcon />
                    </div>
                    <div className='header-menu-icon-circle'>
                        <div className='icon-and-name'>
                            <div className="circle"> <ExitToAppIcon /> </div>
                            <span onClick={onLogOut}> log out</span>
                        </div>
                        <ArrowForwardIosOutlinedIcon />
                    </div>
                </div>
            </div>
            }



        </div>

    )
}


export default withRouter(HeaderMenu)