import { Link } from "react-router-dom";
import Mensagem from "../components/Mensagem";
import ResumoStatus from "../components/ResumoStatus";
import CardPalestra from "../components/CardPalestra";
import { hoje, ordenar } from "../utils/agenda";

function Home({ palestras }) {
    // Próximas palestras: a partir de hoje e não canceladas
    const proximas = ordenar(palestras)
        .filter((p) => p.data >= hoje() && p.status !== "Cancelada")
        .slice(0, 3)

    return (
        <>
            <h2>Painel</h2>
            <Mensagem />

            <ResumoStatus palestras={palestras} />

            <h3>Próximas palestras</h3>
            {proximas.length === 0 ? (
                <p className="vazio">
                    Nenhuma palestra futura. <Link to="/nova">Cadastre uma agora.</Link>
                </p>
            ) : (
                <ul className="lista">
                    {proximas.map((p) => (
                        <CardPalestra key={p.id} palestra={p} />
                    ))}
                </ul>
            )}

            <p>
                <Link to="/agenda">Ver agenda completa →</Link>
            </p>
        </>
    )
}

export default Home
