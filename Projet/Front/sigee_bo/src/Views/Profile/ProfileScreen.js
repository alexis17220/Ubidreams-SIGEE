import React, { useState, useEffect } from 'react'
import {
  UserOutlined,
  MailOutlined,
  UploadOutlined,
  SaveOutlined,
  LockOutlined,
} from '@ant-design/icons'
import PropTypes from 'prop-types'
import {
  Input,
  Button,
  Form,
  Tag,
  Image,
  message,
  Upload,
  Space,
  Card,
  Tabs,
  Skeleton,
} from 'antd'
import { bindActionCreators } from 'redux'
import { defaultTo } from 'lodash'
import I18n from 'i18next'
import axios from 'axios'
import { baseURL } from 'Resources'
import ModalChangePassword from 'Components/Modals/ProfileModal/changePassword'

//Resources
import { actions as profileActions } from '../../Resources/ProfileResource'
import { actions as authActions } from 'Resources/AuthResource'

// Libraries
import { get } from 'lodash'
import { connect } from 'react-redux'
import rolesColors from 'Components/Values/rolesColors'
import ModalChangeEmail from 'Components/Modals/ProfileModal/changeEmail'
import { ModalValidateEmail } from 'Components/Modals/ProfileModal'
import sha512 from 'crypto-js/sha512'
import { Content } from 'antd/lib/layout/layout'

