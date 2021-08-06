import React from 'react';
import logo from '../../../Resorces/logo_RLAB.png';
import './nav.css';
import '../../../responsive.css';
import {Link} from 'react-router-dom'

import { useContext } from 'react';
import { userContext } from '../../../App';
import {useHistory, useLocation } from 'react-router-dom';
const Navbar = () => {
    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };
    
    const [user, setUser] = useContext(userContext);
    const handleSignOutActice = () => {
        const newUser = {...user}
        newUser.isSignedIn = true;
        setUser(newUser)
    }
   const handleLogout = () => {
    const newUser = {...user};
    newUser.email = "";
    newUser.isSignedIn = false;
    newUser.success = false;
    setUser(newUser)
    history.replace(from)
   }
    return (
        <div >
            <nav class={`navbar navbar-expand-lg navbar-dark bg-dark`}>
                <div class="container-fluid">
                    <Link class="navbar-brand" to="#"><img className="navbar-brand-img" style={{}} src={logo} alt=""/></Link>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <Link class="nav-link active" aria-current="page" to="#">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="#">Products</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="#">About us</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to="#">contract us</Link>
                            </li>
                            {user.isSignedIn &&<li class="nav-item">
                                <Link class="nav-link" to="/userHome">Dashboard</Link>
                            </li>}
                            {!user.isSignedIn && <li class="nav-item">
                                <Link to='/auth'><button className="btn btn-primary" onClick={handleSignOutActice}>Log in</button></Link>
                            </li>}
                            {user.isSignedIn && <li class="nav-item">
                                <button className="btn btn-primary" onClick={handleLogout}>Log out</button>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;