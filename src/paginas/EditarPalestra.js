import { Link, useNavigate, useParams } from "react-router-dom";
import FormPalestra from "../components/FormPalestra";

function EditarPalestra({ palestras, editar }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const palestra = palestras.find((p) => p.id === Number(id))

    if (!palestra) {
        return (
            <>
                <h2>Palestra não encontrada</h2>
                <Link to="/agenda">Voltar para a agenda</Link>
            </>
        )
    }

    function aoSalvar(dados) {
        editar(palestra.id, dados)
        navigate(`/palestra/${palestra.id}`, { state: { mensagem: "Alterações salvas!" } })
    }

    return (
        <>
            <h2>Editar palestra</h2>
            <FormPalestra
                inicial={palestra}
                palestras={palestras}
                idAtual={palestra.id}
                aoSalvar={aoSalvar}
                textoBotao="Salvar alterações"
            />
        </>
    )
}

export default EditarPalestra
