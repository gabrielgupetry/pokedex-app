import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/appStore";
import { useEffect } from "react";
import { listarPokemon } from "../features/pokemons/listarPokemon";
import { atualizarPaginaAtual } from "../features/pokemons/pokemonsSlice";
import { Box, Button, Container, Typography } from "@mui/material";
import { CardPokemons } from "../components/CardPokemons";
import { Pokedex } from "../components/Pokedex";

export function ListagemPokemons() {

    const dispatch = useDispatch<AppDispatch>()
    const { lista, carregando, paginaAtual } = useSelector((state: RootState) => state.pokemons)

    useEffect(() => {
        dispatch(listarPokemon(paginaAtual))
    }, [dispatch, paginaAtual])

    const proximaPagina = () => {
        dispatch(atualizarPaginaAtual(paginaAtual + 10))
    }

    const voltarPagina = () => {
        if (paginaAtual > 0) {
            dispatch(atualizarPaginaAtual(paginaAtual - 10))
        }
    }

    return (
        <Box
        sx={{
            background: '#cc0000e3',
            minHeight: '100vh',
            py: 4,
            px: 2,
        }}
        >
            <Container maxWidth="lg">
                <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        fontSize: '3rem',
                        color: '#000',
                        mb: 4,
                    }}
                >
                    Pokémons
                </Typography>

                <Box
                    display="flex"
                    justifyContent="center"
                    gap={2}
                    mt={2}
                    mb={4}
                >
                    <Button
                        variant="contained"
                        onClick={voltarPagina}
                        disabled={paginaAtual === 0}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#333' },
                        }}
                    >
                        Voltar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={proximaPagina}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#333' },
                        }}
                    >
                        Próxima
                    </Button>
                </Box>

                {carregando ? (
                    <Typography
                        align="center"
                        sx={{
                            color: '#000',
                            fontWeight: 'bold'
                        }}
                    >
                        Carregando Pokémons...
                    </Typography>
                ) : (
                    <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    gap={3}
                    >
                        {lista.map((p) => (
                            <Box
                            key={p.id}
                            sx={{
                                flex: '1 1 250px',
                                maxWidth: '300px',
                            }}
                            >
                                <CardPokemons pokemon={p} />
                            </Box>
                        ))}
                    </Box>
                )}

                <Box mt={6}>
                    <Pokedex />
                </Box>
            </Container>
        </Box>
    )
}