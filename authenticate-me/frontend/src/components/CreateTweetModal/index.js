import React, { useState } from "react";
import { Modal } from "../../context/Modal"
import CreateTweetForm from "./CreateTweetForm";
import './CreateTweetModal.css';


function CreateTweetModal({ tweetId, tweet }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <div className="tweet-modal-container">
                <button onClick={() => setShowModal(true)} className="nav-button">Tweet</button>
                {showModal && (
                    <Modal onClose={() => setShowModal(false)}>
                        <CreateTweetForm setShowModal={setShowModal} />
                    </Modal>
                )}
            </div>
        </>
    );
}

export default CreateTweetModal;
