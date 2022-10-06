import React, { useState } from "react";
import { Modal } from "../../../context/Modal"
import EditTweetForm from "./EditTweetForm";

function EditFormModal({ tweetId, tweet }) {
    const [showModal, setShowModal] = useState();
    const [edit, setEdit] = useState(true);

    return (
        <>
            <button className='black-btn' onClick={() => setShowModal(true)}>Edit Tweet</button>


            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditTweetForm edit={edit} tweetId={tweetId} tweet={tweet} />
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;
