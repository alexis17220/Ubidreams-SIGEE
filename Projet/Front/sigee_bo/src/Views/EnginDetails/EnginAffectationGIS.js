// Import des bibliothèques et des composants nécessaires
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as AffectationHistoGisementActions} from 'Resources/AffectationHistoGisementRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {EnginAttributionTableData} from "Components/Values/EnginData/EnginAffectationTableData";


// Définition du composant AffectationScreen
const AffectationScreen = ({actions, roles, engin}) => {
    // État local pour gérer le chargement des données d'affectation de gisement
    const [fetchingGis, setFetchingGis] = useState(true);

    // État local pour stocker les affectations de gisement sélectionnées
    const [selectedAffectationGis, setSelectedAffectationGis] = useState([]);

    // État local pour stocker les données de la table d'affectations de gisement
    const [tablesGis, setTablesGis] = useState(EnginAttributionTableData);

    // Effet pour récupérer les données d'affectation de gisement lorsque la propriété "engin" change
    useEffect(() => {
        if (engin.id_engin) {
            getAffectationGisData(engin.id_engin);
        }
    }, [engin]);

    // Fonction pour récupérer les données d'affectation de gisement
    const getAffectationGisData = () => {
        setFetchingGis(true);
        actions
            .getOneBasedIdEnginAffectationHistoGisement(null, {
                query: {
                    search: engin.immatriculation,
                },
                filters: {
                    id_engin: engin.immatriculation
                }
            })
            .then(({body: affectationHistoGisement}) => {
                // Met à jour la table avec les nouvelles données
                setTablesGis({
                    ...tablesGis,
                    affectationHistoGisement: {
                        ...tablesGis.affectationHistoGisement,
                        rows: affectationHistoGisement,
                    },
                });
                setFetchingGis(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectGis.fetch`));
            });
    };

    // Rendu du composant
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <div>
                    {/* Affichage de la table d'affectations de gisement */}
                    <TableLayout
                        loading={fetchingGis}
                        tables={tablesGis}
                        updateSelectedData={setSelectedAffectationGis}
                        allowSelection={false}
                    />
                </div>
            </Card>
        </main>
    ) : (
        // Affichage d'une page d'accès interdit si l'utilisateur n'a pas les rôles requis
        <NoAccess/>
    );
};

// Propriétés attendues par le composant
AffectationScreen.propTypes = {
    actions: PropTypes.object,
    affectationHistoGis: PropTypes.object,
    roles: PropTypes.array,
};

// Liaison des actions Redux au composant
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AffectationHistoGisementActions}, dispatch),
});

// Export du composant connecté avec la navigation
export default withNavigation(
    connect(null, mapDispatchToProps)(AffectationScreen)
);
