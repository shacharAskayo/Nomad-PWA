import React, { useState } from 'react'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined';
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined';

export default function MobileMenuExtend() {

    const [isExtandOpen, setIsExtandOpen] = useState(false)

    return (
        <div className='extand-menu-container'>

            <span className="extand-button" onClick={()=>setIsExtandOpen(!isExtandOpen)}> {isExtandOpen ? <ArrowDropUpOutlinedIcon/>: <ArrowDropDownOutlinedIcon />}</span>
            {/* {isExtandOpen && */}
                <ul className={isExtandOpen ? 'extand-open' : 'extand-close'}>
                    <li><SettingsOutlinedIcon /> <span>setting</span></li>
                    <li><ExitToAppIcon /> <span>log out</span></li>
                </ul>
            {/* } */}
        </div>
    )
}
