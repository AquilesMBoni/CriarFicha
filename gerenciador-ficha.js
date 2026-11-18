/* =========================================================
   GERENCIADOR TEMPORÁRIO DE SESSÃO & PAX (BEN 10 BEYOND)
========================================================= */
(function () {
    const CHAVE_RASCUNHO = "ben10_ficha_rascunho_sessao";
    const CHAVE_FICHAS_SALVAS = "ben10_fichas_salvas_sessao";

    const PAX_POR_TIER = {
        E: 20,
        D: 40,
        C: 60,
        B: 80,
        A: 100,
        S: 120
    };

    const estadoInicialPadrao = () => ({
        tier: null,
        paxTotal: 0,
        gastos: {
            atributos: 0,
            poderes: 0,
            conhecimentos: 0,
            tracos: 0,
            equipamentos: 0
        },
        origem: {
            planetaId: null,
            planetaNome: "",
            especieNome: "",
            arquetipo: "O Combatente",
            caminhoEvolutivo: null
        },
        selecoes: {
            conhecimentos: [],
            tracos: [],
            equipamentos: []
        },
        detalhes: {
            codinome: "",
            identidadeCivil: "",
            fraseEfeito: "",
            alma: "",
            limitacaoTipo: "",
            limitacaoNome: "",
            limitacaoDesc: ""
        }
    });

    // Limpa qualquer resquício antigo de localStorage
    try {
        localStorage.removeItem("tierSelecionado");
        localStorage.removeItem("fichaAtual");
        localStorage.removeItem("ben10_ficha_atual");
        localStorage.removeItem("fichaBen10");
    } catch (_) {}

    window.FichaSessao = {
        obterRascunho() {
            try {
                const salvo = sessionStorage.getItem(CHAVE_RASCUNHO);
                return salvo ? { ...estadoInicialPadrao(), ...JSON.parse(salvo) } : estadoInicialPadrao();
            } catch (_) {
                return estadoInicialPadrao();
            }
        },

        salvarRascunho(novosDados = {}) {
            const atual = this.obterRascunho();
            const tierFallback = typeof window.fichaBen10?.tier === "object"
                ? window.fichaBen10?.tier?.letra
                : window.fichaBen10?.tier;

            const mesclado = {
                ...atual,
                ...novosDados,
                tier: novosDados.tier !== undefined ? novosDados.tier : (atual.tier || tierFallback || null),
                origem: novosDados.origem !== undefined ? novosDados.origem : atual.origem
            };

            sessionStorage.setItem(CHAVE_RASCUNHO, JSON.stringify(mesclado));
            this.atualizarHudPax();
        },

        definirTier(tierLetra) {
            const letra = String(tierLetra || "").toUpperCase();
            const rascunho = this.obterRascunho();
            rascunho.tier = letra;
            rascunho.paxTotal = PAX_POR_TIER[letra] ?? 40;
            this.salvarRascunho(rascunho);
            return rascunho;
        },

        calcularPaxGasto(rascunho = this.obterRascunho()) {
            const g = rascunho.gastos || {};
            return (
                (Number(g.atributos) || 0) +
                (Number(g.poderes) || 0) +
                (Number(g.conhecimentos) || 0) +
                (Number(g.tracos) || 0) +
                (Number(g.equipamentos) || 0)
            );
        },

        obterPaxRestante(rascunho = this.obterRascunho()) {
            return Math.max(0, (Number(rascunho.paxTotal) || 0) - this.calcularPaxGasto(rascunho));
        },

        podeGastarPax(custoAdicional) {
            const rascunho = this.obterRascunho();
            if (!rascunho.tier) {
                this.notificarPax("Selecione um Tier no Módulo 01 antes de gastar PAX!");
                return false;
            }
            const restante = this.obterPaxRestante(rascunho);
            if (restante - custoAdicional < 0) {
                this.notificarPax(`PAX insuficiente! Custo: ${custoAdicional} PAX • Disponível: ${restante} PAX.`);
                return false;
            }
            return true;
        },

        atualizarGastoCategoria(categoria, valorTotalCategoria) {
            const rascunho = this.obterRascunho();
            rascunho.gastos[categoria] = Math.max(0, Number(valorTotalCategoria) || 0);
            this.salvarRascunho(rascunho);
        },

        concluirESalvarFicha(dadosCompletos) {
            const rascunho = this.obterRascunho();
            const lista = this.listarFichasSalvas();

            const fichaFinalizada = {
                id: `ficha_${Date.now()}`,
                criadaEm: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                tier: rascunho.tier || "D",
                paxTotal: rascunho.paxTotal || 40,
                paxGasto: this.calcularPaxGasto(rascunho),
                paxRestante: this.obterPaxRestante(rascunho),
                ...dadosCompletos
            };

            lista.push(fichaFinalizada);
            sessionStorage.setItem(CHAVE_FICHAS_SALVAS, JSON.stringify(lista));

            this.limparRascunhoAtual();
            return fichaFinalizada;
        },

        listarFichasSalvas() {
            try {
                const raw = sessionStorage.getItem(CHAVE_FICHAS_SALVAS);
                return raw ? JSON.parse(raw) : [];
            } catch (_) {
                return [];
            }
        },

        limparRascunhoAtual() {
            sessionStorage.removeItem(CHAVE_RASCUNHO);
            if (window.fichaBen10) {
                window.fichaBen10.tier = null;
                window.fichaBen10.origem = null;
            }

            [
                ["input-pesquisa-conhecimentos", "btn-limpar-pesquisa-conhecimentos"],
                ["input-pesquisa-tracos", "btn-limpar-pesquisa-tracos"],
                ["input-pesquisa-detalhes", "btn-limpar-pesquisa-detalhes"]
            ].forEach(([idInput, idBtn]) => {
                const input = document.getElementById(idInput);
                const btn = document.getElementById(idBtn);
                if (input) input.value = "";
                if (btn) btn.classList.add("oculto");
            });

            document.querySelectorAll(".card-jlu-selecionavel").forEach(card => {
                card.style.display = "";
            });

            this.atualizarHudPax();
        },

        injetarHudPax() {
            const abaExpandida = document.getElementById("aba-expandida");
            const topo = abaExpandida?.querySelector(".aba-expandida__topo");
            if (!topo || document.getElementById("hud-pax-global")) return;

            const hud = document.createElement("div");
            hud.id = "hud-pax-global";
            hud.className = "hud-pax-global oculto";
            hud.innerHTML = `
                <span class="hud-pax-tier" id="hud-pax-tier">TIER —</span>
                <span class="hud-pax-separador">//</span>
                <span class="hud-pax-saldo">PAX DISPONÍVEL: <strong id="hud-pax-valor">0</strong> / <small id="hud-pax-total">0</small></span>
            `;

            const statusEl = document.getElementById("aba-status");
            topo.insertBefore(hud, statusEl || null);
        },

        atualizarHudPax(abaAtivaNome) {
            this.injetarHudPax();
            const hud = document.getElementById("hud-pax-global");
            if (!hud) return;

            const abaAtual = abaAtivaNome
                || document.querySelector(".aba-conteudo.ativo, .aba-conteudo.ativa")?.dataset?.conteudo
                || "";

            if (abaAtual === "tier" || !abaAtual) {
                hud.classList.add("oculto");
                return;
            }

            hud.classList.remove("oculto");
            const rascunho = this.obterRascunho();
            const restante = this.obterPaxRestante(rascunho);

            const elTier = document.getElementById("hud-pax-tier");
            const elValor = document.getElementById("hud-pax-valor");
            const elTotal = document.getElementById("hud-pax-total");

            if (elTier) elTier.textContent = rascunho.tier ? `TIER ${rascunho.tier}` : "SEM TIER";
            if (elValor) {
                elValor.textContent = restante;
                elValor.style.color = restante === 0 ? "#fbbf24" : "#b9ff35";
            }
            if (elTotal) elTotal.textContent = rascunho.paxTotal || 0;
        },

        notificarPax(mensagem) {
            let aviso = document.getElementById("toast-pax-aviso");
            if (!aviso) {
                aviso = document.createElement("div");
                aviso.id = "toast-pax-aviso";
                aviso.className = "toast-pax-aviso";
                document.body.appendChild(aviso);
            }
            aviso.textContent = mensagem;
            aviso.classList.add("visivel");
            clearTimeout(this._timerToast);
            this._timerToast = setTimeout(() => aviso.classList.remove("visivel"), 3200);
        }
    };

    document.addEventListener("DOMContentLoaded", () => {
        window.FichaSessao.injetarHudPax();
    });
})();


