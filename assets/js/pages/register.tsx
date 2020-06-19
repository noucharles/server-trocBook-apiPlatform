import React, {useState} from 'react';
import Field from "../components/forms/Field";
import {Link, useHistory} from "react-router-dom";
import UtilisateurService from "../services/utilisateur-service";
import {toast} from "react-toastify";

const Register: React.FC = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        firstName : "",
        lastName : "",
        number : 650000000,
        exigences : ""
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
        firstName : "",
        lastName : "",
        number : "",
        exigences : ""
    });

    const history = useHistory();

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

    // Gestion des champs TextArea
    const handleChangeTextArea = (event : React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setUser({...user, [name]: value});
    };

    // Gestion du submit
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        //apiErrors est une copie de errors
        const apiErrors : any = {};
        if (user.password !== user.passwordConfirm) {
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            toast.error("Des erreurs dans votre formulaire :/");
            return ;
        }

        try {
            await UtilisateurService.postUtilisateur(user);
            setErrors({
                email: "",
                password: "",
                passwordConfirm: "",
                firstName : "",
                lastName : "",
                number : "",
                exigences : ""
            });
            toast.success("Vous etes désormais inscrit, vous pouvez vous connecter.Bienvenue dans la famille :)");
            history.replace("/login");

        } catch (error) {
            console.log(error.response);
            const { violations } = error.response.data;
            if(violations) {
                violations.forEach((violation : any)  => {
                    apiErrors[violation.propertyPath] = violation.message;
                });

                setErrors(apiErrors);
                toast.error("Des erreurs dans votre formulaire :/");
            }
        }

        console.log(user);
    };

    return (
        <>
            <h1 className="col-6 offset-3 text-center">INSCRIPTION</h1>

            <form onSubmit={handleSubmit} className="col-6 offset-3">

                <Field name="firstName" label="Prénom" value={user.firstName} onChange={handleChange} placeholder="Saisissez votre prénom" type="text" error={errors.firstName}/>

                <Field name="lastName" label="Nom" value={user.lastName} onChange={handleChange} placeholder="Saisissez votre nom" type="text" error={errors.lastName}/>

                <div className="form-group">
                    <label htmlFor="number">Numéro de téléphone (De préférence actif sur Whatsapp)</label>
                    <input type="number" onChange={handleChangeNumber} value={user.number} min="650000000" max="699999999" id="number" className="form-control" name="number" placeholder="Saisissez votre numéro"/>
                </div>

                <Field name="email" label="Adresse email" value={user.email} onChange={handleChange} placeholder="Adresse email de connexion" type="email" error={errors.email}/>

                <Field name="password" label="Mot de passe" value={user.password} onChange={handleChange} placeholder="Votre mot de passe ultra sécurisé" type="password" error={errors.password}/>

                <Field name="passwordConfirm" label="Confirmation de mot de passe" value={user.passwordConfirm} onChange={handleChange} placeholder="Confirmer votre mot de passe" type="password" error={errors.passwordConfirm}/>

                <div className="form-group">
                    <label htmlFor="exigences">Exigences</label>
                    <textarea className={"form-control" + (errors.exigences && " is-invalid") }  onChange={handleChangeTextArea} placeholder="Veuillez précisez ici l'ensemble de vos conditions pour le troc d'un ou plusieurs livres de maniéres générales (Ce que vous attendez en restant trés flexible). Il est a noté que ce champ est modifiable a tout moment." value={user.exigences} id="exigences" name="exigences" rows={5} />
                    {errors && <p className="invalid-feedback">{errors.exigences}</p>}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmer</button>
                    <Link to="/login" className="btn btn-link">J'ai déja un compte</Link>
                </div>
            </form>
        </>
    )
};

export default Register;