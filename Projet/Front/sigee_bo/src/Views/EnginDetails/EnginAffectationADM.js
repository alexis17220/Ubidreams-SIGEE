// Import des bibliothèques et des composants nécessaires
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import TableLayout from 'Components/TableLayout';
import {bindActionCreators} from 'redux';
import {map} from 'lodash';
import {actions as AffectationHistoAdmActions} from 'Resources/AffectationHistoAdmRessources';
import {Card, message} from 'antd';
import I18n from 'I18n';
import PropTypes from 'prop-types';
import {withNavigation} from '@react-navigation/core';
import NoAccess from 'Views/NoAccess/NoAccessScreen';
import {EnginAffectationTableData} from "Components/Values/EnginData/EnginAffectationTableData";


// Définition du composant AffectationScreen
const AffectationScreen = ({actions, roles, engin}) => {
    // État local pour gérer le chargement des données d'affectation administrative
    const [fetchingAdm, setFetchingAdm] = useState(true);

    // État local pour stocker les affectations administratives sélectionnées
    const [selectedAffectationAdm, setSelectedAffectationAdm] = useState([]);

    // État local pour stocker les données de la table d'affectations administratives
    const [tablesAdm, setTablesAdm] = useState(EnginAffectationTableData);

    // Effet pour récupérer les données d'affectation administrative lorsque la propriété "engin" change
    useEffect(() => {
        if (engin?.id_engin) {
            getAffectationAdmData(engin.id_engin); // Appel à la fonction pour récupérer les dernières données
        }
    }, [engin]);


    /**
     *    Fonction pour récupérer les données d'affectation administrative
     */
    const getAffectationAdmData = () => {
        setFetchingAdm(true)
        actions
            .getOneBasedIdEnginAffectationHistoAdm(null, {
                query: {
                    search: engin.immatriculation,
                },
                filters: {
                    id_engin: engin.immatriculation
                }
            })
            .then(({body: affectationHistoAdm}) => {
                // Met a jour la table
                setTablesAdm({
                    ...tablesAdm,
                    affectationHistoAdm: {
                        ...tablesAdm.affectationHistoAdm,
                        rows: affectationHistoAdm,
                    },
                })
                setFetchingAdm(false)
            })
            .catch(() => {
                message.error(I18n.t(`errors.affectAdm.fetch`))
            })
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


    //Lorsque la requète est effectué


    return map(roles, ({name}) => name) != 'COMPANY_MANAGER' &&
    map(roles, ({name}) => name) != 'COMPANY_USER' ? (
        <main className="screen">

            <Card>
                <div>
                    <TableLayout
                        loading={fetchingAdm}
                        tables={tablesAdm}
                        updateSelectedData={setSelectedAffectationAdm}
                        allowSelection={false}
                    />

                </div>
            </Card>

        </main>
    ) : (
        <NoAccess/>
    )
}

AffectationScreen.propTypes = {
    actions: PropTypes.object,
    affectationHistoAdm: PropTypes.object,
    roles: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...AffectationHistoAdmActions}, dispatch),
})

export default withNavigation(
    connect(null, mapDispatchToProps)(AffectationScreen)
)
