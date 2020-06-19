import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom";
import AnnonceList from "./pages/annonce-list";
import AnnonceDetail from "./pages/annonce-detail";
import AnnonceUtilisateur from "./pages/annonce-utilisateur";
import Login from "./pages/login";
import Navbar from "./components/navbar";
import AnnonceAdd from "./pages/annonce-add";
import PrivateRoute from "./PrivateRoute";
import Bibliotheque from "./pages/bibliotheque";
import AuthenticationService from "./services/authentication-service";
import PageNotFound from "./pages/page-not-found";
import Register from "./pages/register";
import BibliothequeUpdateInfos from "./pages/bibliotheque-update-infos";
import BibliothequeUpdateExigence from "./pages/bibliotheque-update-exigence";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
AuthenticationService.setup();

const App: React.FC = () => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthenticationService.isAuthenticated);

    return (
        <Router>
            <div>
                {/*La barre de navigation commun à toutes les pages*/}
                <Navbar isAuthenticated={isAuthenticated} onLogout={setIsAuthenticated} />
                {/* Le systéme de gestion des routes de notre application*/}
                <Switch>
                    <Route exact path="/" component={AnnonceList}/>
                    <Route exact path="/login" render={props => <Login onLogin={setIsAuthenticated}/>}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/annonces" component={AnnonceList}/>
                    <PrivateRoute exact path="/annonce/:id" component={AnnonceAdd}/>
                    <Route exact path="/annonces/utilisateur/:id" component={AnnonceUtilisateur}/>
                    <Route exact path="/annonces/:id" component={AnnonceDetail}/>
                    <PrivateRoute exact path="/Ma_Bibliothéque" component={Bibliotheque}/>
                    <PrivateRoute exact path="/Ma_Bibliothéque/update/infos/:id" component={BibliothequeUpdateInfos}/>
                    <PrivateRoute exact path="/Ma_Bibliothéque/update/exigences/:id" component={BibliothequeUpdateExigence}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>

            <ToastContainer position={"bottom-left"}/>
        </Router>
    )
};
const rootElement : any = document.querySelector('#app');
ReactDOM.render(<App />, rootElement);