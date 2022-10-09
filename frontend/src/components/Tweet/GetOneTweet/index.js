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
import '../../UserProfile/UserProfile.css'
import './GetOneTweet.css'
import '../../GetTweets/GetTweets.css'

function GetOneTweet({ tweetId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isOwnComment, setIsOwnComment] = useState()
    const [newComment, setNewComment] = useState(true)
    const [singleTweet, setSingleTweet] = useState(true);
    const loggedUser = useSelector(state => state.session.user)
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
        if (tweet) {
            if (tweet?.userId === loggedUser.id) {
                setIsOwnComment(true)
            } else {
                setIsOwnComment(false)
            }
        }
    }, [dispatch, tweet])

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


                <div className='one-tweet-container'>

                    <div className='user-info-container'>
                        <div className='profile-img'>
                            <img className='profile-img' src={user?.User?.profileImage} />
                        </div>

                        <div className='user-info-content'>
                            <div>
                                <h5>{user?.User?.firstName}</h5>
                                <h5>  <span className='thin-styling'>@{user?.User?.username}</span></h5>
                            </div>
                        </div>
                    </div>
                    {/* <div className='cover-image-container'>
                    <img className='cover-img' src={user?.coverImage} />
                </div>

                <div>
                    <img className='user-profile-img-big' src={user?.profileImage} />
                </div> */}


                    {tweet && (
                        <>
                            <p>{tweet?.tweet}</p>

                            <div className='comment-img-gif'>
                                {tweet?.image !== null && (
                                    <>
                                        <img src={tweet?.image} className='img-gif' width='200' />

                                    </>
                                )}
                                {tweet?.gif !== null && (
                                    <>
                                        <img className='img-gif' src={tweet?.gif} width='200' />
                                        <img className="padding-top " src={giphyTag} width='110px' />
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
            </div>
            {tweet?.Comments && (
                tweet?.Comments.map((comment, index) => {
                    return (
                        <div key={index}>
                            <GetComment comment={comment} isOwnComment={isOwnComment} />
                        </div>
                    )
                })
            )}

            {/* </div> */}

        </>
    )
}

export default GetOneTweet;
