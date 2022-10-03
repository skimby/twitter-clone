import React, { useState } from "react";
import { Modal } from "../../context/Modal"
import CreateComment from "./CreateComment";

function CreateCommentModal({ commentCount, tweet }) {
    const [showModalComment, setShowModalComment] = useState();

    return (
        <>
            <i onClick={() => setShowModalComment(true)} className="fa-regular fa-comment"></i>{commentCount}

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
