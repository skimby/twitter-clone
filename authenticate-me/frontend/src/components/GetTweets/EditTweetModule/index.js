import React, { useState } from "react";
import { Modal } from "../../../context/Modal"
import EditTweetForm from "./EditTweetForm";

function EditFormModal({ tweetId, tweet }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditTweetForm tweetId={tweetId} tweet={tweet} />
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;
