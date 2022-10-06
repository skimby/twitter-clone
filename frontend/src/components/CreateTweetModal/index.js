import React, { useState } from "react";
import { CommentModal } from "../../context/Modal"
import CreateTweetForm from "./CreateTweetForm";
import './CreateTweetModal.css';


function CreateTweetModal({ tweetId, tweet }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <div className="tweet-modal-container">
                <button onClick={() => setShowModal(true)} className="nav-button">Tweet</button>
                {showModal && (
                    <CommentModal onClose={() => setShowModal(false)}>
                        <CreateTweetForm setShowModal={setShowModal} />
                    </CommentModal>
                )}
            </div>
        </>
    );
}

export default CreateTweetModal;
