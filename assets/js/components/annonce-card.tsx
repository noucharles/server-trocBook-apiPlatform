import React, {FunctionComponent, useState} from 'react';
import Annonce from '../models/annonce';
import './css/annonce-card.css';
import {useHistory} from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';

type Props = {
    annonce: Annonce,
    borderColor?: string,
};

const AnnonceCard: FunctionComponent<Props> = ({annonce, borderColor='#009688'}) => {

    const [color, setColor] = useState<string>();
    const history = useHistory();

    const showBorder = () => {
        setColor(borderColor);
    };

    const hideBorder = () => {
        setColor('#f5f5f5');
    };

    const goToAnnonce = (id: number) => {
        history.push(`/annonces/${id}`);
    };

    const formatDate = (str: any) => {
        return moment(str).format('llll');
    };

    return (
        <div style={{cursor:'pointer'}} className="col-lg-5 offset-1" onClick={() => goToAnnonce(annonce.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder} >
            <div className="card mb-3 bobo ml-3 mt-4" style={{borderColor: color}} >
                <div className="row no-gutters" >
                    <div className="col-md-4">
                        <img src="https://via.placeholder.com/150C/808080 C/O https://placeholder.com/O https://placeholder.com/" className="card-img" alt="Image"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{annonce.titre}&nbsp;<span>{annonce.classe}</span></h5>
                            <p className="card-text">{annonce.editeur}</p>
                            <p className="card-text">{annonce.ville}</p>
                            <p className="card-text">
                                <small className="text-muted">{formatDate(annonce.created)}</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnonceCard;