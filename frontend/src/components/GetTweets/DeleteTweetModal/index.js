import React, { useState } from "react";
import { Modal } from "../../../context/Modal"
import DeleteTweetForm from "./DeleteTweetForm";


function DeleteTweetModal({ tweetId }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <p onClick={() => setShowModal(true)} >Delete Tweet</p>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTweetForm tweetId={tweetId} />
                </Modal>
            )}
        </>
    );
}

export default DeleteTweetModal;
