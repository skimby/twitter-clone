import React, { useState } from "react";
import { CommentModal } from "../../context/Modal"
import CreateTweetForm from "./CreateTweetForm";

import './CreateTweetModal.css';


function CreateTweetModalMobile({ tweetId, currentTweet, edit }) {
    const [showModalTweet, setShowModalTweet] = useState();


    return (
        <>
            <div className="tweet-modal-container-mobile">

                <button onClick={() => setShowModalTweet(true)} className="nav-button-mobile pointer">
                    <i className="fa-solid fa-feather-pointed larger-icon"></i>
                </button>
                {showModalTweet && (
                    <CommentModal onClose={() => setShowModalTweet(false)}>
                        <CreateTweetForm setShowModalTweet={setShowModalTweet} tweetId={tweetId} />
                    </CommentModal>
                )}
            </div>



        </>
    );
}

export default CreateTweetModalMobile;
