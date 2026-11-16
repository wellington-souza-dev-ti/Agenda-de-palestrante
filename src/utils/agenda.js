// Funções auxiliares (JS puro, sem React)

export const STATUS = ["Pendente", "Confirmada", "Realizada", "Cancelada"]

export const CORES_STATUS = {
    Pendente: "#d99100",
    Confirmada: "#2e8b57",
    Realizada: "#2a7ab8",
    Cancelada: "#c0392b"
}

// "2026-11-20" -> "20/11/2026"
export function formatarData(iso) {
    const [ano, mes, dia] = iso.split("-")
    return `${dia}/${mes}/${ano}`
}

// "14:30" -> 870 (minutos desde 00:00)
export function horarioParaMinutos(horario) {
    const [h, m] = horario.split(":").map(Number)
    return h * 60 + m
}

// "14:30" + 90 -> "16:00"
export function horarioFinal(horario, duracao) {
    const total = horarioParaMinutos(horario) + Number(duracao)
    const h = String(Math.floor(total / 60) % 24).padStart(2, "0")
    const m = String(total % 60).padStart(2, "0")
    return `${h}:${m}`
}

// Data de hoje no fuso local, no formato "AAAA-MM-DD"
export function hoje() {
    return new Date().toLocaleDateString("sv-SE")
}

export function ordenar(palestras) {
    return [...palestras].sort((a, b) =>
        (a.data + a.horario).localeCompare(b.data + b.horario)
    )
}

// Retorna as palestras que se sobrepõem em data e horário com "dados".
// Palestras canceladas e a própria palestra (idAtual) são ignoradas.
export function acharConflitos(palestras, dados, idAtual = null) {
    const inicio = horarioParaMinutos(dados.horario)
    const fim = inicio + Number(dados.duracao)

    return palestras.filter((p) => {
        if (p.id === idAtual || p.status === "Cancelada") return false
        if (p.data !== dados.data) return false
        const pInicio = horarioParaMinutos(p.horario)
        const pFim = pInicio + p.duracao
        return inicio < pFim && pInicio < fim
    })
}

export function proximoId(palestras) {
    return palestras.length ? Math.max(...palestras.map((p) => p.id)) + 1 : 1
}

// Persistência simples no navegador (localStorage)
const CHAVE = "agenda-palestrante"

export function carregar() {
    try {
        const texto = localStorage.getItem(CHAVE)
        return texto ? JSON.parse(texto) : null
    } catch {
        return null
    }
}

export function salvar(lista) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(lista))
    } catch {
        // sem localStorage: o sistema continua funcionando, só não guarda
    }
}
