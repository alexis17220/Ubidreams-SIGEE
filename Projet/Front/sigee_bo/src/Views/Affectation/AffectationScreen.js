import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import TableLayout from 'Components/TableLayout'
import {bindActionCreators} from 'redux'
import {includes, map} from 'lodash'
import {actions as AffectationHistoAdmActions} from 'Resources/AffectationHistoAdmRessources'
import {actions as AffectationHistoPhyActions} from 'Resources/AffectationHistoPhyRessources'
import {actions as AffectationHistoGisementActions} from 'Resources/AffectationHistoGisementRessources'
import {actions as AffectationActions} from 'Resources/AffectationsRessource'

import {Card, Collapse, message, Tabs} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'
import {withNavigation} from '@react-navigation/core'
import NoAccess from 'Views/NoAccess/NoAccessScreen'
import {AffectationHistoAdmTableData} from "Components/Values/AffectationData/AffectationHistoAdmTableData";
import {AffectationHistoPhyTableData} from "Components/Values/AffectationData/AffectationHistoPhyTableData";
import {AffectationHistoGisementTableData} from "Components/Values/AffectationData/AffectationHistoGisementTableData";
import {AffectationTableData} from "Components/Values/AffectationData/AffectationTableData";

import AffectationsHistoPhyModal from "Components/Modals/AffectationModal/AffectationHistoPhyModal";
import {EditOutlined, PlusOutlined} from "@ant-design/icons";
import axios from "axios";
import {baseURL} from "Resources";
import AffectationModal from "Components/Modals/AffectationModal/AffectationModal";

const {Panel} = Collapse;

