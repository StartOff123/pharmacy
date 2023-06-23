import { configureStore } from '@reduxjs/toolkit'

import product from './slices/ProductSlice'

const store = configureStore({
    reducer: { product },
})

export default store
export type AppDispath = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>