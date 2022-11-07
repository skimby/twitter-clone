import { useHistory } from 'react-router-dom';
import GetComment from '../GetComment';
import { getCommentsBackend } from '../../../store/comment';
import { useDispatch, useSelector } from 'react-redux';
import Likes from '../../Likes';
import { useEffect, useState } from 'react';
import { getUserBackend } from "../../../store/user";
import { getOneTweetBackend } from '../../../store/tweet'
import CreateCommentModal from '../../CreateCommentModal'
import CreateCommentInline from '../../CreateCommentInline';
import giphyTag from '../../../images/powered-by-giphy.png'
import Retweets from '../../Retweet';
import TweetSettingsModal from '../../GetTweets/TweetSettingsModal';
import '../../UserProfile/UserProfile.css'
import './GetOneTweet.css'
import '../../GetTweets/GetTweets.css'

function GetOneTweet({ tweetId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [newComment] = useState(true)
    const [singleTweet] = useState(true);
    const user = useSelector(state => state.users)
    const likes = useSelector(state => state.likes)
    const tweets = useSelector(state => state.tweets)
    const comments = useSelector(state => state.comments)
    const retweets = useSelector(state => state.retweets)


    const tweet = tweets?.currentTweet
    const allComments2 = tweet?.Comments

    if (allComments2) {
        allComments2.sort((a, b) => {
            return new Date(b.createdAt1) - new Date(a.createdAt1)
        })
    }

    useEffect(() => {
        dispatch(getOneTweetBackend(tweetId))
    }, [dispatch, tweetId, likes, comments, retweets])

    useEffect(() => {
        if (tweet?.id) {
            dispatch(getCommentsBackend(tweet?.id))
        }
    }, [dispatch, tweet?.id])

    useEffect(() => {
        if (tweet?.userId) {
            dispatch(getUserBackend(tweet?.userId))
        }
    }, [dispatch, tweet])


    const handleBack = () => {
        history.push('/')
    }

    return (
        <>
            <div className='user-profile-header'>
                <div className='x-box'>
                    <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                </div>
                <div className='user-information-box'>
                    <h5 className='tweet-bold-styling'>Tweet</h5>
                </div>
            </div>
            <div className='get-one-tweet-container'>

                {user && (
                    <div className='one-tweet-container'>
                        <div className='user-info-container'>
                            <div className='profile-img' onClick={() => history.push(`/${user?.User?.username}/${user?.User?.id}`)} >
                                <img className='profile-img' src={user?.User?.profileImage} alt='profile user' />
                            </div>

                            <div className=''>
                                <div className='tweet-user-header'>
                                    <h5>{user?.User?.firstName}</h5>
                                    {user?.User?.verified && (
                                        <div className="verified-div2">
                                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/640px-Twitter_Verified_Badge.svg.png' className='verified-badge' />
                                        </div>
                                    )}
                                    <div>
                                        <h5>  <span className='thin-styling'>@{user?.User?.username}</span></h5>
                                    </div>
                                </div>
                            </div>
                            <div className='settings-btn' >
                                <TweetSettingsModal tweet={tweet} />
                            </div>
                        </div>



                        {tweet && (
                            <>
                                <p className='big-p'>{tweet?.tweet}</p>

                                <div className='comment-img-gif'>
                                    {tweet?.image !== null && (
                                        <>
                                            <img src={tweet?.image} className='img-gif' width='200' alt='attachment for tweet' />

                                        </>
                                    )}
                                    {tweet?.gif !== null && (
                                        <>
                                            <img className='img-gif' src={tweet?.gif} width='200' alt='gif attachment for tweet' />
                                            <img className="padding-top " src={giphyTag} width='110px' alt='gif provided by GIPHY' />
                                        </>
                                    )}
                                </div>



                                <div>
                                    <p className='gray-p'>{tweet?.updatedAt?.[1]} {tweet?.updatedAt?.[2]}, {tweet?.updatedAt?.[3]}</p>
                                </div>


                                <div className='outline'>
                                    <div className='comment-stats-box'>

                                        <p className='gray-p follower-styling' >
                                            <span className='bold'>{tweet?.retweetCount} </span>
                                            Retweets</p>
                                        <p className='gray-p follower-styling'><span className='bold'>{tweet?.commentCount} </span>Quote Tweets</p>
                                        <p className='gray-p follower-styling'><span className='bold'>{tweet?.likeCount} </span>Likes</p>
                                    </div>
                                </div>

                                <div className='comment-icons-box'>
                                    <div className='tweet-icon'>
                                        <CreateCommentModal newComment={newComment} commentCount={tweet?.commentCount} tweet={tweet} singleTweet={singleTweet} />
                                    </div>
                                    <div className='tweet-icon'>
                                        <Retweets retweetCount={tweet?.retweetCount} tweet={tweet} singleTweet={singleTweet} />
                                    </div>
                                    <div className='tweet-icon'>
                                        <Likes likeCount={tweet?.likeCount} tweet={tweet} singleTweet={singleTweet} />
                                    </div>

                                </div>
                            </>
                        )}
                        <CreateCommentInline tweetId={tweetId} />


                    </div>
                )}
            </div>
            {
                tweet?.Comments && (
                    tweet?.Comments.map((comment, index) => {
                        return (
                            <div key={index}>
                                <GetComment comment={comment} />
                            </div>
                        )
                    })
                )
            }

            {/* </div> */}

        </>
    )
}

export default GetOneTweet;
