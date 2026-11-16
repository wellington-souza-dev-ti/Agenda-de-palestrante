import { CORES_STATUS } from "../utils/agenda";

// O estilo depende de uma variável JS, então usamos style={{}} (slide "Exibindo dados")
function EtiquetaStatus({ status }) {
    return (
        <span className="etiqueta" style={{ backgroundColor: CORES_STATUS[status] }}>
            {status}
        </span>
    )
}

export default EtiquetaStatus
