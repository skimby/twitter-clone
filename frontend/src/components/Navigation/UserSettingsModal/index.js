import React, { useState } from "react";
import { SmallModal } from "../../../context/Modal";
import UserSettings from "./UserSettings";


function UserSettingsModal({ mobile, sessionUser }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            {!mobile && (
                <>
                    <i onClick={() => setShowModal(true)} className="fa-solid fa-ellipsis"></i>
                    {showModal && (
                        <SmallModal onClose={() => setShowModal(false)}>
                            <UserSettings setShowModal={setShowModal} />
                        </SmallModal>
                    )}
                </>
            )}

            {mobile && (
                <>
                    <div className='profile-img-mobile' onClick={() => setShowModal(true)}>
                        <img className='profile-img' alt='user page profile' src={sessionUser?.user?.profileImage} />
                    </div>
                    {showModal && (
                        <SmallModal onClose={() => setShowModal(false)}>
                            <UserSettings setShowModal={setShowModal} />
                        </SmallModal>
                    )}
                </>
            )}
        </>
    );
}

export default UserSettingsModal;
