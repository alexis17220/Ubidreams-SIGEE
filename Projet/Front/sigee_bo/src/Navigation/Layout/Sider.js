// Libraries
import I18n from 'i18next'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {
    cloneDeep,
    defaultTo,
    filter,
    flattenDeep,
    forEach,
    get,
    has,
    includes,
    isArray,
    isEmpty,
    isNil,
    map,
    some,
    toNumber,
} from 'lodash'
import React, {useEffect, useState} from 'react'
import {Avatar, Layout, Menu} from 'antd'
import {CarOutlined, ControlOutlined, DashboardOutlined, TagsOutlined, UserOutlined} from '@ant-design/icons'
import {Link} from '@react-navigation/web'
/*
import PricesModal from 'Components/Modals/PricesModal'
*/
// Components
import Images from 'Images'

const {Sider} = Layout

/**
 * Prélève tous les écrans dans une liste d'écrans groupés
 */
const getFlattenLinks = (links, subMenu) => {
    const flatten = []

    forEach(links, (link, linkIndex) => {
        if (has(link, 'subMenu')) {
            if (!isNil(subMenu)) {
                if (isArray(link, 'subMenu')) {
                    link.subMenu.push(subMenu)
                } else {
                    link.subMenu = [subMenu, get(link, 'subMenu')]
                }
            }

            flatten.push(...getFlattenLinks(link.screens, link.subMenu))
        } else {
            if (!isNil(subMenu)) {
                link.subMenu = subMenu
            }

            flatten.push(link)
        }
    })

    return flatten
}

export const CustomSider = (props) => {
    const [collapsed, setCollapsed] = useState(false)
    const [openKeysState, setOpenKeys] = useState([])
    const [openedModal, setOpenedModal] = useState(false)
    const [profile, setProfile] = useState()

    const showModal = () => {
        setOpenedModal(true)
    }

    const hideModal = () => {
        setOpenedModal(false)
    }

    useEffect(() => {
        if (props.profile != null) setProfile(props.profile)
    }, [props.profile])

    const handleCollapse = (collapsed) => {
        setCollapsed(collapsed)
        setOpenKeys([])
    }

    const renderMenuLink = ({
                                title,
                                routeName,
                                image,
                                params,
                                subMenu,
                                key = routeName || subMenu,
                                icon,
                                iconImg,
                                iconSVG: IconSVG,
                                screens,
                                onClick,
                                roles,
                                ...props
                            }) => {
        const amIGranted =
            isNil(roles) ||
            some(map(get(profile, 'roles'), 'name'), (role) =>
                includes(defaultTo(roles, []), role)
            )

        return (
            amIGranted &&
            (!isNil(screens) ? (
                <Menu.SubMenu
                    key={key}
                    title={
                        <span>
              {!isNil(icon) ? (
                  icon
              ) : !isNil(iconImg) ? (
                  <img
                      src={iconImg}
                      alt={defaultTo(I18n.t(title), '')}
                      title={defaultTo(I18n.t(title), '')}
                      className="ant-menu-item-icon-image"
                  />
              ) : (
                  !isNil(IconSVG) && <IconSVG/>
              )}
                            <span>{defaultTo(I18n.t(title), '')}</span>
            </span>
                    }
                >
                    {map(screens, renderMenuLink)}
                </Menu.SubMenu>
            ) /*: routeName == 'Prices' ? (
                <Menu.Item key={key} onClick={showModal}>
                    {/!* Image ou icon *!/}
                    {!isNil(icon) ? (
                        !isNil(image) ? (
                            <Avatar shape="square" src={image} icon={icon}/>
                        ) : (
                            !isNil(icon) && icon
                        )
                    ) : !isNil(iconImg) ? (
                        <img
                            src={iconImg}
                            alt={defaultTo(I18n.t(title), '')}
                            title={defaultTo(I18n.t(title), '')}
                            className="ant-menu-item-icon-image"
                        />
                    ) : (
                        !isNil(IconSVG) && <IconSVG/>
                    )}
                    <span>{defaultTo(I18n.t(title), '')}</span>
                </Menu.Item>
            )*/ : (
                <Menu.Item key={key} onClick={onClick}>
                    <Link
                        routeName={defaultTo(routeName, '')}
                        params={defaultTo(params, {})}
                    >
                        {/* Image ou icon */}
                        {!isNil(icon) ? (
                            !isNil(image) ? (
                                <Avatar shape="square" src={image} icon={icon}/>
                            ) : (
                                !isNil(icon) && icon
                            )
                        ) : !isNil(iconImg) ? (
                            <img
                                src={iconImg}
                                alt={defaultTo(I18n.t(title), '')}
                                title={defaultTo(I18n.t(title), '')}
                                className="ant-menu-item-icon-image"
                            />
                        ) : (
                            !isNil(IconSVG) && <IconSVG/>
                        )}
                        <span>{defaultTo(I18n.t(title), '')}</span>
                    </Link>
                </Menu.Item>
            ))
        )
    }

    const renderMenu = () => {
        const {links} = props

        const currentScreen = {
            id: get(props, 'currentScreen.params.id'),
            params: get(props, 'currentScreen.params'),
            routeName: get(props, 'currentScreen.routeName'),
        }

        const flattenLinks = getFlattenLinks(cloneDeep(links))

        // Récupération des actifs en fonction du matchScreens
        const associatedScreens = filter(
            flattenLinks,
            ({matchParams, matchScreens, matchIDs, params}) => {
                let isMatching

                // Passage en nombre pour être sûr que la comparaison soit bonne
                matchIDs = map(matchIDs, toNumber)

                // Page avec match ID précis
                if (!isEmpty(matchIDs)) {
                    isMatching =
                        includes(matchScreens, get(currentScreen, 'routeName')) &&
                        includes(matchIDs, toNumber(get(currentScreen, 'id')))
                } else if (matchParams) {
                    // Les paramètres actuels de l'écran doivent correspondre à ceux déclarés
                    const isMatchingParams = some(
                        params,
                        (value, key) =>
                            has(currentScreen.params, key) &&
                            get(currentScreen.params, key) === value
                    )

                    isMatching =
                        isMatchingParams &&
                        includes(matchScreens, get(currentScreen, 'routeName'))
                } else {
                    isMatching = includes(matchScreens, get(currentScreen, 'routeName'))
                }

                return isMatching
            }
        )

        const selectedKeys = map(associatedScreens, (route) =>
            defaultTo(get(route, 'key'), get(route, 'routeName'))
        )

        const openKeys = defaultTo(
            openKeysState,
            flattenDeep(map(associatedScreens, 'subMenu'))
        )

        return (
            <Menu
                defaultSelectedKeys={selectedKeys}
                selectedKeys={selectedKeys}
                onOpenChange={(openKeys) => setOpenKeys(openKeys)}
                defaultOpenKeys={openKeys}
                openKeys={openKeys}
                mode="inline"
            >
                {map(links, renderMenuLink)}
            </Menu>
        )
    }

    const {theme, collapsible} = props

    const logo = Images.logo.default

    return (
        <>
            <Sider
                width={240}
                theme={theme}
                collapsible={collapsible}
                collapsed={collapsed}
                onCollapse={handleCollapse}
            >
                {/* Logo de l'application */}
                <Link routeName="Dashboard">
                    <div className="ant-layout-sider-logo">
                        <img
                            className="ant-layout-sider-logo-image"
                            src={logo}
                            alt="logo"
                        />
                    </div>
                </Link>

                {/* Menu */}
                {renderMenu()}
            </Sider>
            {/*  <PricesModal
        visible={openedModal}
        onCancel={hideModal}
        title={I18n.t(`sider.prices`)}
        onOk={hideModal}
      />*/}
        </>
    )
}

