// Libraries
import I18n from 'i18next'
import PropTypes from 'prop-types'
import {Form, message} from 'antd'
import sha512 from 'crypto-js/sha512'
import {connect} from 'react-redux'
import React, {useEffect, useState} from 'react'
import {bindActionCreators} from '@reduxjs/toolkit'
import {
    get,
    defaultTo,
    kebabCase,
    has,
    isEmpty,
    isUndefined,
} from 'lodash'

// Components
import {
    LoginForm
} from './Components'

// Resources
import {actions as authActions} from 'Resources/AuthResource'

// Styles
import './Styles/LoginScreen.less'

// Gestion du mode de démonstration
const isMockup = process.env.REACT_APP_MOCK_MODE === 'true'

//Comptes et roles
const roles = {
    supervisor: {
        login: 'test@ubidreams.com',
        password: 'Abcd1234!',
    },
    superadmin: {
        login: 'superadmin-test@ubidreams.com',
        password: 'Abcd1234!',
    },
}

// Valeurs par défaut du mode development
const currentRole = roles['superadmin']

const LoginScreen = (props) => {
    const [visible, setVisible] = useState('login')
    const [params, setParams] = useState({})
    // Sauvegarde du formulaire en temps réel
    // Permet de conserver les valeurs si le composant est re-render
    const [unsavedForm, setUnsavedForm] = useState({})

    const [form] = Form.useForm()

    useEffect(() => {
        if (!isEmpty(unsavedForm)) {
            form.setFieldsValue(unsavedForm)
        }

        if (process.env.NODE_ENV === 'development') {
            form.setFieldsValue(currentRole)
        }

        form.getFieldsValue()
    }, [])

    /**
     * Passage d'un formulaire à l'autre
     * @param  form
     * @param params
     * @private
     */
    const switchForm = (form, params = {}) => {
        setVisible(form)
        setParams({...params})
    }

    /**
     * Quand le formulaire de login est submit
     * @private
     * @param createdPassword
     */
    const handleSubmitLogin = (createdPassword = '') => {
        /*if (!isMockup) {
            form.validateFields().then(({login, password, newPassword}) => {
                // Permet de gérer la connexion depuis la création de mot de passe
                password = !isUndefined(defaultTo(newPassword, password))
                    ? defaultTo(newPassword, password)
                    : createdPassword

                props.actions
                    .loginAuth({
                        login,
                        password: sha512(password).toString(),
                    })

                    .catch((error) => {
                        if (!has(error, 'body.key')) {
                            get(error, 'status') === 400
                                ? message.error(I18n.t('errors.login.incorrect-credentials'))
                                : message.error(I18n.t('errors.login.default'))
                        } else {
                            const key = get(error, 'body.key', '')

                            if (key === 'user_need_password') {
                                setVisible('create')
                            } else {
                                message.error(I18n.t(`errors.login.${kebabCase(key)}`))
                            }
                        }
                    })
            })
        } else {*/
            props.navigation.navigate('Authenticated')
        /*}*/
    }


    const {isLoading} = props

    return (
        <div className="login screen">
            {/* Formulaire de login */}
            <LoginForm
                form={form}

                onSubmit={handleSubmitLogin}
                hidden={visible !== 'login'}
                switchForm={switchForm}
                {...params}
            />
        </div>
    )
}

LoginScreen.propTypes = {
    actions: PropTypes.object,
    isLoading: PropTypes.object,
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
    }),
}

LoginScreen.defaultProps = {
    isLoading: {
        login: false,
        checkingLogin: false,
    },
}

const mapStateToProps = (state) => {
    const defaultProps = get(LoginScreen, 'defaultProps', {})

    return {
        isLoading: {
            login: defaultTo(
                get(state, 'auth.isLoggingIn'),
                defaultProps.isLoading.login
            ),
            checkingLogin: defaultTo(
                get(state, 'auth.isCheckingLogin'),
                defaultProps.isLoading.checkingLogin
            ),

        },
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...authActions}, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
