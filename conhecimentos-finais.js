const DADOS_JLU_FINAL = {
    conhecimentos: [
        {
            id: "acrobacias",
            nome: "Acrobacias",
            custo: 4,
            resumo: "Saltar sobre prédios, escalar paredes e realizar manobras aéreas ágeis.",
            habilidades: [
                "Escalada: Vantagem em testes para escalar superfícies, saltar prédios ou fazer acrobacias.",
                "Salto Acrobático (1x/Edição): Sucesso automático em uma façanha inacreditável de salto ou movimento aéreo.",
                "Corrida Livre: Reduz a Tensão em 5 ao atravessar áreas com obstáculos (telhados, paredes, vãos)."
            ]
        },
        {
            id: "subterfugio",
            nome: "Subterfúgio",
            custo: 4,
            resumo: "Passar despercebido, abrir fechaduras, escapar de amarras e evitar confrontos diretos.",
            habilidades: [
                "Esgueirar-se: Vantagem em Testes de Agilidade para se mover furtivamente.",
                "Escapista (1x/Edição): Escapa automaticamente caso seja preso ou algemado.",
                "Ataque Desprevenido (1x/Cena): Rola +1 Tier de Dado de Dano ao atingir um alvo desavisado."
            ]
        },
        {
            id: "tech",
            nome: "Tech",
            custo: 4,
            resumo: "Especialista em eletrônica, programação, invasão de sistemas e dispositivos avançados.",
            habilidades: [
                "Hacker: Vantagem em testes de invasão de sistemas e quebra de códigos (com ferramentas).",
                "Rato de Tecnologia: Ao observar um item tecnológico por 1 Cena, entende completamente seu funcionamento.",
                "Dispositivo Tecnológico: No início da Edição, escolhe 1 item de Equipamento gratuito para usar até o fim da sessão."
            ]
        },
        {
            id: "estrategia",
            nome: "Estratégia",
            custo: 4,
            resumo: "Mestre em táticas, planejamento de contingência e leitura de oponentes.",
            habilidades: [
                "Plano B (1x/Edição): Ao falhar em um teste, descreve um plano reserva e rola novamente.",
                "Manobra Número 7!: No início da Cena, concede bônus igual ao seu Tier na próxima rolagem de um Atributo de um aliado.",
                "Análise Tática (1x/Edição): Descobre Fraqueza, Determinação, um Atributo ou a próxima ação de um alvo."
            ]
        }
    ],

    tracos: [
        { id: "beleza-rara", nome: "Beleza Rara", custo: 4, desc: "1x/Cena, gaste 2 de Determinação para sucesso automático em persuasão ou sedução." },
        { id: "poliglota", nome: "Poliglota", custo: 4, desc: "Fala, lê e escreve idiomas comuns e aprende novos idiomas observando-os por 1 Cena." },
        { id: "perene", nome: "Perene", custo: 4, desc: "Imune ao envelhecimento natural e aos efeitos do tempo." },
        { id: "eu-me-lembro", nome: "Eu me lembro disso!", custo: 4, desc: "1x/Edição, declara conhecer uma figura histórica, evento ou cultura e recebe um fato crucial." },
        { id: "contato-confiavel", nome: "Contato Confiável", custo: 4, desc: "1x/Edição, obtém uma pista útil de um informante (cientista, hacker, repórter, etc.)." },
        { id: "casca-grossa", nome: "Casca Grossa", custo: 4, desc: "Recebe Redução de Dano 2 e age por mais 1 turno antes de cair ao ser marcado como Derrotado." },
        { id: "frase-de-efeito", nome: "Frase de Efeito", custo: 4, desc: "1x/Cena, ao pronunciar seu bordão, reduz o custo de Determinação em seu Tier ou ganha Vantagem." },
        { id: "gadgets-de-bolso", nome: "Gadgets de Bolso", custo: 4, desc: "1x/Cena, gaste 1 de Determinação para sacar um item da lista de Equipamentos." },
        { id: "voz-da-multidao", nome: "Voz da Multidão", custo: 4, desc: "Vantagem em testes para instruir, controlar e acalmar multidões em cenas de resgate." },
        { id: "influencer", nome: "Influencer", custo: 4, desc: "1x/Edição, recebe um brinde patrocinado (comunicador, item pequeno ou traje)." },
        { id: "identidade-secreta", nome: "Identidade Secreta", custo: 4, desc: "Vantagem na vida civil; 1x/Edição, sai de cena como civil e reaparece em Zona Adjacente." },
        { id: "dupla-dinamica", nome: "Dupla Dinâmica", custo: 4, desc: "+1 Determinação, Precisão e Defesa junto ao parceiro vinculado; 1x/Edição realiza Ataque Sincronizado." },
        { id: "afiliacao", nome: "Afiliação", custo: 4, desc: "Membro de uma organização (ex: Encanadores). Gaste 2 Determinação para Vantagem social ou peça ajuda 1x/Edição." }
    ],

    equipamentos: [
        { id: "arma-marcial", nome: "Arma Marcial", custo: 1, tipo: "Arma", desc: "+1 de Dano em ataques corpo a corpo (espadas, bastões, manoplas)." },
        { id: "arma-longo-alcance", nome: "Arma de Longo Alcance", custo: 1, tipo: "Arma", desc: "+1 em Testes de Ataque à distância (alcance Curto)." },
        { id: "bombas-fumaca", nome: "Bombas de Fumaça (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Por 1 rodada, alvos na Zona Próxima sofrem -3 em testes de visão." },
        { id: "gancho-escalada", nome: "Gancho de Escalada (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Move 1 distância em qualquer direção com 1 uso." },
        { id: "puxar-atacar", nome: "Puxar e Atacar (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Ataque à distância que puxa o alvo 1 distância em sua direção." },
        { id: "spray-curativo", nome: "Spray Curativo (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Remove as condições Arranhado ou Cansado de um alvo adjacente." },
        { id: "rastreador", nome: "Rastreador (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Emite sinal de GPS preciso para localizar pessoa ou objeto." },
        { id: "respirador", nome: "Respirador (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Permite respirar normalmente debaixo d'água até o fim da Cena." },
        { id: "mascara-alteracao", nome: "Máscara de Alteração (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Altera sua aparência facial até o final da Cena." },
        { id: "pem", nome: "P.E.M. Portátil (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Desativa eletrônicos; robôs/exoesqueletos testam Resistência (Tensão 16) ou perdem habilidades por 1 rodada." },
        { id: "bomba-adesiva", nome: "Bomba Adesiva (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Alvo a alcance Curto testa Agilidade (Tensão 15) ou fica Imobilizado." },
        { id: "holograma-pessoal", nome: "Holograma Pessoal (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Cria chamariz; inimigos testam Mente (Tensão 14) para não atacar o holograma." },
        { id: "sequenciador-cripto", nome: "Sequenciador Criptográfico (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Concede Vantagem em testes para hackear ou decifrar códigos." },
        { id: "gas-sonifero", nome: "Gás Sonífero (3 usos)", custo: 1, tipo: "Dispositivo", desc: "Alvos a alcance Curto testam Resistência (Tensão 14) ou ficam Adormecidos por 1 rodada." }
    ]
};

