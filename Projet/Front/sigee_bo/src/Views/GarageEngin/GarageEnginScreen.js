import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as GarageEnginsActions} from 'Resources/GarageEnginRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {GarageEnginTableData} from 'Components/Values/GarageEnginData/GarageEnginTableData';

const GarageEnginScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour stocker les données des garageEngins
    const [tables, setTables] = useState(GarageEnginTableData);

    // State pour gérer la pagination
    const [paginationGarage, setPaginationGarage] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
    });

    // Destructuration des propriétés de la pagination
    let {searchText, pageSize, current} = paginationGarage;
    const searchValue = searchText;

    // Gestion de la récupération des données des garageEngins
    const getGarageEnginData = () => {
        setFetching(true);
        actions
            .getGarageEngins(null, {
                query: {
                    limit: pageSize, // Nombre d'éléments par page
                    offset: (current - 1) * pageSize, // Offset pour paginer les résultats
                    search: searchValue, // Terme de recherche
                },
            })
            .then(({body: garageEngin}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    garageEngin: {
                        ...tables.garageEngin,
                        rows: garageEngin,
                    },
                });
                setPaginationGarage((prevState) => ({
                    ...prevState,
                    current: current,
                    total: garageEngin.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.GarageEngins.fetch'));
            });
    };

    // Gestion du changement de pagination et de tri
    const handleTableChange = (pagination) =>
        setPaginationGarage((prevState) => ({
            ...prevState,
            ...pagination,
        }));

    // Gestion de la recherche
    const handleSearch = (searchText) => {
        setPaginationGarage((prevState) => ({
            ...prevState,
            searchText, // Met à jour le texte de recherche avec la valeur saisie par l'utilisateur
            current: 1, // Réinitialise la page courante à 1 pour afficher les premiers résultats de recherche
            pageSize: 10, // Réinitialise la taille de la page à 10 éléments par page
        }));
    };

    useEffect(() => {
        getGarageEnginData(); // Fait un appel pour récupérer les dernières données
    }, [paginationGarage.current, paginationGarage.pageSize, paginationGarage.searchText]);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={{
                        tables: {
                            ...tables.garageEngin,
                            onChange: handleTableChange, // Gestionnaire de changement de pagination et de tri
                            pagination: {
                                position: 'both',
                                showSizeChanger: true,
                                ...paginationGarage,
                            },
                        },
                    }}
                    allowSelection={false}
                    onChangeSearch={handleSearch} // Gestionnaire de recherche
                />
            </Card>
        </main>
    ) : (
        <NoAccess/>
    );
};

GarageEnginScreen.propTypes = {
    actions: PropTypes.object,
    GarageEngins: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...GarageEnginsActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(GarageEnginScreen));
