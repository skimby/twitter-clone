import React, { useState } from "react";
import { SmallModal } from "../../../context/Modal"
import DeleteTweetForm from "./DeleteTweetForm";


function DeleteTweetModal({ tweetId }) {
    const [showModalDelete, setShowModalDelete] = useState();

    return (
        <>
            <button className='outline-btn' onClick={() => setShowModalDelete(true)} >Delete Tweet</button>

            {showModalDelete && (
                <SmallModal onClose={() => setShowModalDelete(false)}>
                    <DeleteTweetForm tweetId={tweetId} setShowModalDelete={setShowModalDelete} />
                </SmallModal>
            )}
        </>
    );
}

export default DeleteTweetModal;
