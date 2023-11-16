import { defaultTo, has } from 'lodash'
import Immutable from 'seamless-immutable'

// is this object already Immutable?
const isImmutable = () => has('asMutable')

// change this Immutable object into a JS object
const convertToJs = (state) => state.asMutable({ deep: true })

// optionally convert this object into a JS object if it is Immutable
const fromImmutable = (raw) => (isImmutable(raw) ? convertToJs(raw) : raw)

// convert this JS object into an Immutable object
const toImmutable = (raw) => Immutable(raw)

// the transform interface that redux-persist is expecting
export default {
  out: (state) => {
    state = defaultTo(state, {})
    // console.log({ retrieving: state })
    return toImmutable(state)
  },
  in: (raw) => {
    raw = defaultTo(raw, {})
    // console.log({ storing: raw })
    return fromImmutable(raw)
  },
}
