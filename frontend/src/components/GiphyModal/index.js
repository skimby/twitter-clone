import React, { useState } from "react";
import { GifModal } from "../../context/Modal";
import Giphy from "./Giphy";

function GiphyModal({ setGif }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            {/* <div onClick={() => setShowModal(true)} > */}
            <i className="fa-solid fa-gift blue-icon" onClick={() => setShowModal(true)} />
            {/* </div> */}
            {showModal && (
                <GifModal onClose={() => setShowModal(false)}>
                    <Giphy setGif={setGif} setShowModal={setShowModal} />
                </GifModal>
            )}
        </>
    );
}

export default GiphyModal;
