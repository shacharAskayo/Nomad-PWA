import React, { useContext, useState } from 'react'
import { withRouter } from 'react-router';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined'; import MessageOutlinedIcon from '@material-ui/icons/MessageOutlined';

import MobileMenuExtend from './MobileMenuExtend';

function LeftMenu({ user, history, isMenuOpen}) {


  return (
    <div className={window.innerWidth > 700 ? 'left-menu desktop' : `left-menu mobile ${isMenuOpen ? 'open' : 'close'}`}>
      <ul>
        <li onClick={() => history.push(`/profile/${user._id}`)}><img className='profile-img' src={user.profileImg} alt="" /><span>{user.firstName} {user.lastName}</span></li>
        <li ><PeopleAltOutlinedIcon /> <span >friends</span></li>
        <li><SupervisedUserCircleOutlinedIcon /> <span>groups</span></li>
        <li><MessageOutlinedIcon /> <span>Messanger</span></li>

      </ul>
      {window.innerWidth < 700 && <MobileMenuExtend/>}
    </div>
  )
}


export default withRouter(LeftMenu);
