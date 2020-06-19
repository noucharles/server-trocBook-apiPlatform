import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import AuthenticationService from "../services/authentication-service";
import {toast} from "react-toastify";

type Params = {
    isAuthenticated: boolean,
    onLogout: any
};

const Navbar: React.FC<Params> = ({isAuthenticated, onLogout}: Params) => {

    const history = useHistory();

    const handleLogout = (): void => {
        AuthenticationService.logout();
        onLogout(false);
        toast.info("Vous êtes désormais déconnecté :)");
        history.push("/annonces");
    };

    return (
        <>
                {/*La barre de navigation commun à toutes les pages*/}
                <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#e3f2fd"}}>
                    <NavLink to="/" className="navbar-brand">TrocBook</NavLink>

                    <div className="collapse navbar-collapse" id="navbarColor01">
                    </div>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/annonce/new" className="nav-link">Créer une annonce</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        {(!isAuthenticated && ( <>
                            <li className="nav-item">
                                <NavLink to="/register" className="nav-link">Inscription</NavLink>
                            </li>
                            <li className="nav-item ml-2">
                                <NavLink to="/login" className="btn btn-success">Connexion</NavLink>
                            </li>
                        </> )) || ( <>
                        <li className="nav-item">
                            <NavLink to="/Ma_Bibliothéque" className="nav-link">Ma Bibliothéque</NavLink>
                        </li>
                        <li className="nav-item ml-2">
                            <button onClick={handleLogout} className="btn btn-danger">Déconnexion</button>
                        </li> </>)}
                    </ul>
                </nav>
        </>
    )
};

export default Navbar;