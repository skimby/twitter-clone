import { allUsersBackend } from "../../store/user";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(allUsersBackend())
    }, [dispatch])

    console.log(users)
    return (
        <>
            <h1>{users[0]?.id}</h1>
            <h1>test</h1>
        </>
    )
}
export default Search;
