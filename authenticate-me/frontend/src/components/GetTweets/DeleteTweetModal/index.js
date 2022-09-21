import React, { useState } from "react";
import { Modal } from "../../../context/Modal"
import DeleteTweetForm from "./DeleteTweetForm";
function DeleteTweetModal({ tweetId }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <p onClick={() => setShowModal(true)} >Delete Tweet</p>
            {/* <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i> */}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteTweetForm tweetId={tweetId} />
                </Modal>
            )}
        </>
    );
}

export default DeleteTweetModal;
