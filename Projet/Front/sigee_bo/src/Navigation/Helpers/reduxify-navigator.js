// Libraries
import * as React from 'react'
import PropTypes from 'prop-types'

// Services
import NavigationServices from 'Services/NavigationServices'

import {
  initializeListeners,
  createDidUpdateCallback,
  createNavigationPropConstructor,
} from './middleware'

function reduxifyNavigator(Navigator, key) {
  const didUpdateCallback = createDidUpdateCallback(key)
  const propConstructor = createNavigationPropConstructor(key)

  class NavigatorReduxWrapper extends React.PureComponent {
    static propTypes = {
      state: PropTypes.object,
      dispatch: PropTypes.func,
    }

    static defaultProps = {}

    componentDidMount() {
      initializeListeners(key, this.props.state)

      NavigationServices.setNavigator(this.currentNavProp)
    }

    componentDidUpdate() {
      didUpdateCallback()
    }

    currentNavProp

    getCurrentNavigation = () => {
      return this.currentNavProp
    }

    render() {
      const { dispatch, state, ...props } = this.props

      this.currentNavProp = propConstructor(
        dispatch,
        state,
        Navigator.router,
        this.getCurrentNavigation
      )

      return <Navigator {...props} navigation={this.currentNavProp} />
    }
  }

  return NavigatorReduxWrapper
}

export { reduxifyNavigator }
