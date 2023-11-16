import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as GarageEnginsActions} from 'Resources/GarageEnginRessources';
import {Card, Checkbox, Descriptions, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {EnginGarageTableData} from 'Components/Values/EnginData/EnginGarageTableData';

const EnginData = ({actions, roles, engin}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour stocker les données de l'équipement de l'engin
    const [selectedGarageEngin, setSelectedGarageEngins] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EnginGarageTableData);

    // Effet pour récupérer les données de garage de l'engin
    useEffect(() => {
        getGarageEnginData(); // Fait un appel pour récupérer les dernières données
    }, []);

    /**
     * Récupération des données de garage de l'engin
     */
    const getGarageEnginData = () => {
        setFetching(true);
        // Vérifie si id est défini
        if (engin?.immatriculation) {
            actions
                .getOneBasedIdEnginGarageEngins(null, {
                    query: {
                        search: engin.immatriculation,
                    },
                    filters: {
                        id_engin: engin.immatriculation,
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
                    setFetching(false);
                })
                .catch(() => {
                    message.error(I18n.t('errors.GarageEngins.fetch'));
                });
        }
    };

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <div>
                <div style={{padding: '0em 3em 3em 0em'}}>
                    <Card>
                        <Descriptions bordered column={3}>
                            {/* Double Clef */}
                            <Descriptions.Item label={I18n.t('pages.engin.table.cle')}>
                                <Checkbox disabled checked={engin?.double_clef}>
                                    CIS/GST
                                </Checkbox>
                            </Descriptions.Item>
                            {/* Longueur (cm) */}
                            <Descriptions.Item label={I18n.t('pages.engin.table.longueur')}>
                                {engin?.longueur}
                            </Descriptions.Item>
                            {/* Largeur (cm) */}
                            <Descriptions.Item label={I18n.t('pages.engin.table.largeur')}>
                                {engin?.largeur}
                            </Descriptions.Item>
                            {/* Hauteur (cm) */}
                            <Descriptions.Item label={I18n.t('pages.engin.table.hauteur')}>
                                {engin?.hauteur}
                            </Descriptions.Item>
                            {/* Vitesse (km/h) */}
                            <Descriptions.Item label={I18n.t('pages.engin.table.vitesse')}>
                                {engin?.vitesse_max}
                            </Descriptions.Item>
                            {/* PTAC (kg) */}
                            <Descriptions.Item label={I18n.t('pages.engin.table.ptac')}>
                                {engin?.ptac}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
            </div>
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedGarageEngins}
                />
            </Card>
        </main>
    ) : (
        <NoAccess/>
    );
};

EnginData.propTypes = {
    engin: PropTypes.object,
    actions: PropTypes.object,
    GarageEngins: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...GarageEnginsActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(EnginData));
