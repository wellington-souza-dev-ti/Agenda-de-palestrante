import { useLocation } from "react-router-dom";

// Mostra a mensagem enviada por outra página via "state" (método 3 do slide)
function Mensagem() {
    const location = useLocation()
    const texto = location.state?.mensagem

    return texto ? <p className="mensagem">✔ {texto}</p> : null
}

export default Mensagem
