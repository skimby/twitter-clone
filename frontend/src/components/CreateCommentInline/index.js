import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend } from '../../store/comment';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import './CreateCommentInline.css'


function CreateCommentInline({ tweetId, setShowModalComment }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const refButton = useRef(null);
    const refContainer = useRef(null);

    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [gif, setGif] = useState(null);
    const [inputClick, setInputClick] = useState(false);
    const [errors, setErrors] = useState([]);
    const [completeComment, setCompleteComment] = useState(false);
    const [gifSet, setGifSet] = useState(false);
    const [imageSet, setImageSet] = useState(false);

    const user = useSelector(state => state.session);


    //EMOJI STUFF
    let triggerButton;
    let rootElement;
    let picker4;

    useEffect(() => {
        triggerButton = refButton.current
        rootElement = refContainer.current;
    }, [inputClick])

    // Create the picker
    useEffect(() => {
        if (triggerButton && rootElement) {
            picker4 = createPopup({
                animate: false,
                autoFocus: 'auto',
                rootElement
            }, {
                triggerElement: triggerButton,
                referenceElement: triggerButton,
                position: 'bottom-start'
            });

            picker4.addEventListener('emoji:select', event => {
                setComment(comment + event.emoji)
            });
        }
    }, [inputClick])

    useEffect(() => {
        if (comment) {
            setCompleteComment(true)
        } else {
            setCompleteComment(false)
        }
    }, [comment])

    console.log(gif)

    useEffect(() => {
        if (gif) {
            setGifSet(true)
        } else {
            setGifSet(false)
        }
    }, [gif]);

    useEffect(() => {
        if (image) {
            setImage(true)
        } else {
            setImageSet(false)
        }
    }, [image]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        const commentInput = {
            comment,
            gif,
            image
        }

        await dispatch(createCommentBackend(tweetId, commentInput))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors)
                    console.log(data)
                } else {
                    //   history.go()
                }
            });
        // console.log(errors)

        // history.push(`/${user?.user?.username}/tweets/${tweetId}`)
        // history.go()
    }


    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    const handleOpenEmoji4 = () => {
        picker4.open()
    }

    const focusInput = (e) => {
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
                            onClick={focusInput}
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

                                    <div className='emoji-container3' id='inline' ref={refContainer} ></div>

                                    <div ref={refButton} className='inline' id='emoji-button3' onClick={handleOpenEmoji4}>
                                        <i className="fa-regular fa-face-smile blue-icon"></i>
                                    </div>


                                    {gifSet && (
                                        <div className="inline">
                                            <i className="fa-solid fa-gift disabled-blue-icon" />
                                        </div>
                                    )}
                                    {!gifSet && (
                                        <div className="inline">
                                            <GiphyModal setGif={setGif} />

                                        </div>
                                    )}

                                    {completeComment && (
                                        <button type='submit'>Tweet</button>
                                    )}
                                    {!completeComment && (
                                        <button type='submit' className="disabled-btn">Tweet</button>
                                    )}

                                </div>
                            </>
                        )}
                    </form>
                    {errors && (
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>

                    )}
                </div>
            </div>
        </div>
    )
}

export default CreateCommentInline;
