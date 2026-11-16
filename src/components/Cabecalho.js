import { Link, useLocation } from "react-router-dom";

function Cabecalho() {
    const location = useLocation()

    // Renderização condicional: destaca o link da página atual
    function classe(caminho) {
        return location.pathname === caminho ? "menu-link ativo" : "menu-link"
    }

    return (
        <header className="cabecalho">
            <h1 className="logo">🎤 Agenda do Palestrante</h1>
            <nav className="menu">
                <Link className={classe("/")} to="/">Início</Link>
                <Link className={classe("/agenda")} to="/agenda">Agenda</Link>
                <Link className={classe("/nova")} to="/nova">+ Nova palestra</Link>
            </nav>
        </header>
    )
}

export default Cabecalho
