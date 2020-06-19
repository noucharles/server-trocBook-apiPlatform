import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from "moment";
import 'moment/locale/fr';
import UtilisateurService from "../services/utilisateur-service";
import Utilisateur from "../models/utilisateur";
import './annonce-utilisateur.css';
import AnnonceCardColunn from "../components/annonce-cardColunn";
import Pagination from "../components/pagination";
import Loaderb from "../components/loaderb";

type Params = { id: string };

const AnnonceUtilisateur: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [user, setUser] = useState<Utilisateur|null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [categories, setCategories] = useState<Array<string>>(['all', '6 éme', '5 éme', '4 éme', '3 éme', '2 nde', '1 er', 'Tle']);
    const [currentCategorie, setCurrentCategorie] = useState<string>();

    useEffect(() => {
        UtilisateurService.getUtilisateur(+match.params.id).then(utilisateur =>setUser(utilisateur));
    }, [match.params.id]);

    const formatDate = (str: any) => {
        return moment(str).format('ll');
    };

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleChangeCategorie = (categorie: string) => {
        setCurrentCategorie(categorie);
    };

    const itemsPerPage = 10;
    const start = currentPage * itemsPerPage - itemsPerPage;
    // const paginationAnnonces = user.annonces!.slice(start, start+itemsPerPage);

    return (
        <div>
            { user ? (
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card bg-light mt-4">
                                <div className="card-header">Bibliotheque de :</div>
                                <div className="card-body">
                                    <p>{user.firstName}&nbsp;<b>{user.lastName}</b></p>
                                    <p>{user.number}</p>
                                    <p><small>{user.email}</small></p>
                                </div>
                            </div>
                            <div className="card bg-light mt-4">
                                <div className="card-header">Ces exigences pour le(s) troc(s):</div>
                                <div className="card-body">
                                    <p>{user.exigences}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="card-columns">
                                {user.annonces!.map(annonce => (
                                    <AnnonceCardColunn key={annonce.id} annonce={annonce}/>
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
    );
};

export default AnnonceUtilisateur;