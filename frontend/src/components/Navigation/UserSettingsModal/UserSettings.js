import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/session'
import logo from '../../../images/twitter-logo.png'
function UserSettings({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    // const sessionUser = useSelector(state => state.session)

    const handleLogout = async () => {
        await dispatch(logout())
        history.push('/')
    }


    return (
        <>
            <div className="settings-header">
                <div className="x-box" onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-x"></i>
                </div>
                <div className="settings-logo-box">
                    <img src={logo} className='logo-container-module' />
                </div>
            </div>
            <div className="settings-box">
                <h2>Log out of Twitter?</h2>
                <p>You can always log back in at any time. See you soon!</p>
                <button onClick={handleLogout} className="black-btn">Log out</button>
                <button onClick={() => setShowModal(false)} className="outline-btn">Cancel</button>
            </div>

        </>
    )
}

export default UserSettings;
