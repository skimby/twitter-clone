import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { getNonFollowersBackend } from '../../store/follow'
import EachRecommendedFollow from './EachRecommendedFollow';
import Search from '../Search';


function WhoToFollow() {
    const dispatch = useDispatch();
    const { userId } = useParams();

    const [isOwnPage, setIsOwnPage] = useState();

    const loggedUser = useSelector(state => state.session.user)
    let follows = useSelector(state => state.follows)
    follows = Object.values(follows?.nonFollowers)

    useEffect(() => {
        if (loggedUser) {
            dispatch(getNonFollowersBackend(loggedUser?.id))
        }
    }, [dispatch, loggedUser, loggedUser?.id])

    useEffect(() => {
        if (parseInt(userId) === loggedUser?.id) {
            setIsOwnPage(true)
        } else {
            setIsOwnPage(false)
        }
    }, [dispatch, userId, loggedUser?.id])

    return (
        <>
            <div>
                <Search />
            </div>
            <div className='recommended-follows'>
                <div className='recommended-follows-content'>
                    <h4 className='bold-large'>Who to follow</h4>
                    {follows && follows[0] && (
                        <div>
                            <EachRecommendedFollow follow={follows[0]} loggedUser={loggedUser} isOwnPage={isOwnPage} />
                        </div>
                    )
                    }
                    {follows && follows[1] && (
                        <div>
                            <EachRecommendedFollow follow={follows[1]} loggedUser={loggedUser} isOwnPage={isOwnPage} />
                        </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default WhoToFollow;
