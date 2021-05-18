import { useState } from "react"

export function Menu({user,onMenuClicked}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="menu-container">
            <span className="menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>...</span>

            {
                isMenuOpen && <div className='menu' >

                    <ul>
                        <li onClick={()=>onMenuClicked('delete')}>delete</li>
                        <li onClick={()=>onMenuClicked('edit')}>edit</li>
                    </ul>
                </div>
            }
        </div >
    )
}