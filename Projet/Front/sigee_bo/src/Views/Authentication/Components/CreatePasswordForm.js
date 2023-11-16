// Libraries
import I18n from 'i18next'
import zxcvbn from 'zxcvbn'
import PropTypes from 'prop-types'
import { escapeRegExp, defaultTo, get } from 'lodash'
import React, { useState } from 'react'
import { Form, Input, Button, Card } from 'antd'
import { LockOutlined } from '@ant-design/icons'

// Components
import { StrengthIndicator } from 'Components'

// Images
/*
import Images from 'Images'
*/

const { Password } = Input

const CreatePasswordForm = (props) => {
  const [newPassword, setNewPassword] = useState('')
  const { hidden, fetching, form, onSubmit, switchForm } = props

  /**
   * Validation du nouveau mot de passe
   */
  const handleNewPassword = (rule, value) => {
    let callbackMessage

    // Évaluation du mot de passe
    if (value) {
      const passwordReview = zxcvbn(value)

      // Mot de passe  pas suffisamment complexe
      if (value && defaultTo(get(passwordReview, 'score'), 0) < 1) {
        callbackMessage = I18n.t('fields.password.new.errors.score')
      }
    }

    return Promise.resolve(callbackMessage)
  }

  return (
    <Form onFinish={onSubmit}>
      <Card
        style={{ display: hidden ? 'none' : 'block' }}
        title={
          <img
/*
            src={Images.logo.default}
*/
            className="logo"
            alt="Logo application"
          />
        }
        actions={[
          <Button key="back" type="link" onClick={() => switchForm('login')}>
            {I18n.t('common.back')}
          </Button>,
          <Button
            key="next"
            type="primary"
            htmlType="submit"
            loading={fetching}
          >
            {I18n.t('common.next')}
          </Button>,
        ]}
      >
        <StrengthIndicator visible={!hidden} value={newPassword}>
          <Form.Item
            name={'newPassword'}
            hidden={hidden}
            onChange={handleNewPassword}
            rules={[
              {
                required: true,
                message: I18n.t('fields.password.new.requiredMessage'),
              },
              {
                validator: handleNewPassword,
              },
            ]}
          >
            <Password
              prefix={<LockOutlined />}
              type="password"
              placeholder={I18n.t('fields.password.new.placeholder')}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Item>
        </StrengthIndicator>

        <Form.Item
          name={'confirmPassword'}
          hidden={hidden}
          rules={[
            {
              required: true,
              message: I18n.t('fields.password.confirm.requiredMessage'),
            },
            {
              // Mot de passe identique au précédent ?
              pattern: `^${escapeRegExp(newPassword)}$`,
              message: I18n.t('fields.password.confirm.patternMessage'),
            },
          ]}
        >
          <Password
            prefix={<LockOutlined />}
            type="password"
            placeholder={I18n.t('fields.password.confirm.placeholder')}
          />
        </Form.Item>
      </Card>
    </Form>
  )
}

CreatePasswordForm.propTypes = {
  hidden: PropTypes.bool,
  fetching: PropTypes.bool,
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  switchForm: PropTypes.func,
}

CreatePasswordForm.defaultProps = {
  hidden: false,
  onSubmit: () => {},
  switchForm: () => {},
}

export default CreatePasswordForm
