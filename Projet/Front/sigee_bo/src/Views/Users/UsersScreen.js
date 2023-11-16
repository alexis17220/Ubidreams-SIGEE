import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Card, message, Tabs} from 'antd'
import I18n from 'I18n'
import {defaultTo, get, includes, map} from 'lodash'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as userActions} from 'Resources/UsersResource'
import TableLayout from 'Components/TableLayout'
import {PlusOutlined} from '@ant-design/icons'
import UserModal from 'Components/Modals/UserModal'
import ArchiveModal from 'Components/Modals/ArchiveModal'
import {userTableData} from 'Components/Values/UserTableData'
import {archivedUsersTableData} from 'Components/Values/ArchivedUsersTableData'
import RestoreModal from "Components/Modals/RestoreModal";

const UsersScreen = ({actions, roles}) => {
    const [fetchingUsers, setFetchingUsers] = useState(false)
    const [openedModal, setOpenedModal] = useState('')
    const [user, setUser] = useState()
    const [tablesUsers, setTablesUsers] = useState(userTableData)
    const [selectedUsers, setSelectedUsers] = useState([])
    const [archiveModalOpened, setArchiveModalOpened] = useState(false)
    const [buttons, setButtons] = useState({})
    const [fetchingArchives, setFetchingArchives] = useState(false)
    const [tablesArchives, setTablesArchives] = useState(archivedUsersTableData)
    const [selectedArchives, setSelectedArchives] = useState([])
    const [restoreModalOpened, setRestoreModalOpened] = useState(false)
    const disabledDelete = !(selectedUsers.length > 0)
    const disabledActivate = !(selectedArchives.length > 0)

    const [paginationUser, setPaginationUser] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'login',
    });

    const askCreateUser = () => {
        setUser(null)
        setOpenedModal('createUser')
    }

    const handleCloseModal = () => {
        setOpenedModal('')
    }

    const updateUser = (record) => {
        setOpenedModal('updateUser')
        setUser(record)
    }

    /*
     * Récupération des utilisateurs apres une modification / un ajout d'utilisateur
     */
    const handleSuccess = () => {
        handleCloseModal()
        getUsersData()
    }

    // Récupération des données
    useEffect(() => {
        const rolesName = map(roles, ({name}) => name)

        // Ajout des données aux boutons des props
        /*if (
            includes(rolesName, 'SUPERADMIN') ||
            includes(rolesName, 'AMALTIS_ADMIN') ||
            includes(rolesName, 'COMPANY_MANAGER')
        ) {*/
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: askCreateUser,
            },
        })

        // ajout de l'option de modification d'un utilisateur
        tablesUsers.users.onRow = (record, id) => ({
            onClick: () => {
                updateUser(record, id)
            },
        })
        /*}*/
        setTablesUsers(tablesUsers)

        // Récupération des données des utilisateurs
        getUsersData()
        getArchivesData()
    }, [])
