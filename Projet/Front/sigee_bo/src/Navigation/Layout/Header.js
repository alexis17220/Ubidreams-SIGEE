import React from 'react'

// Libraries
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

// Components
import { Dropdown } from './index'

const { Header } = Layout

const CustomHeader = ({ descriptor }) => {
  const { title = '' } = get(descriptor, 'options', {})

  return (
    <Header>
      {/* Titre de la page */}
      <h1 className="title">{title}</h1>

      {/* Dropdown menu */}
      <Dropdown />
    </Header>
  )
}

CustomHeader.propTypes = {
  descriptor: PropTypes.object,
}

export default CustomHeader