const Profile = ({ actions }) => {
  const [profileUser, setProfile] = useState()
  const [openedModal, setOpenedModal] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  const [form] = Form.useForm()
  const firstname = Form.useWatch('firstname', form)
  const lastname = Form.useWatch('lastname', form)
  const [file, setFile] = useState()

  // Execute avant l'affichage
  useEffect(() => {
    // Récupération des données des utilisateurs
    getProfileData()
  }, [])

  useEffect(() => form.resetFields(), [profileUser])

  /*
   * récupération des informations du profil
   */
  const getProfileData = () => {
    setLoading(true)
    actions
      .getProfile()
      .then(({ body: profile }) => {
        setProfile(profile)
        setLoading(false)
      })
      .catch(() => {
        message.error(I18n.t(`errors.profile.get`))
      })
  }

  /*
   * mise à jour du profil
   */
  const updateProfile = () => {
    form
      .validateFields(['firstname', 'lastname'])
      .then(async () => {
        if (
          firstname !== profileUser.firstname ||
          lastname !== profileUser.lastname ||
          file != null
        ) {
          // Création du formulaire à envoyer
          const formData = new FormData()
          formData.append('firstname', firstname)
          formData.append('lastname', lastname)
          formData.append('roles', [profileUser.roles[0].id])
          if (file != null) formData.append('avatar', file)
          //update du profile
          axios
            .put(`${baseURL}/auth/users/${profileUser.id}/`, formData, {
              responseType: 'json',
              headers: {
                'Content-Type': 'multipart/form-data',
                app: 'BO',
              },
              withCredentials: true,
            })
            .then(() => {
              getProfileData()
              message.success(I18n.t(`success.profile.update`))
            })
            .catch(() => {
              message.error(I18n.t(`errors.profile.update`))
            })
        }
      })
      .catch(() => {
        message.error(I18n.t(`errors.form`))
      })
  }

  /*
   * Envoi du mail de confirmation du changement d'adresse email
   */
  const handleSendEmail = (email, password, emailForm) => {
    setNewEmail(email)
    setPassword(password)
    setLoading(true)
    const data = {
      current_password: sha512(password).toString(),
      new_email: email,
    }
    actions
      .setEmailAuth(data)
      .then(() => {
        setLoading(false)
        emailForm.resetFields()
        message.success(I18n.t(`success.login.code`))
        setOpenedModal('code')
      })
      .catch((e) => {
        if (
          e.body.new_email[0] ===
          'ubi user with this email address already exists.'
        )
          message.error(I18n.t(`errors.login.alreadyExists`))
        else message.error(I18n.t(`errors.login.code`))
        setLoading(false)
      })
  }

  /*
   * Envoi d'un nouvel email
   */
  const handleResendEmail = () => {
    setLoading(true)
    const data = {
      current_password: sha512(password).toString(),
      new_email: newEmail,
    }
    actions
      .setEmailAuth(data)
      .then(() => {
        setLoading(false)
        message.success(I18n.t(`success.login.code`))
      })
      .catch(() => {
        message.error(I18n.t(`errors.login.code`))
        setLoading(false)
      })
  }

  /*
   * validation de la nouvelle adresse email grace au code
   */
  const handleValidateEmail = (code) => {
    const data = {
      new_email: newEmail,
      code: code,
    }

    actions
      .validateEmailAuth(data)
      .then(() => {
        setPassword('')
        setNewEmail('')
        setOpenedModal('')
        setLoading(false)
        getProfileData()
        message.success(I18n.t(`success.email.update`))
      })
      .catch((e) => {
        message.error(I18n.t(`errors.email.update`))
      })
  }

  const showModal = (value) => {
    setOpenedModal(value)
  }

  const handleCancel = () => {
    setLoading(false)
    setOpenedModal('')
  }

  const handleDisabled = () => {
    setDisabled(false)
  }

  return (
    <main className="screen dashboard">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginBottom: '2em',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/*Affichage de l'avatar */}
          {!imageLoaded && (
            <Skeleton.Avatar
              active={profileUser == null}
              size={96}
              style={{ marginRight: '2em' }}
            />
          )}
          <img
            onLoad={() => setImageLoaded(true)}
            hidden={!imageLoaded}
            style={{
              backgroundColor: 'lightgrey',
              marginRight: '2em',
              borderRadius: '50%',
              height: '96px',
              width: '96px',
            }}
            src={profileUser?.avatar}
          />
          {/* Nom + email + role */}
          <div>
            {profileUser == null && (
              <div style={{ width: '300px' }}>
                <Skeleton active title={false} paragraph={{ rows: 3 }} />
              </div>
            )}
            {profileUser != null && (
              <div>
                <h2>{`${profileUser?.firstname} ${profileUser?.lastname}`}</h2>
                <h4>{profileUser?.email}</h4>
                <Tag color={rolesColors[profileUser?.roles[0].name]}>
                  {I18n.t(
                    `pages.users.table.roles.${profileUser?.roles[0].name}.title`
                  )}
                </Tag>
              </div>
            )}
          </div>
        </div>
        {/* Boutons */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Email */}
          <Space>
            <Button type="primary" onClick={() => showModal('email')}>
              <MailOutlined />
              {I18n.t(`modals.email.update`)}
            </Button>
            {/* Mot de passe */}
            <Button type="primary" onClick={() => showModal('password')}>
              <LockOutlined />
              {I18n.t(`modals.password`)}
            </Button>
          </Space>
        </div>
      </div>
      {/* Formulaire de modification */}
      <Card>
        <Tabs
          items={[
            {
              label: 'Informations',
              key: 'data',
              children: (
                <div>
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                      ['lastname']: profileUser?.lastname,
                      ['firstname']: profileUser?.firstname,
                    }}
                  >
                    {/* Avatar */}
                    <Form.Item label={I18n.t(`fields.avatar.title`)}>
                      <Upload
                        maxCount={1}
                        accept={'image/*'}
                        onChange={handleDisabled}
                        onRemove={() => setFile(null)}
                        beforeUpload={(file) => {
                          setFile(file)
                          return false
                        }}
                      >
                        <Button icon={<UploadOutlined />}>
                          {I18n.t(`fields.avatar.import`)}
                        </Button>
                      </Upload>
                    </Form.Item>
                    {/* Nom */}
                    <Form.Item
                      label={I18n.t(`fields.lastName.title`)}
                      name={'lastname'}
                      rules={[
                        {
                          required: true,
                          message: I18n.t(`fields.lastName.requiredMessage`),
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        prefix={<UserOutlined />}
                        placeholder={I18n.t(`fields.lastName.placeholder`)}
                        onChange={handleDisabled}
                      />
                    </Form.Item>
                    {/* Prénom */}
                    <Form.Item
                      label={I18n.t(`fields.firstName.title`)}
                      name={'firstname'}
                      rules={[
                        {
                          required: true,
                          message: I18n.t(`fields.firstName.requiredMessage`),
                        },
                      ]}
                    >
                      <Input
                        type="text"
                        prefix={<UserOutlined />}
                        placeholder={I18n.t(`fields.firstName.placeholder`)}
                        onChange={handleDisabled}
                      />
                    </Form.Item>
                  </Form>
                  {/* Bouton */}
                  <Button
                    type="primary"
                    onClick={updateProfile}
                    style={{ marginTop: '2em' }}
                    disabled={disabled}
                  >
                    <SaveOutlined />
                    {I18n.t(`common.save`)}
                  </Button>
                </div>
              ),
            },
          ]}
        />
      </Card>
      {/* Modales */}
      <ModalChangePassword
        visible={openedModal === 'password'}
        onCancel={handleCancel}
        onOk={() => setOpenedModal('')}
      />
      <ModalChangeEmail
        visible={openedModal === 'email'}
        onCancel={handleCancel}
        loading={loading}
        handleOk={handleSendEmail}
        title={I18n.t(`modals.email.update`)}
      />
      <ModalValidateEmail
        visible={openedModal === 'code'}
        onCancel={handleCancel}
        handleOk={handleValidateEmail}
        title={I18n.t(`modals.email.validate`)}
        email={newEmail}
        loading={loading}
        sendCode={handleResendEmail}
      />
    </main>
  )
}

Profile.propTypes = {
  users: PropTypes.array,
  fetching: PropTypes.bool,
  actions: PropTypes.object,
  roles: PropTypes.array,
}

Profile.defaultProps = {
  fetching: true,
  profileUser: [],
}

const mapStateToProps = (state) => {
  return {
    users: defaultTo(get(state, 'user.items'), state.users),
    fetching: defaultTo(get(state, 'user.isFetching'), state.fetching),
    roles: defaultTo(get(state, 'profile.item.roles'), state.roles),
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...profileActions, ...authActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
