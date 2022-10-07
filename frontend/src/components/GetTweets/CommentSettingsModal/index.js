import React, { useEffect, useState } from "react";
import { SmallModal } from "../../../context/Modal";
import CommentSettings from "./CommentSettings";
import { useDispatch, useSelector } from "react-redux"


function CommentSettingsModal({ comment }) {
    const [showModal, setShowModalSettings] = useState(false);
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
                    <i onClick={() => setShowModalSettings(true)} className="fa-solid fa-ellipsis"></i>
                    {showModal && (
                        <SmallModal onClose={() => setShowModalSettings(false)}>
                            <CommentSettings comment={comment} setShowModalSettings={setShowModalSettings} />
                        </SmallModal>
                    )}
                </>
            )}
        </>
    );
}

export default CommentSettingsModal;
