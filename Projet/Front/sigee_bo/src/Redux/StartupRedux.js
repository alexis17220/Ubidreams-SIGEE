import Immutable from 'seamless-immutable'
import { createSlice } from '@reduxjs/toolkit'

const initialState = Immutable({
  started: false,
})

export const startupSlice = createSlice({
  name: 'startup',
  initialState,
  reducers: {
    startupDone: (state) => {
      state.started = true
    },
    startup: (state) => {},
  },
})

// Action creators are generated for each case reducer function
export const { startup, startupDone } = startupSlice.actions

export default startupSlice.reducer
