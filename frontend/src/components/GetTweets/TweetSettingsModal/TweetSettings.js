import EditFormModal from "../EditTweetModal";
import DeleteTweetModal from "../DeleteTweetModal";
import logo from '../../../images/twitter-logo.png'
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './TweetSettings.css'
import CreateTweetModal from "../../CreateTweetModal";
import { getOneTweetBackend } from '../../../store/tweet';


function TweetSettings({ tweet, tweetId, setShowModal }) {
    const dispatch = useDispatch();

    const [edit, setEdit] = useState(true);

    let currentTweet = useSelector(state => state.tweets?.currentTweet);

    useEffect(() => {
        if (tweetId) {
            dispatch(getOneTweetBackend(tweetId))
        }
    }, [dispatch, tweetId])



    return (
        <>
            <div className="settings-header">
                <div className="x-box" onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-x"></i>
                </div>
                <div className="settings-logo-box">
                    <img src={logo} className='logo-container-module' />
                </div>
            </div>

            <div className='settings-box'>
                <h2 className="padding">Change or remove your tweet</h2>
                <ul>
                    <li>
                        {currentTweet && (
                            <CreateTweetModal edit={edit} currentTweet={currentTweet} tweetId={tweetId} />

                        )}
                    </li>
                    <li><DeleteTweetModal tweetId={tweetId} /></li>
                </ul>
            </div>
        </>
    )
}

export default TweetSettings;
