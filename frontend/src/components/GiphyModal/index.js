import React, { useState } from "react";
import { GifModal } from "../../context/Modal";
import Giphy from "./Giphy";

function GiphyModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-gift blue-icon"></i>
            {showModal && (
                <GifModal onClose={() => setShowModal(false)}>
                    <Giphy />
                </GifModal>
            )}
        </>
    );
}

export default GiphyModal;