// Estado local das abas 6 e 7
const estadoFinalFicha = {
    conhecimentos: new Set(),
    tracos: new Set(),
    equipamentos: new Set()
};

function inicializarAbasFinais() {
    renderizarConhecimentos();
    renderizarTracos();
    renderizarEquipamentos();
    vincularEventosDetalhesFinais();
    atualizarResumoFinal();
}

function renderizarConhecimentos() {
    const grid = document.getElementById("grid-conhecimentos");
    if (!grid) return;

    grid.innerHTML = DADOS_JLU_FINAL.conhecimentos.map(item => `
        <article class="card-jlu-selecionavel" data-categoria="conhecimentos" data-id="${item.id}" tabindex="0">
            <div class="card-jlu-topo">
                <h4>${item.nome}</h4>
                <span class="custo-pax">${item.custo} PAX</span>
            </div>
            <p class="card-jlu-resumo">${item.resumo}</p>
            <ul class="card-jlu-lista">
                ${item.habilidades.map(h => `<li>${h}</li>`).join("")}
            </ul>
        </article>
    `).join("");
}

function renderizarTracos() {
    const grid = document.getElementById("grid-tracos");
    if (!grid) return;

    grid.innerHTML = DADOS_JLU_FINAL.tracos.map(item => `
        <article class="card-jlu-selecionavel" data-categoria="tracos" data-id="${item.id}" tabindex="0">
            <div class="card-jlu-topo">
                <h4>${item.nome}</h4>
                <span class="custo-pax">${item.custo} PAX</span>
            </div>
            <p class="card-jlu-resumo">${item.desc}</p>
        </article>
    `).join("");
}

