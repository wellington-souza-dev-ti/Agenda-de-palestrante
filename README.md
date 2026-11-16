# Agenda do Palestrante (React)

Sistema para gerenciar as palestras de um palestrante: cadastrar, listar, filtrar, editar, mudar status e excluir.

## Como rodar
```
npm install
npm start
```
Abre em http://localhost:3000. Os dados ficam salvos no navegador (localStorage).

## Rotas
| URL | Página |
|---|---|
| `/` | Painel: contadores por status + próximas palestras |
| `/agenda` e `/agenda?status=Confirmada` | Lista com filtro (query param) e busca |
| `/palestra/:id` | Detalhe (parâmetro na URL) |
| `/palestra/:id/editar` | Edição |
| `/nova` | Cadastro |
| `*` | Página não encontrada |

## Estrutura
```
src/
├── App.js                (estado da lista + rotas)
├── components/           (Cabecalho, Mensagem, CardPalestra, EtiquetaStatus, ResumoStatus, FormPalestra)
├── paginas/              (Home, Agenda, DetalhePalestra, NovaPalestra, EditarPalestra, NaoEncontrada)
├── utils/agenda.js       (datas, conflito de horário, localStorage)
└── dados/palestrasIniciais.js
```
