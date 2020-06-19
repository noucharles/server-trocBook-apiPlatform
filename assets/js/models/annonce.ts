export default class Annonce {
    // 1. Typage des propiétés d'une annonce.
    id : number;
    ville : string;
    classe ?: string;
    titre : string;
    editeur : string;
    parution ?: number;
    description ?: string;
    created ?: string;
    user ?: User;

    // 2. Définition des valeurs par défaut des propriétés d'une annonce.
    constructor(
        id : number,
        ville : string = "",
        classe ?: string,
        titre : string = "",
        editeur : string = "",
        parution ?: number,
        description ?: string,
        created ?: string,
        user ?: User
    ) {
        // 3. Initialisation des propiétés d'une annonce.
        this.id = id;
        this.ville = ville;
        this.classe = classe;
        this.titre = titre;
        this.editeur = editeur;
        this.parution = parution;
        this.description = description;
        this.created = created;
        this.user = user;
    }
}

export interface User {
    id : number;
    email : string;
    roles : string;
    password : string;
    firstName : string;
    lastName : string;
    number : number;
    exigences : string;
}