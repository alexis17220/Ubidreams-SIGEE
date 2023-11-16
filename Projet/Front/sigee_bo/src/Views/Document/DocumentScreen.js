import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as DocumentsActions} from 'Resources/DocumentRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import DocumentsModal from "Components/Modals/DocumentModal/DocumentsModal";
import {DocumentTableData} from "Components/Values/DocumentData/DocumentTableData";

const DocumentScreen = ({actions, roles}) => {
    // États pour gérer le chargement, les boutons, le modal ouvert, le document sélectionné, la modal d'archive et les tables de données
    const [fetching, setFetching] = useState(true);
    const [button, setButtons] = useState({});
    const [openedModal, setOpenedModal] = useState('');
    const [document, setDocument] = useState();
    const [modalArchive, setModalArchive] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState([]);
    const [tables, setTables] = useState(DocumentTableData);

    // État pour la pagination des documents
    const [paginationDocument, setPaginationDocument] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
    });

    let {searchText, pageSize, current} = paginationDocument;
    const searchValue = searchText;

    useEffect(() => {
        // Définition des boutons pour la table
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showDocumentsModal,
            },
        });

        // Définition de l'action sur les lignes de la table
        tables.document.onRow = (record, id) => ({
            onClick: () => updateDocuments(record, id),
        });

        // Appel initial pour récupérer les données des documents
        getDocumentData();
    }, []);

    /**
     * Récupération des données des documents en fonction des paramètres de pagination et de recherche
     */
    const getDocumentData = () => {
        setFetching(true);
        actions
            .getDocuments(null, {
                query: {
                    limit: pageSize,
                    offset: (current - 1) * pageSize,
                    search: searchValue,
                },
            })
            .then(({body: document}) => {
                // Met à jour la table avec les données récupérées
                setTables({
                    ...tables,
                    document: {
                        ...tables.document,
                        rows: document,
                    },
                });

                // Met à jour la pagination avec le nombre total d'éléments
                setPaginationDocument((prevState) => ({
                    ...prevState,
                    current: current,
                    total: document.count,
                }));

                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.document.fetch`));
            });
    };

    // Gestionnaire de changement de pagination et de tri
    const handleTableChange = (pagination) => setPaginationDocument(
        (prevState) => ({...prevState, ...pagination})
    );

    // Gestionnaire de recherche
    const handleSearch = (searchText) => {
        setPaginationDocument((prevState) => ({
            ...prevState,
            searchText,
            current: 1,
            pageSize: 10,
        }));
    };

    /**
     * Suppression des documents sélectionnés
     */
    const deleteDocuments = () => {
        if (selectedDocument.length > 0) {
            setFetching(true);
            actions
                .deleteDocumentDocuments({ids: selectedDocument})
                .then(() => {
                    hideArchiveModal();
                    setFetching(false);
                    getDocumentData();
                    message.success(I18n.t(`success.document.delete`));
                })
                .catch(() => {
                    message.error(I18n.t(`errors.document.delete`));
                });
        }
    };

    // Appel pour récupérer les données après une mise à jour réussie
    const handleSuccess = () => {
        getDocumentData();
        hideCategoryModal();
        setFetching(true);
    };

    // Ouvre le modal pour créer un nouveau document
    const showDocumentsModal = () => {
        setDocument(null);
        setOpenedModal('createDocument');
    };

    // Ferme le modal
    const hideCategoryModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour mettre à jour un document et définit les valeurs à mettre à jour
    const updateDocuments = (record) => {
        setOpenedModal('updateDocuments');
        setDocument(record);
    };

    const showArchiveModal = () => {
        setModalArchive(true);
    };

    const hideArchiveModal = () => {
        setModalArchive(false);
    };

    const disabled = !(selectedDocument.length > 0);

    useEffect(() => {
        // Appel pour récupérer les données à chaque changement de pagination, taille de page ou texte de recherche
        getDocumentData();
    }, [paginationDocument.current, paginationDocument.pageSize, paginationDocument.searchText]);

    // Vérification des rôles pour l'affichage du composant ou de l'écran d'accès refusé
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                {/* Utilisation du composant TableLayout pour afficher les données sous forme de tableau */}
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={{
                        document: {
                            ...tables.document,
                            onChange: handleTableChange, // Gestionnaire de changement de pagination et de tri
                            pagination: {
                                position: "both",
                                showSizeChanger: true,
                                ...paginationDocument,
                            },
                        },
                    }}
                    allowSelection={false}
                    updateSelectedData={setSelectedDocument}
                    onChangeSearch={handleSearch}
                    onChange={handleTableChange}
                />
            </Card>

            {/* Modals pour la création et la mise à jour des documents */}
            <DocumentsModal
                visible={includes(['createDocument', 'updateDocuments'], openedModal)}
                onCancel={hideCategoryModal}
                title={
                    openedModal === 'updateDocuments'
                        ? I18n.t(`modals.document.update`)
                        : I18n.t(`modals.document.create`)
                }
                onOk={handleSuccess}
                document={document}
            />

            {/* Modal d'archive pour supprimer les documents */}
            {/* <ArchiveModal
                    deleteText={I18n.t(`confirm.document.delete`)}
                    validateArchive={deleteDocuments}
                    opened={modalArchive}
                    hideModal={hideArchiveModal}
                /> */}
        </main>
    ) : (
        <NoAccess/>
    );
};

DocumentScreen.propTypes = {
    actions: PropTypes.object,
    document: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...DocumentsActions}, dispatch),
});

export default withNavigation(
    connect(null, mapDispatchToProps)(DocumentScreen)
);
