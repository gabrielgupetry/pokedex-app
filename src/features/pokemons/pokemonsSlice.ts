import { createSlice } from "@reduxjs/toolkit"
import { listarPokemon } from './listarPokemon'

interface Habilidade {
    ability: { name: string }
}

interface Atributo {
    stat: { name: string }
    base_stat : number
}

export interface Pokemon {
    id: number
    name: string
    height: number
    image: string
    abilities: Habilidade[]
    stats: Atributo[]
}

interface PokemonState {
    lista: Pokemon[]
    pokedex: Pokemon[]
    paginaAtual: number
    carregando: boolean
    error: string | null
}

const initialState: PokemonState = {
    lista: [],
    pokedex: JSON.parse(localStorage.getItem('pokedex') || '[]'),
    paginaAtual: 0,
    carregando: false,
    error: null,
}

const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        adicionarPokedex(state, action) {
            const existe = state.pokedex.some(p => p.id === action.payload.id)
            if (!existe) {
                state.pokedex.push(action.payload)
                localStorage.setItem('pokedex', JSON.stringify(state.pokedex))
            }
        },
        deletarPokedex(state, action) {
            state.pokedex = state.pokedex.filter(p => p.id !== action.payload.id)
            localStorage.setItem('pokedex', JSON.stringify(state.pokedex))
        },
        atualizarPaginaAtual(state, action) {
            state.paginaAtual = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(listarPokemon.pending, state => {
                state.carregando = true
            })
            .addCase(listarPokemon.fulfilled, (state, action) => {
                state.carregando = false
                state.lista = action.payload
            })
            .addCase(listarPokemon.rejected, (state, action) => {
                state.carregando = false
                state.error = action.error.message || "Erro ao carregar Pokémons."
            })
    },
})

export const {
    adicionarPokedex,
    deletarPokedex,
    atualizarPaginaAtual,
} = pokemonSlice.actions

export default pokemonSlice.reducer