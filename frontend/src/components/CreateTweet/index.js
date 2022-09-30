import { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom';
import { createTweetBackend } from '../../store/tweet';
import { createPopup } from '@picmo/popup-picker';
import { createPicker } from 'picmo';
import { picker } from '../../index';
import { createRoot } from 'react-dom/client';
import './CreateTweet.css'


function CreateTweet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef(null)
    const [tweet, setTweet] = useState('');
    const [gif, setGif] = useState();
    const [image, setImage] = useState();

    const user = useSelector(state => state.session);

    // //emoji
    // useEffect(() => {
    //     const test = ref.current
    //     const picker = createPicker({
    //         rootElement: test
    //     });

    // }, [])



    const handleSubmit = async (e) => {
        e.preventDefault();

        const tweetInput = {
            tweet,
            gif,
            image
        }
        const newTweet = await dispatch(createTweetBackend(tweetInput))
        history.push(`/${user?.user?.username}/tweets/${newTweet?.id}`)
    }


    const submitButton = () => {
        return (
            <button className='tweet-button' type='submit' onClick={handleSubmit}>Tweet</button>
        )
    }

    return (
        <div className='create-tweet-container'>
            <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user?.user?.profileImage} />
                )}
            </div>
            <div className='create-tweet-box'>
                <form onSubmit={handleSubmit} className='form'>
                    <input
                        placeholder="What's happening?"
                        type='text'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}>
                    </input>

                    {/* emoji stuff */}
                    {/* <div className="pickerContainer" ref={ref} value={tweet} onChange={(e) => setTweet(e.target.value)}></div> */}



                </form>
            </div>


            <div className='tweet-addons-box'></div>
            <div>
                {submitButton()}
            </div>
        </div>

    )
}

export default CreateTweet;