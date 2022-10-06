import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend } from '../../store/comment';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import giphyTag from '../../images/powered-by-giphy.png'
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
    const [errors, setErrors] = useState(false);
    const [completeComment, setCompleteComment] = useState(false);
    const [gifOrImg, setGifOrImg] = useState(false);

    const user = useSelector(state => state.session);



    //EMOJI STUFF
    let triggerButton;
    let rootElement;
    let picker4;

    useEffect(() => {
        triggerButton = refButton.current
        rootElement = refContainer.current;
    }, [inputClick, gifOrImg, gif, image, comment])

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
    }, [inputClick, gifOrImg, gif, image, comment])

    useEffect(() => {
        if (comment) {
            setCompleteComment(true)
        } else {
            setCompleteComment(false)
        }
    }, [comment])


    useEffect(() => {
        if (gif || image) {
            setGifOrImg(true)
        } else {
            setGifOrImg(false)
        }
    }, [gif, image]);



    const handleSubmit = async (e) => {
        e.preventDefault();


        const commentInput = {
            comment,
            gif,
            image
        }

        const newComment = await dispatch(createCommentBackend(tweetId, commentInput))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors([]);
                    setErrors(data.errors)
                    console.log(data)
                }
            });
        if (!errors) {
            setComment('')
            setImage(null)
            setGif(null)
        }
        // console.log(errors)

        // history.push(`/${user?.user?.username}/tweets/${tweetId}`)
        // history.go()
    }

    // console.log(image.name)
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
    const removeGif = () => {
        setGif(false)
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


                        {gif && (
                            <>
                                <div className="display-img-gif">
                                    <div className="remove-gif-box">
                                        <i className="fa-solid fa-circle-xmark" onClick={removeGif}></i>
                                    </div>
                                    <img src={gif} className='img-gif' width='200' />
                                </div>
                                <div className="div-bottom-padding">
                                    <img src={giphyTag} width='110px' />
                                </div>
                            </>
                        )}


                        {inputClick && (
                            <>
                                <div className="comment-icons-gif-img">
                                    {!gifOrImg && (
                                        <>
                                            <label className="upload-btn inline" htmlFor='inputTag'>
                                                <i className="fa-regular fa-image blue-icon"></i>
                                                <input id='inputTag' type="file" onChange={updateFile} />
                                            </label>

                                            <div className="inline">
                                                <GiphyModal setGif={setGif} />
                                            </div>
                                        </>
                                    )}

                                    {gifOrImg && (
                                        <>
                                            <div className="inline">
                                                <i className="fa-regular fa-image disabled-blue-icon"></i>
                                            </div>
                                            <div className="inline">
                                                <i className="fa-solid fa-gift disabled-blue-icon" />
                                            </div>
                                        </>
                                    )}

                                    <div ref={refButton} className='inline' id='emoji-button3' onClick={handleOpenEmoji4}>
                                        <i className="fa-regular fa-face-smile blue-icon"></i>
                                    </div>

                                    <div className='emoji-container3' id='inline' ref={refContainer} ></div>

                                    {completeComment && (
                                        <button className='btn-float-right' type=' submit'>Tweet</button>
                                    )}
                                    {!completeComment && (
                                        <button className="disabled-btn btn-float-right">Tweet</button>
                                    )}
                                </div>
                            </>
                        )}
                    </form>

                    {errors && (
                        <ul className="validation-errors-comments-inline">
                            {errors.map((error, idx) => (
                                <li key={idx}>{error}</li>
                            ))}
                        </ul>

                    )}
                </div>
            </div>
        </div >
    )
}

export default CreateCommentInline;
