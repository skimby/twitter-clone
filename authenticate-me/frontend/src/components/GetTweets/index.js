import TweetSettingsModal from './TweetSettingsModal';
import { useDispatch } from "react-redux"

import { Redirect, useHistory, Link } from 'react-router-dom';
import UserProfile from '../UserProfile';
import { getLikesBackend } from '../../store/like';

import Likes from '../Likes';
import CreateCommentModal from '../CreateCommentModal';
import './GetTweets.css'
import { useEffect } from 'react';


function GetTweets({ tweets }) {
    const history = useHistory();
    const dispatch = useDispatch()



    return (
        <>
            {tweets && (
                Object.values(tweets).map((tweet, index) => {
                    return (
                        <div className='tweet-container' key={index} >

                            <div className='tweet-profile-img'>
                                <Link to={{
                                    pathname: `/${tweet?.User?.username}`,
                                    state: {
                                        userPageId: tweet?.User?.id
                                    }
                                }}>

                                    <img className='profile-img' src={tweet?.User?.profileImage} />

                                </Link>
                            </div>

                            <div className='tweet-text-box'>
                                <div>
                                    <Link to={{
                                        pathname: `/${tweet?.User?.username}`,
                                        state: {
                                            userPageId: tweet?.User?.id
                                        }
                                    }}>
                                        <h5>{tweet?.User?.firstName}  </h5>
                                    </Link>
                                    {/* <h5><span className='thin-styling'>@{tweet?.User?.username} • {tweet?.updatedAt[1]} {tweet?.updatedAt[2]}</span></h5> */}


                                    <Link to={{
                                        pathname: `/tweets/${tweet.id}`,
                                        state: {
                                            userPageId: tweet?.User?.id
                                        }
                                    }}>

                                        <p>{tweet?.tweet}</p>
                                    </Link>

                                </div>

                                <div className='tweet-img-gif'>
                                    <img className='img-gif' src={tweet?.image} width='200' />
                                    <img className='img-gif' src={tweet?.gif} width='200' />
                                </div>


                                <div className='settings-btn' >
                                    <TweetSettingsModal tweet={tweet} />
                                </div>

                                <div className='tweet-icons-box'>

                                    <CreateCommentModal commentCount={tweet?.commentCount} tweet={tweet} />

                                    <i className="fa-solid fa-retweet"></i>{tweet?.retweetCount}

                                    <Likes likeCount={tweet?.likeCount} tweet={tweet} />

                                    {/* <i onClick={handleLike(tweet)} className="fa-regular fa-heart"></i>{tweet?.likeCount} */}

                                </div>
                            </div>
                        </div>

                    )
                })
            )}
        </>
    )
}

export default GetTweets;
