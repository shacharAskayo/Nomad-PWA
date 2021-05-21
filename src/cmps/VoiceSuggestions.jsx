import React from 'react'

export default function VoiceSuggestions({transcript}) {

    
    return (
        <div className='microphone-sutggestion-container'>
            {window.innerWidth<700 &&
             <span className='voice-demo'>
             {transcript}
             </span>
             }
            <span> try to say </span>
            <span className="line1"></span>
            <span className="line2"></span>
            <span>"add new Post"</span>
            <span>"go to my profile"</span>
            <span>"go to ~ your friend nickname ~ profile"</span>
        </div>
    )
}
