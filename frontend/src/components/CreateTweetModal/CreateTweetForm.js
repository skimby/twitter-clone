import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createTweetBackend } from '../../store/tweet'
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import TweetAddOns from "../TweetAddOns";
import './CreateTweetModal.css'


function CreateTweetForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const refButton = useRef();
    const refContainer = useRef();


    const [tweet, setTweet] = useState('');
    const [gif, setGif] = useState(null);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState()
    const [completeTweet, setCompleteTweet] = useState(false);
    const [gifSet, setGifSet] = useState(false);
    const [imageSet, setImageSet] = useState(false);

    const user = useSelector(state => state.session);

    console.log(gif)

    const handleSubmitTweet = async (e) => {
        e.preventDefault();

        setErrors([])
        const tweetInput = {
            tweet,
            gif,
            image
        }
        const newTweet = await dispatch(createTweetBackend(tweetInput))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    const newErrors = data.errors;
                    setErrors(newErrors);
                    console.log(errors)
                }
            });

        history.push(`/${user?.user?.username}/tweets/${newTweet?.id}`)
        // history.go()
    }


    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    useEffect(() => {
        if (tweet) {
            setCompleteTweet(true)
        } else {
            setCompleteTweet(false)
        }
    }, [tweet, gif, image])


    useEffect(() => {
        if (gif) {
            setGifSet(true)
        } else {
            setGifSet(false)
        }
    }, [gif]);

    useEffect(() => {
        if (image) {
            setImageSet(true)
        } else {
            setImageSet(false)
        }
    }, [image]);


    return (
        <div>
            <div className="replying-to-comment">
                <div className="x-box" onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>

            <div>
                <TweetAddOns setShowModal={setShowModal} />
            </div>
            {/* <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user?.user?.profileImage} />
                )}

                <form onSubmit={handleSubmitTweet} className='form'>
                    <input
                        placeholder="What's happening?"
                        type='text'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}>
                    </input>
                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>

                    <div className='emoji-container2'
                        ref={refContainer}
                    ></div>

                    <div id='emoji-button2' ref={refButton} onClick={handleOpenEmoji}>
                        <i className="fa-regular fa-face-smile blue-icon"></i>
                    </div>

                    {!gifSet && (
                        <div>
                            <GiphyModal setGif={setGif} />
                        </div>
                    )}
                    {gifSet && (
                        <div>
                            <i className="fa-solid fa-gift disabled-blue-icon" />
                        </div>
                    )}




                    {errors && (
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul>
                    )}

                    {completeTweet && (
                        <button type='submit'>Tweet</button>
                    )}
                    {!completeTweet && (
                        <button type='submit' className="disabled-btn">Tweet</button>
                    )}

                </form>

            </div> */}
        </div>
    )
}

export default CreateTweetForm;
