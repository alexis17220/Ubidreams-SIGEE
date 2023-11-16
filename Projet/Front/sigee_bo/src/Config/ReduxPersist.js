// Libraries
import storage from 'redux-persist/lib/storage'

// Services
import immutablePersistenceTransform from 'Services/ImmutablePersistenceTransform'

const REDUX_PERSIST = {
  active: true,
  reducerVersion: '1.1',
  storeConfig: {
    key: 'root',
    storage,
    blacklist: ['startup'],
    whitelist: ['auth'],
    transforms: [immutablePersistenceTransform],
  },
}

export default REDUX_PERSIST
