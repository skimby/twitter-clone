import { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createTweetBackend } from '../../store/tweet'

function CreateTweetForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const ref = useRef(null)
    const [tweet, setTweet] = useState('');
    const [gif, setGif] = useState();
    const [image, setImage] = useState();

    const user = useSelector(state => state.session);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const tweetInput = {
            tweet,
            gif,
            image
        }
        const newTweet = await dispatch(createTweetBackend(tweetInput))

        history.push(`/${user?.user?.username}/tweets/${newTweet?.id}`)
        history.go()
    }


    const submitButton = () => {
        return (
            <button type='submit'>Tweet</button>
        )
    }

    return (
        <div>
            <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user?.user?.profileImage} />
                )}

                <form onSubmit={handleSubmit} className='form'>
                    <input
                        placeholder="What's happening?"
                        type='text'
                        value={tweet}
                        onChange={(e) => setTweet(e.target.value)}>
                    </input>

                    {/* emoji stuff */}
                    {/* <div className="pickerContainer" ref={ref} value={tweet} onChange={(e) => setTweet(e.target.value)}></div> */}


                    {submitButton()}
                </form>
            </div>
        </div>
    )
}

export default CreateTweetForm;
