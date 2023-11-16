import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as TypeIntervenantActions} from 'Resources/TypeIntervenantRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import TypeIntervenantModal from "Components/Modals/TypeIntervenantModal/TypeIntervenantModal";
import {TypeIntervenantTableData} from "Components/Values/TypeIntervenantData/TypeIntervenantTableData";

const TypeIntervenantScreen = ({actions, roles}) => {
    // État local pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);
    // État local pour les boutons dans le composant TableLayout
    const [button, setButtons] = useState({});
    // État local pour gérer l'ouverture des modals
    const [openedModal, setOpenedModal] = useState('');
    // État local pour stocker les données d'un type d'intervenant pour l'update
    const [typeIntervenant, setTypeIntervenant] = useState();
    // État local pour gérer l'affichage du modal d'archive
    const [modalArchive, setModalArchive] = useState(false);
    // État local pour stocker les éléments sélectionnés dans la table
    const [selectedTypeIntervenant, setSelectedTypeIntervenant] = useState([]);
    // État local pour les données affichées dans le tableau
    const [tables, setTables] = useState(TypeIntervenantTableData);

    useEffect(() => {
        // Configuration des boutons dans le composant TableLayout
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showTypeIntervenantModal,
            },
        });

        // Gestion de l'événement onClick sur les lignes du tableau
        tables.typeIntervenant.onRow = (record, id) => ({
            onClick: () => updateTypeIntervenant(record, id),
        });

        // Récupération des données de typeIntervenants au chargement de la page
        getTypeIntervenantData();
    }, []);

    // Fonction pour récupérer les données de typeIntervenants
    const getTypeIntervenantData = () => {
        setFetching(true);
        actions
            .getTypeIntervenant()
            .then(({body: typeIntervenant}) => {
                // Met à jour la table avec les nouvelles données
                setTables({
                    ...tables,
                    typeIntervenant: {
                        ...tables.typeIntervenant,
                        rows: typeIntervenant,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeIntervenant.fetch`));
            });
    };

    // Fonction pour supprimer les typeIntervenants sélectionnés
    const deleteTypeIntervenant = () => {
        if (selectedTypeIntervenant.length > 0) {
            setFetching(true);
            actions
                .deleteTypeIntervenantTypeIntervenant({ids: selectedTypeIntervenant})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal
                    setFetching(false);
                    getTypeIntervenantData();
                    message.success(I18n.t(`success.typeIntervenant.delete`));
                })
                .catch(() => {
                    message.error(I18n.t(`errors.typeIntervenant.delete`));
                });
        }
    };

    // Fonction appelée lorsque la requête est effectuée avec succès (ajout/modification)
    const handleSuccess = () => {
        getTypeIntervenantData();
        hideTypeIntervenantModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création
    const showTypeIntervenantModal = () => {
        setTypeIntervenant(null);
        setOpenedModal('createTypeIntervenant');
    };

    // Ferme le modal
    const hideTypeIntervenantModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une mise à jour et set les valeurs à mettre à jour
    const updateTypeIntervenant = (record) => {
        setOpenedModal('updateTypeIntervenant');
        setTypeIntervenant(record);
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
    const disabled = !(selectedTypeIntervenant.length > 0);
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
                    updateSelectedData={setSelectedTypeIntervenant}
                    onChangeSearch={handleSearch}
                />
            </Card>

            {/* Modal pour ajouter/modifier un type d'intervenant */}
            <TypeIntervenantModal
                visible={includes(['createTypeIntervenant', 'updateTypeIntervenant'], openedModal)}
                onCancel={hideTypeIntervenantModal}
                title={
                    openedModal === 'updateTypeIntervenant'
                        ? I18n.t(`modals.type.update`)
                        : I18n.t(`modals.type.create`)
                }
                onOk={handleSuccess}
                typeIntervenant={typeIntervenant}
            />

            {/* Modal de confirmation de suppression */}
            <ArchiveModal
                deleteText={I18n.t(`confirm.typeIntervenant.delete`)}
                validateArchive={deleteTypeIntervenant}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

TypeIntervenantScreen.propTypes = {
    actions: PropTypes.object,
    typeIntervenant: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeIntervenantActions}, dispatch),
});

export default withNavigation(
    connect(null, mapDispatchToProps)(TypeIntervenantScreen)
);
