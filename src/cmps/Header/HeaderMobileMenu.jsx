import React, { useEffect, useState } from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import LeftMenu from '../LeftHomeMenu';
import { HeaderMenu } from './HeaderMenu';


export default function HeaderMobileMenu({ user }) {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        if (isMenuOpen) window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [isMenuOpen])

    const onScroll = (ev) => setIsMenuOpen(false)

    return (
        <div className='header-mobile-menu-container' >
            <MenuIcon onClick={() => setIsMenuOpen(!isMenuOpen)} />
            {user && <LeftMenu user={user} isMenuOpen={isMenuOpen} />}
        </div>
    )
}
