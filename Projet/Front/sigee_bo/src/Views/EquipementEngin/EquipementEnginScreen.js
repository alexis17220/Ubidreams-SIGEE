import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as EquipementsEnginsActions} from 'Resources/EquipementsEnginRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import EquipementEnginsModal from 'Components/Modals/EquipementEnginModal/EquipementEnginModal';
import {EquipementEnginTableData} from 'Components/Values/EquipementEnginData/EquipementEnginTableData';

const EquipementEnginScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données de l'équipement spécifique à un engin sélectionné (pour l'ajout/modification)
    const [equipementEngin, setEquipementEngin] = useState();

    // State pour gérer le modal d'archive
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les équipements spécifiques à un engin sélectionnés pour suppression
    const [selectedEquipementEngin, setSelectedEquipementEngins] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EquipementEnginTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showEquipementEnginsModal,
            },
        });

        // Configuration de l'action au clic sur une ligne de la table
        tables.equipementsEngin.onRow = (record, id) => ({
            onClick: () => updateEquipementEngin(record, id),
        });

        // Récupération des données des équipements spécifiques à un engin
        getEquipementEnginData();
    }, []);

    /**
     * Récupération des données des équipements spécifiques à un engin
     */
    const getEquipementEnginData = () => {
        setFetching(true);
        actions
            .getEquipementsEngin()
            .then(({body: equipementsEngin}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    equipementsEngin: {
                        ...tables.equipementsEngin,
                        rows: equipementsEngin,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.equipementE.fetch'));
            });
    };

    /**
     * Suppression des équipements spécifiques à un engin sélectionnés
     */
    const deleteEquipements = () => {
        if (selectedEquipementEngin.length > 0) {
            setFetching(true);
            actions
                .deleteEquipementEnginEquipementsEngin({ids: selectedEquipementEngin})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal d'archive
                    setFetching(false);
                    getEquipementEnginData();
                    message.success(I18n.t('success.equipementE.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.equipementE.delete'));
                });
        }
    };

    // Lorsque la requête d'ajout/modification est effectuée
    const handleSuccess = () => {
        getEquipementEnginData();
        hideEquipementEnginsModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création d'équipement spécifique à un engin
    const showEquipementEnginsModal = () => {
        setEquipementEngin(null);
        setOpenedModal('createEquipementEngin');
    };

    // Ferme le modal d'équipement spécifique à un engin
    const hideEquipementEnginsModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une modification d'équipement spécifique à un engin et stocke les valeurs à modifier
    const updateEquipementEngin = (record) => {
        setOpenedModal('updateEquipementEngin');
        setEquipementEngin(record);
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
    // Vérifie si des équipements spécifiques à un engin sont sélectionnés pour activer/désactiver le bouton de suppression
    const disabled = !(selectedEquipementEngin.length > 0);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedEquipementEngins}
                    onChangeSearch={handleSearch}
                />
            </Card>
            <EquipementEnginsModal
                visible={includes(['createEquipementEngin', 'updateEquipementEngin'], openedModal)}
                onCancel={hideEquipementEnginsModal}
                title={
                    openedModal === 'updateEquipementEngin' ? I18n.t('modals.equipementE.update') : I18n.t('modals.equipementE.create')
                }
                onOk={handleSuccess}
                equipementEngins={equipementEngin}
            />

            {/* Modal de confirmation de suppression d'équipements spécifiques à un engin */}
            <ArchiveModal
                deleteText={I18n.t('confirm.equipementEngin.delete')}
                validateArchive={deleteEquipements}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

EquipementEnginScreen.propTypes = {
    actions: PropTypes.object,
    equipementEngins: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...EquipementsEnginsActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(EquipementEnginScreen));
