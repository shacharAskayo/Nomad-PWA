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
import DeleteList from './DeleteList'

const numberCommends = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const Microphone = ({ history, user }) => {

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }
    const dispatch = useDispatch()

    const [isListen, setIsListen] = useState(false)
    const [message, setMessage] = useState('')
    const [isAddingPost, setIsAddingPost] = useState(false)
    const [isDeletePost, setIsDeletePost] = useState(false)

    const handleVoiceActions = async (command, spokenPhrase, rate) => {
        if (command === 'go to profile') {
            const searchedProfile = spokenPhrase.slice(5, spokenPhrase.length - 7)
            const trimedSearchedProfile = searchedProfile.trim()
            if (trimedSearchedProfile === 'my') history.push(`/profile/${user._id}`)
            else {
                const foundedUser = await storageService.getByNickName(trimedSearchedProfile.toLowerCase())
                if (foundedUser) history.push(`/profile/${foundedUser._id}`)
            }
        }
        if (command === 'add new post' && !isAddingPost && !isDeletePost) {
            console.log('add new post command');
            setIsListen(false)
            setIsAddingPost(true)
            resetTranscript()
        }
        if (command === 'delete post' && !isAddingPost) {
            setIsListen(false)
            setIsDeletePost(true)
            resetTranscript()
        }
    }
    const handleNumbersRecognition = (command, spokenPhrase) => {
        const number = getNumber(command)

    }

    const commands = [
        {
            command: ['go to * profile', 'add new post', 'logout', 'delete post'],
            callback: handleVoiceActions,
            isFuzzyMatch: true,
            fuzzyMatchingThreshold: 0.2,
            bestMatchOnly: true
        },
        {
            command: numberCommends,
            callback: handleNumbersRecognition,
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
        setIsAddingPost(false)
        setIsDeletePost(false)
        resetTranscript()
        await SpeechRecognition.stopListening()
    }
    const clearPostListeners = () => {
        setIsAddingPost(false)
        setIsListen(false)
        resetTranscript()
    }
    const getNumber = (number) => {
        switch (number) {
            case 'one':
            case '1':
                return 1
            case 'two':
            case '2':
                return 2
            case 'three':
            case '3':
                return 3
            case 'four':
            case '4':
                return 4
            case 'five':
            case '5':
                return 5
            case 'six':
            case '6':
                return 6
            case 'seven':
            case '7':
                return 7
            case 'eight':
            case '8':
                return 8
            case 'nine':
            case '9':
                return 9
            case 'ten':
            case '10':
                return 10
            default:
                break;
        }
    }




    return (
        <div className='microphone-container'>

            {window.innerWidth > 700 && <span className='voice-demo scroll'>
                {transcript}
            </span>}
            {!isListen && <MicIcon onClick={onStartListening} />}
            {isListen && <MicNoneIcon onClick={onStopListening} />}
            {isAddingPost && <DummyPost voice={transcript} user={user} onPost={onAddNewPost} onDelete={onDeleteNewPost} />}
            {isDeletePost && <DeleteList user={user} />}
            {isListen && !isAddingPost && !isDeletePost&& <VoiceSuggestions transcript={transcript} />}
        </div>
    )
}
export default withRouter(Microphone)