import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {toast} from "react-toastify";

const PageNotFound: FunctionComponent = () => {

    toast.error("Page introuvable");

    return (
        <div className="text-center">
            <h1>Hey, cette page n'existe pas !</h1>
            <Link to="/">
                Retourner à l'accueil
            </Link>
        </div>
    );
};

export default PageNotFound;