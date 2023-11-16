// Importation des modules et composants nécessaires
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as TypeTechActions} from 'Resources/TypeTechRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import TypeTechModal from "Components/Modals/TypeTechModal/TypeTechModal";
import {TypeTechTableData} from "Components/Values/TypeTechData/TypeTechTableData";

// Composant principal TypeTechScreen
const TypeTechScreen = ({actions, roles}) => {
    // État local pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);
    // État local pour les boutons dans le composant TableLayout
    const [button, setButtons] = useState({});
    // État local pour gérer l'ouverture des modals
    const [openedModal, setOpenedModal] = useState('');
    // État local pour stocker les données d'un type de technologie pour l'update
    const [typeTech, setTypeTech] = useState();
    // État local pour gérer l'affichage du modal d'archive
    const [modalArchive, setModalArchive] = useState(false);
    // État local pour stocker les éléments sélectionnés dans la table
    const [selectedTypeTech, setSelectedTypeTech] = useState([]);
    // État local pour les données affichées dans le tableau
    const [tables, setTables] = useState(TypeTechTableData);

    // Utilisation de useEffect pour exécuter des opérations au chargement de la page
    useEffect(() => {
        // Configuration des boutons dans le composant TableLayout
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showTypeTechModal,
            },
        });

        // Gestion de l'événement onClick sur les lignes du tableau
        tables.typeTech.onRow = (record, id) => ({
            onClick: () => updateTypeTech(record, id),
        });

        // Récupération des données de typeTech au chargement de la page
        getTypeTechData();
    }, []);

    // Fonction pour récupérer les données de typeTech
    const getTypeTechData = () => {
        setFetching(true);
        actions
            .getTypeTech()
            .then(({body: typeTech}) => {
                // Met à jour la table avec les nouvelles données
                setTables({
                    ...tables,
                    typeTech: {
                        ...tables.typeTech,
                        rows: typeTech,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.typeTech.fetch`));
            });
    };

    // Fonction pour supprimer des éléments de typeTech
    const deleteTypeTech = () => {
        if (selectedTypeTech.length > 0) {
            setFetching(true);
            actions
                .deleteTypeTechTypeTechs({ids: selectedTypeTech})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal
                    setFetching(false);
                    getTypeTechData();
                    message.success(I18n.t(`success.typeTech.delete`));
                })
                .catch(() => {
                    message.error(I18n.t(`errors.typeTech.delete`));
                });
        }
    };

    // Fonction appelée lorsque la requête est effectuée avec succès (ajout/modification)
    const handleSuccess = () => {
        getTypeTechData();
        hideTypeTechModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création
    const showTypeTechModal = () => {
        setTypeTech(null);
        setOpenedModal('createTypeTech');
    };

    // Ferme le modal
    const hideTypeTechModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une mise à jour et set les valeurs à mettre à jour
    const updateTypeTech = (record) => {
        setOpenedModal('updateTypeTech');
        setTypeTech(record);
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
    const disabled = !(selectedTypeTech.length > 0);
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
                    updateSelectedData={setSelectedTypeTech}
                    onChangeSearch={handleSearch}
                />
            </Card>

            {/* Modal pour ajouter/modifier un type de technologie */}
            <TypeTechModal
                visible={includes(['createTypeTech', 'updateTypeTech'], openedModal)}
                onCancel={hideTypeTechModal}
                title={
                    openedModal === 'updateTypeTech'
                        ? I18n.t(`modals.typeTech.update`)
                        : I18n.t(`modals.typeTech.create`)
                }
                onOk={handleSuccess}
                typeTech={typeTech}
            />

            {/* Modal de confirmation de suppression */}
            <ArchiveModal
                deleteText={I18n.t(`confirm.typeTech.delete`)}
                validateArchive={deleteTypeTech}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

// Définition des types de propriétés attendues dans le composant
TypeTechScreen.propTypes = {
    actions: PropTypes.object,
    typeTech: PropTypes.object,
    roles: PropTypes.array,
};

// Fonction pour mapper les actions Redux à props
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...TypeTechActions}, dispatch),
});

// Connexion du composant au store Redux et utilisation du withNavigation pour obtenir l'accès à la navigation
export default withNavigation(
    connect(null, mapDispatchToProps)(TypeTechScreen)
);
