import React, { useState } from "react";
import { Modal } from "../../context/Modal"
import CreateComment from "./CreateComment";

function CreateCommentModal({ commentCount, tweet }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-regular fa-comment"></i>{commentCount}

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <CreateComment tweetId={tweet?.id}
                    />

                </Modal>
            )}
        </>
    );
}

export default CreateCommentModal;
