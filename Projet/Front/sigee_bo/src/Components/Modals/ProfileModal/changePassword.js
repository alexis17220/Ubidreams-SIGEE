import React from 'react'
import { Input, Form, Modal, message } from 'antd'
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
} from '@ant-design/icons'
import I18n from 'i18next'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { escapeRegExp } from 'lodash'
import sha512 from 'crypto-js/sha512'

//Resources
import { actions as profileActions } from '../../../Resources/ProfileResource'

const ModalChangePassword = ({
  visible,
  onCancel,
  loading,
  okText,
  actions,
  onOk,
}) => {
  const [form] = Form.useForm()
  const oldPassword = Form.useWatch('oldPassword', form)
  const newPassword = Form.useWatch('newPassword', form)
  const newPasswordConfirm = Form.useWatch('newPasswordConfirm', form)

  const handleOk = () => {
    form
      .validateFields(['oldPassword', 'newPassword', 'newPasswordConfirm'])
      .then(() => {
        actions
          .updatePasswordProfile({
            current_password: sha512(oldPassword).toString(),
            new_password: sha512(newPassword).toString(),
            re_new_password: sha512(newPasswordConfirm).toString(),
          })
          .then(() => {
            message.success(I18n.t(`success.password.update`))
            onOk()
            form.resetFields()
            onCancel()
          })
          .catch(() => {
            message.error(I18n.t(`errors.password.update`))
          })
      })
      .catch(() => {
        message.error(I18n.t(`errors.form`))
      })
  }

  return (
    <Modal
      title={I18n.t(`modals.password`)}
      open={visible}
      width={600}
      loading={loading}
      onOk={handleOk}
      okText={okText}
      onCancel={onCancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label={I18n.t(`fields.password.old.title`) + ' : '}
          name={'oldPassword'}
          rules={[
            {
              required: true,
              message: I18n.t(`fields.password.requiredMessage`),
            },
          ]}
        >
          <Input.Password
            placeholder={I18n.t(`fields.password.old.placeholder`)}
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          label={I18n.t(`fields.password.new.title`) + ' : '}
          name={'newPassword'}
          rules={[
            {
              required: true,
              message: I18n.t(`fields.password.requiredMessage`),
            },
          ]}
        >
          <Input.Password
            placeholder={I18n.t(`fields.password.new.placeholder`)}
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item
          label={I18n.t(`fields.password.confirm.title`) + ' : '}
          name={'newPasswordConfirm'}
          rules={[
            {
              required: true,
              message: I18n.t(`fields.password.requiredMessage`),
            },
            {
              // Mot de passe identique au précédent ?
              pattern: `^${escapeRegExp(newPassword)}$`,
              message: I18n.t('fields.password.confirm.patternMessage'),
            },
          ]}
        >
          <Input.Password
            placeholder={I18n.t(`fields.password.confirm.placeholder`)}
            prefix={<LockOutlined />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

//Pour typer nos données
ModalChangePassword.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  okText: PropTypes.string,
  title: PropTypes.string,
  actions: PropTypes.object,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
}

//data par défaults
ModalChangePassword.defaultProps = {
  visible: false,
  loading: false,
  okText: 'Ok',
  title: null,
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...profileActions }, dispatch),
})

export default connect(null, mapDispatchToProps)(ModalChangePassword)