function renderizarEquipamentos() {
    const grid = document.getElementById("grid-equipamentos");
    if (!grid) return;

    grid.innerHTML = DADOS_JLU_FINAL.equipamentos.map(item => `
        <article class="card-jlu-selecionavel" data-categoria="equipamentos" data-id="${item.id}" tabindex="0">
            <div class="card-jlu-topo">
                <h4>${item.nome}</h4>
                <span class="custo-pax">${item.custo} PAX</span>
            </div>
            <span class="tag-tipo-equip">${item.tipo}</span>
            <p class="card-jlu-resumo">${item.desc}</p>
        </article>
    `).join("");
}

function vincularEventosDetalhesFinais() {
    document.querySelectorAll(".card-jlu-selecionavel").forEach(card => {
        const alternar = () => {
            const cat = card.dataset.categoria; // "conhecimentos" | "tracos" | "equipamentos"
            const id = card.dataset.id;
            const conjunto = estadoFinalFicha[cat];
            const custoItem = cat === "equipamentos" ? 1 : 4;

            if (conjunto.has(id)) {
                // Desmarcar sempre devolve PAX
                conjunto.delete(id);
                card.classList.remove("selecionado");
            } else {
                // Verifica se há PAX suficiente antes de permitir a seleção
                if (window.FichaSessao && !window.FichaSessao.podeGastarPax(custoItem)) {
                    return;
                }
                conjunto.add(id);
                card.classList.add("selecionado");
            }

            atualizarContadoresEPax();
            atualizarResumoFinal();
        };

        card.addEventListener("click", alternar);
        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                alternar();
            }
        });
    });

    const camposTexto = [
        "input-codinome",
        "input-identidade-civil",
        "input-frase-efeito",
        "input-alma-personagem",
        "select-tipo-limitacao",
        "input-limitacao-nome",
        "input-limitacao-desc"
    ];

    camposTexto.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("input", atualizarResumoFinal);
    });

    // Botão CONCLUIR & GERAR FICHA: salva temporariamente e limpa tudo para a próxima ficha
    const btnConcluir = document.getElementById("btn-exportar-ficha");
    if (btnConcluir) {
        btnConcluir.addEventListener("click", finalizarEResetarFicha);
    }
}

function calcularPaxAbasFinais() {
    const paxConhecimentos = estadoFinalFicha.conhecimentos.size * 4;
    const paxTracos = estadoFinalFicha.tracos.size * 4;
    const paxEquipamentos = estadoFinalFicha.equipamentos.size * 1;
    return paxConhecimentos + paxTracos + paxEquipamentos;
}

