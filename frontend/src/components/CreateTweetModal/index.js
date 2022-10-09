import React, { useState } from "react";
import { CommentModal } from "../../context/Modal"
import CreateTweetForm from "./CreateTweetForm";

import './CreateTweetModal.css';


function CreateTweetModal({ tweetId, currentTweet, edit }) {
    const [showModalTweet, setShowModalTweet] = useState();


    return (
        <>
            {!edit && (
                <div className="tweet-modal-container">
                    <button onClick={() => setShowModalTweet(true)} className="nav-button">Tweet</button>
                    {showModalTweet && (
                        <CommentModal onClose={() => setShowModalTweet(false)}>
                            <CreateTweetForm setShowModalTweet={setShowModalTweet} tweetId={tweetId} />
                        </CommentModal>
                    )}
                </div>
            )}

            {edit && (
                <div >
                    <button onClick={() => setShowModalTweet(true)} className="black-btn">Edit Tweet</button>
                    {showModalTweet && (
                        <CommentModal onClose={() => setShowModalTweet(false)}>
                            <CreateTweetForm setShowModalTweet={setShowModalTweet} edit={edit} tweetId={tweetId} currentTweet={currentTweet} showModalTweet={showModalTweet} />
                        </CommentModal>
                    )}
                </div>
            )}

        </>
    );
}

export default CreateTweetModal;
