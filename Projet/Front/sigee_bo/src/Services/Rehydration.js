import ReduxPersist from 'Config/ReduxPersist'
import storage from 'redux-persist/lib/storage'
import { persistStore } from 'redux-persist'
import { startup } from 'Redux/StartupRedux'

const updateReducers = (store) => {
  const reducerVersion = ReduxPersist.reducerVersion
  const startupApp = () => store.dispatch(startup())

  // Check to ensure latest reducer version
  storage
    .getItem('reducerVersion')
    .then((localVersion) => {
      if (localVersion !== reducerVersion) {
        // Purge store
        persistStore(store, null, startupApp).purge()
        storage.setItem('reducerVersion', reducerVersion)
      } else {
        persistStore(store, null, startupApp)
      }
    })
    .catch(() => {
      persistStore(store, null, startupApp)
      storage.setItem('reducerVersion', reducerVersion)
    })
}

export default { updateReducers }
