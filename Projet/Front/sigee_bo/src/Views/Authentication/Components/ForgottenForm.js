// Libraries
import I18n from 'i18next'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React from 'react'
import { Form, Input, Button, Card, message, Alert } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { bindActionCreators } from '@reduxjs/toolkit'

// Images
/*
import Images from 'Images'
*/

// Components
import { Anchor } from 'Components'

// Resources
import { actions as authActions } from 'Resources/AuthResource'

// Gestion du mode de démonstration
const isMockup = process.env.REACT_APP_MOCK_MODE === 'true'

const ForgottenForm = (props) => {
  const { hidden, fetching, switchForm, form } = props

  /**
   * Quand le formulaire de forgotten est submit
   * @private
   */
  const handleSubmitForgotten = () => {
    if (!isMockup) {
      form.validateFields().then(({ login }) => {
        props.actions
          .forgottenAuth({ login })
          .then(() => {
            message.success(I18n.t('success.login.code', { login }))
            switchForm('login', {
              isTemporaryMode: true,
              isResettingMode: true,
            })
          })
          .catch(() => {
            message.error(I18n.t('errors.login.code'))
          })
      })
    } else {
      message.success(
        I18n.t('success.login.code', { login: 'example@mail.com' })
      )
      switchForm('login', { isTemporaryMode: true, isResettingMode: true })
    }
  }

  return (
    <Form name={'forgotten'} onFinish={handleSubmitForgotten}>
      <Card
        style={{ display: hidden ? 'none' : 'block' }}
        title={
          <img
           /* src={Images.logo.default}*/
            className="logo"
            alt="Logo application"
          />
        }
        actions={[
          <Button type="link" key="back" onClick={() => switchForm('login')}>
            {I18n.t('common.back')}
          </Button>,
          <Button
            key="next"
            type="primary"
            htmlType="submit"
            loading={fetching}
          >
            {I18n.t('pages.login.retrieve-password')}
          </Button>,
        ]}
      >
        <Alert
          message={I18n.t('pages.login.forgotten-password.notice')}
          type="warning"
        />

        <Form.Item
          name={'login'}
          rules={[
            {
              type: 'email',
              message: I18n.t('fields.login.patternMessage'),
            },
            {
              required: true,
              message: I18n.t('fields.login.requiredMessage'),
            },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder={I18n.t('fields.login.placeholder')}
          />
        </Form.Item>
      </Card>
    </Form>
  )
}

ForgottenForm.propTypes = {
  actions: PropTypes.object,
  hidden: PropTypes.bool,
  fetching: PropTypes.bool,
  form: PropTypes.object,
  switchForm: PropTypes.func,
}

ForgottenForm.defaultProps = {
  hidden: false,
  switchForm: () => {},
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...authActions }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgottenForm)
