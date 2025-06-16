import { Route, Routes } from "react-router-dom"
import { ListagemPokemons } from "./pages/ListagemPokemons"
import { DetalhesPokemon } from "./pages/DetalhesPokemons"

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListagemPokemons />} />
      <Route path="/pokemon/:name" element={<DetalhesPokemon />} />
    </Routes>
  )
}

export default App
