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
import {EnginInterventionTableData} from 'Components/Values/EnginData/EnginInterventionTableData';

const InterventionEnginScreen = ({actions, roles, engin}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour stocker les données des interventions de l'engin
    const [selectedInterventionEngin, setSelectedInterventionEngins] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EnginInterventionTableData);

    // Effet pour récupérer les données d'intervention de l'engin
    useEffect(() => {
        if (engin?.id_engin) {
            getInterventionEnginData(engin.id_engin); // Fait un appel pour récupérer les dernières données
        }
    }, [engin]);

    /**
     * Récupération des données d'intervention de l'engin
     */
    const getInterventionEnginData = () => {
        setFetching(true);
        // Vérifie si id est défini
        if (engin?.immatriculation) {
            actions
                .getOneBasedOnIdEnginInterventionEngins(null, {
                    query: {
                        search: engin.immatriculation,
                    },
                    filters: {
                        id_engin: engin.immatriculation,
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
                    setFetching(false);
                })
                .catch(() => {
                    message.error(I18n.t('errors.interventionE.fetch'));
                });
        }
    };

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedInterventionEngins}
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
