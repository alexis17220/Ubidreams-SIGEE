import React from 'react'

// Libraries
import { get } from 'lodash'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import { SceneView } from '@react-navigation/core'

const UnauthenticatedLayout = (props) => {
  const { Content } = Layout

  const { descriptors, navigation } = props
  const currentScreen = get(
    navigation,
    `state.routes[${get(navigation, 'state.index')}]`
  )
  const descriptor = get(descriptors, currentScreen.key)

  return (
    <Layout>
      <Content>
        <SceneView
          component={descriptor.getComponent()}
          navigation={descriptor.navigation}
        />
      </Content>
    </Layout>
  )
}

UnauthenticatedLayout.propTypes = {
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
}

UnauthenticatedLayout.defaultProps = {
  descriptors: {},
}
export default UnauthenticatedLayout
