import React, { useState } from "react";
import { Modal } from "../../context/Modal"
import CreateComment from "./CreateComment";

function CreateCommentModal({ commentCount, tweet }) {
    const [showModalComment, setShowModalComment] = useState();

    return (
        <>
            <i onClick={() => setShowModalComment(true)} className="fa-regular fa-comment gray-icon"></i>
            <p className="gray-p">{commentCount}</p>

            {showModalComment && (
                <Modal onClose={() => setShowModalComment(false)}>
                    <CreateComment setShowModalComment={setShowModalComment} tweetId={tweet?.id}
                    />

                </Modal>
            )}
        </>
    );
}

export default CreateCommentModal;