const mapStateToProps = (state) => {
    const defaultProps = get(CustomSider, 'defaultProps', {})

    return {
        profile: defaultTo(get(state, 'profile.item'), defaultProps.profile),
    }
}

CustomSider.propTypes = {
    theme: PropTypes.string,
    links: PropTypes.object,
    collapsible: PropTypes.bool,
    profile: PropTypes.object,
}
CustomSider.defaultProps = {
    theme: 'light',
    collapsible: false,
    links: {
        // Dashboard
        dashboard: {
            routeName: 'Dashboard',
            title: I18n.t('sider.dashboard'),
            icon: <DashboardOutlined/>,
            matchScreens: ['Dashboard'],
        },

        /*       engin: {
                   routeName: 'Engin',
                   title: I18n.t('Engins'),
                   icon: <CarOutlined/>,
                   matchScreens: ['engin'],
               },*/
        gestionE: {
            routeName: 'GestionEngin',
            title: I18n.t('sider.gestionE'),
            icon: <CarOutlined/>,
            /*
                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
            */
            matchScreens: ['GestionEngin'],
            screens: [
                {
                    routeName: 'Appellation',
                    title: I18n.t('sider.appellation'),
                    matchScreens: ['appellation'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Engin',
                    title: I18n.t('sider.engin'),
                    matchScreens: ['engin'],

                },
                {
                    routeName: 'Categorie',
                    title: I18n.t('sider.category'),
                    matchScreens: ['categorie'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Proprietaire',
                    title: I18n.t('sider.proprietaire'),
                    matchScreens: ['proprietaire'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Equipement',
                    title: I18n.t('sider.equipement'),
                    matchScreens: ['equipement'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'EquipementEngin',
                    title: I18n.t('sider.equipementEngin'),
                    matchScreens: ['equipementEngin'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Gamme',
                    title: I18n.t('sider.gamme'),
                    matchScreens: ['gamme'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Classification',
                    title: I18n.t('sider.classification'),
                    matchScreens: ['classification'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Equipeur',
                    title: I18n.t('sider.equipeur'),
                    matchScreens: ['equipeur'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Marque',
                    title: I18n.t('sider.marque'),
                    matchScreens: ['marque'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },

                {
                    routeName: 'TypeOPS',
                    title: I18n.t('sider.typeOps'),
                    matchScreens: ['typeOPS'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'TypeTech',
                    title: I18n.t('sider.typeTech'),
                    matchScreens: ['typeTech'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'TypeServ',
                    title: I18n.t('sider.typeServ'),
                    matchScreens: ['typeServ'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'TypeAttelage',
                    title: I18n.t('sider.attelage'),
                    matchScreens: ['typeAttelage'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Documents',
                    title: I18n.t('sider.document'),
                    matchScreens: ['documents'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'ReparationEngin',
                    title: I18n.t('sider.reparationEngin'),
                    matchScreens: ['reparationEngin'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'InterventionEngin',
                    title: I18n.t('sider.interventionEngin'),
                    matchScreens: ['interventionEngin'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Affectation',
                    title: I18n.t('sider.affectation'),
                    matchScreens: ['affectation '],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'GarageEngin',
                    title: I18n.t('sider.garage'),
                    matchScreens: ['garageEngin'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                /*  {
                      routeName: 'newAffect',
                      title: I18n.t('Nouvelle Affectation'),
                      matchScreens: ['newAffect'],
                      roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                  },*/
            ]
        },
        gestionR: {
            routeName: 'GestionReparation',
            title: I18n.t('sider.gestionR'),
            icon: <CarOutlined/>,
            /*
                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
            */
            matchScreens: ['GestionReparation'],
            screens: [
                {
                    routeName: 'Reparation',
                    title: I18n.t('sider.reparation'),
                    matchScreens: ['reparation'],

                },

                {
                    routeName: 'Intervenant',
                    title: I18n.t('sider.intervenant'),
                    matchScreens: ['intervenant'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'TypeIntervenant',
                    title: I18n.t('sider.typeInt'),
                    matchScreens: ['typeIntervenant'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },
                {
                    routeName: 'Intervention',
                    title: I18n.t('sider.intervention'),
                    matchScreens: ['intervention'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', ''],
                    */
                },
                {
                    routeName: 'Commande',
                    title: I18n.t('sider.commande'),
                    matchScreens: ['commande'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },

                {
                    routeName: 'RequeteGas',
                    title: I18n.t('sider.gas'),
                    matchScreens: ['requeteGas'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN', 'CODEC'],
                    */
                },


            ]
        },
        /*  listRep: {
              routeName: 'listRep',
              title: I18n.t('Liste Réparation'),
              icon: <UsbOutlined/>,
              matchScreens: ['listRep'],
          },
          reparation: {
              subMenu: 'Reparation',
              title: I18n.t('Réparation'),
              icon: <CarOutlined/>,
              roles: ['SUPERADMIN', 'ADMIN', 'CTX'],
              screens: [
                  {
                      routeName: 'addReparation',
                      title: I18n.t('Nouvelle Réparation'),
                      matchScreens: ['addReparation'],
                      roles: ['SUPERADMIN', 'ADMIN', 'CTX'],
                  },
                  {
                      routeName: 'newInter',
                      title: I18n.t('Nouveau IntervenantData'),
                      matchScreens: ['newInter'],
                      roles: ['SUPERADMIN', 'ADMIN', 'CTX'],
                  },
                  {
                      routeName: 'ReqGas',
                      title: I18n.t('Requête GAS'),
                      matchScreens: ['ReqGas'],
                      roles: ['SUPERADMIN', 'ADMIN', 'CTX'],
                  },
                  {
                      routeName: 'listComm',
                      title: I18n.t('Liste Commande'),
                      matchScreens: ['listComm'],
                      roles: ['SUPERADMIN', 'ADMIN', 'CTX'],
                  },
                  {
                      routeName: 'configComm',
                      title: I18n.t('Configuration Commande'),
                      matchScreens: ['configComm'],
                      roles: ['SUPERADMIN', 'ADMIN', 'CTX'],
                  },

              ]
          },
          repgas: {
              routeName: 'Rep/GAS',
              title: I18n.t('Réparation/GAS'),
              icon: <SettingOutlined/>,
              matchScreens: ['Rep'],
          },
          verte: {
              routeName: 'CarteVerte',
              title: I18n.t('Carte Verte'),
              icon: <InboxOutlined/>,
              matchScreens: ['CarteVerte'],
          },*/
        gestion: {
            subMenu: 'Gestion',
            title: I18n.t('sider.gestion'),
            icon: <ControlOutlined/>,
            /*            roles: ['SUPERADMIN', 'ADMIN'],*/
            screens:
                [{
                    routeName: 'Users',
                    title: I18n.t('sider.users'),
                    icon: <UserOutlined/>,
                    matchScreens: ['Liste Utilisateur'],
                    /*
                                        roles: ['SUPERADMIN', 'ADMIN'],
                    */
                },
                    {
                        routeName: 'Logs',
                        title: I18n.t('sider.logs'),
                        icon: <TagsOutlined/>,
                        matchScreens: ['Liste Logs'],
                        // roles: ['SUPERADMIN', 'ADMIN'],
                    },

                ],
        },

    },

}
export default connect(mapStateToProps)(CustomSider)
