import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as IntervenantActions} from 'Resources/IntervenantRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import IntervenantModal from 'Components/Modals/IntervenantModal/IntervenantModal';
import {IntervenantTableData} from 'Components/Values/IntervenantData/IntervenantTableData';

const IntervenantScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert et les données de l'intervenant
    const [openedModal, setOpenedModal] = useState('');
    const [intervenant, setIntervenant] = useState();

    // State pour gérer le modal d'archive
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les IDs des intervenants sélectionnés
    const [selectedIntervenant, setSelectedIntervenant] = useState([]);

    // State pour stocker les données du tableau des intervenants
    const [tables, setTables] = useState(IntervenantTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showIntervenantModal,
            },
        });

        // Configuration de l'action de clic sur une ligne du tableau
        tables.intervenant.onRow = (record, id) => ({
            onClick: () => updateIntervenant(record, id),
        });

        // Récupération des données des intervenants
        getIntervenantData();
    }, []);

    /**
     * Récupération des données des intervenants
     */
    const getIntervenantData = () => {
        setFetching(true);
        actions
            .getIntervenants()
            .then(({body: intervenant}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    intervenant: {
                        ...tables.intervenant,
                        rows: intervenant,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.intervenant.fetch'));
            });
    };

    /**
     * Suppression des intervenants sélectionnés
     */
    const deleteIntervenant = () => {
        if (selectedIntervenant.length > 0) {
            setFetching(true);
            actions
                .deleteIntervenantIntervenant({ids: selectedIntervenant})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal d'archive
                    setFetching(false);
                    getIntervenantData(); // Met à jour les données des intervenants
                    message.success(I18n.t('success.intervenant.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.intervenant.delete'));
                });
        }
    };

    // Lorsque la requête est effectuée avec succès
    const handleSuccess = () => {
        getIntervenantData(); // Met à jour les données des intervenants
        hideIntervenantModal(); // Ferme le modal
        setFetching(true);
    };

    // Ouvre le modal pour une création d'intervenant
    const showIntervenantModal = () => {
        setIntervenant(null);
        setOpenedModal('createIntervenant');
    };

    // Ferme le modal
    const hideIntervenantModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour la mise à jour d'un intervenant
    const updateIntervenant = (record) => {
        setOpenedModal('updateIntervenant');
        setIntervenant(record);
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
    const disabled = !(selectedIntervenant.length > 0);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedIntervenant}
                    onChangeSearch={handleSearch}
                />
            </Card>
            <IntervenantModal
                visible={includes(['createIntervenant', 'updateIntervenant'], openedModal)}
                onCancel={hideIntervenantModal}
                title={
                    openedModal === 'updateIntervenant'
                        ? I18n.t('modals.intervenant.update')
                        : I18n.t('modals.intervenant.create')
                }
                onOk={handleSuccess}
                intervenant={intervenant}
            />

        </main>
    ) : (
        <NoAccess/>
    );
};

IntervenantScreen.propTypes = {
    actions: PropTypes.object,
    intervenant: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...IntervenantActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(IntervenantScreen));
