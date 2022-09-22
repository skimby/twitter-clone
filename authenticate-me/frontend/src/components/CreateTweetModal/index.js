import React, { useState } from "react";
import { Modal } from "../../context/Modal"
import CreateTweetForm from "./CreateTweetForm";
function CreateTweetModal({ tweetId, tweet }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <button onClick={() => setShowModal(true)} className="nav-button">Tweet</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateTweetForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default CreateTweetModal;
