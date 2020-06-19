import axios from "axios";
import jwtDecode from "jwt-decode";
import {LOGIN_API, UTILISATEURS_API} from "../config";

export default class AuthenticationService {

    static isAuthenticated: boolean = false;

    static login(form : object) : Promise<boolean>{
        return axios.post(`${LOGIN_API}`, form)
            .then(response  => response.data.token)
            .then(token => {
                // Je stocke mon token dans le localStorage
                window.localStorage.setItem("authToken", token);
                // On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requetes
                axios.defaults.headers["Authorization"] = "Bearer " + token;

                this.isAuthenticated = true;
                return true;
            });
    }

    static getUtilisateurLogin(id: any)  {
            return axios.get(`${UTILISATEURS_API}/${id}`)
                .then(res => this.isEmpty(res.data) ? null : res.data)
                .catch(error => this.handleError(error));
    }

    static isEmpty(data: Object): boolean {
        return Object.keys(data).length === 0;
    }

    static handleError(error: Error): void {
        console.error(error);
    }

    static logout() {
        window.localStorage.removeItem("authToken");
        delete axios.defaults.headers["Authorization"];
        this.isAuthenticated = false;
    }

    static setup() {
        // voir s'il y a un token
        const token = window.localStorage.getItem("authToken");
        // si le token est valide
        if (token) {
            // const jwtData : any = jwtDecode(token);
            const {exp: expiration} : any = jwtDecode(token);
            if (expiration * 1000 > new Date().getTime()) {
                axios.defaults.headers["Authorization"] = "Bearer " + token;
                this.isAuthenticated = true;
                console.log("connexion etablie avec axios");
            }else{
                this.logout();
            }
        }else {
            this.logout();
            console.log("connexion pas etablie avec axios OK");
        }
    }
}