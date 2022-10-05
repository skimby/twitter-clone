import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend } from '../../store/comment';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import './CreateCommentInline.css'


function CreateCommentInline({ tweetId, setShowModalComment }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef();

    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [gif, setGif] = useState(null);
    const [inputClick, setInputClick] = useState(false);

    const user = useSelector(state => state.session);


    //EMOJI STUFF
    const triggerButton = document.querySelector('#emoji-button-comment-modal');
    const rootElement = document.querySelector('.emoji-container-comment-modal');

    // Create the picker
    let picker2 = createPopup({
        // animate: false,
        // autoFocus: 'auto',
        rootElement
    }, {
        triggerElement: triggerButton,
        referenceElement: triggerButton,
        position: 'bottom-start'
    });

    picker2.addEventListener('emoji:select', event => {
        setComment(comment + event.emoji)
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentInput = {
            comment,
            gif,
            image
        }
        await dispatch(createCommentBackend(tweetId, commentInput))
            .catch(async (res) => {
                const data = await res.json();
                console.log(data)
                if (!data.errors) {
                    setShowModalComment(false)
                }
            });

        history.push(`/${user?.user?.username}/tweets/${tweetId}`)
        // history.go()
    }


    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleOpenEmoji = () => {
        picker2.open()
    }

    const test = (e) => {
        setInputClick(true)
    }
    return (
        <div className="comment-inline-container">
            <div className="tweet-comment-container">
                <div className='profile-image-box'>
                    {user?.user?.profileImage && (
                        <img className='profile-img' src={user?.user?.profileImage} />
                    )}
                </div>

                <div className='tweet-text-box'>
                    <form onSubmit={handleSubmit} className='form comment-form'>
                        <input
                            onClick={test}
                            ref={ref}
                            placeholder="Tweet your reply"
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}>
                        </input>

                        {inputClick && (
                            <>
                                <div className="comment-icons-gif-img">
                                    <label className="upload-btn" htmlFor='inputTag'>
                                        <i className="fa-regular fa-image blue-icon"></i>
                                        <input id='inputTag' type="file" onChange={updateFile} />
                                    </label>

                                    <div className='emoji-container-comment-modal inline'></div>

                                    <div className='inline' id='emoji-button-comment-modal' onClick={handleOpenEmoji}>
                                        <i className="fa-regular fa-face-smile blue-icon"></i>
                                    </div>

                                    <div className="inline">
                                        <GiphyModal setGif={setGif} />
                                    </div>

                                    <button type='submit' className="btn-float-right">Reply</button>

                                </div>
                            </>
                        )}
                    </form>

                </div>
            </div>
        </div>
    )
}

export default CreateCommentInline;
