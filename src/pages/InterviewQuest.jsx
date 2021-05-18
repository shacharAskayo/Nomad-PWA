import axios from 'axios'
import React, { useEffect, useState } from 'react'

const api = 'https://randomuser.me/api'

export default function InterviewQuest() {

    const [counter, setCounter] = useState(0)
    const [apiResult, setApiResult] = useState(null)
    const [randomUsers, setRandomUsers] = useState([])

    useEffect(async () => {
        try {
            const { data } = await axios.get(api)
            setApiResult(data.results[0])
        } catch (err) {
            console.log('arr fetch api', err);
        }
    }, [])

    const addUser = async () => {
        try{
            const { data } = await axios.get(api)
            const user = data.results[0]
            setRandomUsers([...randomUsers,user])
        } catch(err){
            console.log(err)
        }
    }



    if (!apiResult) return <h2>loading</h2>
    return (
        <div>
            <span>
                {counter}
                <button onClick={() => setCounter(counter + 1)}> increse counter</button>
            </span>

            <div className={'json'}>
                <ul>
                    {/* <li>
                        <pre>{JSON.stringify(apiResult, null, 2)}</pre>
                    </li> */}
                </ul>
            </div>
            {/* <div className='name-photo'>
                <span>
                    {apiResult.name.title}
                    {apiResult.name.first}
                    {apiResult.name.last}
                </span>
            </div> */}
            {/* <img src="https://randomuser.me/api/portraits/women/1.jpg" alt =""/> */}
            <button onClick={addUser}>add user</button>
            {randomUsers.map(user => {
                return (
                    <span key={Math.random(123817315298)}>
                        {user.name.title}
                         {user.name.first}
                         {user.name.last}
                         <br/>
                    </span>
                )
            })}
        </div>
    )
}
