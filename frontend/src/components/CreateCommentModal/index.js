import React, { useState } from "react";
import { CommentModal } from "../../context/Modal"
import CreateComment from "./CreateComment";

function CreateCommentModal({ commentCount, tweet, singleTweet, edit }) {
    const [showModalComment, setShowModalComment] = useState();


    return (
        <>
            {!edit && (
                <>
                    <i onClick={() => setShowModalComment(true)} className="fa-regular fa-comment gray-icon"></i>
                    {!singleTweet && (
                        <p className="gray-p">{commentCount}</p>
                    )}
                    {showModalComment && (
                        <CommentModal onClose={() => setShowModalComment(false)}>
                            <CreateComment setShowModalComment={setShowModalComment} tweetId={tweet?.id} tweet={tweet} edit={edit}
                            />

                        </CommentModal>
                    )}
                </>
            )}

            {edit && (
                <>
                    <button onClick={() => setShowModalComment(true)} className="black-btn">Edit Comment</button>

                    {showModalComment && (
                        <CommentModal onClose={() => setShowModalComment(false)}>
                            <CreateComment setShowModalComment={setShowModalComment} tweetId={tweet?.id} tweet={tweet} edit={edit}
                            />

                        </CommentModal>
                    )}
                </>
            )}
        </>
    );
}

export default CreateCommentModal;
