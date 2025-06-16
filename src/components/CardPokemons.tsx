import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../app/appStore'
import { adicionarPokedex, deletarPokedex } from '../features/pokemons/pokemonsSlice'
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material'

interface Props {
    pokemon: {
        id: number
        name: string
        image: string
    }
}

export function CardPokemons({ pokemon }: Props) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const favoritar = useSelector((state: RootState) => 
        state.pokemons.pokedex.some(p => p.id === pokemon.id)
    )

    const handleClick = () => {
        if (favoritar) {
            dispatch(deletarPokedex(pokemon))
        } else {
            dispatch(adicionarPokedex(pokemon))
        }
    }

    return (
        <Card
            sx={{
                border: '4px solid #000',
                borderRadius: '16px',
                backgroundColor: '#fff',
                boxShadow: 'inset 0 0 4px #000, 0 4px 8px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Box 
                sx={{
                    backgroundColor: '#000',
                    width: '100%',
                    height: '10px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                }}
            />

            <CardMedia 
                component="img"
                image={pokemon.image}
                alt={pokemon.name}
                sx={{
                    backgroundColor: '#00c8ffd3',
                    padding: '10px',
                    height: '150px',
                    objectFit: 'contain',
                }}
            />

            <CardContent sx={{ textAlign: 'center' }}>
                <Typography
                    variant='h6'
                    sx={{
                        color: '#000',
                        fontWeight: 'bold'
                    }}
                >
                    {pokemon.name.toUpperCase()}
                </Typography>

                <Box 
                    display="flex"
                    justifyContent="center"
                    gap={1}
                    mt={2}
                >
                    <Button
                        onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                        sx={{
                            backgroundColor: '#000',
                            color: '#fff',
                            fontSize: '0.75rem',
                            '&:hover': { backgroundColor: '#333' },
                        }}
                    >
                        Detalhes
                    </Button>
                    <Button
                        onClick={handleClick}
                        sx={{
                            backgroundColor: favoritar ? '#333' : '#cc0000',
                            color: '#fff',
                            fontSize: '0.75rem',
                            '&:hover': {
                                backgroundColor: favoritar ? '#333' : '#a00000',
                            },
                        }}
                    >
                        {favoritar ? 'Remover' : 'Adicionar'}
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}