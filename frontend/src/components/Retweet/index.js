import {
    getRetweetBackend, createRetweetBackend
} from '../../store/retweet'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { useRef } from 'react'
import './Retweet.css'

function Retweets({ retweetCount, tweet, singleTweet }) {
    const dispatch = useDispatch();
    const [retweeted, setRetweeted] = useState();
    const retweets = tweet?.retweets
    const loggedUser = useSelector(state => state.session.user)
    // const myLike = useRef()

    useEffect(() => {
        if (retweets) {
            const tweetIsRetweeted = retweets.find(retweet => retweet.userId === loggedUser?.id)

            // myLike.current = tweetIsLiked;

            if (tweetIsRetweeted) {
                setRetweeted(true)
            } else {
                setRetweeted(false)
            }
        }

    }, [dispatch, retweets])


    const handleRetweet = () => {
        dispatch(createRetweetBackend(parseInt(tweet?.id)))

        setRetweeted(true)
    }

    const handleUnretweet = () => {
        // dispatch(deleteLikeBackend(parseInt(tweet?.id), parseInt(myLike?.current?.id)))
        // dispatch(getLikesBackend(tweet?.id));
        // setRetweeted(false)
    }

    return (
        <>
            {retweeted && (
                <>
                    <i onClick={handleUnretweet} className="fa-solid fa-retweet green-icon"></i>
                    {!singleTweet && (
                        <p className="gray-p">{retweetCount}</p>
                    )}
                </>
            )}

            {!retweeted && (
                <>
                    <i onClick={handleRetweet} className="fa-solid fa-retweet gray-icon"></i>
                    {!singleTweet && (
                        <p className="gray-p">{retweetCount}</p>
                    )}
                </>
            )}

        </>
    )
}
export default Retweets;
