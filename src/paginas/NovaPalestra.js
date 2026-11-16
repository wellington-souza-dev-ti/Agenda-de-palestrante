import { useNavigate } from "react-router-dom";
import FormPalestra from "../components/FormPalestra";

const vazia = {
    titulo: "",
    evento: "",
    local: "",
    data: "",
    horario: "",
    duracao: 60,
    publico: 0,
    status: "Pendente",
    observacoes: ""
}

function NovaPalestra({ palestras, adicionar }) {
    const navigate = useNavigate()

    function aoSalvar(dados) {
        const nova = adicionar(dados)
        navigate(`/palestra/${nova.id}`, { state: { mensagem: "Palestra cadastrada com sucesso!" } })
    }

    return (
        <>
            <h2>Nova palestra</h2>
            <FormPalestra
                inicial={vazia}
                palestras={palestras}
                idAtual={null}
                aoSalvar={aoSalvar}
                textoBotao="Cadastrar"
            />
        </>
    )
}

export default NovaPalestra