const AffectationScreen = ({actions, roles}) => {
// Ces variables sont déclarées en tant qu'états à l'aide du hook useState. Elles gèrent le statut de récupération pour différentes données.
    const [fetchingAdm, setFetchingAdm] = useState(true); // État pour la récupération des données administratives
    const [fetchingPhy, setFetchingPhy] = useState(true); // État pour la récupération des données physiques
    const [fetchingGis, setFetchingGis] = useState(true); // État pour la récupération des données de gisement
    const [fetchingAffect, setFetchingAffect] = useState(true); // État pour la récupération des données d'affectation
    const [fetching, setFetching] = useState(true); // État général pour la récupération des données

    const [selectedAffectationAdm, setSelectedAffectationAdm] = useState([]); // État pour les affectations administratives sélectionnées
    const [selectedAffectationPhy, setSelectedAffectationPhy] = useState([]); // État pour les affectations physiques sélectionnées
    const [selectedAffectationGis, setSelectedAffectationGis] = useState([]); // État pour les affectations de gisement sélectionnées
    const [selectedAffectation, setSelectedAffectation] = useState([]); // État pour les affectations générales sélectionnées
    const [affectation, setAffectation] = useState(null); // État pour une affectation spécifique

    const [affectationPhy, setAffectationPhy] = useState(); // État pour une affectation physique spécifique
    const [button, setButtons] = useState({}); // État pour les boutons
    const [buttonAffect, setButtonAffect] = useState(); // État pour le bouton d'affectation
    const [openedModal, setOpenedModal] = useState(''); // État pour le modal ouvert
    const [tables, setTables] = useState(AffectationTableData); // État pour les données du tableau d'affectations

    const [tablesAdm, setTablesAdm] = useState(AffectationHistoAdmTableData); // État pour les données du tableau d'historique des affectations administratives
    const [tablesPhy, setTablesPhy] = useState(AffectationHistoPhyTableData); // État pour les données du tableau d'historique des affectations physiques
    const [tablesGis, setTablesGis] = useState(AffectationHistoGisementTableData); // État pour les données du tableau d'historique des affectations de gisement
    const [affectationValues, setAffectationValues] = useState([]); // État pour les valeurs d'affectation

    const defaultPagination = {
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
    };

    const [paginationAffectationAdm, setPaginationAffectationAdm] = useState(defaultPagination); // État pour la pagination des données d'affectation administrative
    const [paginationAffectationPhy, setPaginationAffectationPhy] = useState(defaultPagination); // État pour la pagination des données d'affectation physique
    const [paginationAffectationGis, setPaginationAffectationGis] = useState(defaultPagination); // État pour la pagination des données d'affectation de gisement
    const [paginationAffectation, setPaginationAffectation] = useState(defaultPagination); // État pour la pagination des données d'affectation générale

    let {searchText: searchTextAdm, pageSize: pageSizeAdm, current: currentAdm} = paginationAffectationAdm; // Variables extraites de l'état pour la pagination des données d'affectation administrative
    let {searchText: searchTextPhy, pageSize: pageSizePhy, current: currentPhy} = paginationAffectationPhy; // Variables extraites de l'état pour la pagination des données d'affectation physique
    let {searchText: searchTextGis, pageSize: pageSizeGis, current: currentGis} = paginationAffectationGis; // Variables extraites de l'état pour la pagination des données d'affectation de gisement
    let {searchText: searchText} = paginationAffectation; // Variable extraite de l'état pour la pagination des données d'affectation générale

    const searchValuePhy = searchTextPhy; // Valeur de recherche pour les données d'affectation physique
    const searchValueGis = searchTextGis; // Valeur de recherche pour les données d'affectation de gisement


    useEffect(() => {
        // Définition du bouton "Créer" avec son libellé, icône et action associée
        setButtons({
            create: {
                label: I18n.t('common.create'), // Libellé traduit pour le bouton "Créer"
                icon: <PlusOutlined/>, // Icône "Plus" de Ant Design pour le bouton "Créer"
                action: showAffectationPhyModal, // Action à exécuter lorsque le bouton "Créer" est cliqué
            },
        });

        // Configuration de l'action à exécuter lorsque l'utilisateur clique sur une ligne du tableau des affectations physiques
        tablesPhy.affectationHistoPhy.onRow = (record, id) => ({
            onClick: () => updateAffectationPhy(record, id), // Lorsque l'utilisateur clique sur une ligne, la fonction updateAffectationPhy est appelée avec les données de la ligne
        });

        // Récupération des données des affectations physiques
        getAffectationPhyData();

        // Récupération des données des affectations de gisement
        getAffectationGisData();
    }, []);


    /**
     * Récupération des données des catégories
     */
    const getAffectationAdmData = () => {
        setFetchingAdm(true);
        actions
            .getAffectationHistoAdm(null, {
                query: {
                    limit: pageSizeAdm, // Nombre d'éléments par page
                    offset: (currentAdm - 1) * pageSizeAdm, // Offset pour paginer les résultats
                    search: searchTextAdm, // Terme de recherche
                },
            })
            .then(({body: affectationHistoAdm}) => {
                // Met à jour la table
                setTablesAdm({
                    ...tablesAdm,
                    affectationHistoAdm: {
                        ...tablesAdm.affectationHistoAdm,
                        rows: affectationHistoAdm,
                    },
                });
                setPaginationAffectationAdm((prevState) => ({
                    ...prevState,
                    current: currentAdm,
                    total: affectationHistoAdm.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetchingAdm(false);
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectAdm.fetch`));
            });
    };


    const [affectations, setAffectations] = useState([]);
    const getAffectationData = () => {
        const queryParams = {
            params: {
                search: searchText
            }
        };
        axios.get(`${baseURL}/affectations/`, queryParams)
            .then((response) => {
                setAffectations(response.data.results);
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectation.fetch`));
            });
    };

    useEffect(() => {
        // Mise à jour de la configuration de la table des affectations
        // Nous copions l'état de la table actuelle (tables) dans une nouvelle variable updatedTable
        const updatedTable = {
            ...tables,
            affectation: {
                ...tables.affectation,
                // Ici, nous configurons l'action à exécuter lorsque l'utilisateur clique sur une ligne de la table des affectations
                onRow: (record) => ({
                    onClick: () => updateAffectation(record), // Lorsque l'utilisateur clique sur une ligne, la fonction updateAffectation sera appelée avec les données de la ligne (record)
                }),
            },
        };

        // Mise à jour de l'état de la table avec la nouvelle configuration
        setTables(updatedTable);

        // Configuration du bouton "Créer" avec son libellé, icône et action associée
        setButtonAffect({
            create: {
                label: I18n.t('common.create'), // Libellé traduit pour le bouton "Créer"
                icon: <PlusOutlined/>, // Icône "Plus" de Ant Design pour le symbole "+"
                action: showAffectationModal, // Action à exécuter lorsque le bouton "Créer" est cliqué
            },
        });

        // Récupération des données des affectations
        getAffectationData();
    }, []);

    const genExtra = (record, updateAffectation) => {
        // Cette fonction génère le contenu supplémentaire (extra) à afficher à droite du titre du panel.

        // handleClick est appelée lorsque l'utilisateur clique sur l'icône "Modifier".
        const handleClick = (event) => {
            updateAffectation(record); // Mise à jour de l'affectation avec les nouvelles données du record.
            event.stopPropagation(); // Empêche la propagation de l'événement de clic vers les éléments parents.
        };

        return (
            <EditOutlined onClick={handleClick}/> // On retourne l'icône "Modifier" de Ant Design avec l'événement onClick lié à handleClick.
        );
    };

    const renderPanel = (data, updateAffectation) => {
        // Cette fonction génère le contenu d'un panel d'affectation.

        if (data.enfants && data.enfants.length > 0) {
            // Si l'affectation (data) possède des enfants (data.enfants), on crée un nouveau panel Collapse pour chaque enfant.
            // La fonction renderPanel est récursivement appelée pour chacun d'eux.

            return (
                <Collapse>
                    {data.enfants.map((enfant) => (
                        <Collapse.Panel
                            header={enfant.libelle}
                            key={enfant.id_affectation.toString()}
                            extra={genExtra(enfant, updateAffectation)} // On utilise genExtra pour générer l'icône "Modifier" pour chaque enfant.
                            // Récursivement, on génère le contenu de chaque enfant.
                        >
                            {renderPanel(enfant, updateAffectation)}
                        </Collapse.Panel>
                    ))}
                </Collapse>
            );
        } else {
            // Si l'affectation n'a pas d'enfant, on affiche simplement son libellé (data.libelle) dans un élément <p>.
            // On lie également un événement onClick à updateAffectation pour permettre la mise à jour de l'affectation quand l'utilisateur clique dessus.

            return (
                <p onClick={() => updateAffectation(data)}>{data.libelle}</p>
            );
        }
    };

    const renderAffectationPanel = (data, updateAffectation) => {
        // Cette fonction génère le panel d'affectation de niveau supérieur.

        return (
            <Collapse.Panel
                header={data.libelle}
                key={data.id_affectation.toString()}
                extra={genExtra(data, updateAffectation)} // On utilise genExtra pour générer l'icône "Modifier" pour le panel de niveau supérieur.
                // On génère le contenu du panel en utilisant la fonction renderPanel.
            >
                {renderPanel(data, updateAffectation)}
            </Collapse.Panel>
        );
    };


    const getAffectationPhyData = () => {
        setFetchingPhy(true)
        actions
            .getAffectationHistoPhy(null, {
                query: {
                    limit: pageSizePhy, // Nombre d'éléments par page
                    offset: (currentPhy - 1) * pageSizePhy, // Offset pour paginer les résultats
                    search: searchValuePhy, // Terme de recherche
                }
            })
            .then(({body: affectationHistoPhy}) => {
                // Met a jour la table
                setTablesPhy({
                    ...tablesPhy,
                    affectationHistoPhy: {
                        ...tablesPhy.affectationHistoPhy,
                        rows: affectationHistoPhy,
                    },
                })
                setPaginationAffectationPhy((prevState) => ({
                    ...prevState,
                    currentPhy: currentPhy,
                    total: affectationHistoPhy.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetchingPhy(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectPhy.fetch`))
            })

    }
    const getAffectationGisData = () => {
        setFetchingGis(true)
        actions
            .getAffectationHistoGisement(null, {
                query: {
                    limit: pageSizeGis, // Nombre d'éléments par page
                    offset: (currentGis - 1) * pageSizeGis, // Offset pour paginer les résultats
                    search: searchValueGis, // Terme de recherche
                }
            })
            .then(({body: affectationHistoGisement}) => {
                // Met a jour la table
                setTablesGis({
                    ...tablesGis,
                    affectationHistoGisement: {
                        ...tablesGis.affectationHistoGisement,
                        rows: affectationHistoGisement,
                    },
                })
                setPaginationAffectationGis((prevState) => ({
                    ...prevState,
                    current: currentGis,
                    total: affectationHistoGisement.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetchingGis(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectGis.fetch`))
            })
    }
    const handleSuccess = () => {
        getAffectationPhyData()
        HideAffectationPhyModal()
        setFetchingPhy(true)
        getAffectationData()
        HideAffectationModal()
        setFetchingAffect(true)

    }

    //Ouvre le modal pour une création
    const showAffectationPhyModal = () => {
        setAffectationPhy(null)
        setOpenedModal('createAffectationPhy')
    }
    const [modalVisible, setModalVisible] = useState(false);

    const showAffectationModal = () => {
        setAffectation(null)
        setModalVisible(true);
        setOpenedModal('createAffectation')
    }
    //ferme le modal
    const HideAffectationPhyModal = () => {
        setOpenedModal('')
    }
    const HideAffectationModal = () => {
        setAffectation(null)
        setModalVisible(false);
        setOpenedModal('')

    }

    /**
     * Récupération des données des affectations
     */
        // const getOneAffectationsPhy = (id_histo_phy) => {
        //     setFetchingPhy(true)
        //     actions
        //         .getOneAffectationHistoPhy(id_histo_phy)
        //         .then(({ body: affectationPhy }) => {
        //             setAffectationPhy(affectationPhy)
        //             setFetchingPhy(false)
        //         })
        //         .catch(() => {
        //             message.error(I18n.t(`errors.affectation.fetch`))
        //         })
        // }
    const updateAffectationPhy = (record) => {
            // getOneAffectationsPhy(record.id_histo_phy)
            setAffectationPhy(record)
            setOpenedModal('updateAffectationPhy')
        }
    /**
     * Récupération des données des affectations
     */
        // const getOneAffectations = (id_affectation) => {
        //     setFetching(true)
        //     actions
        //         .getOneAffectations(id_affectation)
        //         .then(({ body: affectation }) => {
        //             setAffectation(affectation)
        //             setFetching(false)
        //         })
        //         .catch(() => {
        //             message.error(I18n.t(`errors.affectation.fetch`))
        //         })
        // }
// Cette fonction met à jour l'état de l'affectation et ouvre le modal de mise à jour d'affectation.
    const updateAffectation = (record) => {
            // getOneAffectations(record.id_affectation) -> Cette ligne est actuellement en commentaire et n'est pas utilisée.
            setAffectation(record); // Mise à jour de l'affectation avec les données du record.
            setOpenedModal('updateAffectation'); // Ouverture du modal de mise à jour d'affectation.
        };

// Cette fonction permet de gérer le changement de pagination pour une table.
    const handleTableChange = (pagination, setPagination) => {
        setPagination((prevState) => ({
            ...prevState,
            ...pagination, // Mise à jour de la pagination en fusionnant l'état actuel avec les nouvelles données de pagination.
        }));
    };

// Cette fonction permet de gérer la recherche dans une table en mettant à jour la pagination avec le nouveau terme de recherche.
    const handleSearch = (searchText, setPagination) => {
        setPagination((prevState) => ({
            ...prevState,
            searchText, // Mise à jour du terme de recherche.
            current: 1, // Réinitialisation du numéro de page à 1.
            pageSize: 10, // Réinitialisation de la taille de la page à 10.
        }));
    };

    // Les fonctions suivantes (handleSearchAffect, handleTableChangeAffect, handleTableChangeAdm, handleSearchAdm,
// handleTableChangePhy, handleSearchPhy, handleTableChangeGis, handleSearchGis) sont des fonctions utilitaires
// qui appellent les fonctions handleSearch et handleTableChange avec les bonnes fonctions de mise à jour de la pagination
// pour chaque table (paginationAffectation, paginationAffectationAdm, paginationAffectationPhy, paginationAffectationGis).


    const handleSearchAffect = (searchText) =>
        handleSearch(searchText, setPaginationAffectation);

    const handleTableChangeAffect = (pagination) =>
        handleTableChange(pagination, setPaginationAffectation);

    const handleTableChangeAdm = (pagination) =>
        handleTableChange(pagination, setPaginationAffectationAdm);

    const handleSearchAdm = (searchTextAdm) =>
        handleSearch(searchTextAdm, setPaginationAffectationAdm);

    const handleTableChangePhy = (pagination) =>
        handleTableChange(pagination, setPaginationAffectationPhy);

    const handleSearchPhy = (searchTextPhy) =>
        handleSearch(searchTextPhy, setPaginationAffectationPhy);

    const handleTableChangeGis = (pagination) =>
        handleTableChange(pagination, setPaginationAffectationGis);

    const handleSearchGis = (searchTextGis) =>
        handleSearch(searchTextGis, setPaginationAffectationGis);

// Utilise useEffect pour effectuer une action (getAffectationData) lorsque le terme de recherche (paginationAffectation.searchText) change.
    useEffect(() => {
        getAffectationData(); // Obtient les données d'affectation en fonction du terme de recherche actuel.
    }, [paginationAffectation.searchText]);

// Utilise useEffect pour effectuer une action (getAffectationAdmData) lorsque les paramètres de pagination pour les affectations administratives changent.
    useEffect(() => {
        getAffectationAdmData(); // Obtient les données d'affectation administrative en fonction des paramètres de pagination actuels.
    }, [paginationAffectationAdm.current, paginationAffectationAdm.pageSize, paginationAffectationAdm.searchText]);

// Utilise useEffect pour effectuer une action (getAffectationPhyData) lorsque les paramètres de pagination pour les affectations physiques changent.
    useEffect(() => {
        getAffectationPhyData(); // Obtient les données d'affectation physique en fonction des paramètres de pagination actuels.
    }, [paginationAffectationPhy.current, paginationAffectationPhy.pageSize, paginationAffectationPhy.searchText]);

// Utilise useEffect pour effectuer une action (getAffectationGisData) lorsque les paramètres de pagination pour les affectations des gisements changent.
    useEffect(() => {
        getAffectationGisData(); // Obtient les données d'affectation des gisements en fonction des paramètres de pagination actuels.
    }, [paginationAffectationGis.current, paginationAffectationGis.pageSize, paginationAffectationGis.searchText]);

    return map(roles, ({name}) => name) != 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) != 'COMPANY_USER' ? (
        <main className="screen">

            <Card>
                <Tabs
                    items={[
                        // Affectation
                        {
                            key: 'affect',
                            label: I18n.t(`fields.affectation.shortName`),
                            children: (
                                <div>
                                    <TableLayout
                                        loading={fetching}
                                        updateSelectedData={setSelectedAffectation}
                                        allowSelection={false}
                                        buttons={buttonAffect}
                                        onChangeSearch={handleSearchAffect}
                                        onChange={handleTableChangeAffect}
                                    />
                                    {!modalVisible && (
                                        <Collapse>
                                            {affectations
                                                ?.filter((affectation) =>
                                                    affectation.libelle.toLowerCase().includes(searchText.toLowerCase())
                                                )
                                                .map((affectation) => (
                                                    <React.Fragment key={affectation.id_affectation.toString()}>
                                                        {renderAffectationPanel(affectation, updateAffectation)}
                                                    </React.Fragment>
                                                ))}
                                        </Collapse>
                                    )}
                                    <AffectationModal
                                        visible={includes(['createAffectation', 'updateAffectation'], openedModal)}
                                        onCancel={HideAffectationModal}
                                        title={
                                            openedModal === 'updateAffectation'
                                                ? I18n.t(`modals.affectation.update`)
                                                : I18n.t(`modals.affectation.create`)
                                        }
                                        onOk={handleSuccess}
                                        affectation={affectation}
                                    />
                                </div>
                            ),
                        },
                        // Affectation Adm
                        {
                            key: 'adm',
                            label: I18n.t(`fields.affectAdm.title`),
                            children: (
                                <div>
                                    <TableLayout
                                        loading={fetchingAdm}
                                        tables={{
                                            tablesAdm: {
                                                ...tablesAdm.affectationHistoAdm,
                                                onChange: handleTableChangeAdm, // Gestionnaire de changement de pagination et de tri
                                                pagination: {
                                                    position: "both",
                                                    showSizeChanger: true,
                                                    ...paginationAffectationAdm,
                                                },
                                            },
                                        }}
                                        updateSelectedData={setSelectedAffectationAdm}
                                        allowSelection={false}
                                        onChangeSearch={handleSearchAdm}
                                        onChange={handleTableChangeAdm}
                                    />
                                </div>
                            ),
                        },
                        // Affectation Phy
                        {
                            key: 'phy',
                            label: I18n.t(`fields.affectPhy.title`),
                            children: (
                                <div>
                                    <TableLayout
                                        loading={fetchingPhy}
                                        tables={{
                                            tablesPhy: {
                                                ...tablesPhy.affectationHistoPhy,
                                                onChange: handleTableChangePhy, // Gestionnaire de changement de pagination et de tri
                                                pagination: {
                                                    position: "both",
                                                    showSizeChanger: true,
                                                    ...paginationAffectationPhy,
                                                },
                                            },
                                        }}
                                        buttons={button}
                                        updateSelectedData={setSelectedAffectationPhy}
                                        allowSelection={false}
                                        onChangeSearch={handleSearchPhy}
                                        onChange={handleTableChangePhy}

                                    />
                                    <AffectationsHistoPhyModal
                                        visible={includes(['createAffectationPhy', 'updateAffectationPhy'], openedModal)}
                                        onCancel={HideAffectationPhyModal}
                                        title={
                                            openedModal === 'updateAffectationPhy'
                                                ? I18n.t(`modals.affectPhy.update`)
                                                : I18n.t(`modals.affectPhy.create`)
                                        }
                                        onOk={handleSuccess}
                                        affectationPhys={affectationPhy}
                                    />
                                </div>
                            ),
                        },
                        // Affectation Gisement
                        {
                            key: 'Gis',
                            label: I18n.t(`fields.affectGis.title`),
                            children: (
                                <div>
                                    <TableLayout
                                        loading={fetchingGis}
                                        tables={{
                                            tablesGis: {
                                                ...tablesGis.affectationHistoGisement,
                                                onChange: handleTableChangeGis, // Gestionnaire de changement de pagination et de tri
                                                pagination: {
                                                    position: "both",
                                                    showSizeChanger: true,
                                                    ...paginationAffectationGis,
                                                },
                                            },
                                        }}
                                        updateSelectedData={setSelectedAffectationGis}
                                        allowSelection={false}
                                        onChangeSearch={handleSearchGis}
                                        onChange={handleTableChangeGis}
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>

        </main>
    ) : (
        <NoAccess/>
    )
}

AffectationScreen.propTypes = {
    actions: PropTypes.object,
    affectationHistoAdm: PropTypes.object,
    affectationHistoPhy: PropTypes.object,
    affectationHistoGis: PropTypes.object,
    roles: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AffectationHistoAdmActions, ...AffectationHistoGisementActions, ...AffectationHistoPhyActions, ...AffectationActions}, dispatch),
})

export default withNavigation(
    connect(null, mapDispatchToProps)(AffectationScreen)
)
