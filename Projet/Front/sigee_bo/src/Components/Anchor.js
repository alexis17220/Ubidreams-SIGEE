// Libraries
import React from 'react'
import { includes } from 'lodash'
import PropTypes from 'prop-types'

const Anchor = (props) => {
  const onKeyDown = (event) => {
    const { onClick } = props
    const keys = ['enter', 13]

    if (
      includes(keys, event.key) ||
      includes(keys, event.code) ||
      includes(keys, event.which)
    ) {
      onClick(event)
    }
  }

  const { onClick, children, className, ...restProps } = props

  return (
    <span
      tabIndex={0}
      role="link"
      className={`${className} anchor`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      {...restProps}
    >
      {children}
    </span>
  )
}

Anchor.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

Anchor.defaultProps = {
  onClick: () => {},
  children: null,
}

export default Anchor
