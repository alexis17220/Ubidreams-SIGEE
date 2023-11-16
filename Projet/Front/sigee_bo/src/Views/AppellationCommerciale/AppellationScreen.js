import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import TableLayout from 'Components/TableLayout'
import {bindActionCreators} from 'redux'
import {includes, map} from 'lodash'
import {actions as AppellationActions} from 'Resources/AppellationComRessources'
import {Card, message} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'
import {PlusOutlined} from '@ant-design/icons'
import {withNavigation} from '@react-navigation/core'
import {ArchiveModal} from 'Components/Modals'
import NoAccess from 'Views/NoAccess/NoAccessScreen'
import AppellationModal from "Components/Modals/AppellationComModal/AppellationModal";
import {AppellationTableData} from "Components/Values/AppellationComData/AppellationTableData";

const AppellationScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données (fetching), les boutons (button),
    // le modal ouvert (openedModal), l'affectation sélectionnée (appellation), le modal d'archivage (modalArchive),
    // les appellations sélectionnées (selectedAppellation) et les tables de données (tables).
    const [fetching, setFetching] = useState(true)
    const [button, setButtons] = useState({})
    const [openedModal, setOpenedModal] = useState('')
    const [appellation, setAppellation] = useState()
    const [modalArchive, setModalArchive] = useState(false)
    const [selectedAppellation, setSelectedAppellation] = useState([])
    const [tables, setTables] = useState(AppellationTableData)

    // Utilise useEffect pour charger les données initiales lors du montage du composant.
    useEffect(() => {
        // Configuration du bouton de création
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showAppellationModal, // Fonction qui ouvre le modal pour la création
            },
        })
        // Configuration de l'action de clic sur une ligne du tableau des appellations
        tables.appellations.onRow = (record, id) => ({
            onClick: () => updateAppellations(record, id), // Fonction pour ouvrir le modal de mise à jour d'appellation
        })
        getAppellationData() // Récupère les données des appellations (appel initial)
    }, [])

    /**
     * Récupération des données des appellations
     */
    const getAppellationData = () => {
        setFetching(true)
        actions
            .getAppellations()
            .then(({body: appellations}) => {
                // Met à jour la table avec les données des appellations
                setTables({
                    ...tables,
                    appellations: {
                        ...tables.appellations,
                        rows: appellations,
                    },
                })
                setFetching(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.appellation.fetch`))
            })
    }

    /**
     * SUPPRESSION des appellations sélectionnées
     */
    const deleteAppellations = () => {
        if (selectedAppellation.length > 0) {
            setFetching(true)
            actions
                .deleteAppellationAppellations({ids: selectedAppellation})
                .then(() => {
                    hideArchiveModal() // Ferme le modal d'archivage
                    setFetching(false)
                    getAppellationData() // Récupère les données mises à jour des appellations après la suppression
                    message.success(I18n.t(`success.appellation.delete`))
                })
                .catch(() => {
                    message.error(I18n.t(`errors.appellation.delete`))
                })
        }
    }

    // Fonction pour gérer le succès après une action (par exemple, création ou mise à jour d'appellation)
    const handleSuccess = () => {
        getAppellationData() // Récupère les données mises à jour des appellations après l'action réussie
        hideCategoryModal() // Ferme le modal de création/mise à jour d'appellation
        setFetching(true)
    }

    // Fonction pour ouvrir le modal de création d'appellation
    const showAppellationModal = () => {
        setAppellation(null) // Réinitialise l'appellation à null pour la création
        setOpenedModal('createAppellation') // Ouvre le modal de création d'appellation
    }

    // Fonction pour fermer le modal de création/mise à jour d'appellation
    const hideCategoryModal = () => {
        setOpenedModal('') // Ferme le modal de création/mise à jour d'appellation
    }

    // Fonction pour ouvrir le modal de mise à jour d'appellations et définir les valeurs à mettre à jour
    const updateAppellations = (record) => {
        setOpenedModal('updateAppellations') // Ouvre le modal de mise à jour d'appellation
        setAppellation(record) // Met à jour l'appellation avec les données du record
    }

    // Fonction pour ouvrir le modal d'archivage
    const showArchiveModal = () => {
        setModalArchive(true)
    }

    // Fonction pour fermer le modal d'archivage
    const hideArchiveModal = () => {
        setModalArchive(false)
    }

    // Vérifie si des appellations sont sélectionnées pour désactiver le bouton de suppression
    const disabled = !(selectedAppellation.length > 0)

    // Define the handleSearch function
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    // Vérifie les rôles de l'utilisateur pour afficher le contenu approprié (Tableau des appellations ou page NoAccess)
    return map(roles, ({name}) => name) !== 'COMPANY_MANAGER'/*a changer*/ &&
    map(roles, ({name}) => name) !== 'COMPANY_USER'/*a changer*/ ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedAppellation} // Met à jour les appellations sélectionnées
                    onChangeSearch={handleSearch}

                />

            </Card>
            {/* Modal pour la création/mise à jour d'appellation */}
            <AppellationModal
                visible={includes(['createAppellation', 'updateAppellations'], openedModal)}
                onCancel={hideCategoryModal}
                title={
                    openedModal === 'updateAppellations'
                        ? I18n.t(`modals.appellation.update`)
                        : I18n.t(`modals.appellation.create`)
                }
                onOk={handleSuccess}
                appellation={appellation}

            />

            {/* Modal pour l'archivage d'appellations */}
            <ArchiveModal
                deleteText={I18n.t(`confirm.appellation.delete`)}
                validateArchive={deleteAppellations}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        // Si l'utilisateur a un rôle non autorisé, affiche la page NoAccess
        <NoAccess/>
    )
}

AppellationScreen.propTypes = {
    actions: PropTypes.object,
    appellation: PropTypes.object,
    roles: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AppellationActions}, dispatch),
})

export default withNavigation(
    connect(null, mapDispatchToProps)(AppellationScreen)
)
