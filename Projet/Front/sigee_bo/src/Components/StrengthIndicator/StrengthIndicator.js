// Libraries
import zxcvbn from 'zxcvbn'
import PropTypes from 'prop-types'
import React from 'react'
import { Popover, Progress, Alert } from 'antd'
import { isEmpty, get, map, defaultTo } from 'lodash'

// Styles
import './Styles/StrengthIndicator.less'
import I18n from 'I18n'

const StrengthIndicator = ({ children, visible, placement, value }) => {
  const wrapper = React.createRef()

  /**
   * Rendu de la pop over
   */
  const renderPopover = () => {
    // Évaluation du mot de passe
    const passwordReview = zxcvbn(value)
    const scorePercent = (get(passwordReview, 'score') / 4) * 100

    let status

    switch (defaultTo(get(passwordReview, 'score'), 0)) {
      default:
      case 0:
      case 1:
        status = 'weak'
        break
      case 2:
        status = 'fair'
        break
      case 3:
        status = 'good'
        break
      case 4:
        status = 'strong'
        break
    }

    return (
      <div className="strength-indicator">
        {/* Indicateur de robustesse */}
        <p
          className={`strength-indicator-status strength-indicator-status-${status}`}
        >
          {I18n.t(`components.strengthIndicator.status.${status}`)}
        </p>
        {/* Pourcentage de robustesse */}
        <Progress
          showInfo={false}
          percent={scorePercent}
          className={`strength-indicator-progress strength-indicator-progress-${status}`}
        />
        {/* CELA N'EXISTE PLUS DANS LA LIB => PLUS DE CODE POUR LA TRAD*/}
        {/*Avertissement*/}
        {!isEmpty(get(passwordReview, 'feedback.warning')) && (
          <Alert
            className="strength-indicator-warning"
            title={get(passwordReview, 'feedback.warning.message')}
            message={I18n.t(
              `components.strengthIndicator.messages.${get(
                passwordReview,
                'feedback.warning.code'
              )}`
            )}
            type="warning"
          />
        )}
        {/* Suggestions */}
        <ul className="strength-indicator-suggestions">
          {map(
            defaultTo(get(passwordReview, 'feedback.suggestions'), []),
            ({ message, code }, index) => (
              <li
                key={index}
                className="strength-indicator-suggestions-item"
                title={message}
              >
                {I18n.t(`components.strengthIndicator.messages.${code}`)}
              </li>
            )
          )}
        </ul>
      </div>
    )
  }

  return (
    <Popover
      ref={wrapper}
      placement={placement}
      content={renderPopover()}
      open={visible && !isEmpty(value)}
    >
      {children}
    </Popover>
  )
}

StrengthIndicator.propTypes = {
  children: PropTypes.element,
  visible: PropTypes.bool,
  placement: PropTypes.oneOf([
    'topLeft',
    'top',
    'topRight',
    'leftTop',
    'left',
    'leftBottom',
    'rightTop',
    'right',
    'rightBottom',
    'bottomLeft',
    'bottom',
    'bottomRight',
  ]),
  value: PropTypes.string,
}

StrengthIndicator.defaultProps = {
  visible: true,
  placement: 'right',
  value: '',
}

export default StrengthIndicator
