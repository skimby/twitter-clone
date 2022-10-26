import { useState, useEffect } from "react";
import ModalTweetAddOns from "../ModalTweetsAddOns";

import './CreateTweetModal.css'


function CreateTweetForm({ showModalTweet, setShowModalTweet, edit, tweetId, currentTweet }) {
    const [tweet, setTweet] = useState('');
    const [gif, setGif] = useState(null);
    const [image, setImage] = useState(null);
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
                <div className="x-box" onClick={() => setShowModalTweet(false)}>
                    <i className="fa-solid fa-x"></i>
                </div>
            </div>

            <div>
                <ModalTweetAddOns tweetId={tweetId} setShowModalTweet={setShowModalTweet} edit={edit} currentTweet={currentTweet} showModalTweet={showModalTweet} />
            </div>
        </div>
    )
}

export default CreateTweetForm;
