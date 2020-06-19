import React, { useState } from 'react';
import AuthenticationService from "../services/authentication-service";
import {Link, useHistory} from "react-router-dom";
import Field from "../components/forms/Field";
import {toast} from "react-toastify";

type Params = {
    onLogin: any
};

const Login: React.FC<Params> = ({ onLogin }: Params) => {

const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const history = useHistory();

    // Gestion des champs
    const handleChange = (event : React.ChangeEvent<HTMLInputElement>): void => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;

        setForm({...form, [name]: value});
    };

    // Gestion du submit
    const handleSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await AuthenticationService.login(form);
            setError("");
            onLogin(true);
            toast.success("Vous êtes désormais connecté");
            history.replace("/annonce/new");
        } catch (e) {
            setError("Aucun compte ne posséde cet Adresse email ou alors les informations ne correspondent pas");
            toast.error("Une erreur est survnue :/");
        }
    };

    return (
        <div  className="container-fluid">
            <h1 className="col-5 offset-3 mt-4">Connexion a l'application</h1>

            <form  onSubmit={handleSubmit} className="col-5 offset-3">
                <Field name="username" label="Adresse email" value={form.username} onChange={handleChange} placeholder="Adresse email de connexion" type="text" error={error}/>
                <Field name="password" label="Mot de passe" value={form.password} onChange={handleChange} placeholder="Mot de passe" type="password" error=""/>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">Je me connecte</button>
                    <Link to="/register" className="btn btn-link">Pas de compte ?</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;