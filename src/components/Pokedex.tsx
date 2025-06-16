import { useSelector } from "react-redux";
import type { RootState } from "../app/appStore";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";

export function Pokedex() {
    const pokedex = useSelector((state: RootState) => state.pokemons.pokedex) || []

    return (
        <>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    textAlign: 'center',
                    color: '#000',
                    fontWeight: 'bold',
                    mt: 6,
                }}
            >
                Pokémons na Pokedex
            </Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap={3}
                mt={2}
            >
                {pokedex.map((p) => (
                    <Box
                    key={p.id}
                    sx={{
                        flex: '1 1 clamp(200px, 25%, 300px)',
                        minWidth: '200px',
                    }}
                    >
                        <Card
                            sx={{
                                height: '100%',
                                borderRadius: '16px',
                                border: '4px solid #000',
                                boxShadow: 'inset 0 0 4px #000, 0 4px 8px rgba(0, 0, 0, 0.2)',
                                backgroundColor: '#fff',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Box 
                                sx={{
                                    backgroundColor: '#000',
                                    width: '100%',
                                    height: '10px',
                                    borderTopLeftRadius: '8px',
                                    borderTopRightRadius: '8px'
                                }}
                            />
                            <CardMedia 
                                component="img"
                                image={p.image}
                                alt={p.name}
                                sx={{
                                    backgroundColor: '#00c8ffd3',
                                    padding: '10px',
                                    height: '150px',
                                    objectFit: 'contain',
                                }}
                            />
                            <CardContent
                            sx={{
                                textAlign: 'center',
                                color: '#000',
                                fontWeight: 'bold'
                            }}
                            >
                                <Typography variant="h6">{p.name.toUpperCase()}</Typography>
                                <Typography variant="body2">ID: {p.id}</Typography>
                                <Typography variant="body2">Altura: {p.height}m</Typography>
                                <Typography 
                                    variant="body2" 
                                    mt={1}
                                >
                                    Habilidades: {Array.isArray(p.abilities) ? p.abilities.map(a => a.ability.name).join(',') : 'Sem resposta'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
        </>
    )
}