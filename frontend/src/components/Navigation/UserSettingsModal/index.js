import React, { useState } from "react";
import { SmallModal } from "../../../context/Modal";
import UserSettings from "./UserSettings";


function UserSettingsModal() {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
            {showModal && (
                <SmallModal onClose={() => setShowModal(false)}>
                    <UserSettings setShowModal={setShowModal} />
                </SmallModal>
            )}
        </>
    );
}

export default UserSettingsModal;
