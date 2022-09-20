import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getFeedTweetsBackend } from '../../store/tweet';
import CreateTweet from '../CreateTweet';
import './index.css'

function HomePage() {
    const dispatch = useDispatch();
    const tweets = Object.values(useSelector(state => state.tweets.feedTweets));
    console.log(tweets)

    useEffect(() => {
        dispatch(getFeedTweetsBackend())
        console.log(tweets)

    }, [dispatch])

    return (
        <>
            <div className='home-div'>
                <h2>Home</h2>
            </div>

            <div>
                <CreateTweet />
            </div>


            <div>
                {tweets && (
                    tweets?.map((tweet, index) => {
                        return (
                            <div className='tweet-container' key={index}>
                                <div className='profile-img'>
                                    {tweet?.User?.profileImage}
                                    {tweet?.id}
                                    {/* <img className='profile-img' src={tweet?.User?.profileImage} /> */}


                                    {/* {!tweet?.User?.profileImage && (
                                        <img className='profile-img' src='https://secure.gravatar.com/avatar/c51f0fc9375c537923f6bf012b337f43?s=150&d=mm&r=g' />
                                    )} */}
                                </div>
                                {/*
                                <div className='tweet-text-box'>
                                    {tweet?.tweet}
                                </div> */}
                            </div>
                        )
                    })
                )}
            </div>

        </>
    )
}

export default HomePage;
