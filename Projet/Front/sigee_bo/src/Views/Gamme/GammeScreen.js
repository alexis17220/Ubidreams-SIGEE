import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes, map} from 'lodash';
import {actions as GammesActions} from 'Resources/GammesRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import {ArchiveModal} from 'Components/Modals';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import GammeModal from 'Components/Modals/GammeModal/GammeModal';
import {GammeTableData} from 'Components/Values/GammeData/GammeTableData';

const GammeScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données de la gamme sélectionnée (pour l'ajout/modification)
    const [gamme, setGamme] = useState();

    // State pour gérer le modal d'archive
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les gammes sélectionnées pour suppression
    const [selectedGammes, setSelectedGammes] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(GammeTableData);

    useEffect(() => {
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showGammeModal,
            },
        });

        // Configuration de l'action au clic sur une ligne de la table
        tables.gammes.onRow = (record, id) => ({
            onClick: () => updateGammes(record, id),
        });

        // Récupération des données des gammes
        getGammeData();
    }, []);

    /**
     * Récupération des données des gammes
     */
    const getGammeData = () => {
        setFetching(true);
        actions
            .getGammes()
            .then(({body: gammes}) => {
                // Met à jour la table de données
                setTables({
                    ...tables,
                    gammes: {
                        ...tables.gammes,
                        rows: gammes,
                    },
                });
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.gamme.fetch'));
            });
    };

    /**
     * Suppression des gammes sélectionnées
     */
    const deleteGammes = () => {
        if (selectedGammes.length > 0) {
            setFetching(true);
            actions
                .deleteGammeGammes({ids: selectedGammes})
                .then(() => {
                    hideArchiveModal(); // Ferme le modal d'archive
                    setFetching(false);
                    getGammeData();
                    message.success(I18n.t('success.gamme.delete'));
                })
                .catch(() => {
                    message.error(I18n.t('errors.gamme.delete'));
                });
        }
    };

    // Lorsque la requête d'ajout/modification est effectuée
    const handleSuccess = () => {
        getGammeData();
        hideGammeModal();
        setFetching(true);
    };

    // Ouvre le modal pour une création de gamme
    const showGammeModal = () => {
        setGamme(null);
        setOpenedModal('createGamme');
    };

    // Ferme le modal de gamme
    const hideGammeModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour une modification de gamme et stocke les valeurs à modifier
    const updateGammes = (record) => {
        setOpenedModal('updateGammes');
        setGamme(record);
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
    // Vérifie si des gammes sont sélectionnées pour activer/désactiver le bouton de suppression
    const disabled = !(selectedGammes.length > 0);

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedGammes}
                    onChangeSearch={handleSearch}
                />
            </Card>
            <GammeModal
                visible={includes(['createGamme', 'updateGammes'], openedModal)}
                onCancel={hideGammeModal}
                title={openedModal === 'updateGammes' ? I18n.t('modals.gamme.update') : I18n.t('modals.gamme.create')}
                onOk={handleSuccess}
                gamme={gamme}
            />

            {/* Modal de confirmation de suppression des gammes */}
            <ArchiveModal
                deleteText={I18n.t('confirm.gamme.delete')}
                validateArchive={deleteGammes}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

GammeScreen.propTypes = {
    actions: PropTypes.object,
    gamme: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...GammesActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(GammeScreen));
