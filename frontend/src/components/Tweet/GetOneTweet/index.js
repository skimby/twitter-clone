import { useHistory } from 'react-router-dom';
import GetComment from '../GetComment';
import { getCommentsBackend } from '../../../store/comment';
import { useDispatch, useSelector } from 'react-redux';
import Likes from '../../Likes';
import { useEffect } from 'react';
import { getUserBackend } from "../../../store/user";
import { getOneTweetBackend } from '../../../store/tweet'
import CreateCommentModal from '../../CreateCommentModal'

function GetOneTweet({ tweetId }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.users)
    const likes = useSelector(state => state.likes)
    const tweets = useSelector(state => state.tweets)
    const comments = useSelector(state => state.comments)
    const tweet = tweets?.currentTweet


    useEffect(() => {
        dispatch(getOneTweetBackend(tweetId))
    }, [dispatch, tweetId, likes, comments])

    useEffect(() => {
        if (tweet?.id) {
            dispatch(getCommentsBackend(tweet?.id))
        }
    }, [dispatch, tweet?.id])

    useEffect(() => {
        if (tweet) {
            dispatch(getUserBackend(tweet?.userId))
        }
    }, [dispatch, tweet])


    const handleBack = () => {
        history.push('/')
    }

    return (
        <>
            <div className="middle-container">

                <div>
                    <div>
                        <i className="fa-solid fa-arrow-left-long" onClick={handleBack}></i>
                    </div>
                    <div>
                        <h5>Tweet</h5>
                    </div>
                </div>

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

                <div>
                    {tweet && (
                        <>
                            <h3>{tweet?.tweet}</h3>
                            <img src={tweet?.image} width='200' />
                            <img src={tweet?.gif} width='200' />


                            <p>{tweet?.updatedAt?.[1]} {tweet?.updatedAt?.[2]}, {tweet?.updatedAt?.[3]}</p>


                            <p>{tweet?.retweetCount} Retweets</p>
                            <p>{tweet?.commentCount} Quote Tweets</p>
                            <p>{tweet?.likeCount} Likes</p>


                            <CreateCommentModal commentCount={tweet?.commentCount} tweet={tweet} />
                            {/* <i className="fa-regular fa-comment"></i> */}
                            <i className="fa-solid fa-retweet"></i>
                            <Likes likeCount={tweet?.likeCount} tweet={tweet} />
                        </>
                    )}


                    {tweet?.Comments && (
                        tweet?.Comments.map((comment, index) => {
                            return (
                                <div key={index}>
                                    <GetComment comment={comment} />
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </>
    )
}

export default GetOneTweet;
