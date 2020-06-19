import React, { FunctionComponent, useState, useEffect } from 'react';
import {RouteComponentProps, useHistory} from 'react-router-dom';
import AnnonceService from "../services/annonce-service";
import {Carousel, } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Annonce from "../models/annonce";
import moment from "moment";
import 'moment/locale/fr';
import Loaderb from "../components/loaderb";
import {toast} from "react-toastify";

type Params = { id: string };

const AnnonceDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [annonce, setAnnonce] = useState<Annonce|null>(null);
    const history = useHistory();

    useEffect(() => {
        AnnonceService.getAnnonce(+match.params.id).then(annonce =>setAnnonce(annonce));
    }, [match.params.id]);

    const formatDate = (str: any) => {
        return moment(str).format('ll');
    };

    const goToAnnoncesUser = (id: number) => {
        history.push(`/annonces/utilisateur/${id}`);
        toast.info(`Vous êtes dans la bibliothéque de ${annonce!.user!.firstName} ${annonce!.user!.lastName}`);
    };

    const goToAnnonceAdd = () => {
        history.push(`/annonce/new`);
    };

    return (
        <div className="container">
            { annonce ? (
        <div >

            <div className="container">
                <div className="row">
                <div className="col-lg-3 mt-4">
                    <div className="card bg-light">
                        <div className="card-header">Annonce</div>
                        <div className="card-body">
                            <p style={{cursor:'pointer'}} onClick={() => goToAnnoncesUser(annonce.user!.id)}>Posté par : <b>{annonce.user!.firstName}&nbsp;{annonce.user!.lastName}</b></p>
                            <p>Quartier :&nbsp;{annonce.ville}</p>
                            <p>Publié le: {formatDate(annonce.created)}</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-9">

                    <div className="card mt-4">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="http://placehold.it/900x400"
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="http://placehold.it/900x400"
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="http://placehold.it/900x400"
                                    alt="Third slide"
                                />

                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                            <div className="card-body">
                                <h3 className="card-title mb-4"> {annonce.titre}&nbsp;<span>{annonce.classe}</span></h3>

                                <label className="h5">Description du livre :</label>
                                <p className="card-text">{annonce.description}</p>
                                <hr />
                                <label className="h5">Conditions de {annonce.user!.firstName} {annonce.user!.lastName} pour le troc d'un ou plusieurs livre(s) :</label>
                                <p className="card-text">{annonce.user!.exigences}</p>
                                <hr />
                                <label className="h5">Fiche technique :</label>
                                <p >Editions:&nbsp;{annonce.editeur}<br />Année publication:&nbsp;{annonce.parution}</p>
                                <p>Contact par email: {annonce.user!.email}&nbsp;&nbsp;&nbsp;Contact par téléphone: {annonce.user!.number}</p>
                            </div>
                        <small className="text-muted p-1 ml-5">&nbsp;&nbsp;Cette annonce n'a pas été publiée par un préposé de TrocBook. TrocBook ne peut pas garantir l’origine du produit</small>
                    </div>

                    <div className="card card-outline-secondary my-4">
                        <div className="card-header">
                            Informations
                        </div>
                        <div className="card-body">
                            <h3 className="text-lg-center">Qu'avez-vous à troquez ?</h3><br />
                            <p className="text-center">Troquez tout vos livres scolaires gratuitement sur TrocBook</p>
                            <button type="button" className="offset-3 btn btn-primary btn-lg" onClick={goToAnnonceAdd}>Publiez votre annonce gratuitement</button>
                            <hr />
                            <ul>
                                <h4>Nos Conseils de Sécurité</h4>
                                <li>Ne troquez, sous aucun prétexte, avant d'avoir vu le livre.</li>
                                <li>N'envoyez jamais d'argent pour « Réserver » un livre.</li>
                                <li>Vérifiez la qualité du produit avant de troquer.</li>
                                <li>Ne donnez pas d’informations personnelles (coordonnées bancaires, numéro de carte de crédit ...).</li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
            ) : (
                <Loaderb />
            )}
        </div>
    );
};

export default AnnonceDetail;