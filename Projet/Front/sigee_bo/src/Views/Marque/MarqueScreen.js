import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as MarqueActions} from 'Resources/MarquesRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import ArchiveModal from 'Components/Modals/ArchiveModal';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import MarqueModal from 'Components/Modals/MarqueModal/MarqueModal';
import {MarqueTableData} from 'Components/Values/MarqueData/MarqueTableData';

const MarqueScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données d'une marque
    const [marque, setMarque] = useState();

    // State pour gérer le modal de suppression
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les IDs des marques sélectionnées
    const [selectedMarques, setSelectedMarques] = useState([]);

    // State pour stocker les données du tableau des marques
    const [tables, setTables] = useState(MarqueTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showMarqueModal,
            },
        });

        // Configuration de l'action onClick pour chaque ligne du tableau des marques
        tables.marques.onRow = (record, id) => ({
            onClick: () => updateMarques(record, id),
        });

        // Récupération des données des marques
        getMarqueData();
    }, []);

    /**
     * Récupération des données des marques
     */
    const getMarqueData = () => {
        setFetching(true);
        actions
            .getMarques()
            .then(({body: marques}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    marques: {
                        ...tables.marques,
                        rows: marques,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.marque.fetch'));
            });
    };

    /**
     * SUPPRESSION des marques
     */
    const deleteMarques = () => {
        if (selectedMarques.length > 0) {
            setFetching(true);
            actions
                .deleteMarqueMarques({ids: selectedMarques})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal de suppression
                    setFetching(false);
                    getMarqueData();
                    message.success(I18n.t('success.marque.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.marque.delete'));
                });
        }
    };

    // Gestionnaire de succès après l'exécution d'une action
    const handleSuccess = () => {
        getMarqueData();
        hideCategoryModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création
    const showMarqueModal = () => {
        setMarque(null);
        setOpenedModal('createMarque');
    };

    // Ferme le modal
    const hideCategoryModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une mise à jour et définit les valeurs à mettre à jour
    const updateMarques = (record) => {
        setOpenedModal('updateMarques');
        setMarque(record);
    };

    // Affiche le modal de suppression
    const showArchiveModal = () => {
        setModalArchive(true);
    };

    // Ferme le modal de suppression
    const hideArchiveModal = () => {
        setModalArchive(false);
    };
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    // Vérifie si des marques sont sélectionnées pour désactiver le bouton de suppression
    const disabled = !(selectedMarques.length > 0);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedMarques}
                    onChangeSearch={handleSearch}
                />
            </Card>

            {/* Modal pour créer ou mettre à jour une marque */}
            <MarqueModal
                visible={includes(['createMarque', 'updateMarques'], openedModal)}
                onCancel={hideCategoryModal}
                title={openedModal === 'updateMarques' ? I18n.t('modals.marque.update') : I18n.t('modals.marque.create')}
                onOk={handleSuccess}
                marque={marque}
            />

            {/* Modal pour la suppression des marques */}
            <ArchiveModal
                deleteText={I18n.t('confirm.marque.delete')}
                validateArchive={deleteMarques}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

MarqueScreen.propTypes = {
    actions: PropTypes.object,
    marque: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...MarqueActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(MarqueScreen));
