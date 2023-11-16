import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as ProprietaireActions} from 'Resources/ProprietairesRessource';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import ArchiveModal from 'Components/Modals/ArchiveModal';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import ProprietaireModal from 'Components/Modals/ProprietaireModal/ProprietaireModal';
import {ProprietaireTableData} from 'Components/Values/ProprietaireData/ProprietaireTableData';

const ProprietaireScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données d'un propriétaire
    const [proprietaire, setProprietaire] = useState();

    // State pour gérer le modal de suppression
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les IDs des propriétaires sélectionnés
    const [selectedProprietaires, setSelectedProprietaires] = useState([]);

    // State pour stocker les données du tableau des propriétaires
    const [tables, setTables] = useState(ProprietaireTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showProprietaireModal,
            },
        });

        // Configuration de l'action onClick pour chaque ligne du tableau des propriétaires
        tables.proprietaires.onRow = (record, id) => ({
            onClick: () => updateProprietaire(record),
        });

        // Récupération des données des propriétaires
        getProprietairesData();
    }, []);

    /**
     * Récupération des données des propriétaires
     */
    const getProprietairesData = () => {
        setFetching(true);
        actions
            .getProprietaires()
            .then(({body: proprietaires}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    proprietaires: {
                        ...tables.proprietaires,
                        rows: proprietaires,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.proprietaires.fetch'));
            });
    };

    /**
     * SUPPRESSION des propriétaires
     */
    const deleteProprietaires = () => {
        if (selectedProprietaires.length > 0) {
            setFetching(true);
            actions
                .deleteProprietaireProprietaires({ids: selectedProprietaires})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal de suppression
                    setFetching(false);
                    getProprietairesData();
                    message.success(I18n.t('success.proprietaires.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.proprietaires.delete'));
                });
        }
    };

    // Gestionnaire de succès après l'exécution d'une action
    const handleSuccess = () => {
        getProprietairesData();
        hideProprietaireModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création
    const showProprietaireModal = () => {
        setProprietaire(null);
        setOpenedModal('createProprietaire');
    };

    // Ferme le modal
    const hideProprietaireModal = () => {
        setProprietaire(null);
        setOpenedModal('');
    };

    // Ouvre le modal pour une mise à jour et définit les valeurs à mettre à jour
    const updateProprietaire = (record) => {
        setProprietaire(record);
        setOpenedModal('updateProprietaire');
    };

    const showArchiveModal = () => {
        setModalArchive(true);
    };

    const hideArchiveModal = () => {
        setModalArchive(false);
    };

    // Vérifie si des propriétaires sont sélectionnés pour désactiver le bouton de suppression
    const disabled = !(selectedProprietaires.length > 0);
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedProprietaires}
                    onChangeSearch={handleSearch}
                />
            </Card>

            {/* Modal pour créer ou mettre à jour un propriétaire */}
            <ProprietaireModal
                visible={includes(['createProprietaire', 'updateProprietaire'], openedModal)}
                onCancel={hideProprietaireModal}
                title={openedModal === 'updateProprietaire' ? I18n.t('modals.proprietaire.update') : I18n.t('modals.proprietaire.create')}
                onOk={handleSuccess}
                proprietaires={proprietaire}
            />

            {/* Modal pour la suppression des propriétaires */}
            <ArchiveModal
                deleteText={I18n.t('confirm.proprietaires.delete')}
                validateArchive={deleteProprietaires}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

ProprietaireScreen.propTypes = {
    actions: PropTypes.object,
    proprietaires: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...ProprietaireActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(ProprietaireScreen));
