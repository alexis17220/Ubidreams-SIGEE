import React, { useEffect } from 'react'
import { Container } from 'Components/Modals'
import PropTypes from 'prop-types'
import { Alert, Button, Form, Input, message } from 'antd'
import I18n from 'i18next'
import { LockOutlined, MailOutlined } from '@ant-design/icons'

const ModalValidateEmail = ({
  visible,
  loading,
  okText,
  title,
  headerText,
  onCancel,
  handleOk,
  sendCode,
  email,
}) => {
  const formItemLayout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 21,
    },
  }
  const [form] = Form.useForm()
  const code = Form.useWatch('code', form)

  useEffect(() => form.resetFields(), [email])

  const validate = () => {
    form
      .validateFields(['code'])
      .then(() => {
        handleOk(code)
        form.resetFields()
      })
      .catch(() => {
        message.error(I18n.t(`errors.form`))
      })
  }

  return (
    <Container
      visible={visible}
      loading={loading}
      okText={okText}
      title={title}
      headerText={headerText}
      onCancel={onCancel}
      onOk={validate}
    >
      <div>
        <Alert message={I18n.t('alerts.emailUpdate')} type="warning" />
        <Form
          {...formItemLayout}
          form={form}
          style={{ paddingTop: '10px' }}
          initialValues={{ ['email']: email }}
        >
          <Form.Item label={I18n.t(`fields.email.title`)} name="email">
            <Input prefix={<MailOutlined />} disabled={true} />
          </Form.Item>
          <Form.Item
            name="code"
            label={I18n.t(`fields.temporaryCode.title`)}
            rules={[
              {
                required: true,
                message: I18n.t('fields.temporaryCode.requiredMessage'),
              },
            ]}
          >
            <Input
              prefix={<LockOutlined />}
              placeholder={I18n.t('fields.temporaryCode.placeholder')}
            />
          </Form.Item>
        </Form>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button type="link" onClick={sendCode}>
            {I18n.t(`pages.login.code-not-received`)}
          </Button>
        </div>
      </div>
    </Container>
  )
}

ModalValidateEmail.propTypes = {
  visible: PropTypes.bool,
  loading: PropTypes.bool,
  okText: PropTypes.string,
  title: PropTypes.string,
  headerText: PropTypes.string,
  onCancel: PropTypes.func,
  handleOk: PropTypes.func,
  email: PropTypes.string,
  sendCode: PropTypes.func,
}

ModalValidateEmail.defaultProps = {
  okText: 'Ok',
}

export default ModalValidateEmail
