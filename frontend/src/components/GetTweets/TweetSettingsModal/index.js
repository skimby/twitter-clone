import React, { useEffect, useState } from "react";
import { SmallModal } from "../../../context/Modal";
import TweetSettings from "./TweetSettings";
import { useDispatch, useSelector } from "react-redux"


function TweetSettingsModal({ tweet }) {
    const [showModal, setShowModal] = useState(false);
    const [isUsersTweet, setIsUsersTweet] = useState();
    const loggedUser = useSelector(state => state.session)

    useEffect(() => {
        if (loggedUser?.user?.id == tweet?.User?.id) {
            setIsUsersTweet(true)
        }
    })
    return (
        <>
            {isUsersTweet && (
                <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>

            )}
            {showModal && (
                <SmallModal onClose={() => setShowModal(false)}>
                    <TweetSettings setShowModal={setShowModal} tweet={tweet} />
                </SmallModal>
            )}
        </>
    );
}

export default TweetSettingsModal;
