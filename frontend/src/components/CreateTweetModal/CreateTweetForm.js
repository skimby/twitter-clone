import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createTweetBackend } from '../../store/tweet'
import { createPopup } from '@picmo/popup-picker';

import './CreateTweetModal.css'
function CreateTweetForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [tweet, setTweet] = useState('');
    const [gif, setGif] = useState();
    const [image, setImage] = useState();

    const user = useSelector(state => state.session);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const tweetInput = {
            tweet,
            gif,
            image
        }
        const newTweet = await dispatch(createTweetBackend(tweetInput))

        history.push(`/${user?.user?.username}/tweets/${newTweet?.id}`)
        history.go()
    }

    const submitButton = () => {
        return (
            <button type='submit'>Tweet</button>
        )
    }
    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    //EMOJI STUFF
    const triggerButton = document.querySelector('#emoji-button-modal');
    const rootElement = document.querySelector('.emoji-container-modal');

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
    const handleOpenEmoji = () => {
        picker.open()
    }
    return (
        <div>
            <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user?.user?.profileImage} />
                )}

                <form onSubmit={handleSubmit} className='form'>
                    <input
                        placeholder="What's happening?"
                        type='text'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}>
                    </input>
                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>

                    <div className='emoji-container-modal'></div>

                    <div id='emoji-button-modal' onClick={handleOpenEmoji}>
                        <i className="fa-regular fa-face-smile blue-icon"></i>
                    </div>

                    {submitButton()}
                </form>
            </div>
        </div>
    )
}

export default CreateTweetForm;
