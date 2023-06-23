import { configureStore } from '@reduxjs/toolkit'

import { NotificationSlice, ProductSlice } from './slices'

const store = configureStore({
    reducer: { NotificationSlice, ProductSlice },
})

export default store
export type AppDispath = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>