import React, {FunctionComponent, useEffect, useState} from 'react';
import {RouteComponentProps, useHistory} from "react-router";
import UtilisateurService from "../services/utilisateur-service";
import Field from "../components/forms/Field";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

type Params = { id: string };

const BibliothequeUpdateInfos: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {

    const [user, setUser] = useState({
        email: "",
        firstName : "",
        lastName : "",
        number : "",
    });

    const [errors, setErrors] = useState({
        email: "",
        firstName : "",
        lastName : "",
        number : "",
    });
    const history = useHistory();

    useEffect(() => {
        UtilisateurService.getUtilisateur(+match.params.id).then(user =>setUser(user));
    }, [match.params.id]);

    // Gestion des champs Input
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setUser({...user, [name]: value});
    };

    // Gestion des champs Input Number
    const handleChangeNumber = (event : React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseInt(event.currentTarget.value);
        const name = event.currentTarget.name;

        setUser({...user, [name]: value});
    };

    // Gestion du submit
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            console.log(user);
            await UtilisateurService.updateUtilisateur(match.params.id, user);
            setErrors({
                email: "",
                firstName : "",
                lastName : "",
                number : "",
            });
            toast.success("Vos informations ont été mises à jour");
            history.replace("/Ma_Bibliothéque");

        } catch ({response}) {
            console.log(response.data);
            const { violations } = response.data;
            if(violations) {
                const apiErrors : any = {};
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
            <div>
                <h1 className="col-6 offset-3">Modifier mes infos</h1>
                    <form onSubmit={handleSubmit} className="col-6 offset-3">

                        <Field name="firstName" label="Prénom" value={user.firstName} onChange={handleChange} placeholder="Saisissez votre prénom" type="text" error={errors.firstName}/>

                        <Field name="lastName" label="Nom" value={user.lastName} onChange={handleChange} placeholder="Saisissez votre nom" type="text" error={errors.lastName}/>

                        <Field name="email" label="Adresse email" value={user.email} onChange={handleChange} placeholder="Adresse email de connexion" type="email" error={errors.email}/>

                        <div className="form-group">
                            <label htmlFor="number">Numéro de téléphone (De préférence actif sur Whatsapp)</label>
                            <input type="number" onChange={handleChangeNumber} value={user.number} min="650000000" max="699999999" id="number" className="form-control" name="number" placeholder="Saisissez votre numéro"/>
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-success">Confirmer</button>
                        </div>

                    </form>
            </div>
        </>
    )
};

export default BibliothequeUpdateInfos;