import React, { useEffect, useState } from "react";
import { Modal } from "../../../context/Modal";
import Following from "./Following";
import { useDispatch, useSelector } from "react-redux"


function FollowingModal({ followingCount }) {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <p onClick={() => setShowModal(true)}>{followingCount} Following</p>


            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Following />
                </Modal>
            )}
        </>
    );
}

export default FollowingModal;
