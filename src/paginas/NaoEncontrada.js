import { Link } from "react-router-dom";

function NaoEncontrada() {
    return (
        <>
            <h2>Página não encontrada</h2>
            <p>O endereço que você acessou não existe.</p>
            <Link to="/">Ir para o início</Link>
        </>
    )
}

export default NaoEncontrada
