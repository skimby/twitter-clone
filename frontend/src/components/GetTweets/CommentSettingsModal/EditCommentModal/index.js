import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import EditComment from "./EditComment";

function EditCommentModal({ comment, commentId }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <p onClick={() => setShowModal(true)} >Edit Comment</p>

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment commentId={commentId} comment={comment} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;
