import React, { useState } from "react";
import { Modal } from "../../../../context/Modal"
import DeleteComment from "./DeleteComment";

function DeleteCommentModal({ comment }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <p onClick={() => setShowModal(true)} >Delete Comment</p>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteComment commentId={comment?.id} tweetId={comment?.tweetId} />
                </Modal>
            )}
        </>
    );
}

export default DeleteCommentModal;
