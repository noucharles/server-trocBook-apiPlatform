import Annonce from "../models/annonce";
import axios from "axios";
import { ANNONCES_API } from "../config";

export default class AnnonceService {

    static getAnnonce(id: number): Promise<Annonce> {
        return axios.get(`${ANNONCES_API}/${id}`)
            .then(res => this.isEmpty(res.data) ? null : res.data);
    }

    static getAnnoncesParClasse(classe?: string): Promise<Annonce[]> {
            if(classe){

                if(classe === 'all') {
                    return axios.get(`${ANNONCES_API}?order[created]=desc`)
                        .then(res => res.data["hydra:member"])
                        .catch(error => this.handleError(error));
                }
                return axios.get(`${ANNONCES_API}?order[created]=desc&classe=${classe}`)
                    .then(res => res.data["hydra:member"])
                    .catch(error => this.handleError(error));
            }
        return axios.get(`${ANNONCES_API}?order[created]=desc`)
            .then(res => res.data["hydra:member"])
            .catch(error => this.handleError(error));
    }

    static  updateAnnonce(id: any, annonce : any) {
        return axios.put(`${ANNONCES_API}/${id}`,annonce);
    }

    static deleteAnnonce(id: any, annonce : any) {
        return axios.delete(`${ANNONCES_API}/${id}`,annonce);
    }

    static  postAnnonce(annonce: any) {
        return axios.post(ANNONCES_API,annonce);
    }

    static getAnnoncesParPage(num: number): Promise<Annonce[]> {
        return fetch(`${ANNONCES_API}?page=${num}&order[created]=desc`)
            .then(response => response.json())
            .then(res => res["hydra:member"])
            .catch(error => this.handleError(error));
    }


    static searchAnnonce(term: string): Promise<Annonce[]> {
        return axios.get(`${ANNONCES_API}?titre=${term}`)
            .then(response => response.data)
            .catch(error => this.handleError(error));
    }

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }
}