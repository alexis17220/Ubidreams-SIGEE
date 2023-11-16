import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as ReparationEnginsActions} from 'Resources/ReparationsEnginRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {ReparationEnginTableData} from "Components/Values/ReparationEnginData/ReparationEnginTableData";

const ReparationEnginScreen = ({actions, roles}) => {
    // État local pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);
    // État local pour les boutons dans le composant TableLayout
    const [button, setButtons] = useState({});
    // État local pour stocker les éléments sélectionnés dans la table
    const [selectedReparationEngin, setSelectedReparationEngins] = useState([]);
    // État local pour les données affichées dans le tableau
    const [tables, setTables] = useState(ReparationEnginTableData);

    // État local pour la pagination
    const [paginationReparation, setPaginationReparation] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
    });

    // Destructuring des valeurs de la pagination pour plus de clarté
    const {searchText, pageSize, current} = paginationReparation;
    const searchValue = searchText;

    // Fonction pour récupérer les données de reparationEngin
    const getReparationEnginData = () => {
        setFetching(true);
        const query = {
            limit: pageSize,
            offset: (current - 1) * pageSize,
            search: searchValue,
        };

        actions
            .getReparationEngins(null, {query})
            .then(({body: reparationEngins}) => {
                // Met à jour la table avec les nouvelles données
                setTables((prevState) => ({
                    ...prevState,
                    reparationEngins: {
                        ...prevState.reparationEngins,
                        rows: reparationEngins,
                    },
                }));

                // Met à jour la pagination avec le nombre total d'éléments
                setPaginationReparation((prevState) => ({
                    ...prevState,
                    total: reparationEngins.count,
                }));

                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.reparationE.fetch`));
            });
    };

    // Fonction pour gérer la recherche dans la table
    const handleSearch = (searchText) => {
        setPaginationReparation((prevState) => ({
            ...prevState,
            searchText,
            current: 1,
            pageSize: 10,
        }));
        // Appel aux données avec les nouveaux paramètres de recherche
        getReparationEnginData();
    };

    // Fonction pour gérer les changements de pagination et de tri
    const handleTableChange = (pagination) => {
        setPaginationReparation((prevState) => ({
            ...prevState,
            ...pagination,
        }));
    };

    // Effet pour appeler les données de reparationEngin au chargement de la page
    useEffect(() => {
        getReparationEnginData();
    }, [paginationReparation.current, paginationReparation.pageSize, paginationReparation.searchText]);

    // Affichage du composant en fonction des rôles
    return (
        map(roles, ({name}) => name) !== 'COMPANY_MANAGER' &&
        map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
            <main className="screen">
                <Card>
                    <TableLayout
                        buttons={button}
                        loading={fetching}
                        tables={{
                            reparationEngins: {
                                ...tables.reparationEngins,
                                onChange: handleTableChange,
                                pagination: {
                                    position: 'both',
                                    showSizeChanger: true,
                                    ...paginationReparation,
                                },
                            },
                        }}
                        allowSelection={false}
                        updateSelectedData={setSelectedReparationEngins}
                        onChangeSearch={handleSearch}
                        onChange={handleTableChange}
                    />
                </Card>
            </main>
        ) : (
            <NoAccess/>
        )
    );
};

ReparationEnginScreen.propTypes = {
    actions: PropTypes.object,
    reparationEnginss: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...ReparationEnginsActions}, dispatch),
});

export default withNavigation(
    connect(null, mapDispatchToProps)(ReparationEnginScreen)
);
