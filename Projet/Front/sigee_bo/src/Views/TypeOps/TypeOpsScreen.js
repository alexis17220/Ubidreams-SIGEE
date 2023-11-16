import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as TypeOpsActions} from 'Resources/TypeOpsRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import TypeOpsModal from "Components/Modals/TypeOpsModal/TypeOpsModal";
import {TypeOpsTableData} from "Components/Values/TypeOpsData/TypeOpsTableData";

const TypeOpsScreen = ({actions, roles}) => {
    // État local pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);
    // État local pour les boutons dans le composant TableLayout
    const [button, setButtons] = useState({});
    // État local pour gérer l'ouverture des modals
    const [openedModal, setOpenedModal] = useState('');
    // État local pour stocker les données d'un type d'opération pour l'update
    const [typeOps, setTypeOps] = useState();
    // État local pour gérer l'affichage du modal d'archive
    const [modalArchive, setModalArchive] = useState(false);
    // État local pour stocker les éléments sélectionnés dans la table
    const [selectedTypeOps, setSelectedTypeOps] = useState([]);
    // État local pour les données affichées dans le tableau
    const [tables, setTables] = useState(TypeOpsTableData);

    useEffect(() => {
        // Configuration des boutons dans le composant TableLayout
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showTypeOpsModal,
            },
        });

        // Gestion de l'événement onClick sur les lignes du tableau
        tables.typeOps.onRow = (record, id) => ({
            onClick: () => updateTypeOps(record, id),
        });

        // Récupération des données de typeOps au chargement de la page
        getTypeOpsData();
    }, []);

    // Fonction pour récupérer les données de typeOps
    const getTypeOpsData = () => {
        setFetching(true);
        actions
            .getTypeOPS()
            .then(({body: typeOps}) => {
                // Met à jour la table avec les nouvelles données
                setTables({
                    ...tables,
                    typeOps: {
                        ...tables.typeOps,
                        rows: typeOps,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeOps.fetch`));
            });
    };

    /**
     * SUPPRESSION des typeOps
     */
    const deleteTypeOps = () => {
        if (selectedTypeOps.length > 0) {
            setFetching(true);
            actions
                .deleteTypeOpsTypeOpss({ids: selectedTypeOps})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal
                    setFetching(false);
                    getTypeOpsData();
                    message.success(I18n.t(`success.typeOps.delete`));
                })
                .catch(() => {
                    message.error(I18n.t(`errors.typeOps.delete`));
                });
        }
    };

    // Fonction appelée lorsque la requête est effectuée avec succès (ajout/modification)
    const handleSuccess = () => {
        getTypeOpsData();
        hideTypeOpsModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création
    const showTypeOpsModal = () => {
        setTypeOps(null);
        setOpenedModal('createTypeOps');
    };

    // Ferme le modal
    const hideTypeOpsModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une mise à jour et set les valeurs à mettre à jour
    const updateTypeOps = (record) => {
        setOpenedModal('updateTypeOps');
        setTypeOps(record);
    };

    // Affiche le modal de confirmation de suppression
    const showArchiveModal = () => {
        setModalArchive(true);
    };

    // Cache le modal de confirmation de suppression
    const hideArchiveModal = () => {
        setModalArchive(false);
    };

    // Vérifie si des éléments sont sélectionnés pour désactiver/enabler le bouton de suppression
    const disabled = !(selectedTypeOps.length > 0);
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    // Affichage du composant en fonction des rôles
    return map(roles, ({name}) => name) !== 'SIGEE_MANAGER' &&
    map(roles, ({name}) => name) !== 'SIGEE_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedTypeOps}
                    onChangeSearch={handleSearch}
                />
            </Card>

            {/* Modal pour ajouter/modifier un type d'opération */}
            <TypeOpsModal
                visible={includes(['createTypeOps', 'updateTypeOps'], openedModal)}
                onCancel={hideTypeOpsModal}
                title={
                    openedModal === 'updateTypeOps'
                        ? I18n.t(`modals.typeOps.update`)
                        : I18n.t(`modals.typeOps.create`)
                }
                onOk={handleSuccess}
                typeOps={typeOps}
            />

            {/* Modal de confirmation de suppression des typeOps */}
            <ArchiveModal
                deleteText={I18n.t(`confirm.typeOps.delete`)}
                validateArchive={deleteTypeOps}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

TypeOpsScreen.propTypes = {
    actions: PropTypes.object,
    typeOps: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeOpsActions}, dispatch),
});

export default withNavigation(
    connect(null, mapDispatchToProps)(TypeOpsScreen)
);
