import React from 'react'

// Libraries
import { get } from 'lodash'
import { Layout } from 'antd'
import PropTypes from 'prop-types'
import { SceneView } from '@react-navigation/core'

// Components
import { Footer, Breadcrumbs } from 'Navigation/Layout'
import { Header, Sider } from './index'

const { Content } = Layout

const AuthenticatedLayout = ({ descriptors, navigation }) => {
  const currentScreen = get(
    navigation,
    `state.routes[${get(navigation, 'state.index')}]`
  )
  const descriptor = get(descriptors, currentScreen.key)

  return (
    <Layout>
      {/* Menu lateral */}
      <Sider
        currentScreen={currentScreen}
        descriptor={descriptor}
        collapsible
      />
      <Layout>
        {/* En-tête de page */}
        <Header descriptor={descriptor} />
        <Content>
          {/* Fil d'ariane */}
          {/* <Breadcrumbs /> */}

          {/* Page avec écran actif */}
          <SceneView
            component={descriptor.getComponent()}
            navigation={descriptor.navigation}
          />
        </Content>
        {/* Pied de page */}
        {/* <Footer /> */}
      </Layout>
    </Layout>
  )
}

AuthenticatedLayout.propTypes = {
  descriptors: PropTypes.object,
  navigation: PropTypes.object,
}

AuthenticatedLayout.defaultProps = {
  descriptors: {},
}

export default AuthenticatedLayout
