import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import coverImg from '../../images/cover-image1.jpg'
import logo from '../../images/twitter-logo.png';
import { demoLogin } from '../../store/session';
import { useDispatch } from 'react-redux';

import './SignupPage.css';


function SignupPage() {
    const dispatch = useDispatch();

    const demoUser = () => {
        dispatch(demoLogin());
    }

    return (
        <>
            <div className="signup-page-container">
                <div className="cover-img-container">
                    <img src={coverImg} className="cover-img-img" />
                </div>

                <div className="cover-text-box">
                    <img src={logo} className='logo-box-signup' />
                    <h1 className="big-header">Happening now</h1>
                    <h2 className='medium-header'>Join Twitter today.</h2>
                    <div className='login-buttons'>
                        <LoginFormModal />
                        <SignupFormModal />

                        <div className='or-box'>
                            <div className='line'></div>
                            <div className='or'>
                                <p className='or-style'>or</p></div>
                            <div className='line'></div>
                        </div>

                        <button onClick={demoUser} className='black-btn demo-btn'>Demo User</button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SignupPage;
