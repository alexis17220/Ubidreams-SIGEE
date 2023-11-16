import React, { useEffect } from 'react'

// Libraries
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { get } from 'lodash'

// Config
import ReduxPersist from 'Config/ReduxPersist'

// Actions
import { startup } from 'Redux/StartupRedux'

// Components
/*
import Loading from 'Views/Loading'
*/
import AppNavigation from 'Navigation/NavigationRouter'

const RootContainer = ({ startup, started }) => {
  useEffect(() => {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      startup()
    }
  })

  if (!started) {
    /*return <Loading />*/
  } else {
    return <AppNavigation />
  }
}

RootContainer.propTypes = {
  startup: PropTypes.func,
  started: PropTypes.bool,
}

const mapStateToProps = (state) => {
  return {
    started: get(state, 'startup.started'),
  }
}

const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(startup()),
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
