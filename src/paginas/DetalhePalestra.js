import { Link, useNavigate, useParams } from "react-router-dom";
import Mensagem from "../components/Mensagem";
import EtiquetaStatus from "../components/EtiquetaStatus";
import { STATUS, formatarData, horarioFinal } from "../utils/agenda";

function DetalhePalestra({ palestras, mudarStatus, excluir }) {
    // Parâmetro na URL: /palestra/:id  (método 1 do slide)
    const { id } = useParams()
    const navigate = useNavigate()

    // useParams devolve TEXTO; os ids da lista são NÚMEROS, por isso Number(id)
    const palestra = palestras.find((p) => p.id === Number(id))

    // Renderização condicional: evita quebrar quando o id não existe
    if (!palestra) {
        return (
            <>
                <h2>Palestra não encontrada</h2>
                <Link to="/agenda">Voltar para a agenda</Link>
            </>
        )
    }

    function aoExcluir() {
        if (window.confirm(`Excluir a palestra "${palestra.titulo}"?`)) {
            excluir(palestra.id)
            navigate("/agenda", { state: { mensagem: "Palestra excluída." } })
        }
    }

    return (
        <>
            <Link to="/agenda">← Voltar para a agenda</Link>
            <Mensagem />

            <div className="detalhe">
                <h2>{palestra.titulo}</h2>
                <EtiquetaStatus status={palestra.status} />

                <dl>
                    <dt>Evento</dt>
                    <dd>{palestra.evento}</dd>
                    <dt>Local</dt>
                    <dd>{palestra.local}</dd>
                    <dt>Data</dt>
                    <dd>{formatarData(palestra.data)}</dd>
                    <dt>Horário</dt>
                    <dd>
                        {palestra.horario} às {horarioFinal(palestra.horario, palestra.duracao)} (
                        {palestra.duracao} min)
                    </dd>
                    <dt>Público estimado</dt>
                    <dd>{palestra.publico}</dd>
                    <dt>Observações</dt>
                    <dd>{palestra.observacoes || "—"}</dd>
                </dl>

                <h3>Alterar status</h3>
                <div className="acoes">
                    {STATUS.filter((s) => s !== palestra.status).map((s) => (
                        <button key={s} className="btn btn-sec" onClick={() => mudarStatus(palestra.id, s)}>
                            Marcar como {s}
                        </button>
                    ))}
                </div>

                <div className="acoes">
                    <button
                        className="btn btn-principal"
                        onClick={() => navigate(`/palestra/${palestra.id}/editar`)}
                    >
                        Editar
                    </button>
                    <button className="btn btn-perigo" onClick={aoExcluir}>
                        Excluir
                    </button>
                </div>
            </div>
        </>
    )
}

export default DetalhePalestra
