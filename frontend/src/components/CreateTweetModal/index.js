import React, { useState } from "react";
import { CommentModal } from "../../context/Modal"
import CreateTweetForm from "./CreateTweetForm";

import './CreateTweetModal.css';


function CreateTweetModal({ tweetId, currentTweet, edit }) {
    const [showModal, setShowModal] = useState();


    return (
        <>
            {!edit && (
                <div className="tweet-modal-container">
                    <button onClick={() => setShowModal(true)} className="nav-button">Tweet</button>
                    {showModal && (
                        <CommentModal onClose={() => setShowModal(false)}>
                            <CreateTweetForm setShowModal={setShowModal} tweetId={tweetId} />
                        </CommentModal>
                    )}
                </div>
            )}

            {edit && (
                <div >
                    <button onClick={() => setShowModal(true)} className="black-btn">Edit Tweet</button>
                    {showModal && (
                        <CommentModal onClose={() => setShowModal(false)}>
                            <CreateTweetForm setShowModal={setShowModal} edit={edit} tweetId={tweetId} currentTweet={currentTweet} />
                        </CommentModal>
                    )}
                </div>
            )}

        </>
    );
}

export default CreateTweetModal;