// Extrayez les valeurs actuelles de la paginationCommande
    let {searchText, pageSize, current} = paginationUser;
    const searchValue = searchText;
    /*
     * Récupération des données des utilisateurs
     */
    const getUsersData = () => {
        setFetchingUsers(true)
        actions
            .fetchUsers(null, {
                query: {
                    limit: pageSize, // Nombre d'éléments par page
                    offset: (current - 1) * pageSize, // Offset pour paginer les résultats
                    search: searchValue, // Terme de recherche
                }
            })
            .then(({body: users}) => {
                setTablesUsers({
                    ...tablesUsers,
                    users: {
                        ...tablesUsers.users,
                        rows: users,
                    },
                })
                setPaginationUser((prevState) => ({
                    ...prevState,
                    current: current,
                    total: users.count, // Met à jour le nombre total d'éléments dans la pagination
                }));
                setFetchingUsers(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.users.fetch`))
            })
    }

    /*
     * Récupération des données des utilisateurs archivés
     */
    const getArchivesData = () => {
        setFetchingArchives(true)
        actions
            .fetchArchivesUsers()
            .then(({body: users}) => {
                tablesArchives.users.rows = users
                setTablesArchives(tablesArchives)
                setFetchingArchives(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.users.archives.fetch`))
            })
    }

    /*
     * Archivage des utilisateurs
     */
    const archiveUser = () => {
        if (selectedUsers.length > 0) {
            actions
                .archivesUsers({ids: selectedUsers})
                .then(() => {
                    message.success(I18n.t(`success.users.archive`))
                    setArchiveModalOpened(false)
                    getUsersData()
                    getArchivesData()
                })
                .catch(() => {
                    message.error(I18n.t(`errors.users.archive`))
                })
        }
    }

    /*
     * Restauration des utilsateurs archivés
     */
    const restoreUser = () => {
        if (selectedArchives.length > 0) {
            actions
                .restoreUsers({ids: selectedArchives})
                .then(() => {
                    message.success(I18n.t(`success.users.archives.restore`))
                    setRestoreModalOpened(false)
                    getArchivesData()
                    getUsersData()
                })
                .catch(() => {
                    message.error(I18n.t(`errors.users.archives.restore`))
                })
        }
    }


    /**
     * Gère le changement de pagination et de tri dans la table de user
     */
    const handleTableChange = (pagination) => setPaginationUser(
        (prevState) =>
            ({
                ...prevState,
                ...pagination,
            })
    );
    /**
     * Gère la recherche dans la table de user
     */
    const handleSearch = (searchText) => {
        setPaginationUser((prevState) => ({
            ...prevState,
            searchText, // Met à jour le texte de recherche avec la valeur saisie par l'utilisateur
            current: 1, // Réinitialise la page courante à 1 pour afficher les premiers résultats de recherche
            pageSize: 10, // Réinitialise la taille de la page à 10 éléments par page
        }));

    };
    useEffect(() => {
        getUsersData()
    }, [paginationUser.current, paginationUser.pageSize, paginationUser.searchText])

    return (
        <main className="screen users">
            <Card>
                <Tabs
                    items={[
                        // utilisateurs actifs
                        {
                            key: 'active',
                            label: I18n.t(`tabs.activeUsers`),
                            children: (
                                <div>
                                    <TableLayout
                                        buttons={buttons}
                                        loading={fetchingUsers}
                                        // tables={tablesUsers}
                                        updateSelectedData={setSelectedUsers}
                                        allowSelection={false}
                                        tables={{
                                            tablesUsers: {
                                                ...tablesUsers.users,
                                                onChange: handleTableChange, // Gestionnaire de changement de pagination et de tri
                                                pagination: {
                                                    position: "both",
                                                    showSizeChanger: true,
                                                    ...paginationUser,
                                                },
                                               
                                            },
                                        }}
                                        onChangeSearch={handleSearch}
                                        onChange={handleTableChange}

                                    />
                                    <Button
                                        disabled={disabledDelete}
                                        type="primary"
                                        onClick={() => setArchiveModalOpened(true)}
                                    >
                                        {I18n.t('common.archive')}
                                    </Button>
                                    {/* Modales */}
                                    {/* Création d'un utilisateur */}
                                    <UserModal
                                        visible={includes(
                                            ['createUser', 'updateUser'],
                                            openedModal
                                        )}
                                        onCancel={handleCloseModal}
                                        title={
                                            openedModal === 'updateUser'
                                                ? I18n.t(`modals.user.update`)
                                                : I18n.t(`modals.user.create`)
                                        }
                                        user={user}
                                        onDelete={null} // {this.handleUserSuccess}
                                        onClickResetPassword={null} // {this.handleClickResetPassword}
                                        onOk={handleSuccess}
                                    />
                                    {/* Suppression des utilisateurs */}
                                    <ArchiveModal
                                        deleteText={I18n.t(`confirm.users.delete`)}
                                        validateArchive={archiveUser}
                                        opened={archiveModalOpened}
                                        hideModal={() => setArchiveModalOpened(false)}
                                    />
                                </div>
                            ),
                        },
                        // utilisateurs archivés
                        {
                            key: 'archive',
                            label: I18n.t(`tabs.archivedUsers`),
                            children: (
                                <div>
                                    <TableLayout
                                        loading={fetchingArchives}
                                        tables={tablesArchives}
                                        updateSelectedData={setSelectedArchives}
                                        allowSelection={true}
                                    />
                                    <Button
                                        disabled={disabledActivate}
                                        type="primary"
                                        onClick={() => setRestoreModalOpened(true)}
                                    >
                                        {I18n.t('common.restore')}
                                    </Button>
                                    {/* Restaurationsdes utilisateurs */}
                                    <RestoreModal
                                        restoreText={I18n.t(`confirm.users.restore`)}
                                        validateArchive={restoreUser}
                                        opened={restoreModalOpened}
                                        hideModal={() => setRestoreModalOpened(false)}
                                    />
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>
        </main>
    )
}

UsersScreen.propTypes = {
    users: PropTypes.array,
    fetching: PropTypes.bool,
    actions: PropTypes.object,
    roles: PropTypes.array,
}

UsersScreen.defaultProps = {
    users: [],
    fetching: true,
    roles: [],
}

const mapStateToProps = (state) => {
    return {
        users: defaultTo(get(state, 'user.items'), state.users),
        fetching: defaultTo(get(state, 'user.isFetching'), state.fetching),
        roles: defaultTo(get(state, 'profile.item.roles'), state.roles),
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...userActions}, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen)
