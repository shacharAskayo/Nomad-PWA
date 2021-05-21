import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { storageService } from '../services/asyncStorageService'
import { addPost } from '../store/actions/feedAction'
import MicIcon from '@material-ui/icons/Mic';
import MicNoneIcon from '@material-ui/icons/MicNone';
import DummyPost from './DummyPost'
import VoiceSuggestions from './VoiceSuggestions'

const Microphone = ({ history, user }) => {

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }
    const dispatch = useDispatch()

    const [isListen, setIsListen] = useState(false)
    const [message, setMessage] = useState('')
    const [isAddingPost, setIsAddingPost] = useState(false)

    const handleVoiceActions = async (command, spokenPhrase, rate) => {
        console.log('handleVOiceACtion Function  - transcript', transcript);
        console.log('handleVOiceACtion Function  - command', command);
        if (command === 'go to profile') {
            const searchedProfile = spokenPhrase.slice(5, spokenPhrase.length - 7)
            const trimedSearchedProfile = searchedProfile.trim()
            if (trimedSearchedProfile === 'my') history.push(`/profile/${user._id}`)
            else {
                const foundedUser = await storageService.getByNickName(trimedSearchedProfile.toLowerCase())
                if (foundedUser) history.push(`/profile/${foundedUser._id}`)
            }
        }
        if (command === 'add new post' && !isAddingPost) {
            console.log('add new post command');
            setIsListen(false)
            setIsAddingPost(true)
            resetTranscript()
        }
    }

    const commands = [
        {
            command: ['go to * profile', 'add new post', 'logout'],
            callback: handleVoiceActions,
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2,
            bestMatchOnly: true
        },
    ]

    const { transcript, resetTranscript } = useSpeechRecognition({ commands })


    const onAddNewPost = () => {
        const copyText = JSON.parse(JSON.stringify(transcript))
        dispatch(addPost(user, { txt: copyText, imgs: [] }))
        clearPostListeners()
    }
    const onDeleteNewPost = () => {
        clearPostListeners()
    }
    const onStartListening = async () => {
        await SpeechRecognition.startListening()
        setIsListen(true)
    }
    const onStopListening = async () => {
        setIsListen(false)
        resetTranscript()
        await SpeechRecognition.stopListening()
    }

    const clearPostListeners = () => {
        setIsAddingPost(false)
        setIsListen(false)
        resetTranscript()
    }




    return (
        <div className='microphone-container'>
            
            {window.innerWidth>700 &&<span className='voice-demo'>
                {transcript}
            </span>}
            {!isListen && <MicIcon onClick={onStartListening} />}
            {isListen && <MicNoneIcon onClick={onStopListening} />}
            {/* <button onClick={resetTranscript}>Reset</button> */}
            {isAddingPost && <DummyPost voice={transcript} user={user} onPost={onAddNewPost} onDelete={onDeleteNewPost} />}

            {isListen && !isAddingPost && <VoiceSuggestions transcript={transcript} />}
        </div>
    )
}
export default withRouter(Microphone)