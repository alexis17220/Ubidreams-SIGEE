// Import des bibliothèques et des composants nécessaires
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {actions as AffectationHistoPhyActions} from 'Resources/AffectationHistoPhyRessources';
import {includes, map} from 'lodash';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import AffectationsHistoPhyModal from "Components/Modals/AffectationModal/AffectationHistoPhyModal";
import {PlusOutlined} from "@ant-design/icons";
import {EnginAffectationPHYTableData} from "Components/Values/EnginData/EnginAffectationTableData";


// Définition du composant AffectationScreen
const AffectationScreen = ({actions, roles, engin}) => {
    // État local pour gérer le chargement des données d'affectation physique
    const [fetchingPhy, setFetchingPhy] = useState(true);

    // État local pour stocker les affectations physiques sélectionnées
    const [selectedAffectationPhy, setSelectedAffectationPhy] = useState([]);

    // État local pour stocker les données de l'affectation physique en cours d'édition/création
    const [affectationPhy, setAffectationPhy] = useState();

    // État local pour stocker les boutons d'action
    const [button, setButtons] = useState({});

    // État local pour stocker le nom du modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // État local pour stocker les données de la table d'affectations physiques
    const [tablesPhy, setTablesPhy] = useState(EnginAffectationPHYTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showAffectationPhyModal,
            },
        });

        // Configuration de l'action à effectuer lorsqu'une ligne est cliquée dans la table
        tablesPhy.affectationHistoPhy.onRow = (record, id) => ({
            onClick: () => updateAffectationPhy(record, id),
        });

        if (engin?.id_engin) {
            // Fait un appel pour récupérer les dernières données
            getAffectationPhyData(engin.id_engin);
        }
    }, [engin]);

    // Fonction pour récupérer les données d'affectation physique
    const getAffectationPhyData = () => {
        setFetchingPhy(true);
        actions
            .getOneBasedIdEnginAffectationHistoPhy(null, {
                query: {
                    search: engin.immatriculation,
                },
                filters: {
                    id_engin: engin.immatriculation
                }
            })
            .then(({body: affectationHistoPhy}) => {
                // Met à jour la table avec les nouvelles données
                setTablesPhy({
                    ...tablesPhy,
                    affectationHistoPhy: {
                        ...tablesPhy.affectationHistoPhy,
                        rows: affectationHistoPhy,
                    },
                });
                setFetchingPhy(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectPhy.fetch`));
            });
    };

    // Fonction à exécuter après le succès de l'édition/création d'une affectation physique
    const handleSuccess = () => {
        getAffectationPhyData();
        HideAffectationPhyModal();
        setFetchingPhy(true);
    };

    // Fonction pour ouvrir le modal de création d'affectation physique
    const showAffectationPhyModal = () => {
        setAffectationPhy(null);
        setOpenedModal('createAffectationPhy');
    };

    // Fonction pour fermer le modal d'édition/création d'affectation physique
    const HideAffectationPhyModal = () => {
        setOpenedModal('');
    };

    // Fonction pour mettre à jour les données de l'affectation physique sélectionnée dans le modal d'édition
    const updateAffectationPhy = (record) => {
        setAffectationPhy(record);
        setOpenedModal('updateAffectationPhy');
    };

    // Rendu du composant
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <div>
                    {/* Affichage de la table d'affectations physiques avec les boutons d'action */}
                    <TableLayout
                        loading={fetchingPhy}
                        tables={tablesPhy}
                        buttons={button}
                        updateSelectedData={setSelectedAffectationPhy}
                        allowSelection={false}
                    />
                    {/* Affichage du modal d'édition/création d'affectation physique */}
                    <AffectationsHistoPhyModal
                        visible={includes(['createAffectationPhy', 'updateAffectationPhy'], openedModal)}
                        onCancel={HideAffectationPhyModal}
                        title={
                            openedModal === 'updateAffectationPhy'
                                ? I18n.t(`modals.affectPhy.update`)
                                : I18n.t(`modals.affectPhy.create`)
                        }
                        onOk={handleSuccess}
                        affectationPhys={affectationPhy}
                        engin={engin}
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
    affectationHistoPhy: PropTypes.object,
    roles: PropTypes.array,
};

// Liaison des actions Redux au composant
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AffectationHistoPhyActions}, dispatch),
});

// Export du composant connecté avec la navigation
export default withNavigation(
    connect(null, mapDispatchToProps)(AffectationScreen)
);
