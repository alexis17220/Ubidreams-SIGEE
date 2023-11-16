import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import TableLayout from 'Components/TableLayout'
import {bindActionCreators} from 'redux'
import {includes, map} from 'lodash'
import {actions as ClassificationActions} from 'Resources/ClassificationRessources'
import {Card, message} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'
import {PlusOutlined} from '@ant-design/icons'
import {withNavigation} from '@react-navigation/core'
import {ArchiveModal} from 'Components/Modals'
import NoAccess from 'Views/NoAccess/NoAccessScreen'
import ClassificationModal from "Components/Modals/ClassificationModal/ClassificationModal";
import {ClassificationTableData} from "Components/Values/ClassificationData/ClassificationTableData";

const ClassificationScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données (fetching), les boutons (button),
    // le modal ouvert (openedModal), la classification sélectionnée (classification),
    // le modal d'archivage (modalArchive), les catégories sélectionnées (selectedCategories)
    // et les tables de données (tables).
    const [fetching, setFetching] = useState(true)
    const [button, setButtons] = useState({})
    const [openedModal, setOpenedModal] = useState('')
    const [classification, setClassification] = useState()
    const [modalArchive, setModalArchive] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [tables, setTables] = useState(ClassificationTableData)

    // Utilise useEffect pour charger les données initiales lors du montage du composant.
    useEffect(() => {
        // Configuration du bouton de création
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showClassificationModal, // Fonction qui ouvre le modal pour la création
            },
        })
        // Configuration de l'action de clic sur une ligne du tableau de classification
        tables.classification.onRow = (record, id) => ({
            onClick: () => updateClassification(record, id), // Fonction pour ouvrir le modal de mise à jour de classification
        })
        getClassificationData() // Récupère les données de classification (appel initial)
    }, [])

    /**
     * Récupération des données de la classification
     */
    const getClassificationData = () => {
        setFetching(true)
        actions
            .getClassifications()
            .then(({body: classification}) => {
                // Met à jour la table avec les données de la classification
                setTables({
                    ...tables,
                    classification: {
                        ...tables.classification,
                        rows: classification,
                    },
                })
                setFetching(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.classification.fetch`))
            })
    }

    /**
     * SUPPRESSION des classifications sélectionnées
     */
    const deleteClassification = () => {
        if (selectedCategories.length > 0) {
            setFetching(true)
            actions
                .deleteCategorieCategories({ids: selectedCategories})
                .then(() => {
                    hideArchiveModal() // Ferme le modal d'archivage
                    setFetching(false)
                    getClassificationData() // Récupère les données mises à jour de la classification après la suppression
                    message.success(I18n.t(`success.classification.delete`))
                })
                .catch(() => {
                    message.error(I18n.t(`errors.classification.delete`))
                })
        }
    }

    // Fonction pour gérer le succès après une action (par exemple, création ou mise à jour de classification)
    const handleSuccess = () => {
        getClassificationData() // Récupère les données mises à jour de la classification après l'action réussie
        hideCategoryModal() // Ferme le modal de création/mise à jour de classification
        setFetching(true)
    }

    // Fonction pour ouvrir le modal de création de classification
    const showClassificationModal = () => {
        setClassification(null) // Réinitialise la classification à null pour la création
        setOpenedModal('createClassification') // Ouvre le modal de création de classification
    }

    // Fonction pour fermer le modal de création/mise à jour de classification
    const hideCategoryModal = () => {
        setOpenedModal('') // Ferme le modal de création/mise à jour de classification
    }

    // Fonction pour ouvrir le modal de mise à jour de classifications et définir les valeurs à mettre à jour
    const updateClassification = (record) => {
        setOpenedModal('updateClassification') // Ouvre le modal de mise à jour de classification
        setClassification(record) // Met à jour la classification avec les données du record
    }

    // Fonction pour ouvrir le modal d'archivage
    const showArchiveModal = () => {
        setModalArchive(true)
    }

    // Fonction pour fermer le modal d'archivage
    const hideArchiveModal = () => {
        setModalArchive(false)
    }

    // Vérifie si des catégories sont sélectionnées pour désactiver le bouton de suppression
    const disabled = !(selectedCategories.length > 0)
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    // Vérifie les rôles de l'utilisateur pour afficher le contenu approprié (Tableau de la classification ou page NoAccess)
    return map(roles, ({name}) => name) != 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) != 'COMPANY_USER' ? (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedCategories} // Met à jour les classifications sélectionnées
                    onChangeSearch={handleSearch}
                />

            </Card>
            {/* Modal pour la création/mise à jour de classification */}
            <ClassificationModal
                visible={includes(['createClassification', 'updateClassification'], openedModal)}
                onCancel={hideCategoryModal}
                title={
                    openedModal === 'updateClassification'
                        ? I18n.t(`modals.classification.update`)
                        : I18n.t(`modals.classification.create`)
                }
                onOk={handleSuccess}
                classification={classification}
            />

            {/* Modal pour l'archivage de classifications */}
            <ArchiveModal
                deleteText={I18n.t(`confirm.classification.delete`)}
                validateArchive={deleteClassification}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    ) : (
        <NoAccess/>
    )
}

ClassificationScreen.propTypes = {
    actions: PropTypes.object,
    classification: PropTypes.object,
    roles: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...ClassificationActions}, dispatch),
})

export default withNavigation(
    connect(null, mapDispatchToProps)(ClassificationScreen)
)
