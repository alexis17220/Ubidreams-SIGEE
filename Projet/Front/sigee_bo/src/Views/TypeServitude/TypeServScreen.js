// Importation des modules React et Redux nécessaires
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as TypeServActions} from 'Resources/TypeServRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import TypeServModal from "Components/Modals/TypeServModal/TypeServModal";
import {TypeServTableData} from "Components/Values/TypeServData/TypeServTableData";

// Composant principal TypeServScreen
const TypeServScreen = ({actions, roles}) => {
    // État local pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);
    // État local pour les boutons dans le composant TableLayout
    const [button, setButtons] = useState({});
    // État local pour gérer l'ouverture des modals
    const [openedModal, setOpenedModal] = useState('');
    // État local pour stocker les données d'un type de service pour l'update
    const [typeServ, setTypeServ] = useState();
    // État local pour gérer l'affichage du modal d'archive
    const [modalArchive, setModalArchive] = useState(false);
    // État local pour stocker les éléments sélectionnés dans la table
    const [selectedTypeServ, setSelectedTypeServ] = useState([]);
    // État local pour les données affichées dans le tableau
    const [tables, setTables] = useState(TypeServTableData);

    // Utilisation de useEffect pour exécuter des opérations au chargement de la page
    useEffect(() => {
        // Configuration des boutons dans le composant TableLayout
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showTypeServModal,
            },
        });

        // Gestion de l'événement onClick sur les lignes du tableau
        tables.typeServ.onRow = (record, id) => ({
            onClick: () => updateTypeServ(record, id),
        });

        // Récupération des données de typeServ au chargement de la page
        getTypeServData();
    }, []);

    // Fonction pour récupérer les données de typeServ
    const getTypeServData = () => {
        setFetching(true);
        actions
            .getTypeServ()
            .then(({body: typeServ}) => {
                // Met à jour la table avec les nouvelles données
                setTables({
                    ...tables,
                    typeServ: {
                        ...tables.typeServ,
                        rows: typeServ,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeOps.fetch`));
            });
    };

    // Fonction pour supprimer des éléments de typeServ
    const deleteTypeServ = () => {
        if (selectedTypeServ.length > 0) {
            setFetching(true);
            actions
                .deleteTypeServTypeServs({ids: selectedTypeServ})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal
                    setFetching(false);
                    getTypeServData();
                    message.success(I18n.t(`success.typeServ.delete`));
                })
                .catch(() => {
                    message.error(I18n.t(`errors.typeServ.delete`));
                });
        }
    };

    // Fonction appelée lorsque la requête est effectuée avec succès (ajout/modification)
    const handleSuccess = () => {
        getTypeServData();
        hideCategoryModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création
    const showTypeServModal = () => {
        setTypeServ(null);
        setOpenedModal('createTypeServ');
    };

    // Ferme le modal
    const hideCategoryModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une mise à jour et set les valeurs à mettre à jour
    const updateTypeServ = (record) => {
        setOpenedModal('updateTypeServ');
        setTypeServ(record);
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
    const disabled = !(selectedTypeServ.length > 0);
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
                    updateSelectedData={setSelectedTypeServ}
                    onChangeSearch={handleSearch}
                />
            </Card>

            {/* Modal pour ajouter/modifier un type de service */}
            <TypeServModal
                visible={includes(['createTypeServ', 'updateTypeServ'], openedModal)}
                onCancel={hideCategoryModal}
                title={
                    openedModal === 'updateTypeServ'
                        ? I18n.t(`modals.typeServ.update`)
                        : I18n.t(`modals.typeServ.create`)
                }
                onOk={handleSuccess}
                typeServ={typeServ}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

// Définition des types de propriétés attendues dans le composant
TypeServScreen.propTypes = {
    actions: PropTypes.object,
    typeServ: PropTypes.object,
    roles: PropTypes.array,
};

// Fonction pour mapper les actions Redux à props
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeServActions}, dispatch),
});

// Connexion du composant au store Redux et utilisation du withNavigation pour obtenir l'accès à la navigation
export default withNavigation(
    connect(null, mapDispatchToProps)(TypeServScreen)
);
