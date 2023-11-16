import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as RequeteGasActions} from 'Resources/RequeteGasRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {RequeteGasTableData} from "Components/Values/RequeteGasData/RequeteGasTableData";

const RequeteGasScreen = ({actions, roles}) => {
    // État local pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);
    // État local pour les boutons dans le composant TableLayout
    const [button, setButtons] = useState({});
    // État local pour stocker les éléments sélectionnés dans la table
    const [selectedRequeteGas, setSelectedRequeteGas] = useState([]);
    // État local pour les données affichées dans le tableau
    const [tables, setTables] = useState(RequeteGasTableData);

    // Effet pour récupérer les données de requeteGas au chargement de la page
    useEffect(() => {
        getRequeteGasData();
    }, []);

    // Fonction pour récupérer les données de requeteGas
    const getRequeteGasData = () => {
        setFetching(true);
        actions
            .getRequeteGas(null, {
                query: {
                    limit: 50,
                }
            })
            .then(({body: requeteGas}) => {
                // Met à jour la table avec les nouvelles données
                setTables({
                    ...tables,
                    requeteGas: {
                        ...tables.requeteGas,
                        rows: requeteGas,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.requeteGas.fetch`));
            });
    };
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };    // Affichage du composant en fonction des rôles
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedRequeteGas}
                    onChangeSearch={handleSearch}
                />
            </Card>
        </main>
    ) : (
        <NoAccess/>
    );
};

RequeteGasScreen.propTypes = {
    actions: PropTypes.object,
    requeteGass: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...RequeteGasActions}, dispatch),
});

export default withNavigation(
    connect(null, mapDispatchToProps)(RequeteGasScreen)
);
