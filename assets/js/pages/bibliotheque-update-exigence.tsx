import React, {FunctionComponent, useEffect, useState} from 'react';
import {RouteComponentProps, useHistory} from "react-router";
import UtilisateurService from "../services/utilisateur-service";
import {toast} from "react-toastify";

type Params = { id: string };

const BibliothequeUpdateExigence: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [user, setUser] = useState({
        exigences : ""
    });

    const [errors, setErrors] = useState({
        exigences : ""
    });

    const history = useHistory();


    useEffect(() => {
        UtilisateurService.getUtilisateur(+match.params.id).then(user =>setUser(user));
    }, [match.params.id]);

    // Gestion des champs TextArea
    const handleChangeTextArea = (event : React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setUser({...user, [name]: value});
    };

    // Gestion du submit
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await UtilisateurService.updateUtilisateur(match.params.id, user);
            setErrors({
                exigences : ""
            });
            toast.success("Vos exigences pour un ou plusieurs troc(s) ont été mises à jour");
            history.replace("/Ma_Bibliothéque");

        } catch (error) {
            const apiErrors : any = {};
            console.log(error.response);
            const { violations } = error.response.data;
            if(violations) {
                violations.forEach((violation : any)  => {
                    apiErrors[violation.propertyPath] = violation.message;
                });

                setErrors(apiErrors);
                toast.error("Une erreur est survenue");
            }
        }

        console.log(user);
    };

    return (
        <>
            <h1 className="col-6 offset-3 text-center">Exigences pour le(s) troc(s)</h1>

            <form onSubmit={handleSubmit} className="col-6 offset-3">

                <div className="form-group">
                    <label htmlFor="exigences">Exigences</label>
                    <textarea className={"form-control" + (errors.exigences && " is-invalid") }  onChange={handleChangeTextArea} placeholder="Veuillez précisez ici l'ensemble de vos conditions pour le troc d'un ou plusieurs livres de maniéres générales (Ce que vous attendez en restant trés flexible). Il est a noté que ce champ est modifiable a tout moment." value={user.exigences} id="exigences" name="exigences" rows={8} />
                    {errors && <p className="invalid-feedback">{errors.exigences}</p>}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmer</button>
                </div>
            </form>
        </>
    )
};

export default BibliothequeUpdateExigence;