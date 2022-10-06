import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend } from '../../store/comment';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import '../CreateCommentInline/CreateCommentInline.css'

function CommentAddOns({ tweetId, setShowModalComment }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const refButton = useRef(null);
    const refContainer = useRef(null);

    const [style, setStyle] = useState({})
    const [comment, setComment] = useState('');
    const [completeComment, setCompleteComment] = useState(false)
    const [image, setImage] = useState(null);
    const [gif, setGif] = useState(null);
    const [inputClick, setInputClick] = useState(false);
    const [errors, setErrors] = useState(false);
    const [gifOrImg, setGifOrImg] = useState(false);

    const user = useSelector(state => state.session);


    // useEffect(() => {
    //     if (comment) {
    //         setStyle({ backgroundColor: "rgb(30, 155, 239)" });
    //     }
    // }, [comment]);


    //EMOJI STUFF
    let triggerButton;
    let rootElement;
    let picker2;

    useEffect(() => {
        triggerButton = refButton.current
        rootElement = refContainer.current;
    }, [inputClick, gifOrImg, comment, gif, image])

    // Create the picker
    useEffect(() => {
        if (triggerButton && rootElement) {
            picker2 = createPopup({
                animate: false,
                autoFocus: 'auto',
                rootElement
            }, {
                triggerElement: triggerButton,
                referenceElement: triggerButton,
                position: 'bottom-start'
            });

            picker2.addEventListener('emoji:select', event => {
                setComment(comment + event.emoji)
            });
        }
        console.log(comment, triggerButton, rootElement, picker2)
    }, [inputClick, gifOrImg, comment, gif, image])


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
                if (data) {
                    setErrors([]);
                    setErrors(data.errors)
                }
            });

        if (!errors) {
            setComment('')
            setImage(null)
            setGif(null)
            setShowModalComment(false)
            history.push(`/${user?.user?.username}/tweets/${tweetId}`)
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };


    const handleOpenEmoji2 = () => {
        picker2.open()
    }

    const focusInput = (e) => {
        setInputClick(true)
    }
    const removeGif = () => {
        setGif(false)
    }

    return (
        <div className="comment-inline-container">
            <div className="tweet-comment-container2">
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
                            <div className="display-img-gif">
                                <div className="remove-gif-box">
                                    <i className="fa-solid fa-circle-xmark" onClick={removeGif}></i>
                                </div>
                                <img src={gif} className='img-gif' width='200' />
                            </div>
                        )}



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

                            <div ref={refButton} className='inline' id='emoji-button3' onClick={handleOpenEmoji2}>
                                <i className="fa-regular fa-face-smile blue-icon"></i>
                            </div>

                            <div className='emoji-container3' id='inline' ref={refContainer} ></div>

                            {completeComment && (
                                <button className='btn-float-right' type=' submit'>Reply</button>
                            )}
                            {!completeComment && (
                                <button className="disabled-btn btn-float-right" >Reply</button>
                            )}
                        </div>


                    </form>
                    {errors && (
                        <ul className="validation-errors-comments">
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    )}
                </div>
            </div>
        </div >
    )
}

export default CommentAddOns;
