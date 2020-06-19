import React, { FunctionComponent, useState, useEffect } from 'react';
import Annonce from "../models/annonce";
import AnnonceService from "../services/annonce-service";
import AnnonceCard from "../components/annonce-card";
import Pagination from "../components/pagination";
import Loaderb from "../components/loaderb";

const AnnonceList: FunctionComponent = () => {

    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [categories, setCategories] = useState<Array<string>>(['all', '6 éme', '5 éme', '4 éme', '3 éme', '2 nde', '1 er', 'Tle']);
    const [currentCategorie, setCurrentCategorie] = useState<string>();
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        AnnonceService.getAnnoncesParClasse(currentCategorie).then(annonces => setAnnonces(annonces));
    }, [currentCategorie]);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    const handleChangeCategorie = (categorie: string) => {
        setCurrentCategorie(categorie);
    };

    const handleSearch = (event: any) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    const filteredAnnonces = annonces.filter(a => a.titre.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                                            a.ville.toLowerCase().includes(search.toLocaleLowerCase()) ||
                                                            a.editeur.toLowerCase().includes(search.toLocaleLowerCase())
    );

    const itemsPerPage = 10;

    const start = currentPage * itemsPerPage - itemsPerPage;
    const paginationAnnonces = filteredAnnonces.slice(start, start+itemsPerPage);

    return (
        <div>
            { annonces.length !== 0 ? (
            <div className="container">
                <div className="row">
                    <div className="col-lg-2">
                        <div className="form-group my-4">
                            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechecher un livre.."/>
                        </div>
                        <h1 className="my-4">Catégories</h1>
                        <div className="list-group">
                            {categories.map(categorie => (
                                <button key={categorie} className={"list-group-item" + (currentCategorie === categorie && " active")} onClick={() => handleChangeCategorie(categorie)}>{categorie}</button>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="row">
                            {paginationAnnonces.map(annonce => (
                                <AnnonceCard key={annonce.id} annonce={annonce}/>
                            ))}
                        </div>
                    </div>
                </div>

                {itemsPerPage < filteredAnnonces.length && (
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredAnnonces.length} onPageChanged={handleChangePage}/>
                )}
            </div>
            ) : (
                <Loaderb />
            )}
        </div>
    );
};

export default AnnonceList;