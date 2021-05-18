import { useState } from "react"
import {userService} from '../services/userService.js'
import { Link } from 'react-router-dom'


export function HeaderSearch({user}) {

    const [results, setResults] = useState([])
    const [searchTxt, setSearchTxt] = useState('')


    const handleSearch = async(ev) => {
        const {value} = ev.target
        setSearchTxt(value)
        if(value.length>0){
            const result = await userService.getUsers(value)
            setResults(result)
        }
        else setResults([])
    }

    return (

        <div className="search-container">
            <div className="input-holder">
                <input  className={results.length>0 ? 'open' : 'close'} value={searchTxt} onChange={handleSearch} type="text" placeholder="Search..." />
            </div>

            {results.length>0 &&
                <div className="results-container">
                    <ul>
                    {results.map(res=> <li  key={res._id}> <Link to={`/profile/${res._id}/${user._id}`}> {res.firstName} </Link> </li>)}
                </ul>
                </div>}
                
                
        </div>
    )
}