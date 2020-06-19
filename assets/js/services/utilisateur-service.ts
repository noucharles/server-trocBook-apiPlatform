import axios from "axios";
import {ROUTE_ID_ANNONCES, UTILISATEURS_API} from "../config";

export default class UtilisateurService {

    static getUtilisateur(id: number) {
        return axios.get(`${UTILISATEURS_API}/${id}`)
            .then(res => this.isEmpty(res.data) ? null : res.data);
    }

    static postUtilisateur(utilisateur: any) {
        return axios.post(UTILISATEURS_API,utilisateur);
    }

    static updateUtilisateur(id: any, utilisateur: any) {
        let nbreAnnonce = [];

        for(let i: number = 0; i < utilisateur.annonces.length; i++){
            nbreAnnonce.push(`${ROUTE_ID_ANNONCES}/${utilisateur.annonces[i].id}`);
        }

        return axios.put(`${UTILISATEURS_API}/${id}`, {...utilisateur,
            annonces: nbreAnnonce
        });
    }

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}