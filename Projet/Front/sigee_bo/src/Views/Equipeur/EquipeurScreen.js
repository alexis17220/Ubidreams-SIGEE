import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as EquipeursActions} from 'Resources/EquipeursRessource';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import EquipeurModal from 'Components/Modals/EquipeurModal/EquipeurModal';
import {EquipeurTableData} from 'Components/Values/EquipeurData/EquipeurTableData';

const EquipeurScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données de l'équipeur sélectionné (pour l'ajout/modification)
    const [equipeur, setEquipeur] = useState();

    // State pour gérer le modal d'archive
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les équipeurs sélectionnés pour suppression
    const [selectedEquipeurs, setSelectedEquipeurs] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EquipeurTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showEquipeurModal,
            },
        });

        // Configuration de l'action au clic sur une ligne de la table
        tables.equipeurs.onRow = (record, id) => ({
            onClick: () => updateEquipeurs(record, id),
        });

        // Récupération des données des équipeurs
        getEquipeurData();
    }, []);

    /**
     * Récupération des données des équipeurs
     */
    const getEquipeurData = () => {
        setFetching(true);
        actions
            .getEquipeurs()
            .then(({body: equipeurs}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    equipeurs: {
                        ...tables.equipeurs,
                        rows: equipeurs,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.equipeur.fetch'));
            });
    };

    /**
     * Suppression des équipeurs sélectionnés
     */
    const deleteEquipeurs = () => {
        if (selectedEquipeurs.length > 0) {
            setFetching(true);
            actions
                .deleteEquipeurEquipeurs({ids: selectedEquipeurs})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal d'archive
                    setFetching(false);
                    getEquipeurData();
                    message.success(I18n.t('success.equipeur.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.equipeur.delete'));
                });
        }
    };

    // Lorsque la requête d'ajout/modification est effectuée
    const handleSuccess = () => {
        getEquipeurData();
        hideEquipeurModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création d'équipeur
    const showEquipeurModal = () => {
        setEquipeur(null);
        setOpenedModal('createEquipeur');
    };

    // Ferme le modal d'équipeur
    const hideEquipeurModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une modification d'équipeur et stocke les valeurs à modifier
    const updateEquipeurs = (record) => {
        setOpenedModal('updateEquipeurs');
        setEquipeur(record);
    };

    // Ouvre le modal d'archive
    const showArchiveModal = () => {
        setModalArchive(true);
    };

    // Ferme le modal d'archive
    const hideArchiveModal = () => {
        setModalArchive(false);
    };
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    // Vérifie si des équipeurs sont sélectionnés pour activer/désactiver le bouton de suppression
    const disabled = !(selectedEquipeurs.length > 0);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedEquipeurs}
                    onChangeSearch={handleSearch}
                />
            </Card>
            <EquipeurModal
                visible={includes(['createEquipeur', 'updateEquipeurs'], openedModal)}
                onCancel={hideEquipeurModal}
                title={
                    openedModal === 'updateEquipeurs' ? I18n.t('modals.equipeur.update') : I18n.t('modals.equipeur.create')
                }
                onOk={handleSuccess}
                equipeur={equipeur}
            />

            {/* Modal de confirmation de suppression des équipeurs */}
            <ArchiveModal
                deleteText={I18n.t('confirm.equipeur.delete')}
                validateArchive={deleteEquipeurs}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

EquipeurScreen.propTypes = {
    actions: PropTypes.object,
    equipeur: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...EquipeursActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(EquipeurScreen));
