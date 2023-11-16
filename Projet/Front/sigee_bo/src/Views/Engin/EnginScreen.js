import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {defaultTo, get} from 'lodash'
import {bindActionCreators} from 'redux'
import {actions as enginsActions} from 'Resources/EnginsResource'
import {withNavigation} from '@react-navigation/core'
import {connect} from 'react-redux'
import {Button, Card, message, Select} from 'antd'
import I18n from 'I18n'
import TableLayout from 'Components/TableLayout'
import {PlusOutlined} from '@ant-design/icons'
import {EnginModal} from 'Components/Modals/EnginModal'
import {EnginTableData} from 'Components/Values/EnginData/EnginTableData'

const EnginScreen = ({actions, roles, navigation, search}) => {
    const [tables, setTables] = useState(EnginTableData);
    const [fetching, setFetching] = useState(true);
    const [engins, setEngins] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState('');
    const [buttons, setButtons] = useState({});
    const [count, setCount] = useState(0);
    const [next, setNext] = useState('');
    const [previous, setPrevious] = useState('');
    const [archiveModalOpened, setArchiveModalOpened] = useState(false);
    const [selectedEngins, setSelectedEngins] = useState([]);
    const disabledDelete = !(selectedEngins.length > 0);
    const {Option} = Select;
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [filteredTables, setFilteredTables] = useState({
        engins: {columns: [], rows: []},
    });
    const [sortColumn, setSortColumn] = useState(null);

    const [paginationEngin, setPaginationEngin] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        searchText: '',
        showSizeChanger: true,
        sortField: 'immatriculation',
        sortOrder: 'asc'

    });


    /**
     * L'argument selectedColumns représente les colonnes sélectionnées par l'utilisateur.
     *
     * La fonction met à jour l'état selectedColumns avec les colonnes sélectionnées.
     *
     * Ensuite, la fonction crée un nouvel objet updatedColumns en utilisant la méthode map sur le tableau des colonnes sélectionnées. Pour chaque colonne, un nouvel objet est créé en utilisant l'opérateur de décomposition (...) sur l'objet correspondant à la colonne dans EnginTableData.engins.columns.
     *
     * Une fois que les nouvelles colonnes sont créées, la fonction met à jour l'état filteredTables en définissant un nouvel objet pour la clé engins. Cet objet contient les propriétés suivantes :
     *
     * pagination : un objet qui spécifie la position de la pagination et si le changement de taille de page est autorisé.
     * rowKey : une chaîne de caractères représentant la clé unique pour chaque ligne du tableau (dans ce cas, 'id' est utilisé).
     * columns : le tableau des colonnes mises à jour (updatedColumns).
     * @param selectedColumns
     */
    const handleColumnSelection = (selectedColumns) => {
        setSelectedColumns(selectedColumns);
        const updatedColumns = selectedColumns.map((column) => ({
            ...EnginTableData.engins.columns[column],
        }));
        setFilteredTables(() => ({
            engins: {
                pagination: {
                    position: 'both',
                    showSizeChanger: true,
                    pageSize: paginationEngin.pageSize,
                    current: paginationEngin.current, // Utiliser la valeur de current du state

                },
                rowKey: 'id',
                columns: updatedColumns,
            },
        }));
    };


    /**
     * Gère le tri des colonnes de la table.
     * @param {Object} sorter - L'objet de tri fourni par la table.
     *                          Il contient les informations sur le champ et l'ordre de tri.
     */
    const handleSort = (sorter) => {
        if (sorter && sorter.order) {
            const {field, order} = sorter;
            setSortColumn([field, order === 'ascend' ? 'asc' : 'desc']);
        } else {
            setSortColumn(null);
        }
    };


    let {searchText, pageSize, current} = paginationEngin;
    const searchValue = searchText;

    /**
     * Effectue une requête pour récupérer les données des engins en utilisant les paramètres de pagination, de recherche et de tri.
     * Met à jour les données des engins, les informations de pagination et l'état de chargement.
     */
    const fetchData = () => {
        setFetching(true); // Définit l'état de chargement sur true pour afficher un indicateur de chargement

        const query = {
            limit: pageSize, // Nombre d'éléments par page
            offset: (current - 1) * pageSize, // Offset pour paginer les résultats
            search: searchValue, // Terme de recherche
            ...(sortColumn && sortColumn[0] && {sortField: sortColumn[0]}), // Ajoute le champ de tri à la requête s'il est défini
            sortOrder: 'asc', // Ordre de tri, fixé à 'asc' (ascendant) dans cet exemple
            // Autres paramètres de requête supplémentaires...
        };

        actions
            .getEngins(null, {query}) // Appel à une action ou une fonction pour récupérer les données des engins avec la requête spécifiée
            .then(({body}) => {
                const finalData = {
                    count: body.count, // Nombre total d'éléments
                    next: body.next, // Lien vers la page suivante
                    previous: body.previous, // Lien vers la page précédente
                    results: body.results, // Résultats des engins
                };

                setPaginationEngin((prevState) => ({
                    ...prevState,
                    current: current,
                    total: body.count, // Met à jour le nombre total d'éléments dans la pagination
                }));

                setFilteredTables((prevTables) => ({
                    ...prevTables,
                    engins: {
                        ...(prevTables.engins || {}),
                        rows: finalData || [], // Met à jour les données des engins dans la table
                    },
                }));

                setFetching(false); // Définit l'état de chargement sur false pour masquer l'indicateur de chargement

                // Mettre à jour d'autres valeurs de pagination ici si nécessaire
                setCount(body.count); // Nombre total d'éléments
                setNext(body.next); // Lien vers la page suivante
                setPrevious(body.previous); // Lien vers la page précédente
            })
            .catch(() => {
                message.error(I18n.t('errors.engin.fetch')); // Affiche une erreur en cas d'échec de la requête
                setFetching(false); // Définit l'état de chargement sur false en cas d'échec
            });
    };

    /**
     * Effectue une requête pour récupérer les données des engins en utilisant les paramètres de pagination, de recherche, de tri et les colonnes sélectionnées.
     * Met à jour les données des engins, les informations de pagination et l'état de chargement.
     * Si aucune colonne n'est sélectionnée, les colonnes par défaut sont utilisées.
     */
    const getEnginsData = () => {
        setFetching(true); // Définit l'état de chargement sur true pour afficher un indicateur de chargement

        const filteredColumns = selectedColumns.length > 0
            ? selectedColumns.map((key) => EnginTableData.engins[key]) // Si des colonnes sont sélectionnées, utilise les colonnes correspondantes
            : [ // Sinon, utilise les colonnes par défaut
                EnginTableData.engins.columns['immatriculation'],
                EnginTableData.engins.columns['carrosserie'],
                EnginTableData.engins.columns['genre'],
                EnginTableData.engins.columns['age'],
            ];

        if (selectedColumns.length > 0) {
            fetchData(); // Si des colonnes sont sélectionnées, effectue la requête pour récupérer les données des engins
        } else {
            setFilteredTables({
                engins: {
                    columns: filteredColumns,
                    rows: [], // Aucune donnée d'engin puisque aucune colonne n'est sélectionnée
                },
            });
            fetchData(); // Effectue quand même la requête pour mettre à jour les informations de pagination et l'état de chargement
        }
    };

    /**
     * Effectue une requête de données chaque fois que le tri des colonnes change.
     */
    useEffect(() => {
        if (sortColumn !== null) {
            fetchData();
        }
    }, [sortColumn]);

    /**
     * Met à jour le tri des colonnes en fonction des colonnes sélectionnées.
     */
    useEffect(() => {
        if (selectedColumns.length > 0) {
            setSortColumn([selectedColumns[0], 'ascend']);
        } else {
            setSortColumn(null);
        }
    }, [selectedColumns]);

    /**
     * Gère la recherche dans le tableau des engins.
     * Met à jour le texte de recherche, la page courante et la taille de la page pour réinitialiser les paramètres de pagination.
     * Déclenche ensuite l'appel aux données avec les nouveaux paramètres de recherche.
     * @param {string} searchText - Le texte de recherche saisi par l'utilisateur.
     */
    const handleSearch = (searchText) => {
        setPaginationEngin((prevState) => ({
            ...prevState,
            searchText, // Met à jour le texte de recherche avec la valeur saisie par l'utilisateur
            current: 1, // Réinitialise la page courante à 1 pour afficher les premiers résultats de recherche
            pageSize: 10, // Réinitialise la taille de la page à 10 éléments par page
        }));

        // Appel aux données avec les nouveaux paramètres de recherche
        fetchData();
    };

    const deleteSelectedEngins = () => {
        actions
            .deleteSelectionEngins({ids: selectedEngins})
            .then(() => {
                message.success(I18n.t(`success.engins.delete`))
                getEnginsData()
                setArchiveModalOpened(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const askCreateEngin = (value) => {
        setShowCreateModal(value)
    }

    const handleClickEngin = (engin) => {
        navigation.navigate('EnginDetails', {id: engin.id_engin})
    }

    const onSuccess = () => {
        getEnginsData()
        setShowCreateModal('')
    }

    /**
     * La fonction handleColumnSelection est utilisée pour gérer la sélection des colonnes. Lorsque la sélection est modifiée, elle met à jour l'état selectedColumns avec les colonnes sélectionnées et appelle la fonction onChange passée en tant que prop, en lui transmettant les colonnes sélectionnées.
     *
     * Le composant MultiSelectTags retourne un élément <Select> de la bibliothèque antd. Il est configuré en mode "multiple" pour permettre la sélection de plusieurs options.
     *
     * Les styles inline sont utilisés pour définir la largeur et la marge du composant.
     *
     * Le placeholder spécifie le texte à afficher lorsque aucune option n'est sélectionnée.
     *
     * L'optionLabelProp est défini sur "label" pour indiquer que la propriété "label" de chaque option doit être utilisée comme libellé.
     *
     * La valeur du composant <Select> est définie sur l'état selectedColumns, ce qui permet d'afficher les colonnes déjà sélectionnées.
     *
     * Lorsque la sélection change, la fonction handleColumnSelection est appelée.
     *
     * À l'intérieur du composant <Select>, chaque colonne dans tables.engins.columns est mappée à une option <Select.Option>. La clé de l'option est définie sur la clé de la colonne, la valeur est définie sur la clé de la colonne et le libellé est défini sur le titre de la colonne. Cela permet d'afficher les options de sélection avec leurs titres correspondants.
     *
     * En résumé, le composant MultiSelectTags affiche une liste déroulante qui permet à l'utilisateur de sélectionner plusieurs colonnes à l'aide de tags. Lorsque la sélection change, la fonction onChange est appelée avec les colonnes sélectionnées en tant que paramètre.
     * Regenerate response
     * @param onChange
     * @returns {JSX.Element}
     * @constructor
     */
    const MultiSelectTags = ({onChange}) => {
        const handleColumnSelection = (selected) => {
            setSelectedColumns(selected);
            onChange(selected);
        };

        return (
            <Select
                mode="multiple"
                style={{width: '75%', margin: '0px 15px 15px 0px'}}
                placeholder="Sélectionnez les colonnes"
                optionLabelProp="label"
                onChange={handleColumnSelection}
                value={selectedColumns.length > 0 ? selectedColumns : ['immatriculation', 'carrosserie', 'genre', 'age']}
                // value={selectedColumns}

            >
                {Object.keys(tables.engins.columns).map((key) => (
                    <Select.Option key={key} value={key} label={tables.engins.columns[key].title}>
                        {tables.engins.columns[key].title}
                    </Select.Option>
                ))}
            </Select>
        );
    };

    useEffect(() => {
        setButtons({
            create: {
                label: I18n.t('common.create'),
                icon: <PlusOutlined/>,
                action: () => askCreateEngin('create'),
            },
        });

        tables.engins.onRow = (engin) => ({
            onClick: () => handleClickEngin(engin),
        });

        getEnginsData();

    }, []);

    // Affichage des colonnes sélectionnées
    /*    const selectedColumnsData = selectedColumns.map((column) => ({
            dataIndex: column,
            title: tables.engins.columns[column].title,
        }));*/

    /* const importFileExcel = (file) => {
         const formData = new FormData()
         if (file != null) formData.append('excel_file', file)

         axios
             .patch(`${baseURL}/engins/import_excel/`, formData, {
                 responseType: 'json',
                 headers: {
                     'Content-Type': 'multipart/form-data',
                     app: 'BO',
                 },
                 withCredentials: true,
             })
             .then(() => {
                 message.success(I18n.t(`success.engins.import_excel`))
                 getEnginsData()
             })
             .catch((err) => {
                 // Les engins est asssocié
                 /!*    if (
                       err.status === 400 &&
                       get(err, 'body.key') === 'EXCEL_FILE_REQUIRED'
                     ) {
                       message.error(I18n.t(`errors.engins.EXCEL_FILE_REQUIRED`))
                     } else {
                       message.error(I18n.t('errors.engins.fetch'))
                     }*!/
             })
     }*/
    const handleValidateSelection = () => {
        // Effectuez ici les actions souhaitées lorsque l'utilisateur clique sur le bouton "Valider"
        // Permet appeler une fonction pour enregistrer les colonnes sélectionnées dans votre base de données ou effectuer une autre action spécifique.
        getEnginsData({selectedColumns}); // Recherche des tables correspondantes à la sélection validée
    };

    /**
     * Gère les changements dans le tableau des engins.
     * Met à jour les paramètres de pagination en fusionnant les nouvelles valeurs avec l'état précédent.
     * Déclenche ensuite l'appel aux données avec les nouveaux paramètres de pagination.
     * @param {object} pagination - Les nouvelles valeurs de pagination (current, pageSize, etc.).
     */
    const handleTableChange = (pagination) => setPaginationEngin(
        (prevState) =>
            ({
                ...prevState,
                ...pagination,
            })
    );

    useEffect(() => {
        getEnginsData()
    }, [paginationEngin.current, paginationEngin.pageSize, paginationEngin.searchText])


    return (
        <main className="engins screen">
            <Card>
                <MultiSelectTags onChange={handleColumnSelection}/>
                <Button onClick={handleValidateSelection}>Valider</Button>
                <TableLayout
                    buttons={buttons}
                    loading={fetching}
                    tables={{
                        engins: {
                            onChange: (pagination, filters, sorter) => {
                                handleTableChange(pagination);
                                handleSort(sorter); // Appel de la fonction handleSort avec le paramètre sorter
                            },
                            pagination: {
                                position: "both",
                                showSizeChanger: true,
                                ...paginationEngin,
                            },
                            rowKey: "id",
                            columns: filteredTables.engins.columns || [],
                            rows: filteredTables.engins.rows || [],
                            onRow: (engin) => ({
                                onClick: () => handleClickEngin(engin),
                            }),
                        },
                    }}
                    updateSelectedData={setSelectedEngins}
                    allowSelection={false}
                    onChange={handleTableChange}
                    showSizeChanger={false}
                    onChangeSearch={handleSearch}


                />

                {/*      <Button
                    disabled={disabledDelete}
                    type="primary"
                    onClick={() => setArchiveModalOpened(true)}
                >
                    {I18n.t('common.delete')}
                </Button>*/}
            </Card>

            {/* Modales */}
            <EnginModal
                visible={showCreateModal === 'create'}
                onCancel={() => setShowCreateModal('')}
                title={I18n.t(`modals.engin.create`)}
                onOk={onSuccess}
                width={1000}

            />

        </main>
    ) //: (
    //     <NoAccess/>
    // )
}

EnginScreen.propTypes = {
    actions: PropTypes.object,
    roles: PropTypes.array,
    navigation: PropTypes.object,
}

EnginScreen.defaultProps = {
    roles: [],
}

const mapStateToProps = (state) => {
    return {
        roles: defaultTo(get(state, 'profile.item.roles'), state.roles),
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {...enginsActions},
        dispatch
    ),
})

export default withNavigation(
    connect(mapStateToProps, mapDispatchToProps)(EnginScreen)
)
