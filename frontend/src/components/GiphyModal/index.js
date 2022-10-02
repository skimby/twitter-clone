import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import Giphy from "./Giphy";

function GiphyModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-gift blue-icon"></i>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <Giphy />
                </Modal>
            )}
        </>
    );
}

export default GiphyModal;
