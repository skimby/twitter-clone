import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend } from '../../store/comment';
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import TweetAddOns from "../TweetAddOns";
import '../GetTweets/GetTweets.css'

function CreateComment({ tweetId, setShowModalComment, tweet }) {
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

    console.log(tweet)



    return (
        <div>
            <div className="replying-to-comment">
                <div className="x-box" onClick={() => setShowModalComment(false)}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>

            <div className='tweet-container'>

                <div className='tweet-profile-img' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>

                    <img className='profile-img' src={tweet?.User?.profileImage} />

                    <div>
                        <div class="vl"></div>
                    </div>
                </div>


                <div className='tweet-user-header'>
                    <div className='username-name-box'>
                        <h5 className='name-username' onClick={() => { history.push(`/${tweet?.User?.username}/${tweet?.User?.id}`) }}>
                            {tweet?.User?.firstName}

                            <span className='thin-styling'> @{tweet?.User?.username} · {tweet?.updatedAt[1]} {tweet?.updatedAt[2]}</span></h5>
                    </div>

                    <div className='tweet-tweet-box'>
                        <p onClick={() => { history.push(`/${tweet?.User?.username}/tweets/${tweet.id}`) }}>
                            {tweet?.tweet}
                        </p>
                        <p>replying to @{tweet?.User?.username}</p>
                    </div>
                </div>




            </div>
            <div>
                <TweetAddOns tweetId={tweetId} setShowModalComment={setShowModalComment} />
            </div>


        </div>
    )
}

export default CreateComment;
