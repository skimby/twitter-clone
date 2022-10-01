import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { createCommentBackend } from '../../store/comment';

function CreateComment({ tweetId }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [comment, setComment] = useState('');
    const [image, setImage] = useState();
    const [gif, setGif] = useState();

    const user = useSelector(state => state.session);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentInput = {
            comment,
            gif,
            image
        }
        await dispatch(createCommentBackend(tweetId, commentInput));

        history.push(`/${user?.user?.username}/tweets/${tweetId}`)
        history.go()
    }


    const submitButton = () => {
        return (
            <button type='submit'>Reply</button>
        )
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };

    return (
        <div>
            <div className='profile-image-box'>
                {user?.user?.profileImage && (
                    <img className='profile-img' src={user?.user?.profileImage} />
                )}

                <form onSubmit={handleSubmit} className='form'>
                    <input
                        placeholder="Tweet your reply"
                        type='text'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}>
                    </input>

                    {/* emoji stuff */}
                    {/* <div className="pickerContainer" ref={ref} value={tweet} onChange={(e) => setTweet(e.target.value)}></div> */}
                    <label>
                        <input type="file" onChange={updateFile} />
                    </label>

                    {submitButton()}
                </form>
            </div>
        </div>
    )
}

export default CreateComment;
