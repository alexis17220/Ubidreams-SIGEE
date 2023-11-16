// Libraries
import {createNavigator, StackRouter} from '@react-navigation/core'
import I18n from 'i18next'
import React from 'react'

// lodash
import {defaultTo, get} from 'lodash'

// Utils
import {prepareStack} from 'Navigation/Utils'

// Layout
import {AuthenticatedLayout} from 'Navigation/Layout'

// Views
import Dashboard from 'Views/Dashboard'
import Users from 'Views/Users'
import Engin from 'Views/Engin'
import EnginDetailsScreen from 'Views/EnginDetails'
import Categorie from "Views/Categorie";
import {Proprietaire} from "Views/Proprietaire";
import Equipement from "Views/Equipement";
import {Gamme} from "Views/Gamme";
import Classification from "Views/Classification";
import Equipeur from "Views/Equipeur";
import {Marque} from "Views/Marque";
import {Appellation} from "Views/AppellationCommerciale";
import {TypeOps} from "Views/TypeOps";
import {TypeTech} from "Views/TypeTech";
import {TypeServ} from "Views/TypeServitude";
import {TypeAttelage} from "Views/Type Attelage";
import {EquipementEngin} from "Views/EquipementEngin";
import Documents from "Views/Document";
import {ReparationEngin} from "Views/ReparationEngin";
import {InterventionEngin} from "Views/InterventionEngin";
import {Affectation} from "Views/Affectation";
import {GarageEngin} from "Views/GarageEngin";
import {Intervenant} from "Views/Intervenant";
import {TypeIntervenant} from "Views/TypeIntervenant";
import {Commande} from "Views/Commande";
import {Reparation} from "Views/Reparation";
import {RequeteGas} from "Views/RequeteGas";
import ReparationDetailsScreen from "Views/ReparationDetail/ReparationDetailsScreen";
import Logs from "Views/Logs";

// Stacks
export const Stack = StackRouter(
    prepareStack({
        Dashboard: {
            screen: Dashboard,
            path: 'dashboard',
            navigationOptions: {
                title: I18n.t('sider.dashboard'),
            },
        },
        Users: {
            screen: Users,
            path: 'users',
            navigationOptions: {
                title: I18n.t('sider.users'),
            },
            /*
                        roles: ['admin'],
            */
        },
        Logs: {
            screen: Logs,
            path: 'logs',
            navigationOptions: {
                title: I18n.t('sider.logs'),
            },
            /*
                        roles: ['admin'],
            */
        },
        Engin: {
            screen: Engin,
            path: 'engin',
            navigationOptions: {
                title: I18n.t('fields.engin.title'),
            },
        },
        EnginDetails: {
            screen: EnginDetailsScreen,
            path: 'engin/:id',
            navigationOptions: {
                title: I18n.t('fields.engin.detail'),
            },
        },
        Categorie: {
            screen: Categorie,
            path: 'categorie',
            navigationOptions: {
                title: I18n.t('fields.category.title'),
            },
        },
        Proprietaire: {
            screen: Proprietaire,
            path: 'proprietaire',
            navigationOptions: {
                title: I18n.t('fields.proprietaire.title'),
            },
        },
        Equipement: {
            screen: Equipement,
            path: 'equipement',
            navigationOptions: {
                title: I18n.t('fields.equipement.title'),
            },
        },
        EquipementEngin: {
            screen: EquipementEngin,
            path: 'equipementEngin',
            navigationOptions: {
                title: I18n.t('fields.equipementE.title'),
            },
        },
        Gamme: {
            screen: Gamme,
            path: 'gamme',
            navigationOptions: {
                title: I18n.t('fields.gamme.title'),
            },
        },
        Classification: {
            screen: Classification,
            path: 'classification',
            navigationOptions: {
                title: I18n.t('fields.classification.title'),
            },
        },
        Equipeur: {
            screen: Equipeur,
            path: 'equipeur',
            navigationOptions: {
                title: I18n.t('fields.equipeur.title'),
            },
        },
        Marque: {
            screen: Marque,
            path: 'marque',
            navigationOptions: {
                title: I18n.t('fields.marque.title'),
            },
        },
        Appellation: {
            screen: Appellation,
            path: 'appellation',
            navigationOptions: {
                title: I18n.t('fields.appellation.title'),
            },
        },
        TypeOPS: {
            screen: TypeOps,
            path: 'typeOPS',
            navigationOptions: {
                title: I18n.t('fields.typeOps.title'),
            },
        },
        TypeTech: {
            screen: TypeTech,
            path: 'typeTech',
            navigationOptions: {
                title: I18n.t('fields.typeTech.title'),
            },
        },
        TypeServ: {
            screen: TypeServ,
            path: 'typeServ',
            navigationOptions: {
                title: I18n.t('fields.typeServ.title'),
            },
        },
        TypeAttelage: {
            screen: TypeAttelage,
            path: 'typeAttelage',
            navigationOptions: {
                title: I18n.t('fields.attelage.title'),
            },
        },
        Documents: {
            screen: Documents,
            path: 'documents',
            navigationOptions: {
                title: I18n.t('fields.document.title'),
            },
        },
        ReparationEngin: {
            screen: ReparationEngin,
            path: 'reparationEngin',
            navigationOptions: {
                title: I18n.t('fields.reparationE.title'),
            },
        },
        ReparationDetails: {
            screen: ReparationDetailsScreen,
            path: 'reparation/:id',
            navigationOptions: {
                title: I18n.t('fields.detailReparation.title'),
            },
        },
        InterventionEngin: {
            screen: InterventionEngin,
            path: 'interventionEngin',
            navigationOptions: {
                title: I18n.t('fields.interventionE.title'),
            },
        },
        Affectation: {
            screen: Affectation,
            path: 'affectation',
            navigationOptions: {
                title: I18n.t('fields.affectation.title'),
            },
        },
        GarageEngin: {
            screen: GarageEngin,
            path: 'garageEngin',
            navigationOptions: {
                title: I18n.t('fields.garage.title'),
            },
        },
        Reparation: {
            screen: Reparation,
            path: 'reparation',
            navigationOptions: {
                title: I18n.t('fields.reparation.title'),
            },
        },
        Intervenant: {
            screen: Intervenant,
            path: 'intervenant',
            navigationOptions: {
                title: I18n.t('fields.intervenant.title'),
            },
        },
        TypeIntervenant: {
            screen: TypeIntervenant,
            path: 'typeIntervenant',
            navigationOptions: {
                title: I18n.t('fields.typeIntervenant.title'),
            },
        },
        Intervention: {
            screen: InterventionEngin,
            path: 'intervention',
            navigationOptions: {
                title: I18n.t('fields.intervention.title'),
            },
        },
        Commande: {
            screen: Commande,
            path: 'commande',
            navigationOptions: {
                title: I18n.t('fields.commande.title'),
            },
        },
        RequeteGas: {
            screen: RequeteGas,
            path: 'requeteGas',
            navigationOptions: {
                title: I18n.t('fields.gas.title'),
            },
        },

        /*
     Profile: {
       screen: ProfileScreen,
       path: 'profile',
       navigationOptions: {
         title: I18n.t('screen.profile'),
       },
     },*/
    }),
    {
        initialRouteName: 'Dashboard',
    }
)

// Navigators
const navigationConfig = {}
const Navigator = createNavigator(AuthenticatedLayout, Stack, navigationConfig)

const mapStateToProps = (state) => {
    const defaultProps = get('', 'defaultProps', {})

    return {
        profile: defaultTo(get(state, 'profile.item'), defaultProps.profile),
    }
}

//export default connect(mapStateToProps)(Navigator)
export default Navigator
