import { createLikeBackend } from '../../store/like'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';

function Likes({ likeCount, tweet }) {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState();
    const likes = tweet?.likes
    const loggedUser = useSelector(state => state.session.user)
    console.log(loggedUser?.id, likes)

    useEffect(() => {
        if (likes) {
            const tweetIsLiked = likes.find(like => like.userId === loggedUser?.id)

            if (tweetIsLiked) {
                setLiked(true)
            } else {
                setLiked(false)
            }
        }
    }, [dispatch, likes])


    const handleLike = () => {
        dispatch(createLikeBackend(tweet?.id))
        setLiked(true)
    }

    return (
        <>
            {liked && (
                <>
                    <i onClick={handleLike} className="fa-solid fa-heart"></i>{likeCount}
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
