import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {includes} from 'lodash';
import {actions as EquipementsEnginsActions} from 'Resources/EquipementsEnginRessources';
import {Button, Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import {withNavigation} from '@react-navigation/core';
import EquipementEnginsModal from 'Components/Modals/EquipementEnginModal/EquipementEnginModal';
import {EnginEquipementTableData} from 'Components/Values/EnginData/EnginEquipementTableData';

const EnginData = ({actions, engin}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour gérer le modal ouvert
    const [openedModal, setOpenedModal] = useState('');

    // State pour stocker les données de l'équipement de l'engin
    const [equipementEngin, setEquipementEngin] = useState();

    // State pour gérer le modal d'archivage
    const [modalArchive, setModalArchive] = useState(false);

    // State pour stocker les équipements de l'engin sélectionnés
    const [selectedEquipementEngin, setSelectedEquipementEngins] = useState([]);

    // State pour gérer les tables de données
    const [tables, setTables] = useState(EnginEquipementTableData);

    // Effet pour initialiser les boutons et les actions lorsqu'un engin est sélectionné
    useEffect(() => {
        if (engin?.id_engin) {
            setButtons({
                create: {
                    label: I18n.t('common.create'),
                    icon: <PlusOutlined/>,
                    action: showEquipementEnginsModal,
                },
            });

            // Configuration de l'action sur chaque ligne du tableau d'équipements
            tables.equipements.onRow = (record, id) => ({
                onClick: () => updateEquipementEngin(record, id),
            });

            getEquipementEnginData(engin.id_engin); // Fait un appel pour récupérer les dernières données
        }
    }, [engin]);

    /**
     * Récupération des données des équipements de l'engin
     */
    const getEquipementEnginData = () => {
        setFetching(true);

        // Vérifiez si id est défini
        if (engin?.id_engin) {
            actions
                .getOneBasedOnIdEnginEquipementsEngin(null, {
                    query: {
                        search: engin.id_engin,
                    },
                    filters: {
                        id_engin: engin.id_engin,
                    },
                })
                .then(({body: equipements}) => {
                    // Met à jour la table de données
                    setTables({
                        ...tables,
                        equipements: {
                            ...tables.equipements,
                            rows: equipements,
                        },
                    });
                    setFetching(false);
                })
                .catch(() => {
                    message.error(I18n.t('errors.equipementE.fetch'));
                });
        }
    };

    // Lorsque l'action est réussie
    const handleSuccess = () => {
        getEquipementEnginData(); // Récupère les nouvelles données des équipements
        hideEquipementEnginsModal(); // Ferme le modal d'édition
        setFetching(true);
    };

    // Ouvre le modal pour créer un nouvel équipement de l'engin
    const showEquipementEnginsModal = () => {
        setEquipementEngin(null);
        setOpenedModal('createEquipementEngin');
    };

    // Ferme le modal d'édition ou de création
    const hideEquipementEnginsModal = () => {
        setOpenedModal('');
    };

    // Ouvre le modal pour mettre à jour un équipement et définir les valeurs à mettre à jour
    const updateEquipementEngin = (record) => {
        setOpenedModal('updateEquipementEngin');
        setEquipementEngin(record);
    };

    // Affiche le modal d'archivage
    const showArchiveModal = () => {
        setModalArchive(true);
    };

    // Masque le modal d'archivage
    const hideArchiveModal = () => {
        setModalArchive(false);
    };

    // Vérifie si des équipements sont sélectionnés pour désactiver le bouton d'archivage
    const disabled = !(selectedEquipementEngin.length > 0);

    return (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedEquipementEngins}
                />
                <Button type="primary" onClick={showArchiveModal} disabled={disabled}>
                    {I18n.t('common.delete')}
                </Button>
            </Card>
            {/* Modal pour créer ou mettre à jour un équipement de l'engin */}
            <EquipementEnginsModal
                visible={includes(['createEquipementEngin', 'updateEquipementEngin'], openedModal)}
                onCancel={hideEquipementEnginsModal}
                title={
                    openedModal === 'updateEquipementEngin'
                        ? I18n.t('modals.equipementE.update')
                        : I18n.t('modals.equipementE.create')
                }
                onOk={handleSuccess}
                equipementEngins={equipementEngin}
                engin={engin}
            />
        </main>
    );
};

EnginData.propTypes = {
    actions: PropTypes.object,
    equipementEngins: PropTypes.object,
    engin: PropTypes.object,
    roles: PropTypes.array,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...EquipementsEnginsActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(EnginData));
