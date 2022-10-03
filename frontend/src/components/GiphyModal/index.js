import React, { useState } from "react";
import { GifModal } from "../../context/Modal";
import Giphy from "./Giphy";

function GiphyModal({ setGif }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <i onClick={() => setShowModal(true)} className="fa-solid fa-gift blue-icon"></i>
            {showModal && (
                <GifModal onClose={() => setShowModal(false)}>
                    <Giphy setGif={setGif} setShowModal={setShowModal} />
                </GifModal>
            )}
        </>
    );
}

export default GiphyModal;
