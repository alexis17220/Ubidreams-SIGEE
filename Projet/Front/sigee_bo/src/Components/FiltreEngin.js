import {Select} from 'antd';
import {useState} from 'react';

const {Option} = Select;

const options = [
    {label: 'CLASSIFICATION', value: 'classification'},
    {label: 'GAMME', value: 'gamme'},
    {label: 'MARQUE', value: 'marque'},
    {label: 'APPCOMM', value: 'appcomm'},
    {label: 'EQUIPEUR', value: 'equipeur'},
    {label: 'TYPE TECH', value: 'typeTech'},
    {label: 'IMMAT. PHY', value: 'immatPhy'},
    {label: 'CARROSSERIE', value: 'carrosserie'},
    {label: 'D_MISE_CIRCULATION', value: 'dMiseCirculation'},
    {label: 'ANNEE', value: 'annee'},
    {label: 'PROPRIETAIRE', value: 'proprietaire'},
    {label: 'CATEGORIE', value: 'categorie'},
    {label: 'SORTIE INVENTAIRE VILLE', value: 'sortieInventaireVille'},
    {label: 'ETAT', value: 'etat'},
    {label: 'FVADMINISTRATIVE', value: 'fvadministrative'},
    {label: 'SORTIE SERVICE', value: 'sortieService'},
    {label: 'NNO', value: 'nno'},
    {label: 'TYPE OPS', value: 'typeOps'},
    {label: 'TYPE SERV', value: 'typeServ'},
    {label: 'ADM', value: 'adm'},
    {label: 'COMPTEUR', value: 'compteur'},
    {label: 'DUREE VIE THEORi.', value: 'dureeVieTheori'},
    {label: 'POSITION', value: 'position'},
    {label: 'N°SERIE', value: 'nSerie'},
    {label: 'ENTREE SERVICE', value: 'entreeService'},
    {label: 'CAT.AFFEC', value: 'catAffec'},
    {label: 'STATUT OPS', value: 'statutOps'},
    {label: 'STATUT TECH', value: 'statutTech'},
    {label: 'COMPTEUR CORRIGE', value: 'compteurCorrige'},
    {label: 'HORAMETRE', value: 'horametre'},
    {label: 'N°FOLIO', value: 'nFolio'},
    {label: 'N°DOSSIER', value: 'nDossier'},
    {label: 'N°INVENTAIRE VILLE', value: 'nInventaireVille'},
    {label: 'OBSERVATIONS', value: 'observations'},
    {label: 'LIBELLE', value: 'libelle'},
    {label: 'NUMERO', value: 'numero'},
    {label: 'AGE ENGIN', value: 'ageEngin'},
    {label: 'ATTRIBUTION', value: 'attribution'},
    {label: 'RADIO', value: 'radio'},
    {label: 'ATTELAGE', value: 'attelage'},
    {label: 'ENTREE REPARATION', value: 'Entrée Réparation'},
    {label: 'SORTIE REPARATION', value: 'Sortie Réparation'},
    {label: 'RAISON REPARATION', value: 'Raison Réparation'}
];


const Filtre = () => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterChange = (value) => {
        setSelectedFilters(value);
    };

    return (
        <Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="Select filters"
            onChange={handleFilterChange}
            value={selectedFilters}
        >
            {options.map((option) => (
                <Option key={option.value} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    );
};

export default Filtre;