/* =========================================================
   MÓDULOS 03 E 04 — PESQUISA COM AUTOCOMPLETE (REUTILIZÁVEL)
========================================================= */
function inicializarBarraPesquisaFicha({ boxId, inputId, limparId, listaId, gridSelector, tagPadrao }) {
    const boxPesquisa = document.getElementById(boxId);
    const inputPesquisa = document.getElementById(inputId);
    const btnLimpar = document.getElementById(limparId);
    const dropdown = document.getElementById(listaId);
    const combobox = boxPesquisa?.querySelector('[role="combobox"]');

    if (!boxPesquisa || !inputPesquisa || !btnLimpar || !dropdown) return;

    let resultadosAtuais = [];
    let indiceAtivo = -1;

    function normalizarTexto(texto) {
        return String(texto || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }

    function obterItensDisponiveis() {
        const cardsDom = Array.from(document.querySelectorAll(gridSelector));

        return cardsDom.map(card => {
            const tituloEl = card.querySelector('.card-jlu-topo h4, h3, h4');
            const tagEl = card.querySelector('.tag-tipo-equip');
            const descEl = card.querySelector('.card-jlu-resumo, p');
            const listaEl = card.querySelector('.card-jlu-lista');

            return {
                id: card.dataset.id || '',
                nome: (tituloEl?.textContent || '').trim(),
                categoria: (tagEl?.textContent || tagPadrao).trim(),
                desc: (descEl?.textContent || '').trim(),
                extra: (listaEl?.textContent || '').trim(),
                elemento: card
            };
        }).filter(item => item.nome);
    }

    function filtrarCardsNaGrade(termoNormalizado) {
        const itens = obterItensDisponiveis();
        itens.forEach(item => {
            const textoBusca = normalizarTexto(`${item.nome} ${item.categoria} ${item.desc} ${item.extra}`);
            const corresponde = !termoNormalizado || textoBusca.includes(termoNormalizado);
            item.elemento.style.display = corresponde ? '' : 'none';
        });
    }

    function fecharDropdown() {
        dropdown.classList.add('oculto');
        combobox?.setAttribute('aria-expanded', 'false');
        indiceAtivo = -1;
    }

    function atualizarDestaqueTeclado() {
        const opcoes = dropdown.querySelectorAll('.detalhes-pesquisa__item');
        opcoes.forEach((op, idx) => {
            const ativo = idx === indiceAtivo;
            op.classList.toggle('ativo', ativo);
            op.setAttribute('aria-selected', String(ativo));
            if (ativo) {
                op.scrollIntoView({ block: 'nearest' });
            }
        });
    }

    function selecionarSugestao(item) {
        if (!item) return;

        inputPesquisa.value = item.nome;
        btnLimpar.classList.remove('oculto');
        filtrarCardsNaGrade(normalizarTexto(item.nome));
        fecharDropdown();

        if (item.elemento) {
            if (!item.elemento.classList.contains('selecionado')) {
                item.elemento.click();
            }

            item.elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
            item.elemento.classList.remove('card-equipamento-destaque');
            void item.elemento.offsetWidth;
            item.elemento.classList.add('card-equipamento-destaque');
        }
    }

    function renderizarDropdown(termoBruto) {
        const termo = normalizarTexto(termoBruto);

        if (!termo) {
            resultadosAtuais = [];
            fecharDropdown();
            return;
        }

        const itens = obterItensDisponiveis();
        resultadosAtuais = itens.filter(item => {
            const alvo = normalizarTexto(`${item.nome} ${item.categoria} ${item.desc} ${item.extra}`);
            return alvo.includes(termo);
        });

        indiceAtivo = -1;
        dropdown.innerHTML = '';

        if (resultadosAtuais.length === 0) {
            const liVazio = document.createElement('li');
            liVazio.className = 'detalhes-pesquisa__vazio';
            liVazio.textContent = 'Nenhum resultado';
            dropdown.appendChild(liVazio);
        } else {
            resultadosAtuais.forEach((item, idx) => {
                const li = document.createElement('li');
                li.className = 'detalhes-pesquisa__item';
                li.setAttribute('role', 'option');
                li.setAttribute('aria-selected', 'false');

                li.innerHTML = `
                    <div class="detalhes-pesquisa__item-info">
                        <span class="detalhes-pesquisa__item-nome">${item.nome}</span>
                        ${item.desc ? `<span class="detalhes-pesquisa__item-desc">${item.desc}</span>` : ''}
                    </div>
                    <span class="detalhes-pesquisa__item-tag">${item.categoria}</span>
                `;

                li.addEventListener('mouseenter', () => {
                    indiceAtivo = idx;
                    atualizarDestaqueTeclado();
                });

                li.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    selecionarSugestao(item);
                });

                dropdown.appendChild(li);
            });
        }

        dropdown.classList.remove('oculto');
        combobox?.setAttribute('aria-expanded', 'true');
    }

    inputPesquisa.addEventListener('input', () => {
        const valor = inputPesquisa.value;
        btnLimpar.classList.toggle('oculto', valor.length === 0);
        filtrarCardsNaGrade(normalizarTexto(valor));
        renderizarDropdown(valor);
    });

    inputPesquisa.addEventListener('focus', () => {
        if (inputPesquisa.value.trim().length > 0) {
            renderizarDropdown(inputPesquisa.value);
        }
    });

    inputPesquisa.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            fecharDropdown();
            return;
        }

        if (dropdown.classList.contains('oculto') || resultadosAtuais.length === 0) {
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            indiceAtivo = (indiceAtivo + 1) % resultadosAtuais.length;
            atualizarDestaqueTeclado();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            indiceAtivo = (indiceAtivo - 1 + resultadosAtuais.length) % resultadosAtuais.length;
            atualizarDestaqueTeclado();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const escolhido = indiceAtivo >= 0 ? resultadosAtuais[indiceAtivo] : resultadosAtuais[0];
            selecionarSugestao(escolhido);
        }
    });

    btnLimpar.addEventListener('click', () => {
        inputPesquisa.value = '';
        btnLimpar.classList.add('oculto');
        filtrarCardsNaGrade('');
        fecharDropdown();
        inputPesquisa.focus();
    });

    document.addEventListener('click', (e) => {
        if (!boxPesquisa.contains(e.target)) {
            fecharDropdown();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    /* Módulo 03 — Conhecimentos */
    inicializarBarraPesquisaFicha({
        boxId: 'conhecimentos-pesquisa-box',
        inputId: 'input-pesquisa-conhecimentos',
        limparId: 'btn-limpar-pesquisa-conhecimentos',
        listaId: 'conhecimentos-pesquisa-lista',
        gridSelector: '#grid-conhecimentos .card-jlu-selecionavel',
        tagPadrao: 'CONHECIMENTO'
    });

    /* Módulo 03 — Traços Simples */
    inicializarBarraPesquisaFicha({
        boxId: 'tracos-pesquisa-box',
        inputId: 'input-pesquisa-tracos',
        limparId: 'btn-limpar-pesquisa-tracos',
        listaId: 'tracos-pesquisa-lista',
        gridSelector: '#grid-tracos .card-jlu-selecionavel',
        tagPadrao: 'TRAÇO'
    });

    /* Módulo 04 — Equipamentos & Armas */
    inicializarBarraPesquisaFicha({
        boxId: 'detalhes-pesquisa-box',
        inputId: 'input-pesquisa-detalhes',
        limparId: 'btn-limpar-pesquisa-detalhes',
        listaId: 'detalhes-pesquisa-lista',
        gridSelector: '#grid-equipamentos .card-jlu-selecionavel',
        tagPadrao: 'ITEM'
    });
});