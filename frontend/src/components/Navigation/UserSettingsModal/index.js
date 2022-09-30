import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import UserSettings from "./UserSettings";
import { useDispatch, useSelector } from "react-redux"


function UserSettingsModal() {
    const [showModal, setShowModal] = useState(false);
    const [isUsersTweet, setIsUsersTweet] = useState();

    useEffect(() => {
        // if (loggedUser?.user?.user?.id == tweet?.id) {
        //     setIsUsersTweet(true)
        // }
    })

    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserSettings />
                </Modal>
            )}
        </>
    );
}

export default UserSettingsModal;
