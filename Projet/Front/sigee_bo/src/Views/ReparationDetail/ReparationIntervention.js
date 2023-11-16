// Import des modules et composants nécessaires
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes} from 'lodash';
import {actions as InterventionEnginsActions} from 'Resources/InterventionEnginRessources';
import {Button, Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {InterventionReparationTableData} from 'Components/Values/InterventionEnginData/InterventionReparationTableData';
import InterventionsModal from 'Components/Modals/InterventionModal/InterventionsModal';

const InterventionData = ({actions, reparation}) => {
    // États du composant
    const [fetching, setFetching] = useState(true);
    const [button, setButtons] = useState({});
    const [openedModal, setOpenedModal] = useState('');
    const [intervention, setIntervention] = useState();
    const [modalArchive, setModalArchive] = useState(false);
    const [selectedIntervention, setSelectedInterventions] = useState([]);
    const [tables, setTables] = useState(InterventionReparationTableData);

    useEffect(() => {
        // Effectue l'action lorsque l'ID de réparation change
        if (reparation?.id_reparation) {
            // Définit les boutons pour créer une intervention
            setButtons({
                create: {
                    label: I18n.t('common.create'),
                    icon: <PlusOutlined/>,
                    action: showInterventionsModal,
                },
            });

            // Configuration pour la table d'interventions de réparation
            tables.interventionReparation.onRow = (record, id) => ({
                onClick: () => updateIntervention(record, id),
            });

            // Récupère les données d'intervention de réparation
            getInterventionData();
        }
    }, [reparation]);

    // Fonction pour récupérer les données d'intervention de réparation depuis l'API
    const getInterventionData = () => {
        setFetching(true);
        if (reparation?.id_reparation) {
            actions
                .getOneBasedOnIdReparationInterventionEngins(null, {
                    query: {
                        search: reparation.id_reparation,
                    },
                    filters: {
                        id_reparation: reparation.id_reparation,
                    },
                })
                .then(({body: interventionReparation}) => {
                    // Met à jour la table
                    setTables({
                        ...tables,
                        interventionReparation: {
                            ...tables.interventionReparation,
                            rows: interventionReparation,
                        },
                    });
                    setFetching(false);
                })
                .catch(() => {
                    message.error(I18n.t(`errors.intervention.fetch`));
                });
        }
    };

    // Fonction pour gérer le succès de l'action (création ou mise à jour d'intervention)
    const handleSuccess = () => {
        getInterventionData(); // Récupère à nouveau les données d'intervention
        hideInterventionsModal(); // Ferme le modal d'intervention
        setFetching(true);
    };

    // Ouvre le modal pour créer une nouvelle intervention
    const showInterventionsModal = () => {
        setIntervention(null);
        setOpenedModal('createIntervention');
    };

    // Ferme le modal d'intervention
    const hideInterventionsModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour mettre à jour une intervention existante et définit les valeurs à mettre à jour
    const updateIntervention = (record) => {
        setOpenedModal('updateIntervention');
        setIntervention(record);
    };

    // Fonctions pour gérer l'ouverture et la fermeture du modal d'archivage
    const showArchiveModal = () => {
        setModalArchive(true);
    };

    const hideArchiveModal = () => {
        setModalArchive(false);
    };

    // Détermine si le bouton "Supprimer" est désactivé ou non en fonction de la sélection d'interventions
    const disabled = !(selectedIntervention.length > 0);

    return (
        <main className="screen">
            <Card>
                {/* Tableau d'interventions de réparation avec boutons */}
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={true}
                    updateSelectedData={setSelectedInterventions}
                />
                {/* Bouton pour supprimer les interventions sélectionnées */}
                <Button type="primary" onClick={showArchiveModal} disabled={disabled}>
                    {I18n.t('common.delete')}
                </Button>
            </Card>
            {/* Modal pour créer ou mettre à jour une intervention */}
            <InterventionsModal
                visible={includes(['createIntervention', 'updateIntervention'], openedModal)}
                onCancel={hideInterventionsModal}
                title={
                    openedModal === 'updateIntervention'
                        ? I18n.t(`modals.intervention.update`)
                        : I18n.t(`modals.intervention.create`)
                }
                onOk={handleSuccess}
                interventions={intervention}
                reparation={reparation}
            />
        </main>
    );
};

// Définition des types des props
InterventionData.propTypes = {
    actions: PropTypes.object,
    interventionReparation: PropTypes.object,
    reparation: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...InterventionEnginsActions}, dispatch),
});

// Connexion du composant à Redux et ajout de la navigation
export default withNavigation(connect(null, mapDispatchToProps)(InterventionData));
