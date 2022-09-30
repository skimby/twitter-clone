import { useEffect, useState } from 'react'
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


            {/* {follows?.nonFollowers && (
                Object.values(follows?.nonFollowers).map((follow, index) => {
                    return (
                        <>
                            {follow && (
                                <div key={index}>
                                    <EachRecommendedFollow follow={follow} loggedUser={loggedUser} />
                                </div>

                            )}
                        </>
                    )
                }
                )
            )} */}
        </>
    )
}

export default WhoToFollow;
