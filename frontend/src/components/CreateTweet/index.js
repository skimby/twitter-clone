import { useState, useRef } from 'react'
import { createPopup } from '@picmo/popup-picker';
import './CreateTweet.css'
import TweetAddOns from '../TweetAddOns';

function CreateTweet() {
    const refContainer = useRef(null)
    const refButton = useRef()
    const [tweet, setTweet] = useState('');

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
