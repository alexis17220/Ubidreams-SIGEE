import React, {useEffect, useState} from 'react'
import {Container} from 'Components/Modals'
import PropTypes from 'prop-types'
import {Button, Form, Input, message, Select} from 'antd'
import I18n from 'I18n'
import {MailOutlined, UserOutlined} from '@ant-design/icons'
import {actions as authActions} from 'Resources/AuthResource'
import {actions as userActions} from 'Resources/UsersResource'
import {bindActionCreators} from '@reduxjs/toolkit'
import {connect} from 'react-redux'
import axios from 'axios'
import {baseURL} from 'Resources'

const UserModal = ({
                       visible,
                       loading,
                       okText,
                       title,
                       headerText,
                       actions,
                       onCancel,
                       onOk,
                       user,
                       companyId,
                   }) => {
    const formItemLayout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 20,
        },
    }

    const [rolesValues, setRolesValues] = useState([])
    const [form] = Form.useForm()
    const firstName = Form.useWatch('firstname', form)
    const lastName = Form.useWatch('lastname', form)
    const email = Form.useWatch('email', form)
    const role = Form.useWatch('role', form)
    const [modalReset, setModalReset] = useState(false)

    /*
     * Récupération des rôles disponibles
     */
    const getRolesData = () => {
        if (companyId != null) {
            actions
                .fetchRolesCompanies()
                .then(({body: value}) => {
                    setRolesValues(value)
                })
                .catch(() => {
                    message.error(I18n.t(`errors.roles.fetch`))
                })
        } else {
            actions
                .fetchRolesAuth()
                .then(({body: value}) => {
                    setRolesValues(value.results)
                })
                .catch(() => {
                    message.error(I18n.t(`errors.roles.fetch`))
                })
        }
    }

    useEffect(() => {
        getRolesData()
    }, [])

    useEffect(() => form.resetFields(), [rolesValues, user])

    const doCancel = () => {
        onCancel()
        form.resetFields()
    }

    /*
     * Affichage du selector de role
     */
    const rolesSelector = () => {
        return (
            <Select mode="multiple">
                {rolesValues.map((role) => {
                    return (
                        <Select.Option key={role.name} value={role.id}>
                            {I18n.t(`pages.users.table.roles.${role.name}.title`)}
                        </Select.Option>
                    )
                })}
            </Select>
        )
    }

    const showResetModal = () => {
        setModalReset(true)
    }
    const hideResetModal = () => {
        setModalReset(false)
    }

    /*
     * creation d'un utilisateur en base de données
     */
    /*const createUser = (formData) => {
      if (companyId != null) {
        axios
          .post(`${baseURL}/companies/${companyId}/users/`, formData, {
            responseType: 'json',
            headers: {
              'Content-Type': 'multipart/form-data',
              app: 'BO',
            },
            withCredentials: true,
          })
          .then(() => {
            message.success(I18n.t(`success.users.create`))
            onOk()
          })
          .catch(() => {
            message.error(I18n.t(`errors.users.create`))
          })
      } else {
        axios
          .post(`${baseURL}/auth/users/`, formData, {
            responseType: 'json',
            headers: {
              'Content-Type': 'multipart/form-data',
              app: 'BO',
            },
            withCredentials: true,
          })
          .then(() => {
            message.success(I18n.t(`success.users.create`))
            onOk()
          })
          .catch(() => {
            message.error(I18n.t(`errors.users.create`))
          })
      }
    }*/

    /*
     * Modification d'un utilisateur en base de données
     */
    const updateUser = (formData) => {
        const id = user.id
     
        axios
            .patch(`${baseURL}/auth/users/${id}/`, formData, {
                responseType: 'json',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    app: 'BO',
                },
                withCredentials: true,
            })
            .then(() => {
                message.success(I18n.t(`success.users.update`))
                onOk()
            })
            .catch(() => {
                message.error(I18n.t(`errors.users.update`))
            })

    }

    /**
     * Reset des utilisateurs
     */
    /*const resetUser = () => {
      actions
        .resetUsers(user.id)
        .then(() => {
          message.success(I18n.t(`success.users.reset`))
          hideResetModal()
        })
        .catch(() => {
          message.error(I18n.t(`errors.users.reset`))
        })
    }
  */
    const handleOk = () => {
        form
            .validateFields(['firstname', 'lastname', 'email', 'roles', 'affectAcces', 'affectPref'])
            .then(() => {
                // Création du formulaire à envoyer
                const formData = new FormData()
                formData.append('firstname', firstName)
                formData.append('lastname', lastName)
                formData.append('email', email)
                formData.append('roles', [role])


                if (user != null) {
                    // l'update n'a lieu que si au moins un des champs a été modifié
                    if (
                        firstName !== user.firstname ||
                        lastName !== user.lastname ||
                        email !== user.email ||
                        role !== user.roles[0].id
                    ) {
                        updateUser(formData)
                    } else {
                        doCancel()
                    }
                } else {
                    createUser(formData)
                    form.resetFields()
                }
            })
            .catch(() => {
                message.error(I18n.t(`errors.form`))
            })
    }

    // Footer du modal
    const footer =
        user != null ? (
            <div>
                {/* <Button
          key="reset"
          onClick={showResetModal}
          type="primary"
          style={{ float: 'left' }}
        >
          {I18n.t(`common.reset`)}
        </Button>*/}
                <Button key="back" loading={loading} onClick={doCancel}>
                    {I18n.t(`common.cancel`)}
                </Button>
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                >
                    {I18n.t(`common.ok`)}
                </Button>
                <Button
                    type="primary"
                    danger
                    loading={loading}
                >
                    {I18n.t(`Désactiver`)}
                </Button>
            </div>
        ) : (
            <div>
                <Button key="back" loading={loading} onClick={doCancel}>
                    {I18n.t(`common.cancel`)}
                </Button>
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={handleOk}
                >
                    {I18n.t(`common.ok`)}
                </Button>
            </div>
        )

    return (
        <Container
            visible={visible}
            loading={loading}
            okText={okText}
            title={title}
            headerText={headerText}
            onOk={handleOk}
            onCancel={doCancel}
            footer={footer}
        >
            <div>
                <Form
                    layout="vertical"
                    style={{
                        textAlign: "center",

                    }}
                    {...formItemLayout}
                    form={form}
                    initialValues={{
                        // ['role']: user != null ? user.roles[0].id : rolesValues[0]?.id,
                        ['firstname']: user?.firstname,
                        ['lastname']: user?.lastname,
                        ['email']: user?.email,
                        ['login']: user?.login,
                    }}
                >
                    {/* Prénom */}
                    <Form.Item
                        name={'firstname'}
                        label={I18n.t(`fields.firstName.title`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.firstName.requiredMessage`),
                            },
                        ]}
                    >
                        <Input
                            disabled={user != null}
                            prefix={<UserOutlined/>}
                            placeholder={I18n.t(`fields.firstName.placeholder`)}
                        />
                    </Form.Item>
                    {/* Nom */}
                    <Form.Item
                        name={'lastname'}
                        label={I18n.t(`fields.lastName.title`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.lastName.requiredMessage`),
                            },
                        ]}
                    >
                        <Input
                            disabled={user != null}
                            prefix={<UserOutlined/>}
                            placeholder={I18n.t(`fields.lastName.placeholder`)}
                        />
                    </Form.Item>
                    {/*Login => Pseudo*/}
                    <Form.Item
                        name={'login'}
                        label={I18n.t(`Login`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.login.requiredMessage`),
                            },
                        ]}
                    >
                        <Input
                            disabled={user != null}
                            prefix={<UserOutlined/>}
                            placeholder={I18n.t(`fields.login.placeholder`)}
                        />
                    </Form.Item>
                    {/* Adresse email */}
                    <Form.Item
                        name={'email'}
                        label={I18n.t(`fields.email.title`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.email.requiredMessage`),
                            },
                        ]}
                    >
                        <Input
                            disabled={user != null}
                            prefix={<MailOutlined/>}
                            placeholder={I18n.t(`fields.email.placeholder`)}
                        />
                    </Form.Item>
                    {/*Affectation Accees*/}
                    <Form.Item
                        name={'affectAcces'}
                        label='Affectation Acces'
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`Merci de Saisir une Affectation Acces`),
                            },
                        ]}
                    >
                        <Input
                            placeholder={I18n.t(`Affectation Acces`)}
                        />
                    </Form.Item>
                    {/*Affectation PREF*/}
                    <Form.Item
                        name={'affectPref'}
                        label={I18n.t(`Affectation Pref`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`Merci de Saisir une Affectation Pref`),
                            },
                        ]}
                    >
                        <Input
                            placeholder={I18n.t(`Affectation Pref`)}
                        />
                    </Form.Item>
                    {/* Rôles */}
                    <Form.Item
                        name={'role'}
                        label={I18n.t(`fields.role.title`)}
                        rules={[
                            {
                                required: true,
                                message: I18n.t(`fields.role.requiredMessage`),
                            },
                        ]}
                    >
                        {rolesSelector()}
                    </Form.Item>
                </Form>

            </div>
        </Container>
    )
}

UserModal.propTypes = {
    visible: PropTypes.bool,
    loading: PropTypes.bool,
    okText: PropTypes.string,
    title: PropTypes.string,
    headerText: PropTypes.string,
    actions: PropTypes.object,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    user: PropTypes.object,
    companyId: PropTypes.string,
    footer: PropTypes.object,
    onReset: PropTypes.func,
}

UserModal.defaultProps = {
    visible: false,
    loading: false,
    okText: 'Ok',
    title: null,
    headerText: null,
    isCompanyUser: false,
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(
        {...authActions, ...userActions},
        dispatch
    ),
})

export default connect(null, mapDispatchToProps)(UserModal)
