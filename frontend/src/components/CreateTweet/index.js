import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { createTweetBackend } from '../../store/tweet';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from '../GiphyModal';
import './CreateTweet.css'
import TweetAddOns from '../TweetAddOns';

function CreateTweet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const refContainer = useRef(null)
    const refButton = useRef()
    const [tweet, setTweet] = useState('');
    const [gif, setGif] = useState(null);
    const [errors, setErrors] = useState();
    const [image, setImage] = useState(null);

    const user = useSelector(state => state.session);



    // const triggerButton = document.querySelector('#emoji-button');
    // const rootElement = document.querySelector('.emoji-container');
    const triggerButton = refButton.current;
    const rootElement = refContainer.current;
    // let picker;
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
