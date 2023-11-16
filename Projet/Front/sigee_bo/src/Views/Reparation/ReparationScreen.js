import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as ReparationActions} from 'Resources/ReparationRessource';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {ReparationTableData} from 'Components/Values/ReparationData/ReparationTableData';
import {PlusOutlined} from '@ant-design/icons';
import {ReparationModal} from 'Components/Modals/ReparationModal';

const ReparationScreen = ({actions, navigation, roles}) => {
    // State pour gérer le chargement des données
    const [fetching, setFetching] = useState(true);

    // State pour gérer les boutons d'action
    const [button, setButtons] = useState({});

    // State pour stocker les données d'une réparation
    const [selectedReparation, setSelectedReparation] = useState([]);

    // State pour stocker les données du tableau de réparations
    const [tables, setTables] = useState(ReparationTableData);

    // State pour afficher ou masquer le modal de création
    const [showCreateModal, setShowCreateModal] = useState('');

    // State pour gérer la pagination des réparations
    const [paginationReparation, setPaginationReparation] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
    });

    let {searchText, pageSize, current} = paginationReparation;
    const searchValue = searchText;

    /**
     * Récupération des données des réparations
     */
    const getReparationData = () => {
        setFetching(true);
        actions
            .getReparation(null, {
                query: {
                    limit: pageSize, // Nombre d'éléments par page
                    offset: (current - 1) * pageSize, // Offset pour paginer les résultats
                    search: searchValue, // Terme de recherche
                },
            })
            .then(({body: reparation}) => {
                // Met à jour le tableau de données
                setTables({
                    ...tables,
                    reparation: {
                        ...tables.reparation,
                        rows: reparation,
                    },
                });
                setPaginationReparation((prevState) => ({
                    ...prevState,
                    current: current,
                    total: reparation.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetching(false);
            })
            .catch(() => {
                message.error(I18n.t('errors.reparation.fetch'));
            });
    };

    useEffect(() => {
        const rolesName = map(roles, ({name}) => name);
        // Configuration des boutons d'action
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: () => askCreateReparation('create'),
            },
            tables: {
                reparation: {
                    onRow: (reparation) => ({
                        onClick: () => handleClickReparation(reparation),
                    }),
                },
            },
        });

        getReparationData(); //Fait un appel pour récupérer les dernières données
    }, []);

    const handleTableChange = (pagination) =>
        setPaginationReparation((prevState) => ({
            ...prevState,
            ...pagination,
        }));

    const handleSearch = (searchText) => {
        setPaginationReparation((prevState) => ({
            ...prevState,
            searchText, // Met à jour le texte de recherche avec la valeur saisie par l'utilisateur
            current: 1, // Réinitialise la page courante à 1 pour afficher les premiers résultats de recherche
            pageSize: 10, // Réinitialise la taille de la page à 10 éléments par page
        }));
    };

    const askCreateReparation = (value) => {
        setShowCreateModal(value);
    };

    // Gestionnaire de succès après l'exécution d'une action
    const onSuccess = () => {
        getReparationData();
        setShowCreateModal('');
    };

    useEffect(() => {
        getReparationData(); //Fait un appel pour récupérer les dernières données
    }, [paginationReparation.current, paginationReparation.pageSize, paginationReparation.searchText]);

    // Gestionnaire de clic sur une réparation du tableau
    const handleClickReparation = (reparation) => {
        navigation.navigate('ReparationDetails', {id: reparation.id_reparation});
    };

    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER' && map(roles, ({name}) => name) !== 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={{
                        tables: {
                            ...tables.reparation,
                            onChange: handleTableChange, // Gestionnaire de changement de pagination et de tri
                            pagination: {
                                position: 'both',
                                showSizeChanger: true,
                                ...paginationReparation,
                            },
                            onRow: (reparation) => ({
                                onClick: () => handleClickReparation(reparation),
                            }),
                        },
                    }}
                    allowSelection={false}
                    updateSelectedData={setSelectedReparation}
                    onChangeSearch={handleSearch}
                    onChange={handleTableChange}
                />
            </Card>

            {/* Modal pour créer une réparation */}
            <ReparationModal
                visible={showCreateModal === 'create'}
                onCancel={() => setShowCreateModal('')}
                title={I18n.t('modals.reparation.create')}
                onOk={onSuccess}
                width={1000}
            />
        </main>
    ) : (
        <NoAccess/>
    );
};

ReparationScreen.propTypes = {
    actions: PropTypes.object,
    reparations: PropTypes.object,
    roles: PropTypes.array,
    navigation: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...ReparationActions}, dispatch),
});

export default withNavigation(connect(null, mapDispatchToProps)(ReparationScreen));
