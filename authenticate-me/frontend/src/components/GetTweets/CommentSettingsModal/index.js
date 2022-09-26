import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import CommentSettings from "./CommentSettings";
import { useDispatch, useSelector } from "react-redux"


function CommentSettingsModal({ comment, tweetId }) {
    const [showModal, setShowModal] = useState(false);
    const [isUsersTweet, setIsUsersTweet] = useState();
    const loggedUser = useSelector(state => state.session)

    useEffect(() => {
        if (loggedUser?.user?.id == comment?.User?.id) {
            setIsUsersTweet(true)
        }
    })
    return (
        <>
            {isUsersTweet && (
                <>
                    <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <CommentSettings comment={comment} />
                        </Modal>
                    )}
                </>
            )}
        </>
    );
}

export default CommentSettingsModal;
