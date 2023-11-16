import React from 'react'
import { Container } from 'Components/Modals'
import PropTypes from 'prop-types'
import { Alert, Form, Input, message } from 'antd'
import I18n from 'i18next'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

const ModalChangeEmail = ({
  visible,
  loading,
  okText,
  title,
  headerText,
  onCancel,
  handleOk,
}) => {
  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  }
  const [form] = Form.useForm()
  const email = Form.useWatch('email', form)
  const password = Form.useWatch('password', form)

  const validate = () => {
    form
      .validateFields(['email', 'password'])
      .then(() => {
        handleOk(email, password, form)
      })
      .catch(() => {
        message.error(I18n.t(`errors.form`))
      })
  }

  const cancel = () => {
    onCancel()
    form.resetFields()
  }

  return (
    <Container
      visible={visible}
      loading={loading}
      okText={okText}
      title={title}
      headerText={headerText}
      onCancel={cancel}
      onOk={validate}
    >
      <div>
        <Form {...formItemLayout} form={form}>
          {/* Email */}
          <Form.Item
            name="email"
            label={I18n.t(`fields.email.title`)}
            rules={[
              {
                required: true,
                type: 'email',
                message: I18n.t('fields.email.requiredMessage'),
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              disabled={loading}
              placeholder={I18n.t('fields.email.placeholder')}
            />
          </Form.Item>
          {/* Password */}
          <Form.Item
            name="password"
            label={I18n.t(`fields.password.title`)}
            rules={[
              {
                required: true,
                message: I18n.t('fields.password.requiredMessage'),
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              disabled={loading}
              placeholder={I18n.t('fields.password.placeholder')}
            />
          </Form.Item>
        </Form>
        <Alert type="warning" message={I18n.t(`alerts.passwordRequired`)} />
      </div>
    </Container>
  )
}

ModalChangeEmail.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  okText: PropTypes.string,
  title: PropTypes.string,
  headerText: PropTypes.string,
  onCancel: PropTypes.func,
  handleOk: PropTypes.func,
}

ModalChangeEmail.defaultProps = {
  okText: 'Ok',
}

export default ModalChangeEmail
