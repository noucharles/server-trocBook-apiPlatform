export default class Utilisateur {
    // 1. Typage des propiétés d'un utilisateur.
    id : number;
    email ?: string;
    roles ?: string;
    password ?: string;
    firstName ?: string;
    lastName ?: string;
    number ?: number;
    exigences ?: string;
    annonces ?: Array<Annonce>;

    // 2. Définition des valeurs par défaut des propriétés d'un utilisateur.
    constructor(
        id : number,
        email ?: string,
        roles?: string,
        password ?: string,
        firstName ?: string,
        lastName ?: string,
        number ?: number,
        exigences ?: string,
        annonces ?: Array<Annonce>
    ) {
        // 3. Initialisation des propiétés d'un utilisateur.
        this.id = id;
        this.email = email;
        this.roles = roles;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.number = number;
        this.annonces = annonces;
    }
}

export interface Annonce {
    id : number;
    ville : string;
    classe : string;
    titre : string;
    editeur : string;
    parution : number;
    description : string;
    created : string;
}