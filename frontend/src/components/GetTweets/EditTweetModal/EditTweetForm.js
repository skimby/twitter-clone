import { useState } from "react";
import { useDispatch } from 'react-redux';
import { editTweetBackend } from '../../../store/tweet';
import CreateTweetModal from "../../CreateTweetModal";

function EditTweetForm({ tweet, tweetId }) {
    const dispatch = useDispatch();

    const [editTweet, setEditTweet] = useState(tweet?.tweet);

    const handleSubmit = async () => {
        const tweetInput = { tweet: editTweet }
        await dispatch(editTweetBackend(tweetId, tweetInput))
    }

    return (
        <CreateTweetModal />
        // <form onSubmit={handleSubmit}>
        //     <label>
        //         Edit Tweet
        //         <input
        //             type="text"
        //             value={editTweet}
        //             onChange={(e) => setEditTweet(e.target.value)}
        //             required
        //         />
        //     </label>
        //     <button type="submit">Tweet</button>
        // </form>
    )
}

export default EditTweetForm;
