import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getNonFollowersBackend } from '../../store/follow'
import EachRecommendedFollow from './EachRecommendedFollow';

function WhoToFollow() {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.session.user)
    const follows = useSelector(state => state.follows)


    useEffect(() => {
        if (loggedUser) {
            dispatch(getNonFollowersBackend(loggedUser?.id))

        }
    }, [dispatch])



    return (
        <>
            {follows?.nonFollowers && (
                Object.values(follows?.nonFollowers).map((follow, index) => {
                    return (
                        <div key={index}>
                            <EachRecommendedFollow follow={follow} />
                        </div>
                    )
                }
                )

            )}
        </>
    )
}

export default WhoToFollow;
