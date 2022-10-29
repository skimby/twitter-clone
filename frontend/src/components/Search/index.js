import { allUsersBackend } from "../../store/user";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from "react-router-dom";

const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const users = useSelector(state => state.users);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState("");

    useEffect(() => {
        dispatch(allUsersBackend());
    }, [dispatch])

    const userResults = Object.values(users?.AllUsers)?.filter((user) => {
        return user?.username?.toLowerCase().includes(search?.toLowerCase());
    });


    const clickEvent = (() => {
        setSearch('')
        history.push(`/users/${users?.user?.id}`)
    })





    const returnResults = userResults?.map((user) => {
        return (
            <Link
                to={`/users/${user?.id}`}
                key={user?.id}
                onClick={clickEvent}
                className="search-result-link"
            >
                <h1>result: {user?.username}</h1>
                {/* <div className="search-result-text">
                    <img
                        src={user?.profile_image}
                        className="search-bar-profile-pic"
                        alt='preview'
                    />
                    <div className="search-bar-profile-username">{user?.username}</div>
                </div> */}
            </Link>
        );
    });
    console.log(returnResults)

    return (
        <>
            <h1>Search</h1>
            <form>
                <label>
                    Search
                    <input
                        type='text'
                        value={search}
                        placeholder='Search User'
                        onChange={(e) => setSearch(e.target.value)} />
                </label>
            </form>
            <div >
                <h1>results</h1>
                {returnResults}
            </div>
        </>
    )
}
export default Search;
