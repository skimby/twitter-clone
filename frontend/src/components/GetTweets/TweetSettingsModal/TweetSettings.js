import EditFormModal from "../EditTweetModal";
import DeleteTweetModal from "../DeleteTweetModal";
import logo from '../../../images/twitter-logo.png'
import './TweetSettings.css'

function TweetSettings({ tweet, setShowModal }) {

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
                    <li><EditFormModal tweetId={tweet?.id} tweet={tweet} /></li>
                    <li><DeleteTweetModal tweetId={tweet?.id} /></li>
                </ul>
            </div>
        </>
    )
}

export default TweetSettings;
