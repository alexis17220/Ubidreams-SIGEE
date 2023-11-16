// Reactotron
import 'Config/ReactotronConfig'

// I18n
import 'I18n'

import React, {Component} from 'react'

// Libraries
import moment from 'moment'
import 'moment/locale/fr'
import {Provider} from 'react-redux'
import configureStore from 'Redux'

// Resources
import configureResources from 'Resources'

// Ant Design
import {ConfigProvider} from 'antd'
import frFR from 'antd/lib/locale-provider/fr_FR'

// Views
import RootContainer from './RootContainer'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'Theme/styles.less'

// Changement de la locale de moment
moment.locale('fr')

// Création du store
const store = configureStore()

class App extends Component {
    componentDidMount() {
        // Configuration de redux-rest-resource
        configureResources()
    }

    render() {
        return (

            <ConfigProvider locale={frFR}>
                <Provider store={store}>
                    <RootContainer/>
                </Provider>
            </ConfigProvider>

        )
    }
}

export default App
