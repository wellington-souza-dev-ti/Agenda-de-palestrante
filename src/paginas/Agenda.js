import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Mensagem from "../components/Mensagem";
import CardPalestra from "../components/CardPalestra";
import { STATUS, ordenar } from "../utils/agenda";

function Agenda({ palestras }) {
    // Query param: /agenda?status=Confirmada  (método 2 do slide)
    const [searchParams] = useSearchParams()
    const status = searchParams.get("status") // null quando não há filtro

    // Estado local: texto digitado na busca
    const [busca, setBusca] = useState("")

    const filtradas = ordenar(palestras)
        .filter((p) => !status || p.status === status)
        .filter((p) => {
            const texto = busca.toLowerCase()
            return (
                p.titulo.toLowerCase().includes(texto) ||
                p.evento.toLowerCase().includes(texto)
            )
        })

    return (
        <>
            <h2>Agenda</h2>
            <Mensagem />

            <div className="filtros">
                <Link to="/agenda" className={!status ? "filtro ativo" : "filtro"}>
                    Todas
                </Link>
                {STATUS.map((s) => (
                    <Link
                        key={s}
                        to={`/agenda?status=${s}`}
                        className={status === s ? "filtro ativo" : "filtro"}
                    >
                        {s}
                    </Link>
                ))}
            </div>

            <input
                className="busca"
                placeholder="Buscar por título ou evento..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
            />

            <p className="contagem">
                {filtradas.length} palestra(s) {status && `— ${status}`}
            </p>

            {filtradas.length === 0 ? (
                <p className="vazio">Nenhuma palestra encontrada.</p>
            ) : (
                <ul className="lista">
                    {filtradas.map((p) => (
                        <CardPalestra key={p.id} palestra={p} />
                    ))}
                </ul>
            )}
        </>
    )
}

export default Agenda
