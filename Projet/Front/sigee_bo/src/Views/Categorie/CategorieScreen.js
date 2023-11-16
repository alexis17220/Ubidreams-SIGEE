import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import TableLayout from 'Components/TableLayout'
import {bindActionCreators} from 'redux'
import {includes} from 'lodash'
import {actions as categoriesActions} from 'Resources/CategoriesResource'
import {Card, message} from 'antd'
import I18n from 'I18n'
import PropTypes from 'prop-types'
import {PlusOutlined} from '@ant-design/icons'
import {withNavigation} from '@react-navigation/core'
import {ArchiveModal} from 'Components/Modals'
import {CategorieTableData} from "Components/Values/CategorieData/CategorieTableData";
import CategoryModal from "Components/Modals/CategoryModal/CategoryModal";

const CategoriesScreen = ({actions, roles}) => {
    // State pour gérer le chargement des données (fetching), les boutons (button),
    // le modal ouvert (openedModal), la catégorie sélectionnée (category), le modal d'archivage (modalArchive),
    // les catégories sélectionnées (selectedCategories) et les tables de données (tables).
    const [fetching, setFetching] = useState(true)
    const [button, setButtons] = useState({})
    const [openedModal, setOpenedModal] = useState('')
    const [category, setCategory] = useState()
    const [modalArchive, setModalArchive] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [tables, setTables] = useState(CategorieTableData)

    // Utilise useEffect pour charger les données initiales lors du montage du composant.
    useEffect(() => {
        // Configuration du bouton de création
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: showCategoryModal, // Fonction qui ouvre le modal pour la création
            },
        })
        // Configuration de l'action de clic sur une ligne du tableau des catégories
        tables.categories.onRow = (record, id) => ({
            onClick: () => updateCategory(record, id), // Fonction pour ouvrir le modal de mise à jour de catégorie
        })
        getCategoriesData() // Récupère les données des catégories (appel initial)
    }, [])

    /**
     * Récupération des données des catégories
     */
    const getCategoriesData = () => {
        setFetching(true)
        actions
            .getCategories()
            .then(({body: categories}) => {
                // Met à jour la table avec les données des catégories
                setTables({
                    ...tables,
                    categories: {
                        ...tables.categories,
                        rows: categories,
                    },
                })
                setFetching(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.categories.fetch`))
            })
    }

    /**
     * SUPPRESSION des catégories sélectionnées
     */
    const deleteCategories = () => {
        if (selectedCategories.length > 0) {
            setFetching(true)
            actions
                .deleteCategorieCategories({ids: selectedCategories})
                .then(() => {
                    hideArchiveModal() // Ferme le modal d'archivage
                    setFetching(false)
                    getCategoriesData() // Récupère les données mises à jour des catégories après la suppression
                    message.success(I18n.t(`success.categories.delete`))
                })
                .catch(() => {
                    message.error(I18n.t(`errors.categories.delete`))
                })
        }
    }

    // Fonction pour gérer le succès après une action (par exemple, création ou mise à jour de catégorie)
    const handleSuccess = () => {
        getCategoriesData() // Récupère les données mises à jour des catégories après l'action réussie
        hideCategoryModal() // Ferme le modal de création/mise à jour de catégorie
        setFetching(true)
    }

    // Fonction pour ouvrir le modal de création de catégorie
    const showCategoryModal = () => {
        setCategory(null) // Réinitialise la catégorie à null pour la création
        setOpenedModal('createCategory') // Ouvre le modal de création de catégorie
    }

    // Fonction pour fermer le modal de création/mise à jour de catégorie
    const hideCategoryModal = () => {
        setOpenedModal('') // Ferme le modal de création/mise à jour de catégorie
    }

    // Fonction pour ouvrir le modal de mise à jour de catégories et définir les valeurs à mettre à jour
    const updateCategory = (record) => {
        setOpenedModal('updateCategory') // Ouvre le modal de mise à jour de catégorie
        setCategory(record) // Met à jour la catégorie avec les données du record
    }

    // Fonction pour ouvrir le modal d'archivage
    const showArchiveModal = () => {
        setModalArchive(true)
    }

    // Fonction pour fermer le modal d'archivage
    const hideArchiveModal = () => {
        setModalArchive(false)
    }
    // Define the handleSearch function
    const handleSearch = (searchValue) => {
        // Implement the search logic here using 'searchValue'
        // For example, you can filter 'tables.logs.rows' based on 'searchValue'
        console.log('Search Value:', searchValue);
    };
    // Vérifie si des catégories sont sélectionnées pour désactiver le bouton de suppression
    const disabled = !(selectedCategories.length > 0)

    // Vérifie les rôles de l'utilisateur pour afficher le contenu approprié (Tableau des catégories ou page NoAccess)
    return (
        <main className="screen">
            <Card>
                <TableLayout
                    buttons={button}
                    loading={fetching}
                    tables={tables}
                    allowSelection={false}
                    updateSelectedData={setSelectedCategories} // Met à jour les catégories sélectionnées
                    onChangeSearch={handleSearch}

                />

            </Card>
            {/* Modal pour la création/mise à jour de catégorie */}
            <CategoryModal
                visible={includes(['createCategory', 'updateCategory'], openedModal)}
                onCancel={hideCategoryModal}
                title={
                    openedModal === 'updateCategory'
                        ? I18n.t(`modals.categories.update`)
                        : I18n.t(`modals.categories.create`)
                }
                onOk={handleSuccess}
                categories={category}
            />

            {/* Modal pour l'archivage de catégories */}
            <ArchiveModal
                deleteText={I18n.t(`confirm.categories.delete`)}
                validateArchive={deleteCategories}
                opened={modalArchive}
                hideModal={hideArchiveModal}
            />
        </main>
    )
}

CategoriesScreen.propTypes = {
    actions: PropTypes.object,
    categories: PropTypes.object,
    roles: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...categoriesActions}, dispatch),
})

export default withNavigation(
    connect(null, mapDispatchToProps)(CategoriesScreen)
)
