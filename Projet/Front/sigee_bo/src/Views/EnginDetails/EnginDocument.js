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
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import DocumentsModal from 'Components/Modals/DocumentModal/DocumentsModal';
import {EnginDocumentTableData} from 'Components/Values/EnginData/EnginDocumentTableData';

const DocumentScreen = ({actions, roles, engin}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données du document
    const [document, setDocument] = useState();

    // State pour gérer le modal d'archivage
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les documents sélectionnés
    const [selectedDocument, setSelectedDocument] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EnginDocumentTableData);

    // Effet pour initialiser les boutons et les actions lorsqu'un engin est sélectionné
    useEffect(() => {
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showDocumentsModal,
            },
        });

        // Configuration de l'action sur chaque ligne du tableau de documents
        tables.document.onRow = (record, id) => ({
            onClick: () => updateDocuments(record, id),
        });

        if (engin?.id_engin) {
            getDocumentData(engin.id_engin); // Fait un appel pour récupérer les dernières données
        }
    }, [engin]);

    /**
     * Récupération des données des documents liés à l'engin
     */
    const getDocumentData = () => {
        setFetching(true);
        actions.getOneBasedIdEnginDocuments(null, {
            query: {
                search: engin.immatriculation,
            },
            filters: {
                id_engin: engin.immatriculation,
            },
        })
            .then(({body: documents}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    document: {
                        ...tables.document,
                        rows: documents,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.document.fetch'));
            });
    };

    /**
     * Suppression des documents sélectionnés
     */
    const deleteDocuments = () => {
        if (selectedDocument.length > 0) {
            setFetching(true);
            actions.deleteDocumentDocuments({ids: selectedDocument})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal d'archivage
                    setFetching(false);
                    getDocumentData(); // Récupère les nouvelles données des documents
                    message.success(I18n.t('success.document.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.document.delete'));
                });
        }
    };

    // Lorsque l'action est réussie
    const handleSuccess = () => {
        getDocumentData(); // Récupère les nouvelles données des documents
        hideCategoryModal(); // Ferme le modal d'édition
        setFetching(true);
    };

    // Ouvre le modal pour créer un nouveau document
    const showDocumentsModal = () => {
        setDocument(null);
        setOpenedModal('createDocument');
    };

    // Ferme le modal d'édition ou de création
    const hideCategoryModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour mettre à jour un document et définir les valeurs à mettre à jour
    const updateDocuments = (record) => {
        setOpenedModal('updateDocuments');
        setDocument(record);
    };

    // Affiche le modal d'archivage
    const showArchiveModal = () => {
        setModalArchive(true);
    };

    // Masque le modal d'archivage
    const hideArchiveModal = () => {
        setModalArchive(false);
    };

    // Vérifie si des documents sont sélectionnés pour désactiver le bouton d'archivage
    const disabled = !(selectedDocument.length > 0);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedDocument}
                />
            </Card>
            {/* Modal pour créer ou mettre à jour un document */}
            <DocumentsModal
                visible={includes(['createDocument', 'updateDocuments'], openedModal)}
                onCancel={hideCategoryModal}
                title={
                    openedModal === 'updateDocuments'
                        ? I18n.t('modals.document.update')
                        : I18n.t('modals.document.create')
                }
                onOk={handleSuccess}
                document={document}
                engin={engin}
            />

            {/* Modal d'archivage pour supprimer des documents */}
            <ArchiveModal
                deleteText={I18n.t('confirm.document.delete')}
                validateArchive={deleteDocuments}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
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

export default withNavigation(connect(null, mapDispatchToProps)(DocumentScreen));
