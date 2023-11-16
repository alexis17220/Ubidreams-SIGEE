import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as TypeAttelageActions} from 'Resources/TypeAttelageRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import TypeAttelageModal from "Components/Modals/TypeAttelageModal/TypeAttelageModal";
import {TypeAttelageTableData} from "Components/Values/TypeAttelageData/TypeAttelageTableData";

const TypeAttelageScreen = ({actions, roles}) => {
    // État local pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);
    // État local pour les boutons dans le composant TableLayout
    const [button, setButtons] = useState({});
    // État local pour gérer l'ouverture des modals
    const [openedModal, setOpenedModal] = useState('');
    // État local pour stocker les données d'un type d'attelage pour l'update
    const [typeAttelage, setTypeAttelage] = useState();
    // État local pour gérer l'affichage du modal d'archive
    const [modalArchive, setModalArchive] = useState(false);
    // État local pour stocker les éléments sélectionnés dans la table
    const [selectedTypeAttelage, setSelectedTypeAttelage] = useState([]);
    // État local pour les données affichées dans le tableau
    const [tables, setTables] = useState(TypeAttelageTableData);

    useEffect(() => {
        // Configuration des boutons dans le composant TableLayout
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showTypeAttelageModal,
            },
        });

        // Gestion de l'événement onClick sur les lignes du tableau
        tables.typeAttelages.onRow = (record, id) => ({
            onClick: () => updateTypeAttelage(record, id),
        });

        // Récupération des données de typeAttelages au chargement de la page
        getTypeAttelageData();
    }, []);

    // Fonction pour récupérer les données de typeAttelages
    const getTypeAttelageData = () => {
        setFetching(true);
        actions
            .getTypeAttelage()
            .then(({body: typeAttelages}) => {
                // Met à jour la table avec les nouvelles données
                setTables({
                    ...tables,
                    typeAttelages: {
                        ...tables.typeAttelages,
                        rows: typeAttelages,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.attelage.fetch`));
            });
    };

    // Fonction pour supprimer les typeAttelages sélectionnés
    const deleteTypeAttelage = () => {
        if (selectedTypeAttelage.length > 0) {
            setFetching(true);
            actions
                .deleteTypeAttelageTypeAttelage({ids: selectedTypeAttelage})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal
                    setFetching(false);
                    getTypeAttelageData();
                    message.success(I18n.t(`success.attelage.delete`));
                })
                .catch(() => {
                    message.error(I18n.t(`errors.attelage.delete`));
                });
        }
    };

    // Fonction appelée lorsque la requête est effectuée avec succès (ajout/modification)
    const handleSuccess = () => {
        getTypeAttelageData();
        hideTypeAttelageModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création
    const showTypeAttelageModal = () => {
        setTypeAttelage(null);
        setOpenedModal('createTypeAttelage');
    };

    // Ferme le modal
    const hideTypeAttelageModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une mise à jour et set les valeurs à mettre à jour
    const updateTypeAttelage = (record) => {
        setOpenedModal('updateTypeAttelage');
        setTypeAttelage(record);
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
    const disabled = !(selectedTypeAttelage.length > 0);
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    // Affichage du composant en fonction des rôles
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedTypeAttelage}
                    onChangeSearch={handleSearch}
                />
            </Card>

            {/* Modal pour ajouter/modifier un type d'attelage */}
            <TypeAttelageModal
                visible={includes(['createTypeAttelage', 'updateTypeAttelage'], openedModal)}
                onCancel={hideTypeAttelageModal}
                title={
                    openedModal === 'updateTypeAttelage'
                        ? I18n.t(`modals.attelage.update`)
                        : I18n.t(`modals.attelage.create`)
                }
                onOk={handleSuccess}
                typeAttelage={typeAttelage}
            />

            {/* Modal de confirmation de suppression */}
            <ArchiveModal
                deleteText={I18n.t(`confirm.attelage.delete`)}
                validateArchive={deleteTypeAttelage}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

TypeAttelageScreen.propTypes = {
    actions: PropTypes.object,
    typeAttelages: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeAttelageActions}, dispatch),
});

export default withNavigation(
    connect(null, mapDispatchToProps)(TypeAttelageScreen)
);
