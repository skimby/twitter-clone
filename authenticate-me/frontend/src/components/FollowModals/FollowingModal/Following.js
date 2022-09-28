import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getFollowingBackend } from '../../../store/follow';


function Following() {
    const dispatch = useDispatch();

    const follows = useSelector(state => state.follows)
    const following = Object.values(follows?.following);


    useEffect(() => {
        dispatch(getFollowingBackend)
    }, [dispatch])


    return (
        <div className='follow-modal'>
            {following && (
                following.forEach((follow, index) => {
                    return (
                        <div key={index}>

                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Following;
