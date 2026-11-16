import { Link } from "react-router-dom";
import EtiquetaStatus from "./EtiquetaStatus";
import { CORES_STATUS, formatarData, horarioFinal } from "../utils/agenda";

function CardPalestra({ palestra }) {
    return (
        <li className="card" style={{ borderLeftColor: CORES_STATUS[palestra.status] }}>
            <div className="card-topo">
                <h3>
                    <Link to={`/palestra/${palestra.id}`}>{palestra.titulo}</Link>
                </h3>
                <EtiquetaStatus status={palestra.status} />
            </div>
            <p className="card-evento">{palestra.evento}</p>
            <p>
                📅 {formatarData(palestra.data)} · 🕒 {palestra.horario} às{" "}
                {horarioFinal(palestra.horario, palestra.duracao)}
            </p>
            <p>📍 {palestra.local}</p>
        </li>
    )
}

export default CardPalestra
