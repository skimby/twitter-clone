import EditFormModal from "../EditTweetModal";
import DeleteTweetModal from "../DeleteTweetModal";
import logo from '../../../images/twitter-logo.png'
import { useState } from "react";
import './TweetSettings.css'
import CreateTweetModal from "../../CreateTweetModal";

function TweetSettings({ tweet, tweetId, setShowModal }) {

    console.log(tweetId)
    const [edit, setEdit] = useState(true);

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
                        <CreateTweetModal edit={edit} tweetId={tweetId} />
                    </li>
                    <li><DeleteTweetModal tweetId={tweetId} /></li>
                </ul>
            </div>
        </>
    )
}

export default TweetSettings;
