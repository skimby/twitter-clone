import {
    getRetweetBackend, createRetweetBackend, deleteRetweetBackend
} from '../../store/retweet'
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';
import { useRef } from 'react'

function Retweets({ retweetCount, tweet, singleTweet, isOwnPage }) {
    const dispatch = useDispatch();
    const [retweeted, setRetweeted] = useState();
    const retweets = tweet?.retweets
    const loggedUser = useSelector(state => state.session.user)
    const myRetweet = useRef()

    useEffect(() => {
        if (retweets) {
            const tweetIsRetweeted = retweets.find(retweet => retweet.userId === loggedUser?.id)

            myRetweet.current = tweetIsRetweeted;

            if (tweetIsRetweeted) {
                setRetweeted(true)
            } else {
                setRetweeted(false)
            }
        }

    }, [dispatch, retweets])


    const handleRetweet = () => {
        dispatch(createRetweetBackend(parseInt(tweet?.id), isOwnPage))

        setRetweeted(true)
    }

    const handleDeleteRetweet = () => {
        dispatch(deleteRetweetBackend(parseInt(tweet?.id), parseInt(myRetweet?.current?.id), isOwnPage))
        dispatch(getRetweetBackend(tweet?.id));
        setRetweeted(false)
    }

    return (
        <>
            {retweeted && (
                <>
                    <i onClick={handleDeleteRetweet} className="fa-solid fa-retweet green-icon"></i>
                    {!singleTweet && (
                        <p className="green-p">{retweetCount}</p>
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
