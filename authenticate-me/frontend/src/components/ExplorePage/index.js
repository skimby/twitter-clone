import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExploreTweetsBackend } from '../../store/tweet'


function ExplorePage() {
    const dispatch = useDispatch();
    const tweets = useSelector(state => state.tweets);

    useEffect(() => {
        dispatch(getExploreTweetsBackend())
    })
    return (
        <h1>explore page</h1>
    )
}

export default ExplorePage;
