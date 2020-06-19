import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Field";
import {RouteComponentProps, useHistory} from "react-router";
import {Link} from "react-router-dom";
import AnnonceService from "../services/annonce-service";
import axios from "axios";
import {toast} from "react-toastify";
import {ANNONCES_API} from "../config";

type Params = { id: string };

const AnnonceAdd: React.FC<RouteComponentProps<Params>> = ({ match }) => {

    const id  = match.params.id;

    const [form, setForm] = useState({
        ville: "",
        classe: '6 éme',
        titre: "",
        editeur: "",
        parution: 2010,
        description: ""
    });

    const classes: string[] = ['6 éme', '5 éme', '4 éme', '3 éme', '2 nde', '1 er', 'Tle'];

    const [error, setError] = useState({
        ville: "",
        titre: "",
        editeur: "",
        parution: "",
        description: ""
    });

    const [editing, setEditing] = useState(false);

    // Recuperation des annonces en fonction de l'identtifiant
    const fetchAnnonce = async (id: any) => {
        try {
            const data = await axios.get(`${ANNONCES_API}/${id}`)
                .then(response => response.data);

            setForm({ville: data.ville , classe: data.classe!, titre: data.titre, editeur: data.editeur, parution: data.parution, description: data.description});
        } catch (e) {
        }

    };

    //Chargement de l'annonce si besoin au changement du composant ou au changement de l'identifiant
    useEffect(() =>  {
        if (id !== "new") {
            setEditing(true);
            fetchAnnonce(id);
        }
    }, [id]);

    const history = useHistory();

    // Gestion des champs Input
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setForm({...form, [name]: value});
    };

    // Gestion des champs Input Parution
    const handleChangeParution = (event : React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.currentTarget.value);
        const name = event.currentTarget.name;

        setForm({...form, [name]: value});
    };

    // Gestion des champs Select
    const handleChangeSelect = (event : React.ChangeEvent<HTMLSelectElement>): void => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setForm({...form, [name]: value});
    };

    // Gestion des champs TextArea
    const handleChangeTextArea = (event : React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setForm({...form, [name]: value});
    };

    // Gestion du submit supprimé annonce
    const handleAlternate = async (event: any ) => {
        try{
            event.preventDefault();
            await AnnonceService.deleteAnnonce(id, form);
            toast.success("Annonce supprimé");
            history.replace("/Ma_Bibliothéque");
        } catch ({response}) {
            const { violations } = response.data;
            if(violations) {
                const apiErrors : any = {};
                violations.forEach((violation : any)  => {
                apiErrors[violation.propertyPath] = violation.message;
            });
            toast.error("Une erreur est survenue");
            setError(apiErrors);
        }
        }
    };

    // Gestion du submit modifié annonce
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {

            if (editing) {
                await AnnonceService.updateAnnonce(id, form);
                await toast.success("Annonce mise à jour");
                history.replace("/Ma_Bibliothéque");
            } else {
                await AnnonceService.postAnnonce(form);
                setError({
                    ville: "",
                    titre: "",
                    editeur: "",
                    parution: "",
                    description: ""
                });
                toast.success("Annonce crée avec succes");
                history.replace("/annonces");
            }
        } catch ({response}) {
            const { violations } = response.data;
            if(violations) {
                const apiErrors : any = {};
                violations.forEach((violation : any)  => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                toast.error("Une erreur est survenue");
                setError(apiErrors);
            }
        }

    };

    return (
        <>
            {!editing && <h1 className="col-5 offset-3">Création d'une annonce</h1> || <h1 className="col-5 offset-3">Modification d'une annonce</h1>}

            <form onSubmit={handleSubmit} className="col-5 offset-3">
                <Field name="titre" label="Titre" value={form.titre} onChange={handleChange} placeholder="Titre du livre" type="text" error={error.titre}/>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="classes">Classe</label>
                    </div>
                    <select value={form.classe} name="classe" onChange={handleChangeSelect} className="custom-select" id="classes">
                        {classes.map(classe => (
                            <option key={classe} value={classe}>{classe}</option>
                        ))}
                    </select>
                </div>

                <Field name="editeur" label="Maison d'édtition" value={form.editeur} onChange={handleChange} placeholder="Maison d'édtition du livre" type="text" error={error.editeur}/>

                <div className="form-group">
                    <label htmlFor="parution">Année de parution</label>
                    <input type="number" onChange={handleChangeParution} value={form.parution} min="1970" id="parution" className="form-control" name="parution" />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description du livre</label>
                    <textarea className={"form-control" + (error.description && " is-invalid") }  onChange={handleChangeTextArea} placeholder="Veuillez précisez ici l'état du livre et donner le maximun d'information possible" value={form.description} id="description" name="description" rows={4} />
                    {error && <p className="invalid-feedback">{error.description}</p>}
                </div>

                <Field name="ville" label="Quartier" value={form.ville} onChange={handleChange} placeholder="Votre quartier" type="text" error={error.ville}/>

                <div className="form-group">
                    <button type="submit" name="save" className="btn btn-success">Enregistrer</button>
                    {editing && <button type="button" onClick={handleAlternate} name="delete" className="mx-3 btn btn-danger">Supprimer l'annonce</button>}
                    <Link to="/annonces" className="btn btn-link">Retour à la liste d'annonces</Link>
                </div>
            </form>
        </>
    )
};

export default AnnonceAdd;