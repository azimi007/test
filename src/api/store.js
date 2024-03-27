import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { LoginApi } from './services/Login'
import { ShippingContracts } from './services/ShippingContracts'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [LoginApi.reducerPath]: LoginApi.reducer,
    [ShippingContracts.reducerPath]: ShippingContracts.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      LoginApi.middleware, 
      ShippingContracts.middleware, 
    ]),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)