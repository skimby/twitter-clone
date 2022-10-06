import React, { useEffect, useState } from "react";
import { SmallModal } from "../../../context/Modal";
import CommentSettings from "./CommentSettings";
import { useDispatch, useSelector } from "react-redux"


function CommentSettingsModal({ comment }) {
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
                        <SmallModal onClose={() => setShowModal(false)}>
                            <CommentSettings comment={comment} setShowModal={setShowModal} />
                        </SmallModal>
                    )}
                </>
            )}
        </>
    );
}

export default CommentSettingsModal;
