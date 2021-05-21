import React from 'react'
import { Posts } from './Posts'

export default function DeleteList({user,post}) {
    return (
        <div className='delete-list scroll'>
            <h2> say the number of the post you want to delete</h2>
            <Posts posts={user.posts} />
            
        </div>
    )
}
