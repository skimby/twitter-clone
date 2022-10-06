import React, { useState } from "react";
import { CommentModal } from "../../context/Modal"
import CreateTweetForm from "./CreateTweetForm";

import './CreateTweetModal.css';


function CreateTweetModal({ tweetId, tweet, edit }) {
    const [showModal, setShowModal] = useState();

    console.log('1', tweetId)
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
                            <CreateTweetForm setShowModal={setShowModal} edit={edit} tweetId={tweetId} />
                        </CommentModal>
                    )}
                </div>
            )}

        </>
    );
}

export default CreateTweetModal;