function atualizarContadoresEPax() {
    const paxCon = estadoFinalFicha.conhecimentos.size * 4;
    const paxTra = estadoFinalFicha.tracos.size * 4;
    const paxEqu = estadoFinalFicha.equipamentos.size * 1;

    const elCon = document.getElementById("contador-conhecimentos");
    const elTra = document.getElementById("contador-tracos");
    const elEqu = document.getElementById("contador-equipamentos");

    if (elCon) elCon.textContent = `${estadoFinalFicha.conhecimentos.size} selecionados (${paxCon} PAX)`;
    if (elTra) elTra.textContent = `${estadoFinalFicha.tracos.size} selecionados (${paxTra} PAX)`;
    if (elEqu) elEqu.textContent = `${estadoFinalFicha.equipamentos.size} itens (${paxEqu} PAX)`;

    if (window.FichaSessao) {
        window.FichaSessao.atualizarGastoCategoria("conhecimentos", paxCon);
        window.FichaSessao.atualizarGastoCategoria("tracos", paxTra);
        window.FichaSessao.atualizarGastoCategoria("equipamentos", paxEqu);
    }
}

function finalizarEResetarFicha() {
    const codinome = document.getElementById("input-codinome")?.value.trim();
    if (!codinome) {
        window.FichaSessao?.notificarPax("Preencha o Codinome do personagem antes de concluir a ficha.");
        document.getElementById("input-codinome")?.focus();
        return;
    }

    const dadosFicha = {
        codinome,
        identidadeCivil: document.getElementById("input-identidade-civil")?.value.trim() || "",
        fraseEfeito: document.getElementById("input-frase-efeito")?.value.trim() || "",
        alma: document.getElementById("input-alma-personagem")?.value.trim() || "",
        limitacao: {
            tipo: document.getElementById("select-tipo-limitacao")?.value || "",
            nome: document.getElementById("input-limitacao-nome")?.value.trim() || "",
            descricao: document.getElementById("input-limitacao-desc")?.value.trim() || ""
        },
        conhecimentos: [...estadoFinalFicha.conhecimentos].map(id =>
            DADOS_JLU_FINAL.conhecimentos.find(c => c.id === id)
        ).filter(Boolean),
        tracos: [...estadoFinalFicha.tracos].map(id =>
            DADOS_JLU_FINAL.tracos.find(t => t.id === id)
        ).filter(Boolean),
        equipamentos: [...estadoFinalFicha.equipamentos].map(id =>
            DADOS_JLU_FINAL.equipamentos.find(e => e.id === id)
        ).filter(Boolean),
        origem: window.FichaSessao?.obterRascunho().origem || {}
    };

    // 1. Salva a ficha concluída no sessionStorage (para a aba FICHAS e futuro PDF)
    window.FichaSessao?.concluirESalvarFicha(dadosFicha);

    // 2. Reseta todas as seleções visuais e inputs para permitir criar outra ficha em seguida
    resetarFormularioCompleto();

    window.FichaSessao?.notificarPax(`Ficha "${codinome}" salva na aba FICHAS! Criador pronto para uma nova ficha.`);

    // 3. Volta para o Hub inicial de módulos
    document.getElementById("botao-voltar-hub")?.click();
}

