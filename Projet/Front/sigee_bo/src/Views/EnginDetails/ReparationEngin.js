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
import {EnginReparationTableData} from 'Components/Values/EnginData/EnginReparationTableData';

const ReparationEnginScreen = ({actions, roles, engin}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour stocker les données des réparations de l'engin
    const [selectedReparationEngin, setSelectedReparationEngins] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EnginReparationTableData);

    // Effet pour récupérer les données de réparation de l'engin
    useEffect(() => {
        if (engin?.id_engin) {
            getReparationEnginData(engin.id_engin); // Fait un appel pour récupérer les dernières données
        }
    }, [engin]);

    /**
     * Récupération des données de réparation de l'engin
     */
    const getReparationEnginData = () => {
        setFetching(true);
        // Vérifie si id est défini
        if (engin?.immatriculation) {
            actions
                .getOneBasedOnIdEnginReparationEngins(null, {
                    query: {
                        search: engin.immatriculation,
                    },
                    filters: {
                        id_engin: engin.immatriculation,
                    },
                })
                .then(({body: reparationEngins}) => {
                    // Met à jour la table de données
                    setTables({
                        ...tables,
                        reparationEngins: {
                            ...tables.reparationEngins,
                            rows: reparationEngins,
                        },
                    });
                    setFetching(false);
                })
                .catch(() => {
                    message.error(I18n.t('errors.reparationE.fetch'));
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
                    updateSelectedData={setSelectedReparationEngins}
                />
            </Card>
        </main>
    ) : (
        <NoAccess/>
    );
};

ReparationEnginScreen.propTypes = {
    actions: PropTypes.object,
    reparationEngins: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...ReparationEnginsActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(ReparationEnginScreen));
