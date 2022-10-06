import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createTweetBackend } from '../../store/tweet'
import { createPopup } from '@picmo/popup-picker';
import GiphyModal from "../GiphyModal";
import TweetAddOns from "../TweetAddOns";
import './CreateTweetModal.css'


function CreateTweetForm({ setShowModal, edit, tweetId }) {
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
                <TweetAddOns tweetId={tweetId} setShowModal={setShowModal} edit={edit} />
            </div>
        </div>
    )
}

export default CreateTweetForm;
