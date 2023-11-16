// Libraries
import I18n from 'i18next'
import {get, has} from 'lodash'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from '@reduxjs/toolkit'
import React, {Fragment, useCallback, useEffect, useState} from 'react'
import {Form, Input, Button, Card, message} from 'antd'
import {LockOutlined, UserOutlined} from '@ant-design/icons'
import sha512 from 'crypto-js/sha512'

// Resources
import {actions as authActions} from 'Resources/AuthResource'

// Images
import Images from 'Images'
import {Anchor} from 'Components'

const {Password} = Input

// Gestion du mode de démonstration
const isMockup = process.env.REACT_APP_MOCK_MODE === 'true'

const LoginForm = (props) => {
    const [isLoginMode, setIsLoginMode] = useState()
    const [isTemporaryMode, setIsTemporaryMode] = useState()
    const [isResettingMode, setIsResettingMode] = useState()

    const {form, hidden, onSubmit, switchForm, onFieldsChange} = props

    useEffect(() => {
        handleNextProps()
    }, [props.isLoginMode])

    const handleNextProps = useCallback(() => {
        if (has(props, 'isLoginMode')) {
            setIsLoginMode(props.isLoginMode)
        }
    }, [props])

    /**
     * Check the account for first login
     */
    const handleCheckPassword = () => {
        if (!isMockup) {
            form.validateFields().then(({login}) => {
                props.actions
                    .checkLoginAuth({
                        login: login,
                        loginTicket: null,
                        allowRegistration: false,
                    })
                    .then(({body}) => {
                        switch (get(body, 'key')) {
                            // Utilisateur connu
                            case 'OK':
                                switchForm('login', {isLoginMode: true})
                                onFieldsChange({login: login})
                                break
                            case 'UNAUTHORIZED':
                                message.error(I18n.t('error.login.email', {login}))
                                break
                            default:
                                message.success(I18n.t('success.login.reset', {login}))
                                switchForm('login', {isTemporaryMode: true})
                                onFieldsChange({login: login})
                                break
                        }
                    })
                    .catch((err) => {
                        // Première connexion impossible : Compte déjà existant
                        if (err.status === 400 && get(err, 'body.key') === 'FORBIDDEN') {
                            switchForm('login', {isLoginMode: true})
                        } else if (
                            err.status === 400 &&
                            get(err, 'body.message') === 'NOT_FOUND'
                        ) {
                            message.error(I18n.t('errors.login.not-found'))
                        } else if (err.status === 403 && get(err, 'body.message') === '') {
                            message.error(I18n.t('errors.login.access-denied'))
                        } else {
                            message.error(I18n.t('errors.login.checkLogin'))
                        }
                    })
            })
        } else {
            switchForm('login', {isLoginMode: true})
        }
    }
    /**
     * Récupération des boutons d'actions de la carte de connexion
     */
    /*   const renderActions = (isLoginMode, isTemporaryMode) => {
           const actions = [];

           // Bouton de login ou de prochaine étape
           actions.push(

           );

           return actions;
       }*/


    return (
        <Form form={form} onFinish={onSubmit} name="login">
            <Card
                style={{display: hidden ? 'none' : 'block'}}
                title={
                    <img
                        src={Images.logo.default}
                        className="logo"
                        alt={I18n.t('common.application-logo')}
                    />
                }
                actions={[<Button
                    type="primary"
                    htmlType="submit"
                    style={{marginTop: '0.4em'}}
                >
                    {I18n.t('pages.login.login')}
                </Button>]}
            >
                <Fragment>
                    {/* Input du login*/}
                    <Form.Item
                        name="login"
                        rules={[
                            {
                                required: true,
                                message: I18n.t('fields.login.requiredMessage'),
                            },
                        ]}
                    >
                        <Input
                            /*
                                                    disabled={isLoginMode}
                            */
                            prefix={<UserOutlined/>}
                            placeholder={I18n.t('fields.login.placeholder')}
                        />
                    </Form.Item>

                    {/* Input du password */}

                    <Form.Item
                        /*
                                            className={isLoginMode ? 'visible' : 'hidden'}
                        */
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`dd`),
                            },
                        ]}
                    >
                        <Password
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder={I18n.t(`dd`)}
                        />
                    </Form.Item>
                </Fragment>


            </Card>
        </Form>
    )
}

LoginForm.propTypes = {
    hidden: PropTypes.bool,
    fetching: PropTypes.bool,
    actions: PropTypes.object,
    onFieldsChange: PropTypes.func,
    onSubmit: PropTypes.func,
    switchForm: PropTypes.func,
    isLoginMode: PropTypes.bool,
    isTemporaryMode: PropTypes.bool,
    form: PropTypes.object,
}

LoginForm.defaultProps = {
    hidden: true,
    onFieldsChange: () => {
    },
    onSubmit: () => {
    },
    switchForm: () => {
    },
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...authActions}, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
