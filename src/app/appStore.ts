import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from '../features/pokemons/pokemonsSlice'

export const appStore = configureStore({
    reducer: {
        pokemons: pokemonsReducer,
    },
})

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;