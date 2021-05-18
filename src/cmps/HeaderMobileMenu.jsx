import React, { useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import LeftMenu from './LeftMenu';


export default function HeaderMobileMenu({ user }) {


    const [isMenuOpen, setIsMenuOpen] = useState(false)


    return (
        <div className='header-mobile-menu-container'>
            <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
            <LeftMenu user={user} isMenuOpen={isMenuOpen} />
        </div>
    )
}
