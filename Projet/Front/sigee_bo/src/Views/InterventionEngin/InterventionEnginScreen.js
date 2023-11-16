import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as InterventionEnginsActions} from 'Resources/InterventionEnginRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {InterventionEnginTableData} from 'Components/Values/InterventionEnginData/InterventionEnginTableData';

const InterventionEnginScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour stocker les IDs des interventions d'engins sélectionnées
    const [selectedInterventionEngin, setSelectedInterventionEngins] = useState([]);

    // State pour stocker les données du tableau des interventions d'engins
    const [tables, setTables] = useState(InterventionEnginTableData);

    // State pour gérer la pagination et la recherche
    const [paginationIntervention, setPaginationIntervention] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
    });

    let {searchText, pageSize, current} = paginationIntervention;
    const searchValue = searchText;

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({});

        // Récupération des données des interventions d'engins
        getInterventionEnginData();
    }, [paginationIntervention.current, paginationIntervention.pageSize, paginationIntervention.searchText]);

    /**
     * Récupération des données des interventions d'engins
     */
    const getInterventionEnginData = () => {
        setFetching(true);
        actions
            .getInterventionEngins(null, {
                query: {
                    limit: pageSize, // Nombre d'éléments par page
                    offset: (current - 1) * pageSize, // Offset pour paginer les résultats
                    search: searchValue, // Terme de recherche
                },
            })
            .then(({body: interventionEngins}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    interventionEngins: {
                        ...tables.interventionEngins,
                        rows: interventionEngins,
                    },
                });
                setPaginationIntervention((prevState) => ({
                    ...prevState,
                    current: current,
                    total: interventionEngins.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.interventionE.fetch'));
            });
    };

    // Gestionnaire de changement de pagination et de tri
    const handleTableChange = (pagination) => setPaginationIntervention((prevState) => ({...prevState, ...pagination}));

    // Gestionnaire de recherche
    const handleSearch = (searchText) => {
        setPaginationIntervention((prevState) => ({
            ...prevState,
            searchText, // Met à jour le texte de recherche avec la valeur saisie par l'utilisateur
            current: 1, // Réinitialise la page courante à 1 pour afficher les premiers résultats de recherche
            pageSize: 10, // Réinitialise la taille de la page à 10 éléments par page
        }));
    };

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={{
                        document: {
                            ...tables.interventionEngins,
                            onChange: handleTableChange,
                            pagination: {
                                position: 'both',
                                showSizeChanger: true,
                                ...paginationIntervention,
                            },
                        },
                    }}
                    allowSelection={false}
                    updateSelectedData={setSelectedInterventionEngins}
                    onChangeSearch={handleSearch}
                    onChange={handleTableChange}
                />
            </Card>
        </main>
    ) : (
        <NoAccess/>
    );
};

InterventionEnginScreen.propTypes = {
    actions: PropTypes.object,
    interventionEngins: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...InterventionEnginsActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(InterventionEnginScreen));
