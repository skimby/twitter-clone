import { createLikeBackend, getLikesBackend, deleteLikeBackend } from '../../store/like'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { useRef } from 'react'

function Likes({ likeCount, tweet }) {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState();
    const likes = tweet?.likes
    const loggedUser = useSelector(state => state.session.user)
    const myLike = useRef()

    useEffect(() => {
        if (likes) {

            const tweetIsLiked = likes.find(like => like.userId === loggedUser?.id)

            myLike.current = tweetIsLiked;
            if (tweetIsLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }

    }, [dispatch, likes])


    const handleLike = () => {
        dispatch(createLikeBackend(parseInt(tweet?.id)))
        // dispatch(getLikesBackend(tweet?.id));

        setLiked(true)
    }

    const handleUnlike = () => {
        dispatch(deleteLikeBackend(parseInt(tweet?.id), parseInt(myLike?.current?.id)))
        dispatch(getLikesBackend(tweet?.id));
        setLiked(false)
    }

    return (
        <>
            {liked && (
                <>
                    <i onClick={handleUnlike} className="fa-solid fa-heart"></i>{likeCount}
                </>
            )}

            {!liked && (
                <>
                    <i onClick={handleLike} className="fa-regular fa-heart"></i>{likeCount}
                </>
            )}

        </>
    )
}
export default Likes;