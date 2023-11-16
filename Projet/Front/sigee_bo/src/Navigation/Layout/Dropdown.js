// Libraries
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {Link} from '@react-navigation/web'
import {AutoComplete, Dropdown, Menu, message, Space, Input} from 'antd'
import Icon, {UserOutlined, LogoutOutlined} from '@ant-design/icons'
import {get, defaultTo, map} from 'lodash'
import I18n from 'i18next'

// Resources
import {actions as profileActions} from 'Resources/ProfileResource'
import {actions as authActions} from 'Resources/AuthResource.js'
import axios from "axios";
import {withNavigation} from "@react-navigation/core";

// Modales
// import { ManageUserProfile } from 'Components/Modals'

// const { UpdateProfile, UpdatePassword } = ManageUserProfile

const CustomDropdown = ({actions, profile, buttons, navigation}) => {
    /**
     * Récupération des données de l'utilisateur
     */
    const getUserInfos = () => {
        actions.getProfile().catch(() => {
            message.error(I18n.t(`errors.profile.get`))
        })
    }

    /**
     * Demande de mise à jour d'un utilisateur
     */
    const askUpdatePassword = () => {
        /*
            setOpenedModal('updatePassword')
        */
    }

    /**
     * Mise à jour d'un utilisateur terminée
     */
    const handleProfileUpdated = () => {
        handleCloseModal()
    }

    /**
     * Mise à jour du mot de passe d'un utilisateur terminée
     */
    const handlePasswordUpdated = () => {
        handleCloseModal()
    }

    /**
     * Fermeture de toutes les modales
     */
    const handleCloseModal = () => {
        /*
            setOpenedModal('')
        */
    }

    /**
     * Permet de déconnecter l'utilisateur
     * @private
     */
    const handleLogout = () => {
        actions.logoutAuth()
    }

    const links = {
        // Mon compte
        ACCOUNT: {
            routeName: 'Profile',
            title: I18n.t('dropdown.account'),
            icon: <UserOutlined/>,
        },
        // Déconnexion
        LOGOUT: {
            title: I18n.t('dropdown.logout'),
            icon: <LogoutOutlined/>,
            action: handleLogout,
        },
    }

    const renderMenuLink = (
        {title = '', routeName = '', icon = false, action, ...params},
        index
    ) => {
        return (
            <Menu.Item
                key={index}
                style={{height: '4vh', paddingLeft: '1.5vh', paddingRight: '2.5vh'}}
            >
                {action ? (
                    <span onClick={action}>
            {icon && icon}
                        <span style={{paddingLeft: '1vh'}}>{title}</span>
          </span>
                ) : (
                    <Link routeName={routeName} params={defaultTo(params, {})}>
                        {icon && icon}
                        <span style={{paddingLeft: '1vh'}}>{title}</span>
                    </Link>
                )}
            </Menu.Item>
        )
    }

    const renderMenu = () => {
        return (
            <Menu style={{borderRadius: '2px 2px 6px 6px'}}>
                {map(links, renderMenuLink)}
                <Menu.Item key="version" disabled>
          <span
              className="anchor"
              style={{
                  fontSize: '11px',
                  display: 'flex',
                  justifyContent: 'center',
              }}
          >
            {I18n.t('common.version', {
                version: process.env.REACT_APP_VERSION,
            })}
          </span>
                </Menu.Item>
            </Menu>
        )
    }

    const {lastname, firstname} = profile
    const [options, setOptions] = useState([]);
    const [selectedImmatriculation, setSelectedImmatriculation] = useState("");

    const handleInputChange = (value) => {
        setSelectedImmatriculation(value);
    };
    /**
     * cette fonction permet la recherche d'un engin via son immatriculation
     * @param value
     */
    const handleSearch = (value) => {
        axios.get(`http://127.0.0.1:8000/engins/?search=${value}`)
            .then((response) => {
                const results = response.data.results;
                const newOptions = results.map((result) => ({
                    value: result.id_engin,
                    label: result.immatriculation,
                    immatriculation: result.immatriculation
                }));
                setOptions(newOptions);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onSelect = (value, option) => {
        console.log(`Selected: ${value}`);
        navigation.navigate('EnginDetails', { id: value });
        setSelectedImmatriculation(option.immatriculation);
    };

    return (
        <main>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 300 }}
                options={options}
                onSelect={onSelect}
                onSearch={handleSearch}
                maxLength={10}
                value={selectedImmatriculation}
            >
                <Input.Search
                    size="medium"
                    placeholder="Immatriculation"
                    enterButton
                    value={selectedImmatriculation}
                    // onChange={(e) => setSelectedImmatriculation(e.target.value)}
                    onChange={(e) => handleInputChange(e.target.value)}

                />
            </AutoComplete>
            <Dropdown
                trigger={['click']}
                overlay={renderMenu()}
                style={{width: '6vw'}}
            >

        <span className="anchor ant-dropdown-link">

          <Space>

            <span className="username">{`${firstname} ${lastname}`}</span>
            <Icon type="down"/>
          </Space>
        </span>
            </Dropdown>
        </main>
    )
}

CustomDropdown.propTypes = {
    actions: PropTypes.object,
    profile: PropTypes.object,
    buttons: PropTypes.object,
}

CustomDropdown.defaultProps = {
    profile: {},
    buttons: {
        update: {
            label: I18n.t('common.update'),
            icon: 'plus',
        },
    },
}

const mapStateToProps = (state) => ({
    profile: defaultTo(get(state, 'profile.item'), {}),
})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...profileActions, ...authActions}, dispatch),
})

export default withNavigation(
    connect(mapStateToProps, mapDispatchToProps)(CustomDropdown)
)
