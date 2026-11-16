import { useState } from "react";
import { Link } from "react-router-dom";
import { STATUS, acharConflitos } from "../utils/agenda";

// Formulário usado tanto para CADASTRAR quanto para EDITAR.
// Props:
//   inicial    -> valores iniciais dos campos
//   palestras  -> lista atual (para detectar conflito de horário)
//   idAtual    -> id da palestra em edição (null ao cadastrar)
//   aoSalvar   -> função chamada com os dados válidos
//   textoBotao -> texto do botão de enviar
function FormPalestra({ inicial, palestras, idAtual, aoSalvar, textoBotao }) {
    // useState guarda os campos (um único objeto) e os erros
    const [campos, setCampos] = useState(inicial)
    const [erros, setErros] = useState([])

    // Um único handler para todos os campos, usando o "name" de cada input
    function alterar(evento) {
        setCampos({ ...campos, [evento.target.name]: evento.target.value })
    }

    function validar() {
        const lista = []
        if (!campos.titulo.trim()) lista.push("Informe o título da palestra.")
        if (!campos.evento.trim()) lista.push("Informe o nome do evento.")
        if (!campos.local.trim()) lista.push("Informe o local.")
        if (!campos.data) lista.push("Informe a data.")
        if (!campos.horario) lista.push("Informe o horário.")
        if (!(Number(campos.duracao) > 0)) lista.push("A duração deve ser maior que zero.")

        const dadosCompletos = campos.data && campos.horario && Number(campos.duracao) > 0
        if (dadosCompletos && campos.status !== "Cancelada") {
            acharConflitos(palestras, campos, idAtual).forEach((c) => {
                lista.push(
                    `Conflito de horário com "${c.titulo}" (${c.horario}, ${c.duracao} min).`
                )
            })
        }
        return lista
    }

    function enviar(evento) {
        evento.preventDefault() // evita recarregar a página
        const lista = validar()
        setErros(lista)
        if (lista.length > 0) return

        aoSalvar({
            ...campos,
            titulo: campos.titulo.trim(),
            evento: campos.evento.trim(),
            local: campos.local.trim(),
            duracao: Number(campos.duracao),
            publico: Number(campos.publico) || 0
        })
    }

    return (
        <form className="formulario" onSubmit={enviar}>
            {erros.length > 0 && (
                <ul className="erros">
                    {erros.map((erro) => (
                        <li key={erro}>{erro}</li>
                    ))}
                </ul>
            )}

            <label>
                Título da palestra
                <input name="titulo" value={campos.titulo} onChange={alterar} />
            </label>

            <label>
                Evento
                <input name="evento" value={campos.evento} onChange={alterar} />
            </label>

            <label>
                Local
                <input name="local" value={campos.local} onChange={alterar} />
            </label>

            <div className="linha">
                <label>
                    Data
                    <input type="date" name="data" value={campos.data} onChange={alterar} />
                </label>
                <label>
                    Horário
                    <input type="time" name="horario" value={campos.horario} onChange={alterar} />
                </label>
                <label>
                    Duração (min)
                    <input type="number" min="1" name="duracao" value={campos.duracao} onChange={alterar} />
                </label>
            </div>

            <div className="linha">
                <label>
                    Público estimado
                    <input type="number" min="0" name="publico" value={campos.publico} onChange={alterar} />
                </label>
                <label>
                    Status
                    <select name="status" value={campos.status} onChange={alterar}>
                        {STATUS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </label>
            </div>

            <label>
                Observações
                <textarea name="observacoes" rows="3" value={campos.observacoes} onChange={alterar} />
            </label>

            <div className="acoes">
                <button type="submit" className="btn btn-principal">{textoBotao}</button>
                <Link to="/agenda" className="btn btn-sec">Cancelar</Link>
            </div>
        </form>
    )
}

export default FormPalestra
