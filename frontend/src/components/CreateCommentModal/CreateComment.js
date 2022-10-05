import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend } from '../../store/comment';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";

function CreateComment({ tweetId, setShowModalComment }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const refButton = useRef(null);
    const refContainer = useRef(null);

    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [gif, setGif] = useState(null);

    const user = useSelector(state => state.session);

    let triggerButton;
    let rootElement;
    let picker3;

    //EMOJI STUFF
    useEffect(() => {
        triggerButton = refButton.current;
        rootElement = refContainer.current;
    }, [])

    useEffect(() => {
        if (triggerButton && rootElement) {
            // Create the picker
            picker3 = createPopup({
                animate: false,
                autoFocus: 'auto',
                rootElement
            }, {
                triggerElement: triggerButton,
                referenceElement: triggerButton,
                position: 'bottom-start'
            });

            picker3.addEventListener('emoji:select', event => {
                setComment(comment + event.emoji)
            });
        }
    }, [])


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


    const submitButton = () => {
        return (
            <button type='submit'>Reply</button>
        )
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    const handleOpenEmoji2 = () => {
        picker3.open()
    }
    return (
        <div>
            <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user?.user?.profileImage} />
                )}

                <form onSubmit={handleSubmit} className='form'>
                    <input
                        placeholder="Tweet your reply"
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </input>


                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>

                    {/* where the popup emoji goes */}
                    <div className='emoji-container-comment-modal' ref={refContainer}></div>

                    <div id='emoji-button-comment-modal' ref={refButton} onClick={handleOpenEmoji2}>
                        <i className="fa-regular fa-face-smile blue-icon"></i>
                    </div>

                    <div>
                        <GiphyModal setGif={setGif} />
                    </div>
                    {submitButton()}
                </form>
            </div>
        </div>
    )
}

export default CreateComment;
