import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Cabecalho from "./components/Cabecalho";
import Home from "./paginas/Home";
import Agenda from "./paginas/Agenda";
import DetalhePalestra from "./paginas/DetalhePalestra";
import NovaPalestra from "./paginas/NovaPalestra";
import EditarPalestra from "./paginas/EditarPalestra";
import NaoEncontrada from "./paginas/NaoEncontrada";

import palestrasIniciais from "./dados/palestrasIniciais";
import { carregar, salvar, proximoId } from "./utils/agenda";

function App() {
    // A lista fica aqui no App (estado "elevado") e é passada às páginas por props.
    // Função dentro do useState: roda só na 1ª renderização (lê o que foi salvo antes).
    const [palestras, setPalestras] = useState(() => carregar() ?? palestrasIniciais)

    function atualizarLista(novaLista) {
        setPalestras(novaLista)
        salvar(novaLista)
    }

    function adicionar(dados) {
        const nova = { ...dados, id: proximoId(palestras) }
        atualizarLista([...palestras, nova])
        return nova
    }

    function editar(id, dados) {
        atualizarLista(palestras.map((p) => (p.id === id ? { ...p, ...dados } : p)))
    }

    function mudarStatus(id, status) {
        editar(id, { status })
    }

    function excluir(id) {
        atualizarLista(palestras.filter((p) => p.id !== id))
    }

    return (
        <BrowserRouter>
            <Cabecalho />
            <main className="conteudo">
                <Routes>
                    <Route path="/" element={<Home palestras={palestras} />} />
                    <Route path="/agenda" element={<Agenda palestras={palestras} />} />
                    <Route
                        path="/palestra/:id"
                        element={
                            <DetalhePalestra
                                palestras={palestras}
                                mudarStatus={mudarStatus}
                                excluir={excluir}
                            />
                        }
                    />
                    <Route
                        path="/palestra/:id/editar"
                        element={<EditarPalestra palestras={palestras} editar={editar} />}
                    />
                    <Route
                        path="/nova"
                        element={<NovaPalestra palestras={palestras} adicionar={adicionar} />}
                    />
                    <Route path="*" element={<NaoEncontrada />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
