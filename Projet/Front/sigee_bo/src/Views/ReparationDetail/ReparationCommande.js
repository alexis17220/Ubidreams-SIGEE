import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as CommandeActions} from 'Resources/CommandeRessource';

import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {CommandeTableData} from 'Components/Values/CommandeData/CommandeTableData';
import {actions as InterventionEnginsActions} from 'Resources/InterventionEnginRessources';
import {baseURL} from 'Resources';

const CommandeReparation = ({actions, roles, reparation}) => {
    const [fetchingCommande, setFetchingCommande] = useState(true);
    const [fetching, setFetching] = useState(true);
    const [tablesCommande, setTablesCommande] = useState(CommandeTableData);
    const [options, setOptions] = useState([]);

    // Fonction pour récupérer les données d'intervention liées à la réparation
    const getInterventionData = (reparation) => {
        setFetching(true);
        const idReparation = reparation?.id_reparation;
        if (idReparation) {
            // Appel à l'API pour récupérer les données d'intervention
            fetch(`${baseURL}/interventionEngin/?search=${idReparation}`)
                .then((response) => response.json())
                .then((data) => {
                    const results = data.results;
                    // Crée un tableau d'options pour le sélecteur d'interventions
                    const newOptions = results.map((result) => {
                        return {
                            value: result.id_intervention,
                            label: result.id_intervention,
                            id_intervention: result.id_intervention,
                        };
                    });
                    setOptions(newOptions);

                    // Récupère l'ID d'intervention à partir de newOptions
                    const idIntervention = newOptions[0]?.id_intervention;

                    // Appelle la fonction pour récupérer les données de commande si l'ID d'intervention est disponible
                    if (idIntervention) {
                        getCommandeData(idIntervention);
                    }
                })
                .catch(() => {
                    message.error(I18n.t(`errors.intervention.fetch`));
                });
        }
    };

    // Fonction pour récupérer les données de commande en fonction de l'ID d'intervention
    const getCommandeData = (idIntervention) => {
        setFetchingCommande(true);
        actions
            .getOneIdInterventionCommande(null, {
                query: {
                    search: idIntervention,
                },
                filters: {
                    id_intervention: idIntervention,
                },
            })
            .then(({body: commandes}) => {
                // Met à jour la table
                setTablesCommande({
                    ...tablesCommande,
                    commandes: {
                        ...tablesCommande.commandes,
                        rows: commandes,
                    },
                });
                setFetchingCommande(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.commande.fetch`));
            });
    };

    // Effet pour récupérer les données d'intervention lorsque la réparation change
    useEffect(() => {
        if (reparation) {
            getInterventionData(reparation);
        }
    }, [reparation]);

    // Effet pour récupérer les données de commande lorsque les options changent (sélecteur d'interventions)
    useEffect(() => {
        if (options.length > 0) {
            const idIntervention = options[0]?.id_intervention;
            if (idIntervention) {
                getCommandeData(idIntervention);
            }
        }
    }, [options]);

    // Affichage de la vue en fonction des rôles de l'utilisateur
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    loading={fetchingCommande}
                    tables={tablesCommande}
                    allowSelection={true}
                />
            </Card>
        </main>
    ) : (
        <NoAccess/>
    );
};

// Définition des types des props
CommandeReparation.propTypes = {
    actions: PropTypes.object,
    commande: PropTypes.object,
    roles: PropTypes.array,
    reparation: PropTypes.object,
};

// Fonction pour mapper les actions aux props
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {...CommandeActions, ...InterventionEnginsActions},
        dispatch
    ),
});

// Connexion du composant à Redux et ajout de la navigation
export default withNavigation(
    connect(null, mapDispatchToProps)(CommandeReparation)
);
