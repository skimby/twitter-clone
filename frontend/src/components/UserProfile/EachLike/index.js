import { createLikeBackend, getLikesBackend, deleteLikeBackend } from '../../../store/like'
import { getOneTweetBackend } from '../../../store/tweet';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { useRef } from 'react'

function EachLike({ likeCount, tweetId }) {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState();
    const loggedUser = useSelector(state => state.session.user)
    const myLike = useRef()

    const tweet = useSelector(state => state.tweets.currentTweet)
    const likes = tweet?.likes

    useEffect(() => {
        dispatch(getOneTweetBackend(tweetId))
    }, [dispatch, tweetId])

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
                    <i onClick={handleUnlike} className="fa-solid fa-heart pink-icon"></i>

                    <p className="pink-p">{likeCount}</p>

                </>
            )}

            {!liked && (
                <>
                    <i onClick={handleLike} className="fa-regular fa-heart gray-icon"></i>

                    <p className="gray-p">{likeCount}</p>

                </>
            )}

        </>
    )
}
export default EachLike;
