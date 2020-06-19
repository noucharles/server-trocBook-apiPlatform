import React, {FunctionComponent, useState} from 'react';
import Annonce from '../models/annonce';
import './css/annonce-card.css';
import {useHistory} from "react-router-dom";
import moment from "moment";
import 'moment/locale/fr';
import Pagination from "./pagination";

type Props = {
    annonce: Annonce,
    borderColor?: string,
    biblio?: boolean
};

const AnnonceCardColunn: FunctionComponent<Props> = ({annonce, borderColor='#009688', biblio}) => {

    const [color, setColor] = useState<string>();
    const history = useHistory();

    const showBorder = () => {
        setColor(borderColor);
    };

    const hideBorder = () => {
        setColor('#f5f5f5');
    };

    const goToAnnonce = (id: number) => {
        if (biblio) {
            history.push(`/annonce/${id}`);
        } else {
            history.push(`/annonces/${id}`);
        }
    };

    const formatDate = (str: any) => {
        return moment(str).format('llll');
    };

    return (
        <>
                <div className="card mt-4" style={{cursor:'pointer', borderColor: color}}  onClick={() => goToAnnonce(annonce.id)} onMouseEnter={showBorder} onMouseLeave={hideBorder}>
                    <img src="http://placehold.it/150x150" className="card-img-top" alt="annonces" />
                        <div className="card-body">
                            <h5 className="card-title">{annonce.titre}&nbsp;<span>{annonce.classe}</span></h5>
                            <p className="card-text">{annonce.editeur}</p>
                            <p className="card-text">
                                <small className="text-muted">{formatDate(annonce.created)}</small>
                            </p>
                        </div>
                </div>

        </>
    );
};

export default AnnonceCardColunn;