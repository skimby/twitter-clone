import { useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { createPopup } from '@picmo/popup-picker';
import './CreateTweet.css'
import TweetAddOns from '../TweetAddOns';

function CreateTweet() {
    const dispatch = useDispatch();
    const refContainer = useRef(null)
    const refButton = useRef()
    const [tweet, setTweet] = useState('');

    const user = useSelector(state => state.session);


    const triggerButton = refButton.current;
    const rootElement = refContainer.current;

    // Create the picker
    let picker = createPopup({
        animate: false,
        autoFocus: 'auto',
        rootElement
    }, {
        triggerElement: triggerButton,
        referenceElement: triggerButton,
        position: 'bottom-start'
    });

    picker.addEventListener('emoji:select', event => {
        setTweet(tweet + event.emoji)
    });


    return (
        <div>
            <TweetAddOns />
        </div>
    )


}

export default CreateTweet;
