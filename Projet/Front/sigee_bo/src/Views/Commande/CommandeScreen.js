import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import TableLayout from 'Components/TableLayout'
import {bindActionCreators} from 'redux'
import {includes, map} from 'lodash'
import {actions as CommandeActions} from 'Resources/CommandeRessource'
import {actions as CommandeEtatActions} from 'Resources/CommandeEtatRessource'

import {Card, message, Tabs} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'
import {withNavigation} from '@react-navigation/core'
import NoAccess from 'Views/NoAccess/NoAccessScreen'
import {CommandeTableData} from "Components/Values/CommandeData/CommandeTableData";
import {CommandeEtatTableData} from "Components/Values/CommandeData/CommandeEtatTableData";
import CommandeEtatModal from "Components/Modals/CommandeModal/CommandeEtatModal";
import {PlusOutlined} from "@ant-design/icons";


const CommandeScreen = ({actions, roles}) => {
    // States pour gérer le chargement des données de commande (fetchingCommande) et d'état de commande (fetchingCommandeEtat)
    const [fetchingCommande, setFetchingCommande] = useState(true)
    const [fetchingCommandeEtat, setFetchingCommandeEtat] = useState(true)

    // States pour gérer les commandes sélectionnées, les états de commandes sélectionnés et l'état de la commande à modifier/créer
    const [selectedCommande, setSelectedCommande] = useState([])
    const [selectedCommandeEtat, setSelectedCommandeEtat] = useState([])
    const [commandeEtat, setCommandeEtat] = useState()

    // State pour gérer les boutons (button) et le modal ouvert (openedModal)
    const [button, setButtons] = useState({})
    const [openedModal, setOpenedModal] = useState('')

    // States pour gérer les tables de données de commande (tablesCommande) et d'état de commande (tablesCommandeEtat)
    const [tablesCommande, setTablesCommande] = useState(CommandeTableData)
    const [tablesCommandeEtat, setTablesCommandeEtat] = useState(CommandeEtatTableData)

    // State pour gérer la pagination de la table de commande (paginationCommande)
    const [paginationCommande, setPaginationCommande] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
    });

    // Extrayez les valeurs actuelles de la paginationCommande
    let {searchText, pageSize, current} = paginationCommande;
    const searchValue = searchText;

    useEffect(() => {
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showCommandeEtatModal,
            },
        })
        // Configuration de l'action de clic sur une ligne du tableau d'état de commande
        tablesCommandeEtat.commandesEtat.onRow = (record, id) => ({
            onClick: () => updateCommandeEtat(record, id), // Fonction pour ouvrir le modal de mise à jour d'état de commande
        })
        getCommandeData() // Récupère les données de commande (appel initial)
        getCommandeEtatData() // Récupère les données d'état de commande (appel initial)
    }, [])

    /**
     * Récupération des données de commande
     */
    const getCommandeData = () => {
        setFetchingCommande(true)
        actions
            .getCommande(null, {
                query: {
                    limit: pageSize, // Nombre d'éléments par page
                    offset: (current - 1) * pageSize, // Offset pour paginer les résultats
                    search: searchValue, // Terme de recherche
                }
            })
            .then(({body: commandes}) => {
                // Met à jour la table de commande avec les données récupérées
                setTablesCommande({
                    ...tablesCommande,
                    commandes: {
                        ...tablesCommande.commandes,
                        rows: commandes,
                    },
                })
                setPaginationCommande((prevState) => ({
                    ...prevState,
                    current: current,
                    total: commandes.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetchingCommande(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.commande.fetch`))
            })
    }

    /**
     * Récupération des données d'état de commande
     */
    const getCommandeEtatData = () => {
        setFetchingCommandeEtat(true)
        actions
            .getCommandeEtat()
            .then(({body: commandesEtat}) => {
                // Met à jour la table d'état de commande avec les données récupérées
                setTablesCommandeEtat({
                    ...tablesCommandeEtat,
                    commandesEtat: {
                        ...tablesCommandeEtat.commandesEtat,
                        rows: commandesEtat,
                    },
                })
                setFetchingCommandeEtat(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.etatCommande.fetch`))
            })

    }

    /**
     * Gère le succès après une action (par exemple, création ou mise à jour d'état de commande)
     */
    const handleSuccess = () => {
        getCommandeEtatData() // Récupère les données mises à jour d'état de commande après l'action réussie
        HideCommandeEtatModal() // Ferme le modal de création/mise à jour d'état de commande
        setFetchingCommandeEtat(true)
    }

    /**
     * Ouvre le modal pour une création d'état de commande
     */
    const showCommandeEtatModal = () => {
        setCommandeEtat(null) // Réinitialise l'état de la commande à null pour la création
        setOpenedModal('createCommandeEtat') // Ouvre le modal de création d'état de commande
    }

    /**
     * Ferme le modal de création/mise à jour d'état de commande
     */
    const HideCommandeEtatModal = () => {
        setOpenedModal('')
    }

    /**
     * Ouvre le modal pour une mise à jour d'état de commande et définir les valeurs à mettre à jour
     */
    const updateCommandeEtat = (record) => {
        setOpenedModal('updateCommandeEtat') // Ouvre le modal de mise à jour d'état de commande
        setCommandeEtat(record) // Met à jour l'état de la commande avec les données du record
    }

    /**
     * Gère le changement de pagination et de tri dans la table de commande
     */
    const handleTableChange = (pagination) => setPaginationCommande(
        (prevState) =>
            ({
                ...prevState,
                ...pagination,
            })
    );

    /**
     * Gère la recherche dans la table de commande
     */
    const handleSearch = (searchText) => {
        setPaginationCommande((prevState) => ({
            ...prevState,
            searchText, // Met à jour le texte de recherche avec la valeur saisie par l'utilisateur
            current: 1, // Réinitialise la page courante à 1 pour afficher les premiers résultats de recherche
            pageSize: 10, // Réinitialise la taille de la page à 10 éléments par page
        }));

    };

    //Lorsque la requète est éffectué, effectuer un appel pour récupérer les dernières données
    useEffect(() => {
        getCommandeData()
    }, [paginationCommande.current, paginationCommande.pageSize, paginationCommande.searchText])

    // Vérifie les rôles de l'utilisateur pour afficher le contenu approprié (Tableau de commandes et d'états de commande ou page NoAccess)
    return map(roles, ({name}) => name) != 'SIGEE_MANAGER' &&
    map(roles, ({name}) => name) != 'SIGEE_USER' ? (
        <main className="screen">
            <Card>
                <Tabs
                    items={[
                        // Commande
                        {
                            key: 'commande',
                            label: I18n.t(`tabs.commande`),
                            children: (
                                <div>
                                    <TableLayout
                                        loading={fetchingCommande}
                                        tables={{
                                            tablesCommande: {
                                                ...tablesCommande.commandes,
                                                onChange: handleTableChange, // Gestionnaire de changement de pagination et de tri
                                                pagination: {
                                                    position: "both",
                                                    showSizeChanger: true,
                                                    ...paginationCommande,
                                                },
                                            },
                                        }}
                                        updateSelectedData={setSelectedCommande}
                                        allowSelection={false}
                                        onChange={handleTableChange}
                                        showSizeChanger={false}
                                        onChangeSearch={handleSearch}
                                    />
                                </div>
                            ),
                        },
                        // Etat Commande
                        {
                            key: 'etat',
                            label: I18n.t(`tabs.etatCommande`),
                            children: (
                                <div>
                                    <TableLayout
                                        loading={fetchingCommandeEtat}
                                        tables={tablesCommandeEtat}
                                        buttons={button}
                                        updateSelectedData={setSelectedCommandeEtat}
                                        allowSelection={false}
                                        commandeEtat={commandeEtat}

                                    />
                                    <CommandeEtatModal
                                        visible={includes(['createCommandeEtat', 'updateCommandeEtat'], openedModal)}
                                        onCancel={HideCommandeEtatModal}
                                        title={
                                            openedModal === 'updateCommandeEtat'
                                                ? I18n.t(`modals.etatCommande.update`)
                                                : I18n.t(`modals.etatCommande.create`)
                                        }
                                        onOk={handleSuccess}
                                        commandeEtat={commandeEtat}
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

CommandeScreen.propTypes = {
    actions: PropTypes.object,
    commande: PropTypes.object,
    commandesEtat: PropTypes.object,
    roles: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...CommandeActions, ...CommandeEtatActions}, dispatch),
})

export default withNavigation(
    connect(null, mapDispatchToProps)(CommandeScreen)
)
