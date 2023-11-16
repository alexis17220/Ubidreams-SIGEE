import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as EquipementsActions} from 'Resources/EquipementsRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import EquipementModal from 'Components/Modals/EquipementsModal/EquipementModal';
import {EquipementTableData} from 'Components/Values/EquipementData/EquipementTableData';

const EquipementScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données de l'équipement sélectionné (pour l'ajout/modification)
    const [equipement, setEquipement] = useState();

    // State pour gérer le modal d'archive
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les équipements sélectionnés pour suppression
    const [selectedEquipements, setSelectedEquipements] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EquipementTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showEquipementModal,
            },
        });

        // Configuration de l'action au clic sur une ligne de la table
        tables.equipements.onRow = (record, id) => ({
            onClick: () => updateEquipement(record, id),
        });

        // Récupération des données des équipements
        getEquipementsData();
    }, []);

    /**
     * Récupération des données des équipements
     */
    const getEquipementsData = () => {
        setFetching(true);
        actions
            .getEquipements()
            .then(({body: equipements}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    equipements: {
                        ...tables.equipements,
                        rows: equipements,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.equipements.fetch'));
            });
    };

    /**
     * Suppression des équipements sélectionnés
     */
    const deleteEquipements = () => {
        if (selectedEquipements.length > 0) {
            setFetching(true);
            actions
                .deleteEquipementEquipements({ids: selectedEquipements})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal d'archive
                    setFetching(false);
                    getEquipementsData();
                    message.success(I18n.t('success.equipement.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.equipement.delete'));
                });
        }
    };

    // Lorsque la requête d'ajout/modification est effectuée
    const handleSuccess = () => {
        getEquipementsData();
        hideEquipementModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création d'équipement
    const showEquipementModal = () => {
        setEquipement(null);
        setOpenedModal('createEquipement');
    };

    // Ferme le modal d'équipement
    const hideEquipementModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une modification d'équipement et stocke les valeurs à modifier
    const updateEquipement = (record) => {
        setOpenedModal('updateEquipement');
        setEquipement(record);
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
    // Vérifie si des équipements sont sélectionnés pour activer/désactiver le bouton de suppression
    const disabled = !(selectedEquipements.length > 0);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedEquipements}
                    onChangeSearch={handleSearch}
                />
            </Card>
            <EquipementModal
                visible={includes(['createEquipement', 'updateEquipement'], openedModal)}
                onCancel={hideEquipementModal}
                title={
                    openedModal === 'updateEquipement' ? I18n.t('modals.equipement.update') : I18n.t('modals.equipement.create')
                }
                onOk={handleSuccess}
                equipements={equipement}
            />

            {/* Modal de confirmation de suppression d'équipements */}
            <ArchiveModal
                deleteText={I18n.t('confirm.equipement.delete')}
                validateArchive={deleteEquipements}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

EquipementScreen.propTypes = {
    actions: PropTypes.object,
    equipements: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...EquipementsActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(EquipementScreen));
