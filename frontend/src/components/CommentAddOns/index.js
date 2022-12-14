import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend, editCommentBackend } from '../../store/comment';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import giphyTag from '../../images/powered-by-giphy.png'
import '../CreateCommentInline/CreateCommentInline.css'

function CommentAddOns({ tweetId, setShowModalComment, currentComment, setShowModalSettings, edit, newComment }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const refButton = useRef(null);
    const refContainer = useRef(null);

    const [comment, setComment] = useState(currentComment?.comment || '');
    const [completeComment, setCompleteComment] = useState(false)
    const [image, setImage] = useState(null);
    const [gif, setGif] = useState(null);
    const [inputClick, setInputClick] = useState(false);
    const [errors, setErrors] = useState(null);
    const [gifOrImg, setGifOrImg] = useState(false);
    const [previewImageComment, setPreviewImageComment] = useState(null);

    const user = useSelector(state => state.session);
    let file;

    //EMOJI STUFF
    let triggerButton = useRef();
    let rootElement = useRef();
    let picker2 = useRef();

    useEffect(() => {
        triggerButton.current = refButton.current
        rootElement.current = refContainer.current;
    }, [inputClick, gifOrImg, comment, gif, image, currentComment, edit])

    // Create the picker
    useEffect(() => {
        if (triggerButton && rootElement) {
            picker2.current = createPopup({
                animate: false,
                autoFocus: 'auto',
                rootElement: rootElement.current
            }, {
                triggerElement: triggerButton.current,
                referenceElement: triggerButton.current,
                position: 'bottom-start'
            });

            picker2.current.addEventListener('emoji:select', event => {
                setComment(comment + event.emoji)
            });
        }
    }, [inputClick, gifOrImg, comment, gif, image, currentComment, edit])


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
    }, [gif, image, file]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (edit) {
            const commentInput = { comment: comment }
            const editedComent = await dispatch(editCommentBackend(currentComment.id, commentInput, tweetId))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                });

            if (editedComent) {
                setShowModalComment(false)
                setShowModalSettings(false)
            }

        } else {
            const commentInput = {
                comment,
                gif,
                image
            }

            const newComment = await dispatch(createCommentBackend(tweetId, commentInput))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) {
                        setErrors(data.errors)
                    }
                });
            if (newComment) {
                setComment('')
                setImage(null)
                setGif(null)
                setShowModalComment(false)
                history.push(`/${user?.user?.username}/tweets/${tweetId}`)
            }
        }

    }


    const updateFileComment = (e) => {
        file = e.target.files[0];

        if (file) {
            setImage(file);
            const uploadedImageURL = URL.createObjectURL(file)
            setPreviewImageComment(uploadedImageURL)
        }
    };


    const handleOpenEmoji2 = () => {
        picker2.current.open()
    }

    const focusInput = (e) => {
        setInputClick(true)
    }
    const removeGif = () => {
        setGif(false)
    }
    const removeImage = () => {
        setImage(false)
    }

    return (
        <div className="comment-inline-container" >
            <div className="tweet-comment-container2">
                <div className='profile-image-box'>
                    {user?.user?.profileImage && (
                        <img className='profile-img' alt='user profile' src={user?.user?.profileImage} />
                    )}
                </div>

                <div className='tweet-text-box'>


                    <form onSubmit={handleSubmit} className='form comment-form' >
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
                                    <img src={gif} className='img-gif' width='200' alt='comment attachment gif' />
                                </div>
                                <div className="div-bottom-padding">
                                    <img src={giphyTag} width='110px' alt='gif provided by GIPHY' />
                                </div>
                            </>
                        )}

                        {image && (
                            <div className="display-img-gif-comment" >
                                <div className="remove-gif-box">
                                    <i className="fa-solid fa-circle-xmark" onClick={removeImage}></i>
                                </div>
                                {/* <div className="cropped-attachment"> */}
                                <img src={previewImageComment} className='img-gif' width='200' alt='comment attachment' />
                                {/* </div> */}
                            </div>
                        )}


                        <div className="comment-icons-gif-img">

                            {newComment && (
                                <>

                                    {!gifOrImg && (
                                        <>
                                            <label className="upload-btn inline" htmlFor='inputTag2'>
                                                <i className="fa-regular fa-image blue-icon"></i>
                                                <input
                                                    name='commentImgUpload'
                                                    id='inputTag2'
                                                    type="file"
                                                    onChange={updateFileComment} />
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
                                </>
                            )}
                            {edit && (
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