function resetarFormularioCompleto() {
    estadoFinalFicha.conhecimentos.clear();
    estadoFinalFicha.tracos.clear();
    estadoFinalFicha.equipamentos.clear();

    document.querySelectorAll(".card-jlu-selecionavel.selecionado").forEach(card => {
        card.classList.remove("selecionado");
    });

    [
        "input-codinome",
        "input-identidade-civil",
        "input-frase-efeito",
        "input-alma-personagem",
        "select-tipo-limitacao",
        "input-limitacao-nome",
        "input-limitacao-desc"
    ].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
    });

    // Limpa Tier e Origem temporários da sessão
    sessionStorage.removeItem("fichaBen10");
    if (window.fichaBen10) {
        window.fichaBen10.tier = null;
        window.fichaBen10.origem = null;
        window.fichaBen10.arquetipo = null;
    }

    // Limpa seleção visual e painel do Tier
    document.querySelectorAll(".tier-item.ativo, .tier-item.selecionado").forEach(btn => {
        btn.classList.remove("ativo", "selecionado");
    });

    const palcoTier = document.getElementById("tier-palco");
    if (palcoTier) palcoTier.classList.remove("painel-aberto");

    // Limpa todos os badges de "SELECIONADO" dos cartões no Hub (Tier e Origem)
    document.querySelectorAll(".cartao-badge-salvo").forEach(badge => badge.remove());

    // Reseta a aba Origem de volta para o mapa da galáxia
    const planetaTela = document.getElementById("planeta-tela");
    const galaxiaTela = document.getElementById("galaxia-tela");
    if (planetaTela && galaxiaTela) {
        planetaTela.classList.add("oculto");
        galaxiaTela.classList.remove("oculto");
    }

    document.querySelectorAll(".planeta-marcador.selecionado").forEach(m => {
        m.classList.remove("selecionado");
        m.setAttribute("aria-pressed", "false");
    });

    const btnConfirmarOrigem = document.getElementById("btn-confirmar-origem");
    if (btnConfirmarOrigem) {
        btnConfirmarOrigem.disabled = true;
        btnConfirmarOrigem.classList.remove("ja-selecionado");
        btnConfirmarOrigem.textContent = "CONFIRMAR ORIGEM & ARQUÉTIPO NA FICHA";
    }

    const feedbackOrigem = document.getElementById("origem-feedback");
    if (feedbackOrigem) feedbackOrigem.textContent = "";

    atualizarContadoresEPax();
    atualizarResumoFinal();
}
function atualizarResumoFinal() {
    const container = document.getElementById("resumo-ficha-conteudo");
    if (!container) return;

    const codinome = document.getElementById("input-codinome")?.value.trim() || "Não definido";
    const civil = document.getElementById("input-identidade-civil")?.value.trim() || "Não informada";
    const bordao = document.getElementById("input-frase-efeito")?.value.trim() || "—";
    const limitacaoNome = document.getElementById("input-limitacao-nome")?.value.trim() || "Pendente";
    const limitacaoTipo = document.getElementById("select-tipo-limitacao")?.value || "Não classificada";

    const listaCon = [...estadoFinalFicha.conhecimentos]
        .map(id => DADOS_JLU_FINAL.conhecimentos.find(c => c.id === id)?.nome)
        .filter(Boolean);

    const listaTra = [...estadoFinalFicha.tracos]
        .map(id => DADOS_JLU_FINAL.tracos.find(t => t.id === id)?.nome)
        .filter(Boolean);

    const listaEqu = [...estadoFinalFicha.equipamentos]
        .map(id => DADOS_JLU_FINAL.equipamentos.find(e => e.id === id)?.nome)
        .filter(Boolean);

    container.innerHTML = `
        <div class="resumo-bloco">
            <span>IDENTIDADE</span>
            <strong>${codinome}</strong>
            <small>${civil} • "${bordao}"</small>
        </div>
        <div class="resumo-bloco">
            <span>LIMITAÇÃO</span>
            <strong>${limitacaoNome}</strong>
            <small>Tipo: ${limitacaoTipo.toUpperCase()}</small>
        </div>
        <div class="resumo-bloco">
            <span>CONHECIMENTOS (${listaCon.length})</span>
            <strong>${listaCon.length ? listaCon.join(", ") : "Nenhum"}</strong>
        </div>
        <div class="resumo-bloco">
            <span>TRAÇOS & ARSENAL</span>
            <strong>${listaTra.length ? listaTra.join(", ") : "Sem traços"}</strong>
            <small>Equipamentos: ${listaEqu.length ? listaEqu.join(", ") : "Nenhum"}</small>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", inicializarAbasFinais);

