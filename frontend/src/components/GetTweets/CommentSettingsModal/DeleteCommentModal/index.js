import React, { useState } from "react";
import { SmallModal } from "../../../../context/Modal"
import DeleteComment from "./DeleteComment";

function DeleteCommentModal({ comment }) {
    const [showModal, setShowModal] = useState();

    return (
        <>
            <button className='outline-btn' onClick={() => setShowModal(true)} >Delete Comment</button>


            {showModal && (
                <SmallModal onClose={() => setShowModal(false)}>
                    <DeleteComment commentId={comment?.id} tweetId={comment?.tweetId} setShowModal={setShowModal} />
                </SmallModal>
            )}
        </>
    );
}

export default DeleteCommentModal;
