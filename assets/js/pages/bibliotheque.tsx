import React, {useEffect, useState} from 'react';
import Utilisateur from "../models/utilisateur";
import AuthenticationService from "../services/authentication-service";
import AnnonceCardColunn from "../components/annonce-cardColunn";
import Pagination from "../components/pagination";
import jwtDecode from "jwt-decode";
import Loaderb from "../components/loaderb";
import {useHistory} from "react-router";

const Bibliotheque: React.FC = () => {

    const [user, setUser] = useState<Utilisateur|null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentCategorie, setCurrentCategorie] = useState<string>();
    const history = useHistory();

    // voir s'il y a un token
    const token : any = window.localStorage.getItem("authToken");

    // si le token est valide
    const jwtData : any = jwtDecode(token);

    useEffect(() => {
        AuthenticationService.getUtilisateurLogin(jwtData.id).then(user => setUser(user));
    }, [jwtData.id]);


    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleChangeCategorie = (categorie: string) => {
        setCurrentCategorie(categorie);
    };

    const redirctTo = () => {
        history.push(`/Ma_Bibliothéque/update/infos/${jwtData.id}`);
    };

    const redirctTo2 = () => {
        history.push(`/Ma_Bibliothéque/update/exigences/${jwtData.id}`);
    };

    const itemsPerPage = 10;
    const start = currentPage * itemsPerPage - itemsPerPage;

    return (
        <>
            <div>
                <h1 className="text-center">Votre Bibliotheque !</h1>
                { user ? (
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="card bg-light mt-4">
                                    <div className="card-header">Mes informations:
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<svg style={{cursor:'pointer'}} onClick={redirctTo} className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16"
                                             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                                            <path fill-rule="evenodd"
                                                  d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                                        </svg>
                                    </div>
                                    <div className="card-body">
                                        <p><b>Votre nom :</b></p>
                                        <p>{user.firstName}&nbsp;{user.lastName}</p>
                                        <p><b>Votre numéro :</b></p>
                                        <p>{user.number}</p>
                                        <hr />
                                        <p><b>Votre adresse Email :</b></p>
                                        <p><small>{user.email}</small></p>
                                    </div>
                                </div>
                                <div className="card bg-light mt-4">
                                    <div className="card-header">Ces exigences pour le(s) troc(s):
                                        &nbsp;<svg style={{cursor:'pointer'}} onClick={redirctTo2} className="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16"
                                                                                                                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                  d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"/>
                                            <path fill-rule="evenodd"
                                                  d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z"/>
                                        </svg>
                                    </div>
                                    <div className="card-body">
                                        <p>{user.exigences}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="card-columns">
                                    {user.annonces!.map(annonce => (
                                        <AnnonceCardColunn key={annonce.id} annonce={annonce} biblio={true}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {itemsPerPage < user.annonces!.length && (
                            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={user.annonces!.length} onPageChanged={handleChangePage}/>
                        )}
                    </div>
                ) : (
                    <Loaderb />
                )}
            </div>
        </>
    )
};

export default Bibliotheque;