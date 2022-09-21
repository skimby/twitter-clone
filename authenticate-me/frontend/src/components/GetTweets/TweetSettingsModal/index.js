import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import TweetSettings from "./TweetSettings";
import { useDispatch, useSelector } from "react-redux"


function TweetSettingsModal({ tweet }) {
    const [showModal, setShowModal] = useState(false);
    const [isUsersTweet, setIsUsersTweet] = useState();
    const loggedUser = useSelector(state => state.session)

    useEffect(() => {
        if (loggedUser.user.user.id == tweet.id) {
            setIsUsersTweet(true)
        }
    })
    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <TweetSettings tweet={tweet} />
                </Modal>
            )}
        </>
    );
}

export default TweetSettingsModal;
