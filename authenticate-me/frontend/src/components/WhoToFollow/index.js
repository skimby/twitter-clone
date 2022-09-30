import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getNonFollowersBackend } from '../../store/follow'
import EachRecommendedFollow from './EachRecommendedFollow';

function WhoToFollow() {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user)
    let follows = useSelector(state => state.follows)
    follows = Object.values(follows?.nonFollowers)

    useEffect(() => {
        if (loggedUser) {
            dispatch(getNonFollowersBackend(loggedUser?.id))
        }
    }, [dispatch])


    return (
        <>
            <div className='recommended-follows'>
                <div className='recommended-follows-content'>
                    <h4>Who to follow</h4>
                    {follows && follows[0] && (
                        <div>
                            <EachRecommendedFollow follow={follows[0]} loggedUser={loggedUser} />
                        </div>
                    )
                    }
                    {follows && follows[1] && (
                        <div>
                            <EachRecommendedFollow follow={follows[1]} loggedUser={loggedUser} />
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default WhoToFollow;
