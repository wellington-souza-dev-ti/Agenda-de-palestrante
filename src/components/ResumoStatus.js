import { Link } from "react-router-dom";
import { STATUS, CORES_STATUS } from "../utils/agenda";

// Lista de renderização com .map() e key (slide "Listas de renderização").
// Cada caixinha leva para a agenda já filtrada, usando query params (método 2).
function ResumoStatus({ palestras }) {
    return (
        <div className="resumo">
            {STATUS.map((status) => {
                const quantidade = palestras.filter((p) => p.status === status).length
                return (
                    <Link
                        key={status}
                        to={`/agenda?status=${status}`}
                        className="resumo-item"
                        style={{ borderTopColor: CORES_STATUS[status] }}
                    >
                        <strong>{quantidade}</strong>
                        <span>{status}</span>
                    </Link>
                )
            })}
        </div>
    )
}

export default ResumoStatus
