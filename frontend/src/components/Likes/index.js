import { createLikeBackend, getLikesBackend, deleteLikeBackend } from '../../store/like'
import { getOneTweetBackend } from '../../store/tweet';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { useRef } from 'react'

function Likes({ likeCount, tweet, singleTweet, like, isOwnPage }) {
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


    const handleLike = (e) => {
        e.preventDefault();
        dispatch(createLikeBackend(parseInt(tweet?.id), isOwnPage))

        setLiked(true)
    }

    const handleUnlike = (e) => {
        e.preventDefault();
        dispatch(deleteLikeBackend(parseInt(tweet?.id), parseInt(myLike?.current?.id), isOwnPage))
        dispatch(getLikesBackend(tweet?.id));
        setLiked(false)
    }

    return (
        <>

            {liked && (
                <>
                    <i onClick={handleUnlike} className="fa-solid fa-heart pink-icon"></i>
                    {!singleTweet && (
                        <p className="pink-p">{likeCount}</p>
                    )}
                </>
            )}

            {!liked && (
                <>
                    <i onClick={handleLike} className="fa-regular fa-heart gray-icon"></i>
                    {!singleTweet && (
                        <p className="gray-p">{likeCount}</p>
                    )}
                </>
            )}
        </>
    )
}




export default Likes;
