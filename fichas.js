/* =========================================================
   BEN 10 BEYOND — EXIBIÇÃO DE FICHAS, FOTO & PDF EDITÁVEL (ACROFORM)
========================================================= */

(() => {
    'use strict';

    const CHAVE_FICHAS_SALVAS = 'ben10_fichas_salvas_sessao';
    const CAMINHOS_LOGO = ['img/logo_pdf.png', 'logo_pdf.png'];

    const STATS_POR_TIER = {
        E: { determinacao: '—', defesa: '—', bonusAtaque: '—', dadoDano: '' },
        D: { determinacao: '12', defesa: '15', bonusAtaque: '+1', dadoDano: '1d6' },
        C: { determinacao: '15', defesa: '18', bonusAtaque: '+2', dadoDano: '1d6' },
        B: { determinacao: '—', defesa: '—', bonusAtaque: '—', dadoDano: '' },
        A: { determinacao: '—', defesa: '—', bonusAtaque: '—', dadoDano: '' },
        S: { determinacao: '—', defesa: '—', bonusAtaque: '—', dadoDano: '' }
    };

    const NOTAS_CURTAS_HABILIDADES = {
        // Conhecimentos
        'acrobacias': 'Vantagem em escalada/saltos; 1x/Edição sucesso automático em salto aéreo; reduz Tensão em 5 em obstáculos.',
        'subterfugio': 'Vantagem em furtividade; 1x/Edição escapa de amarras; 1x/Cena +1 Tier de dano em alvo desavisado.',
        'tech': 'Vantagem para hackear; entende itens tecnológicos em 1 Cena; escolhe 1 Equipamento grátis por Edição.',
        'estrategia': '1x/Edição rerrola falha (Plano B); concede +Tier a aliado; 1x/Edição revela dados ou fraqueza do alvo.',

        // Traços Simples
        'beleza-rara': '1x/Cena, gaste 2 Determinação para sucesso automático em persuasão ou sedução.',
        'poliglota': 'Fala, lê e escreve idiomas comuns e aprende novos idiomas observando por 1 Cena.',
        'perene': 'Imune ao envelhecimento natural e aos efeitos da passagem do tempo.',
        'eu-me-lembro': '1x/Edição, declara conhecer figura, evento ou cultura e recebe um fato crucial.',
        'contato-confiavel': '1x/Edição, obtém uma pista útil através de um informante aliado.',
        'casca-grossa': 'Concede Redução de Dano 2 e permite agir por +1 turno antes de cair ao ser Derrotado.',
        'frase-de-efeito': '1x/Cena, ao dizer seu bordão, reduz custo de Determinação em seu Tier ou ganha Vantagem.',
        'gadgets-de-bolso': '1x/Cena, gaste 1 Determinação para sacar um item da lista de Equipamentos.',
        'voz-da-multidao': 'Vantagem em testes para instruir, controlar e acalmar multidões em resgates.',
        'influencer': '1x/Edição, recebe um brinde patrocinado (comunicador, item pequeno ou traje).',
        'identidade-secreta': 'Vantagem na vida civil; 1x/Edição, sai de cena como civil e reaparece em Zona Adjacente.',
        'dupla-dinamica': '+1 Determinação, Precisão e Defesa perto do parceiro; 1x/Edição realiza Ataque Sincronizado.',
        'afiliacao': 'Membro de organização (ex: Encanadores); gaste 2 Determinação para Vantagem social ou peça ajuda 1x/Edição.',

        // Equipamentos & Armas
        'arma-marcial': '+1 de Dano em ataques corpo a corpo (espadas, bastões, manoplas).',
        'arma-longo-alcance': '+1 em Testes de Ataque à distância (alcance Curto).',
        'bombas-fumaca': 'Por 1 rodada, alvos na Zona Próxima sofrem -3 em testes de visão.',
        'gancho-escalada': 'Move 1 distância em qualquer direção com 1 uso.',
        'puxar-atacar': 'Ataque à distância que puxa o alvo 1 distância em sua direção.',
        'spray-curativo': 'Remove as condições Arranhado ou Cansado de um alvo adjacente.',
        'rastreador': 'Emite sinal de GPS preciso para localizar pessoa ou objeto.',
        'respirador': 'Permite respirar normalmente debaixo d\'água até o fim da Cena.',
        'mascara-alteracao': 'Altera sua aparência facial até o final da Cena.',
        'pem': 'Desativa eletrônicos; robôs/exoesqueletos testam Resistência (Tensão 16) ou perdem habilidades por 1 rodada.',
        'bomba-adesiva': 'Alvo a alcance Curto testa Agilidade (Tensão 15) ou fica Imobilizado.',
        'holograma-pessoal': 'Cria chamariz; inimigos testam Mente (Tensão 14) para não atacar o holograma.',
        'sequenciador-cripto': 'Concede Vantagem em testes para hackear ou decifrar códigos.',
        'gas-sonifero': 'Alvos a alcance Curto testam Resistência (Tensão 14) ou ficam Adormecidos por 1 rodada.'
    };

    const ATRIBUTOS_BASE = [
        { id: 'potencia', label: 'POTÊNCIA' },
        { id: 'precisao', label: 'PRECISÃO' },
        { id: 'agilidade', label: 'AGILIDADE' },
        { id: 'resistencia', label: 'RESISTÊNCIA' },
        { id: 'mente', label: 'MENTE' },
        { id: 'espirito', label: 'ESPÍRITO' }
    ];

    const CONDICOES_LISTA = [
        { id: 'extra', label: 'EXTRA', pen: '' },
        { id: 'cansado', label: 'CANSADO', pen: '' },
        { id: 'arranhado', label: 'ARRANHADO', pen: '-2' },
        { id: 'ferido', label: 'FERIDO', pen: '' },
        { id: 'grav_ferido', label: 'GRAV. FERIDO', pen: '-4' },
        { id: 'derrotado', label: 'DERROTADO', pen: 'X' }
    ];

    const TIERS_ORDEM = ['E', 'D', 'C', 'B', 'A', 'S'];
    const TOTAL_SLOTS_TRACOS = 5;
    const TOTAL_SLOTS_CONHECIMENTOS = 7;
    const TOTAL_LINHAS_CAPACIDADES = 12;

    let fichaSelecionadaId = null;
    let logoRecortadaCache = null; // { dataUrl, width, height }

    function escaparHTML(valor) {
        return String(valor ?? '').replace(/[&<>"']/g, ch => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[ch]);
    }

    function sanitizarParaFontePadrao(valor) {
        return String(valor ?? '')
            .replace(/✳/g, '*')
            .replace(/•/g, '-')
            .replace(/—/g, '-')
            .replace(/[^\x09\x0A\x0D\x20-\x7E\x80-\xFF]/g, '');
    }

    function obterFichas() {
        if (window.FichaSessao && typeof window.FichaSessao.listarFichasSalvas === 'function') {
            return window.FichaSessao.listarFichasSalvas();
        }
        try {
            return JSON.parse(sessionStorage.getItem(CHAVE_FICHAS_SALVAS)) || [];
        } catch (_) {
            return [];
        }
    }

    function salvarListaFichas(lista) {
        sessionStorage.setItem(CHAVE_FICHAS_SALVAS, JSON.stringify(lista));
    }

    function obterNotaCurta(item) {
        if (!item) return '';
        if (item.id && NOTAS_CURTAS_HABILIDADES[item.id]) {
            return NOTAS_CURTAS_HABILIDADES[item.id];
        }
        return item.resumo || item.desc || 'Habilidade registrada na ficha.';
    }

    /* =========================================================
       UTILITÁRIOS DE RECORTE DO LOGO E FOTO DO PERSONAGEM
    ========================================================= */
    function recortarMargensLogo(imgEl) {
        const w = imgEl.naturalWidth;
        const h = imgEl.naturalHeight;
        if (!w || !h) return null;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imgEl, 0, 0);

        const data = ctx.getImageData(0, 0, w, h).data;
        let minX = w, minY = h, maxX = 0, maxY = 0;
        let encontrouPixel = false;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                const i = (y * w + x) * 4;
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                const a = data[i + 3];
                const ehVazio = a < 20 || (r > 246 && g > 246 && b > 246);
                if (!ehVazio) {
                    encontrouPixel = true;
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                }
            }
        }

        const pad = 4;
        const cropX = encontrouPixel ? Math.max(0, minX - pad) : 0;
        const cropY = encontrouPixel ? Math.max(0, minY - pad) : 0;
        const cropW = encontrouPixel ? Math.min(w - cropX, maxX - minX + pad * 2) : w;
        const cropH = encontrouPixel ? Math.min(h - cropY, maxY - minY + pad * 2) : h;

        const outCanvas = document.createElement('canvas');
        outCanvas.width = cropW;
        outCanvas.height = cropH;
        outCanvas.getContext('2d').drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        return {
            dataUrl: outCanvas.toDataURL('image/png'),
            width: cropW,
            height: cropH
        };
    }

    async function prepararLogoRecortada() {
        if (logoRecortadaCache) return logoRecortadaCache;

        const carregarImg = (src) => new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });

        for (const caminho of CAMINHOS_LOGO) {
            try {
                const img = await carregarImg(caminho);
                const recortada = recortarMargensLogo(img);
                if (recortada) {
                    logoRecortadaCache = recortada;
                    return recortada;
                }
            } catch (_) {
                // tenta próximo caminho
            }
        }
        return null;
    }


    /* =========================================================
       UTILITÁRIOS DE FONTE PERSONALIZADA
    ========================================================= */
    function encontrarUrlFonteNoCss(nomeFamilia) {
        const alvo = nomeFamilia.toLowerCase();
        for (const sheet of Array.from(document.styleSheets)) {
            let regras;
            try {
                regras = sheet.cssRules || sheet.rules;
            } catch (_) {
                continue;
            }
            if (!regras) continue;

            for (const regra of Array.from(regras)) {
                if (regra.type === CSSRule.FONT_FACE_RULE) {
                    const familia = (regra.style.getPropertyValue('font-family') || '')
                        .replace(/['"]/g, '')
                        .trim()
                        .toLowerCase();
                    if (familia === alvo) {
                        const src = regra.style.getPropertyValue('src') || '';
                        const match = src.match(/url\(['"]?([^'")]+)['"]?\)/i);
                        if (match && match[1]) {
                            return new URL(match[1], sheet.href || window.location.href).href;
                        }
                    }
                }
            }
        }
        return null;
    }

    async function carregarFontesNoPdf(pdfDoc, StandardFonts) {
        let usouCustomizada = false;
        let fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
        let fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        if (!window.fontkit) {
            return { fontRegular, fontBold, usouCustomizada };
        }

        try {
            pdfDoc.registerFontkit(window.fontkit);

            const urlGalpon = encontrarUrlFonteNoCss('Galpon');
            const urlGrobold = encontrarUrlFonteNoCss('Grobold');

            if (urlGalpon) {
                const resp = await fetch(urlGalpon);
                if (resp.ok) {
                    const bytes = await resp.arrayBuffer();
                    fontRegular = await pdfDoc.embedFont(bytes, { subset: false });
                    usouCustomizada = true;
                }
            }

            if (urlGrobold) {
                const resp = await fetch(urlGrobold);
                if (resp.ok) {
                    const bytes = await resp.arrayBuffer();
                    fontBold = await pdfDoc.embedFont(bytes, { subset: false });
                    usouCustomizada = true;
                }
            } else if (usouCustomizada) {
                fontBold = fontRegular;
            }
        } catch (err) {
            console.warn('Fallback para Helvetica no PDF:', err);
        }

        return { fontRegular, fontBold, usouCustomizada };
    }

    /* =========================================================
       1. LISTA DE CARDS DA SESSÃO
    ========================================================= */
    function renderizarListaSessao() {
        const fichas = obterFichas();
        const containerLista = document.getElementById('fichas-lista-sessao');
        const blocoVazio = document.getElementById('fichas-vazio');
        const barraAcoes = document.getElementById('ficha-acoes-barra');
        const wrapperFolha = document.getElementById('folha-ficha-wrapper');

        if (!containerLista) return;

        if (!fichas.length) {
            containerLista.innerHTML = '';
            blocoVazio?.classList.remove('oculto');
            barraAcoes?.classList.add('oculto');
            wrapperFolha?.classList.add('oculto');
            fichaSelecionadaId = null;
            return;
        }

        blocoVazio?.classList.add('oculto');
        barraAcoes?.classList.remove('oculto');
        wrapperFolha?.classList.remove('oculto');

        if (!fichaSelecionadaId || !fichas.some(f => f.id === fichaSelecionadaId)) {
            fichaSelecionadaId = fichas[fichas.length - 1].id;
        }

        containerLista.innerHTML = fichas.map(ficha => {
            const ativa = ficha.id === fichaSelecionadaId;
            const especie = ficha.origem?.especieNome || 'Origem não definida';
            const arquetipo = ficha.origem?.arquetipo || 'Sem arquétipo';

            return `
                <article class="card-ficha-salva ${ativa ? 'ativa' : ''}" data-id="${escaparHTML(ficha.id)}" tabindex="0" role="button">
                    <div class="card-ficha-salva__topo">
                        <span class="card-ficha-salva__tier">TIER ${escaparHTML(ficha.tier || 'D')}</span>
                        <span class="card-ficha-salva__hora">Criada às ${escaparHTML(ficha.criadaEm || '--:--')}</span>
                    </div>
                    <h3>${escaparHTML(ficha.codinome || 'Herói Sem Nome')}</h3>
                    <p class="card-ficha-salva__meta">
                        <strong>${escaparHTML(especie)}</strong> • ${escaparHTML(arquetipo)}<br>
                        PAX Restante: ${escaparHTML(ficha.paxRestante ?? 0)} / ${escaparHTML(ficha.paxTotal ?? 40)}
                    </p>
                    <div class="card-ficha-salva__rodape">
                        <span>${ativa ? '● EDITANDO FOLHA' : 'CLIQUE PARA ABRIR'}</span>
                        <span>PDF EDITÁVEL &gt;</span>
                    </div>
                </article>
            `;
        }).join('');

        containerLista.querySelectorAll('.card-ficha-salva').forEach(card => {
            const selecionar = () => {
                fichaSelecionadaId = card.dataset.id;
                renderizarListaSessao();
            };
            card.addEventListener('click', selecionar);
            card.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selecionar();
                }
            });
        });

        const fichaAtual = fichas.find(f => f.id === fichaSelecionadaId);
        if (fichaAtual) {
            renderizarMoldeNaTela(fichaAtual);
        }
    }

    /* =========================================================
       2. PRÉ-VISUALIZAÇÃO INTERATIVA NA TELA
    ========================================================= */
    function renderizarMoldeNaTela(ficha) {
        const folha = document.getElementById('folha-ficha-oficial');
        const tituloBarra = document.getElementById('ficha-ativa-titulo');
        if (!folha) return;

        const tierLetra = String(ficha.tier || 'D').toUpperCase();
        const statsTier = STATS_POR_TIER[tierLetra] || STATS_POR_TIER.D;

        if (tituloBarra) {
            tituloBarra.textContent = `${ficha.codinome || 'Personagem'} (Tier ${tierLetra})`;
        }

        const temCascaGrossa = (ficha.tracos || []).some(t => t.id === 'casca-grossa');
        const temIdentidadeSecreta = (ficha.tracos || []).some(t => t.id === 'identidade-secreta');
        const reducaoDano = temCascaGrossa ? '2' : '0';

        const tracosLista = ficha.tracos || [];
        const tracosSlotsHtml = Array.from({ length: TOTAL_SLOTS_TRACOS }, (_, idx) => {
            const item = tracosLista[idx];
            const texto = item ? `${item.nome}: ${obterNotaCurta(item)}` : '';
            return `
                <div class="molde-hab-item" contenteditable="true" data-campo="traco_${idx}">${escaparHTML(texto)}</div>
            `;
        }).join('');

        const conLista = ficha.conhecimentos || [];
        const conSlotsHtml = Array.from({ length: TOTAL_SLOTS_CONHECIMENTOS }, (_, idx) => {
            const item = conLista[idx];
            const texto = item ? `${item.nome}: ${obterNotaCurta(item)}` : '';
            return `
                <div class="molde-hab-item" contenteditable="true" data-campo="conhecimento_${idx}">${escaparHTML(texto)}</div>
            `;
        }).join('');

        const equipamentos = ficha.equipamentos || [];
        const linhasCapacidadesHtml = Array.from({ length: TOTAL_LINHAS_CAPACIDADES }, (_, idx) => {
            const eq = equipamentos[idx];
            const nome = eq ? eq.nome : '';
            const cat = eq ? (eq.tipo || 'Tecnologia') : '';
            const pax = eq ? `${eq.custo ?? 1} PAX` : '';
            const nota = eq ? obterNotaCurta(eq) : '';

            return `
                <tr>
                    <td contenteditable="true" data-campo="cap_nome_${idx}">${escaparHTML(nome)}</td>
                    <td contenteditable="true" data-campo="cap_cat_${idx}">${escaparHTML(cat)}</td>
                    <td style="text-align:center;">
                        <span class="molde-checks-linha">
                            <input type="checkbox" class="molde-checkbox" data-check="cap_uso_${idx}_1" aria-label="Uso 1 linha ${idx + 1}">
                            <input type="checkbox" class="molde-checkbox" data-check="cap_uso_${idx}_2" aria-label="Uso 2 linha ${idx + 1}">
                            <input type="checkbox" class="molde-checkbox" data-check="cap_uso_${idx}_3" aria-label="Uso 3 linha ${idx + 1}">
                            <span class="molde-pax-celula" contenteditable="true" data-campo="cap_pax_${idx}">${escaparHTML(pax)}</span>
                        </span>
                    </td>
                    <td contenteditable="true" data-campo="cap_nota_${idx}">${escaparHTML(nota)}</td>
                </tr>
            `;
        }).join('');

        const origemTexto = [
            ficha.origem?.planetaNome,
            ficha.origem?.especieNome
        ].filter(Boolean).join(' — ') || 'Não selecionada';

        const limitacaoNome = ficha.limitacao?.nome || 'Não definida';
        const limitacaoTipo = ficha.limitacao?.tipo ? `[${ficha.limitacao.tipo.toUpperCase()}] ` : '';
        const limitacaoDesc = ficha.limitacao?.descricao || '';
        const limitacaoTexto = `${limitacaoTipo}${limitacaoNome}${limitacaoDesc ? ' — ' + limitacaoDesc : ''}`;

        const logoSrcInicial = logoRecortadaCache ? logoRecortadaCache.dataUrl : 'img/logo_pdf.png';

        folha.innerHTML = `
            <!-- ==================== PÁGINA 1 ==================== -->
            <article class="ficha-pagina">
                <header class="molde-cabecalho">
                    <div class="molde-logo-slot">
                        <img class="molde-logo-img" src="${logoSrcInicial}" onerror="this.onerror=null;this.src='logo_pdf.png';" alt="Ben 10 Beyond — The Roleplaying Game">
                    </div>

                    <div class="molde-identidade-campos">
                        <div class="molde-linha-campo">
                            <label>NOME DO HERÓI:</label>
                            <span contenteditable="true" data-campo="nome_heroi">${escaparHTML(ficha.codinome || '')}</span>
                        </div>
                        <div class="molde-linha-campo">
                            <label>NOME CIVIL:</label>
                            <span contenteditable="true" data-campo="nome_civil">${escaparHTML(ficha.identidadeCivil || '')}</span>
                        </div>
                        <div class="molde-linha-campo">
                            <label>IDENTIDADE SECRETA:</label>
                            <span contenteditable="true" data-campo="identidade_secreta">${temIdentidadeSecreta ? 'Ativa (Vida Civil Protegida)' : 'Pública / Não Oculta'}</span>
                        </div>
                    </div>
                </header>

                <div class="molde-grid-principal">
                    <!-- COLUNA 1: ATRIBUTOS -->
                    <div class="molde-coluna">
                        <section class="molde-bloco" style="flex:1;">
                            <div class="molde-bloco-titulo">
                                <span>ATRIBUTOS / MODIFICADOR</span>
                                <small>5 PAX = +3</small>
                            </div>
                            <div class="molde-atributos-lista">
                                <div class="molde-attr-cabecalho">
                                    <span>ATRIBUTO</span>
                                    <span>BASE</span>
                                    <span></span>
                                    <span>MOD</span>
                                    <span></span>
                                    <span>TOTAL</span>
                                </div>
                                ${ATRIBUTOS_BASE.map(attr => `
                                    <div class="molde-attr-linha">
                                        <span class="molde-attr-nome">${attr.label}</span>
                                        <div class="molde-caixa-num" contenteditable="true" data-campo="attr_${attr.id}_base">0</div>
                                        <span class="molde-sinal">+</span>
                                        <div class="molde-caixa-num" contenteditable="true" data-campo="attr_${attr.id}_mod">0</div>
                                        <span class="molde-sinal">=</span>
                                        <div class="molde-caixa-num molde-caixa-num--total" contenteditable="true" data-campo="attr_${attr.id}_total">0</div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    </div>

                    <!-- COLUNA 2: TIER, PAX, DETERMINAÇÃO E CONDIÇÕES -->
                    <div class="molde-coluna">
                        <section class="molde-bloco">
                            <div class="molde-bloco-titulo">
                                <span>ESCALA &amp; PONTOS DE EVOLUÇÃO</span>
                                <small>PAX</small>
                            </div>
                            <div class="molde-tier-pax">
                                <div class="molde-tier-linha">
                                    <span>TIER:</span>
                                    <div class="molde-tier-letras">
                                        ${TIERS_ORDEM.map(t => `
                                            <span class="molde-tier-letra ${t === tierLetra ? 'ativo' : ''}">${t}</span>
                                        `).join('')}
                                    </div>
                                </div>
                                <div class="molde-pax-grid">
                                    <div class="molde-mini-box">
                                        <span>PAX TOTAL</span>
                                        <strong contenteditable="true" data-campo="pax_total">${escaparHTML(ficha.paxTotal ?? 40)}</strong>
                                    </div>
                                    <div class="molde-mini-box">
                                        <span>PAX DISPONÍVEIS</span>
                                        <strong contenteditable="true" data-campo="pax_disponiveis">${escaparHTML(ficha.paxRestante ?? 0)}</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section class="molde-bloco">
                            <div class="molde-bloco-titulo">
                                <span>DETERMINAÇÃO</span>
                            </div>
                            <div class="molde-det-grid">
                                <div class="molde-mini-box">
                                    <span>BASE</span>
                                    <strong contenteditable="true" data-campo="det_base">${escaparHTML(statsTier.determinacao)}</strong>
                                </div>
                                <div class="molde-mini-box">
                                    <span>MOD ESP.</span>
                                    <strong contenteditable="true" data-campo="det_mod">0</strong>
                                </div>
                                <div class="molde-mini-box">
                                    <span>COMPRADO</span>
                                    <strong contenteditable="true" data-campo="det_comprado">0</strong>
                                </div>
                                <div class="molde-mini-box" style="background:#e6f7d4;">
                                    <span>TOTAL</span>
                                    <strong contenteditable="true" data-campo="det_total">${escaparHTML(statsTier.determinacao)}</strong>
                                </div>
                            </div>
                            <div class="molde-det-atual">
                                <span>DETERMINAÇÃO ATUAL:</span>
                                <span contenteditable="true" data-campo="det_atual" style="min-width:54px; text-align:right;">${escaparHTML(statsTier.determinacao)}</span>
                            </div>
                        </section>

                        <section class="molde-bloco" style="flex:1;">
                            <div class="molde-bloco-titulo">
                                <span>CONDIÇÕES</span>
                            </div>
                            <div class="molde-condicoes-grid">
                                ${CONDICOES_LISTA.map(cond => `
                                    <label class="molde-condicao-item">
                                        <span class="molde-condicao-check">
                                            <input type="checkbox" class="molde-checkbox" data-check="cond_${cond.id}">
                                            ${cond.label}
                                        </span>
                                        ${cond.pen ? `<span class="molde-penalidade">${cond.pen}</span>` : ''}
                                    </label>
                                `).join('')}
                            </div>
                        </section>
                    </div>

                    <!-- COLUNA 3: ATAQUE, DEFESA, LIMITAÇÃO E DANO TOTAL -->
                    <div class="molde-coluna">
                        <section class="molde-bloco">
                            <div class="molde-bloco-titulo">
                                <span>BÔNUS DE ATAQUE</span>
                            </div>
                            <div class="molde-formula-grid">
                                <div class="molde-mini-box">
                                    <span>BASE</span>
                                    <strong contenteditable="true" data-campo="atq_base">${escaparHTML(statsTier.bonusAtaque)}</strong>
                                </div>
                                <div class="molde-mini-box">
                                    <span>PREC.</span>
                                    <strong contenteditable="true" data-campo="atq_prec">0</strong>
                                </div>
                                <div class="molde-mini-box">
                                    <span>MOD</span>
                                    <strong contenteditable="true" data-campo="atq_mod">0</strong>
                                </div>
                                <div class="molde-mini-box" style="background:#e6f7d4;">
                                    <span>TOTAL</span>
                                    <strong contenteditable="true" data-campo="atq_total">${escaparHTML(statsTier.bonusAtaque)}</strong>
                                </div>
                            </div>
                            <div class="molde-dado-dano-bar">
                                <span>DADO DE DANO:</span>
                                <div class="molde-dados-chips">
                                    ${['1d6', '1d8', '1d10'].map(dado => `
                                        <label class="molde-dado-opcao">
                                            <input type="checkbox" class="molde-checkbox" data-check="dado_${dado}" ${statsTier.dadoDano === dado ? 'checked' : ''}>
                                            ${dado}
                                        </label>
                                    `).join('')}
                                </div>
                            </div>
                        </section>

                        <section class="molde-bloco">
                            <div class="molde-bloco-titulo">
                                <span>DEFESA &amp; REDUÇÃO</span>
                            </div>
                            <div class="molde-formula-grid">
                                <div class="molde-mini-box">
                                    <span>BASE</span>
                                    <strong contenteditable="true" data-campo="def_base">${escaparHTML(statsTier.defesa)}</strong>
                                </div>
                                <div class="molde-mini-box">
                                    <span>RESIST.</span>
                                    <strong contenteditable="true" data-campo="def_resist">0</strong>
                                </div>
                                <div class="molde-mini-box">
                                    <span>MOD</span>
                                    <strong contenteditable="true" data-campo="def_mod">0</strong>
                                </div>
                                <div class="molde-mini-box" style="background:#e6f7d4;">
                                    <span>TOTAL</span>
                                    <strong contenteditable="true" data-campo="def_total">${escaparHTML(statsTier.defesa)}</strong>
                                </div>
                            </div>
                            <div class="molde-dado-dano-bar">
                                <span>REDUÇÃO DE DANO:</span>
                                <strong contenteditable="true" data-campo="reducao_dano" style="min-width:32px; text-align:right;">${reducaoDano}</strong>
                            </div>
                        </section>

                        <section class="molde-bloco">
                            <div class="molde-bloco-titulo">
                                <span>LIMITAÇÃO</span>
                            </div>
                            <div class="molde-limitacao-corpo" contenteditable="true" data-campo="limitacao">${escaparHTML(limitacaoTexto)}</div>
                        </section>

                        <section class="molde-bloco">
                            <div class="molde-bloco-titulo">
                                <span>DANO TOTAL</span>
                            </div>
                            <div class="molde-dano-total">
                                <div class="molde-mini-box">
                                    <span>POTÊNCIA</span>
                                    <strong contenteditable="true" data-campo="dano_potencia">—</strong>
                                </div>
                                <div class="molde-mini-box">
                                    <span>ESPÍRITO</span>
                                    <strong contenteditable="true" data-campo="dano_espirito">—</strong>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <!-- PARTE INFERIOR DA PÁGINA 1 -->
                <div class="molde-inferior-grid">
                    <section class="molde-bloco" style="display:flex; flex-direction:column;">
                        <div class="molde-bloco-titulo">
                            <span>ORIGEM &amp; LINHAGEM</span>
                        </div>
                        <div class="molde-info-box" contenteditable="true" data-campo="origem">${escaparHTML(origemTexto)}</div>

                        <div class="molde-bloco-titulo">
                            <span>ARQUÉTIPO TÁTICO</span>
                        </div>
                        <div class="molde-info-box" contenteditable="true" data-campo="arquetipo">${escaparHTML(ficha.origem?.arquetipo || 'Não definido')}</div>

                        <div class="molde-bloco-titulo">
                            <span>TRAÇOS</span>
                            <small>4 / 6 / 12 PAX</small>
                        </div>
                        <div class="molde-lista-habilidades">
                            ${tracosSlotsHtml}
                        </div>
                    </section>

                    <section class="molde-bloco" style="display:flex; flex-direction:column;">
                        <div class="molde-bloco-titulo">
                            <span>CONHECIMENTOS</span>
                            <small>4 PAX CADA</small>
                        </div>
                        <div class="molde-lista-habilidades">
                            ${conSlotsHtml}
                        </div>
                    </section>
                </div>

                <footer class="molde-pagina-rodape">
                    <span>BEN 10 BEYOND — PROTOCOLO DE REGISTRO DE HERÓI</span>
                    <span>PÁGINA 01 / 02</span>
                </footer>
            </article>

            <!-- ==================== PÁGINA 2 ==================== -->
            <article class="ficha-pagina">
                <header class="molde-cabecalho">
                    <div class="molde-logo-slot">
                        <img class="molde-logo-img" src="${logoSrcInicial}" onerror="this.onerror=null;this.src='logo_pdf.png';" alt="Ben 10 Beyond — The Roleplaying Game">
                    </div>

                    <div class="molde-identidade-campos">
                        <div class="molde-linha-campo">
                            <label>DESIGNAÇÃO:</label>
                            <span contenteditable="true" data-campo="p2_designacao">${escaparHTML(ficha.codinome || '')}</span>
                        </div>
                        <div class="molde-linha-campo">
                            <label>BÚSSOLA MORAL / BORDÃO:</label>
                            <span contenteditable="true" data-campo="p2_bordao">${escaparHTML(ficha.fraseEfeito || '')}</span>
                        </div>
                        <div class="molde-linha-campo">
                            <label>PAX GASTOS / TOTAL:</label>
                            <span contenteditable="true" data-campo="p2_pax_resumo">${escaparHTML(ficha.paxGasto ?? 0)} / ${escaparHTML(ficha.paxTotal ?? 40)} PAX</span>
                        </div>
                    </div>
                </header>

                <section class="molde-bloco" style="flex:1;">
                    <div class="molde-bloco-titulo">
                        <span>CAPACIDADES HERÓICAS // TREINAMENTO MARCIAL // TECNOLOGIA &amp; ARSENAL</span>
                        <small>PAX GASTOS</small>
                    </div>
                    <table class="molde-tabela-capacidades">
                        <thead>
                            <tr>
                                <th style="width: 28%;">NOME DA CAPACIDADE / ITEM</th>
                                <th style="width: 17%;">CATEGORIA</th>
                                <th style="width: 18%; text-align:center;">USOS / PAX</th>
                                <th style="width: 37%;">NOTA DE EFEITO</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${linhasCapacidadesHtml}
                        </tbody>
                    </table>
                </section>

                <div class="molde-p2-rodape">
                    <section class="molde-bloco">
                        <div class="molde-bloco-titulo">
                            <span>ALMA DO PERSONAGEM (HISTÓRIA &amp; MOTIVAÇÃO)</span>
                        </div>
                        <div class="molde-texto-livre" contenteditable="true" data-campo="alma">${escaparHTML(ficha.alma || '')}</div>
                    </section>

                    <section class="molde-bloco">
                        <div class="molde-bloco-titulo">
                            <span>ANOTAÇÕES DE MISSÃO &amp; TRANSFORMAÇÕES</span>
                        </div>
                        <div class="molde-texto-livre" contenteditable="true" data-campo="anotacoes"></div>
                    </section>
                </div>

                <footer class="molde-pagina-rodape">
                    <span>BEN 10 BEYOND — ARQUIVO TÁTICO DOS ENCANADORES</span>
                    <span>PÁGINA 02 / 02</span>
                </footer>
            </article>
        `;

        // Aplica recorte automático do logo na prévia para que ele preencha bem o cabeçalho
        prepararLogoRecortada().then(recortada => {
            if (!recortada) return;
            folha.querySelectorAll('.molde-logo-img').forEach(img => {
                if (img.src !== recortada.dataUrl) {
                    img.src = recortada.dataUrl;
                }
            });
        });

    }


    /* =========================================================
       3. CAPTURA DOS DADOS EDITADOS + GERAÇÃO DO PDF ACROFORM
    ========================================================= */
    function lerCampoTela(chave) {
        const el = document.querySelector(`[data-campo="${chave}"]`);
        return el ? el.innerText.trim() : '';
    }

    function lerCheckTela(chave) {
        const el = document.querySelector(`[data-check="${chave}"]`);
        return Boolean(el && el.checked);
    }

    async function gerarEBaixarPdfEditavel() {
        if (!window.PDFLib) {
            alert('A biblioteca pdf-lib não pôde ser carregada. Verifique sua conexão com a internet.');
            return;
        }

        const fichas = obterFichas();
        const fichaAtual = fichas.find(f => f.id === fichaSelecionadaId);
        if (!fichaAtual) return;

        const btnExportar = document.getElementById('btn-exportar-pdf');
        const textoOriginalBtn = btnExportar?.textContent || '';
        if (btnExportar) {
            btnExportar.disabled = true;
            btnExportar.textContent = 'GERANDO PDF EDITÁVEL...';
        }

        try {
            const { PDFDocument, StandardFonts, rgb } = window.PDFLib;
            const pdfDoc = await PDFDocument.create();
            const form = pdfDoc.getForm();

            const [{ fontRegular, fontBold, usouCustomizada }, logoRecortada] = await Promise.all([
                carregarFontesNoPdf(pdfDoc, StandardFonts),
                prepararLogoRecortada()
            ]);

            let logoPdfEmbedded = null;
            if (logoRecortada) {
                const logoBytes = await fetch(logoRecortada.dataUrl).then(r => r.arrayBuffer());
                logoPdfEmbedded = {
                    image: await pdfDoc.embedPng(logoBytes),
                    width: logoRecortada.width,
                    height: logoRecortada.height
                };
            }


            const fmt = (txt) => (usouCustomizada ? String(txt ?? '') : sanitizarParaFontePadrao(txt));

            const corPreto = rgb(0.04, 0.07, 0.04);
            const corVerdeNeon = rgb(0.725, 1.0, 0.208);
            const corFundoClaro = rgb(0.96, 0.98, 0.95);
            const corDestaqueTotal = rgb(0.90, 0.97, 0.83);
            const corBranco = rgb(1, 1, 1);
            const corCinza = rgb(0.35, 0.4, 0.35);

            const W = 595.28;
            const H = 841.89;
            const M = 28;
            const UW = W - M * 2; // 539.28

            const criarTextoCampo = (page, nome, { x, y, w, h, valor = '', fontSize = 9.5, multiline = false, align = 'left', bg = corBranco }) => {
                const tf = form.createTextField(nome);
                if (multiline) tf.enableMultiline();
                tf.setText(fmt(valor));
                if (align === 'center') tf.setAlignment(window.PDFLib.TextAlignment.Center);
                tf.addToPage(page, {
                    x,
                    y,
                    width: w,
                    height: h,
                    borderWidth: 1,
                    borderColor: corPreto,
                    backgroundColor: bg,
                    textColor: corPreto,
                    font: fontRegular
                });
                tf.setFontSize(fontSize);
                return tf;
            };

            const criarCheckCampo = (page, nome, { x, y, size = 11, marcado = false }) => {
                const cb = form.createCheckBox(nome);
                if (marcado) cb.check();
                cb.addToPage(page, {
                    x,
                    y,
                    width: size,
                    height: size,
                    borderWidth: 1.2,
                    borderColor: corPreto,
                    backgroundColor: corBranco,
                    textColor: corPreto
                });
                return cb;
            };

            const desenharBloco = (page, { x, y, w, h, titulo, subtitulo = '' }) => {
                page.drawRectangle({
                    x,
                    y,
                    width: w,
                    height: h,
                    borderWidth: 1.5,
                    borderColor: corPreto,
                    color: corBranco
                });
                const headerH = 17;
                page.drawRectangle({
                    x,
                    y: y + h - headerH,
                    width: w,
                    height: headerH,
                    color: corPreto
                });
                page.drawText(fmt(titulo), {
                    x: x + 6,
                    y: y + h - 12.5,
                    size: 8.5,
                    font: fontBold,
                    color: corVerdeNeon
                });
                if (subtitulo) {
                    const subW = fontBold.widthOfTextAtSize(fmt(subtitulo), 7.5);
                    page.drawText(fmt(subtitulo), {
                        x: x + w - subW - 6,
                        y: y + h - 12,
                        size: 7.5,
                        font: fontBold,
                        color: corBranco
                    });
                }
            };

            const desenharLogoNaCaixa = (page, { x, y, w, h }) => {
                if (logoPdfEmbedded) {
                    const escala = Math.min(w / logoPdfEmbedded.width, h / logoPdfEmbedded.height);
                    const drawW = logoPdfEmbedded.width * escala;
                    const drawH = logoPdfEmbedded.height * escala;
                    const drawX = x + (w - drawW) / 2;
                    const drawY = y + (h - drawH) / 2;
                    page.drawImage(logoPdfEmbedded.image, {
                        x: drawX,
                        y: drawY,
                        width: drawW,
                        height: drawH
                    });
                } else {
                    page.drawText('BEN 10 BEYOND', {
                        x: x + 4,
                        y: y + h / 2,
                        size: 18,
                        font: fontBold,
                        color: corPreto
                    });
                }
            };

            /* =====================================================
               PÁGINA 1 — FICHA PRINCIPAL (LOGO + FOTO + IDENTIDADE)
            ===================================================== */
            const p1 = pdfDoc.addPage([W, H]);

            const cabY = H - 112; // 729.89
            const cabH = 84;
            const logoW = 222;
            const idP1X =  M + logoW + 8;
            const idP1W = UW - logoW - 8;

            // 1. Logo recortado em tamanho grande e proporcional
            desenharLogoNaCaixa(p1, { x: M, y: cabY, w: logoW, h: cabH });


            // 3. Quadro de Identidade Editável
            p1.drawRectangle({
                x: idP1X,
                y: cabY,
                width: idP1W,
                height: cabH,
                color: corFundoClaro,
                borderWidth: 1.5,
                borderColor: corPreto
            });

            const camposId = [
                { label: 'NOME DO HERÓI:', nome: 'nome_heroi', y: H - 51 },
                { label: 'NOME CIVIL:', nome: 'nome_civil', y: H - 78 },
                { label: 'ID. SECRETA:', nome: 'identidade_secreta', y: H - 105 }
            ];
            camposId.forEach(c => {
                p1.drawText(fmt(c.label), { x: idP1X + 6, y: c.y + 5, size: 7.6, font: fontBold, color: corPreto });
                criarTextoCampo(p1, c.nome, {
                    x: idP1X + 82,
                    y: c.y,
                    w: idP1W - 88,
                    h: 19,
                    valor: lerCampoTela(c.nome),
                    fontSize: 9
                });
            });

            // 4. Grade Principal em 3 Colunas (y = 434 .. 720)
            const gridTop = 720;
            const gridBottom = 434;
            const gridH = gridTop - gridBottom; // 286
            const col1X = M;
            const col1W = 182;
            const col2X = col1X + col1W + 8;
            const col2W = 183;
            const col3X = col2X + col2W + 8;
            const col3W = UW - col1W - col2W - 16;

            // --- COLUNA 1: ATRIBUTOS ---
            desenharBloco(p1, {
                x: col1X,
                y: gridBottom,
                w: col1W,
                h: gridH,
                titulo: 'ATRIBUTOS / MOD',
                subtitulo: '5 PAX = +3'
            });

            const subHeaderY = gridTop - 29;
            p1.drawText('ATRIBUTO', { x: col1X + 6, y: subHeaderY, size: 7, font: fontBold, color: corCinza });
            p1.drawText('BASE', { x: col1X + 75, y: subHeaderY, size: 7, font: fontBold, color: corCinza });
            p1.drawText('MOD', { x: col1X + 113, y: subHeaderY, size: 7, font: fontBold, color: corCinza });
            p1.drawText('TOTAL', { x: col1X + 148, y: subHeaderY, size: 7, font: fontBold, color: corCinza });

            ATRIBUTOS_BASE.forEach((attr, idx) => {
                const rowY = gridTop - 65 - idx * 41;
                p1.drawText(fmt(attr.label), {
                    x: col1X + 6,
                    y: rowY + 7,
                    size: 8.5,
                    font: fontBold,
                    color: corPreto
                });

                criarTextoCampo(p1, `attr_${attr.id}_base`, {
                    x: col1X + 72,
                    y: rowY,
                    w: 26,
                    h: 22,
                    valor: lerCampoTela(`attr_${attr.id}_base`),
                    align: 'center',
                    bg: corFundoClaro
                });

                p1.drawText('+', { x: col1X + 101, y: rowY + 7, size: 9, font: fontBold, color: corPreto });

                criarTextoCampo(p1, `attr_${attr.id}_mod`, {
                    x: col1X + 109,
                    y: rowY,
                    w: 26,
                    h: 22,
                    valor: lerCampoTela(`attr_${attr.id}_mod`),
                    align: 'center',
                    bg: corFundoClaro
                });

                p1.drawText('=', { x: col1X + 138, y: rowY + 7, size: 9, font: fontBold, color: corPreto });

                criarTextoCampo(p1, `attr_${attr.id}_total`, {
                    x: col1X + 146,
                    y: rowY,
                    w: 29,
                    h: 22,
                    valor: lerCampoTela(`attr_${attr.id}_total`),
                    align: 'center',
                    bg: corDestaqueTotal
                });
            });

            // --- COLUNA 2: TIER & PAX / DETERMINAÇÃO / CONDIÇÕES ---
            const paxBlocoY = 642;
            const paxBlocoH = 78;
            desenharBloco(p1, {
                x: col2X,
                y: paxBlocoY,
                w: col2W,
                h: paxBlocoH,
                titulo: 'ESCALA & EVOLUÇÃO',
                subtitulo: 'PAX'
            });

            p1.drawText('TIER:', { x: col2X + 7, y: paxBlocoY + 45, size: 8.5, font: fontBold, color: corPreto });
            const tierAtivo = String(fichaAtual.tier || 'D').toUpperCase();
            TIERS_ORDEM.forEach((letra, i) => {
                const cx = col2X + 54 + i * 21;
                const cy = paxBlocoY + 48;
                const ativo = letra === tierAtivo;
                p1.drawCircle({
                    x: cx,
                    y: cy,
                    size: 8.5,
                    color: ativo ? corPreto : corBranco,
                    borderWidth: 1.2,
                    borderColor: corPreto
                });
                p1.drawText(letra, {
                    x: cx - 3,
                    y: cy - 3,
                    size: 8,
                    font: fontBold,
                    color: ativo ? corVerdeNeon : corPreto
                });
            });

            p1.drawText('PAX TOTAL', { x: col2X + 18, y: paxBlocoY + 25, size: 7, font: fontBold, color: corCinza });
            criarTextoCampo(p1, 'pax_total', {
                x: col2X + 8,
                y: paxBlocoY + 5,
                w: 80,
                h: 18,
                valor: lerCampoTela('pax_total'),
                align: 'center',
                bg: corFundoClaro
            });

            p1.drawText(fmt('PAX DISPONÍVEIS'), { x: col2X + 100, y: paxBlocoY + 25, size: 7, font: fontBold, color: corCinza });
            criarTextoCampo(p1, 'pax_disponiveis', {
                x: col2X + 95,
                y: paxBlocoY + 5,
                w: 80,
                h: 18,
                valor: lerCampoTela('pax_disponiveis'),
                align: 'center',
                bg: corDestaqueTotal
            });

            const detBlocoY = 550;
            const detBlocoH = 84;
            desenharBloco(p1, {
                x: col2X,
                y: detBlocoY,
                w: col2W,
                h: detBlocoH,
                titulo: 'DETERMINAÇÃO'
            });

            const detCols = [
                { label: 'BASE', nome: 'det_base', bg: corFundoClaro },
                { label: 'MOD ESP', nome: 'det_mod', bg: corFundoClaro },
                { label: 'COMPR.', nome: 'det_comprado', bg: corFundoClaro },
                { label: 'TOTAL', nome: 'det_total', bg: corDestaqueTotal }
            ];
            detCols.forEach((dc, idx) => {
                const bx = col2X + 6 + idx * 43.5;
                p1.drawText(dc.label, { x: bx + 3, y: detBlocoY + 52, size: 6.5, font: fontBold, color: corCinza });
                criarTextoCampo(p1, dc.nome, {
                    x: bx,
                    y: detBlocoY + 31,
                    w: 40,
                    h: 19,
                    valor: lerCampoTela(dc.nome),
                    align: 'center',
                    bg: dc.bg
                });
            });

            p1.drawText(fmt('DETERMINAÇÃO ATUAL:'), { x: col2X + 8, y: detBlocoY + 11, size: 7.5, font: fontBold, color: corPreto });
            criarTextoCampo(p1, 'det_atual', {
                x: col2X + 115,
                y: detBlocoY + 5,
                w: 61,
                h: 19,
                valor: lerCampoTela('det_atual'),
                align: 'center',
                bg: corBranco
            });

            const condBlocoY = gridBottom;
            const condBlocoH = 108;
            desenharBloco(p1, {
                x: col2X,
                y: condBlocoY,
                w: col2W,
                h: condBlocoH,
                titulo: 'CONDIÇÕES'
            });

            CONDICOES_LISTA.forEach((cond, idx) => {
                const col = idx % 2;
                const row = Math.floor(idx / 2);
                const itemX = col2X + 6 + col * 87;
                const itemY = condBlocoY + 64 - row * 27.5;

                p1.drawRectangle({
                    x: itemX,
                    y: itemY,
                    width: 83,
                    height: 22,
                    borderWidth: 1,
                    borderColor: corPreto,
                    color: corFundoClaro
                });

                criarCheckCampo(p1, `cond_${cond.id}`, {
                    x: itemX + 4,
                    y: itemY + 5.5,
                    size: 11,
                    marcado: lerCheckTela(`cond_${cond.id}`)
                });

                p1.drawText(cond.label, {
                    x: itemX + 18,
                    y: itemY + 8,
                    size: 6.5,
                    font: fontBold,
                    color: corPreto
                });

                if (cond.pen) {
                    p1.drawRectangle({
                        x: itemX + 67,
                        y: itemY + 4,
                        width: 13,
                        height: 14,
                        color: corPreto
                    });
                    p1.drawText(cond.pen, {
                        x: itemX + 69,
                        y: itemY + 8,
                        size: 6.5,
                        font: fontBold,
                        color: corVerdeNeon
                    });
                }
            });

            // --- COLUNA 3: ATAQUE, DEFESA, LIMITAÇÃO, DANO TOTAL ---
            const atqY = 642;
            const atqH = 78;
            desenharBloco(p1, { x: col3X, y: atqY, w: col3W, h: atqH, titulo: 'BÔNUS DE ATAQUE' });

            const atqCols = [
                { label: 'BASE', nome: 'atq_base', bg: corFundoClaro },
                { label: 'PREC.', nome: 'atq_prec', bg: corFundoClaro },
                { label: 'MOD', nome: 'atq_mod', bg: corFundoClaro },
                { label: 'TOTAL', nome: 'atq_total', bg: corDestaqueTotal }
            ];
            atqCols.forEach((ac, idx) => {
                const bx = col3X + 5 + idx * 37.5;
                p1.drawText(ac.label, { x: bx + 3, y: atqY + 47, size: 6.3, font: fontBold, color: corCinza });
                criarTextoCampo(p1, ac.nome, {
                    x: bx,
                    y: atqY + 27,
                    w: 34,
                    h: 18,
                    valor: lerCampoTela(ac.nome),
                    align: 'center',
                    bg: ac.bg
                });
            });

            p1.drawText('DADO:', { x: col3X + 6, y: atqY + 8, size: 7.2, font: fontBold, color: corPreto });
            ['1d6', '1d8', '1d10'].forEach((dado, idx) => {
                const dx = col3X + 38 + idx * 40;
                criarCheckCampo(p1, `dado_${dado}`, {
                    x: dx,
                    y: atqY + 6,
                    size: 10,
                    marcado: lerCheckTela(`dado_${dado}`)
                });
                p1.drawText(dado, { x: dx + 13, y: atqY + 8, size: 7.2, font: fontBold, color: corPreto });
            });

            const defY = 562;
            const defH = 72;
            desenharBloco(p1, { x: col3X, y: defY, w: col3W, h: defH, titulo: 'DEFESA & REDUÇÃO' });

            const defCols = [
                { label: 'BASE', nome: 'def_base', bg: corFundoClaro },
                { label: 'RESIST', nome: 'def_resist', bg: corFundoClaro },
                { label: 'MOD', nome: 'def_mod', bg: corFundoClaro },
                { label: 'TOTAL', nome: 'def_total', bg: corDestaqueTotal }
            ];
            defCols.forEach((dc, idx) => {
                const bx = col3X + 5 + idx * 37.5;
                p1.drawText(dc.label, { x: bx + 2, y: defY + 42, size: 6.3, font: fontBold, color: corCinza });
                criarTextoCampo(p1, dc.nome, {
                    x: bx,
                    y: defY + 23,
                    w: 34,
                    h: 17,
                    valor: lerCampoTela(dc.nome),
                    align: 'center',
                    bg: dc.bg
                });
            });

            p1.drawText(fmt('REDUÇÃO DE DANO:'), { x: col3X + 6, y: defY + 7, size: 7.2, font: fontBold, color: corPreto });
            criarTextoCampo(p1, 'reducao_dano', {
                x: col3X + 106,
                y: defY + 3,
                w: 45,
                h: 16,
                valor: lerCampoTela('reducao_dano'),
                align: 'center',
                bg: corFundoClaro
            });

            const limY = 490;
            const limH = 64;
            desenharBloco(p1, { x: col3X, y: limY, w: col3W, h: limH, titulo: 'LIMITAÇÃO' });
            criarTextoCampo(p1, 'limitacao', {
                x: col3X + 4,
                y: limY + 4,
                w: col3W - 8,
                h: limH - 23,
                valor: lerCampoTela('limitacao'),
                fontSize: 7.8,
                multiline: true
            });

            const danoY = gridBottom;
            const danoH = 48;
            desenharBloco(p1, { x: col3X, y: danoY, w: col3W, h: danoH, titulo: 'DANO TOTAL' });
            p1.drawText(fmt('POTÊNCIA'), { x: col3X + 18, y: danoY + 21, size: 6.5, font: fontBold, color: corCinza });
            criarTextoCampo(p1, 'dano_potencia', {
                x: col3X + 6,
                y: danoY + 4,
                w: 70,
                h: 16,
                valor: lerCampoTela('dano_potencia'),
                align: 'center',
                bg: corFundoClaro
            });
            p1.drawText(fmt('ESPÍRITO'), { x: col3X + 96, y: danoY + 21, size: 6.5, font: fontBold, color: corCinza });
            criarTextoCampo(p1, 'dano_espirito', {
                x: col3X + 82,
                y: danoY + 4,
                w: 70,
                h: 16,
                valor: lerCampoTela('dano_espirito'),
                align: 'center',
                bg: corFundoClaro
            });

            // 5. Parte Inferior da Página 1 (y = 42 .. 426)
            const infTop = 426;
            const infBottom = 42;
            const halfW = (UW - 8) / 2;
            const rightColX = M + halfW + 8;

            desenharBloco(p1, { x: M, y: 382, w: halfW, h: 44, titulo: 'ORIGEM & LINHAGEM' });
            criarTextoCampo(p1, 'origem', {
                x: M + 4,
                y: 386,
                w: halfW - 8,
                h: 21,
                valor: lerCampoTela('origem'),
                fontSize: 9
            });

            desenharBloco(p1, { x: M, y: 332, w: halfW, h: 44, titulo: 'ARQUÉTIPO TÁTICO' });
            criarTextoCampo(p1, 'arquetipo', {
                x: M + 4,
                y: 336,
                w: halfW - 8,
                h: 21,
                valor: lerCampoTela('arquetipo'),
                fontSize: 9
            });

            const tracosBoxH = 326 - infBottom; // 284
            desenharBloco(p1, {
                x: M,
                y: infBottom,
                w: halfW,
                h: tracosBoxH,
                titulo: 'TRAÇOS',
                subtitulo: '4 / 6 / 12 PAX'
            });
            for (let i = 0; i < TOTAL_SLOTS_TRACOS; i++) {
                const slotH = 48;
                const sy = 326 - 22 - (i + 1) * (slotH + 3);
                criarTextoCampo(p1, `traco_${i}`, {
                    x: M + 5,
                    y: sy,
                    w: halfW - 10,
                    h: slotH,
                    valor: lerCampoTela(`traco_${i}`),
                    fontSize: 8,
                    multiline: true,
                    bg: i % 2 === 0 ? corBranco : corFundoClaro
                });
            }

            const conBoxH = infTop - infBottom; // 384
            desenharBloco(p1, {
                x: rightColX,
                y: infBottom,
                w: halfW,
                h: conBoxH,
                titulo: 'CONHECIMENTOS',
                subtitulo: '4 PAX CADA'
            });
            for (let i = 0; i < TOTAL_SLOTS_CONHECIMENTOS; i++) {
                const slotH = 47;
                const sy = infTop - 22 - (i + 1) * (slotH + 3);
                criarTextoCampo(p1, `conhecimento_${i}`, {
                    x: rightColX + 5,
                    y: sy,
                    w: halfW - 10,
                    h: slotH,
                    valor: lerCampoTela(`conhecimento_${i}`),
                    fontSize: 8,
                    multiline: true,
                    bg: i % 2 === 0 ? corBranco : corFundoClaro
                });
            }

            p1.drawText(fmt('BEN 10 BEYOND — PROTOCOLO DE REGISTRO DE HERÓI'), {
                x: M,
                y: 26,
                size: 7.5,
                font: fontBold,
                color: corCinza
            });
            p1.drawText(fmt('PÁGINA 01 / 02'), {
                x: W - M - 58,
                y: 26,
                size: 7.5,
                font: fontBold,
                color: corCinza
            });

            /* =====================================================
               PÁGINA 2 — CAPACIDADES HERÓICAS, ARSENAL & ALMA
            ===================================================== */
            const p2 = pdfDoc.addPage([W, H]);

            const logoP2W = 222;
            const idP2X = M + logoP2W + 8;
            const idP2W = UW - logoP2W - 8;

            desenharLogoNaCaixa(p2, { x: M, y: cabY, w: logoP2W, h: cabH });

            p2.drawRectangle({
                x: idP2X,
                y: cabY,
                width: idP2W,
                height: cabH,
                color: corFundoClaro,
                borderWidth: 1.5,
                borderColor: corPreto
            });

            const camposP2 = [
                { label: 'DESIGNAÇÃO:', nome: 'p2_designacao', y: H - 51 },
                { label: 'BORDÃO:', nome: 'p2_bordao', y: H - 78 },
                { label: 'PAX GASTOS:', nome: 'p2_pax_resumo', y: H - 105 }
            ];
            camposP2.forEach(c => {
                p2.drawText(fmt(c.label), { x: idP2X + 7, y: c.y + 5, size: 7.8, font: fontBold, color: corPreto });
                criarTextoCampo(p2, c.nome, {
                    x: idP2X + 82,
                    y: c.y,
                    w: idP2W - 89,
                    h: 19,
                    valor: lerCampoTela(c.nome),
                    fontSize: 9
                });
            });

            const capTop = 720;
            const capBottom = 198;
            desenharBloco(p2, {
                x: M,
                y: capBottom,
                w: UW,
                h: capTop - capBottom,
                titulo: 'CAPACIDADES HERÓICAS // TREINAMENTO MARCIAL // TECNOLOGIA & ARSENAL',
                subtitulo: 'USOS & PAX'
            });

            const thY = capTop - 31;
            p2.drawText('NOME DA CAPACIDADE / ITEM', { x: M + 6, y: thY, size: 7.2, font: fontBold, color: corCinza });
            p2.drawText('CATEGORIA', { x: M + 158, y: thY, size: 7.2, font: fontBold, color: corCinza });
            p2.drawText('USOS / PAX', { x: M + 245, y: thY, size: 7.2, font: fontBold, color: corCinza });
            p2.drawText('NOTA DE EFEITO', { x: M + 342, y: thY, size: 7.2, font: fontBold, color: corCinza });

            for (let i = 0; i < TOTAL_LINHAS_CAPACIDADES; i++) {
                const rowH = 37;
                const ry = capTop - 37 - (i + 1) * (rowH + 3);
                const bgLinha = i % 2 === 0 ? corBranco : corFundoClaro;

                criarTextoCampo(p2, `cap_nome_${i}`, {
                    x: M + 5,
                    y: ry,
                    w: 146,
                    h: rowH,
                    valor: lerCampoTela(`cap_nome_${i}`),
                    fontSize: 8.2,
                    multiline: true,
                    bg: bgLinha
                });

                criarTextoCampo(p2, `cap_cat_${i}`, {
                    x: M + 154,
                    y: ry,
                    w: 80,
                    h: rowH,
                    valor: lerCampoTela(`cap_cat_${i}`),
                    fontSize: 8,
                    align: 'center',
                    bg: bgLinha
                });

                for (let u = 1; u <= 3; u++) {
                    criarCheckCampo(p2, `cap_uso_${i}_${u}`, {
                        x: M + 239 + (u - 1) * 14,
                        y: ry + 21,
                        size: 11,
                        marcado: lerCheckTela(`cap_uso_${i}_${u}`)
                    });
                }

                criarTextoCampo(p2, `cap_pax_${i}`, {
                    x: M + 239,
                    y: ry + 2,
                    w: 44,
                    h: 16,
                    valor: lerCampoTela(`cap_pax_${i}`),
                    fontSize: 7.5,
                    align: 'center',
                    bg: corDestaqueTotal
                });

                criarTextoCampo(p2, `cap_nota_${i}`, {
                    x: M + 288,
                    y: ry,
                    w: UW - 293,
                    h: rowH,
                    valor: lerCampoTela(`cap_nota_${i}`),
                    fontSize: 7.8,
                    multiline: true,
                    bg: bgLinha
                });
            }

            const p2BotTop = 190;
            const p2BotBottom = 42;
            const p2BotH = p2BotTop - p2BotBottom;

            desenharBloco(p2, {
                x: M,
                y: p2BotBottom,
                w: halfW,
                h: p2BotH,
                titulo: 'ALMA DO PERSONAGEM (HISTÓRIA & MOTIVAÇÃO)'
            });
            criarTextoCampo(p2, 'alma', {
                x: M + 5,
                y: p2BotBottom + 5,
                w: halfW - 10,
                h: p2BotH - 25,
                valor: lerCampoTela('alma'),
                fontSize: 8.5,
                multiline: true
            });

            desenharBloco(p2, {
                x: rightColX,
                y: p2BotBottom,
                w: halfW,
                h: p2BotH,
                titulo: 'ANOTAÇÕES DE MISSÃO & TRANSFORMAÇÕES'
            });
            criarTextoCampo(p2, 'anotacoes', {
                x: rightColX + 5,
                y: p2BotBottom + 5,
                w: halfW - 10,
                h: p2BotH - 25,
                valor: lerCampoTela('anotacoes'),
                fontSize: 8.5,
                multiline: true
            });

            p2.drawText(fmt('BEN 10 BEYOND — ARQUIVO TÁTICO DOS ENCANADORES'), {
                x: M,
                y: 26,
                size: 7.5,
                font: fontBold,
                color: corCinza
            });
            p2.drawText(fmt('PÁGINA 02 / 02'), {
                x: W - M - 58,
                y: 26,
                size: 7.5,
                font: fontBold,
                color: corCinza
            });

            form.updateFieldAppearances(fontRegular);
            const pdfBytes = await pdfDoc.save();

            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const slug = (lerCampoTela('nome_heroi') || fichaAtual.codinome || 'Personagem')
                .replace(/[^a-zA-Z0-9À-ÿ_-]+/g, '_');

            link.href = url;
            link.download = `Ficha_Ben10Beyond_${slug}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            setTimeout(() => URL.revokeObjectURL(url), 4000);
        } catch (erro) {
            console.error('Erro ao gerar o PDF editável:', erro);
            alert('Ocorreu um erro ao gerar o PDF editável. Verifique o console do navegador.');
        } finally {
            if (btnExportar) {
                btnExportar.disabled = false;
                btnExportar.textContent = textoOriginalBtn;
            }
        }
    }

    function excluirFichaSelecionada() {
        if (!fichaSelecionadaId) return;
        const atualizadas = obterFichas().filter(f => f.id !== fichaSelecionadaId);
        salvarListaFichas(atualizadas);
        fichaSelecionadaId = null;
        renderizarListaSessao();
    }

    function criarFichaExemplo() {
        const exemplo = {
            id: `ficha_demo_${Date.now()}`,
            criadaEm: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            tier: 'D',
            paxTotal: 40,
            paxGasto: 22,
            paxRestante: 18,
            codinome: 'Chama Estelar',
            identidadeCivil: 'Lucas Andrade — Bellwood',
            fraseEfeito: 'Quando o calor aperta, é hora de brilhar!',
            alma: 'Jovem recruta dos Encanadores determinado a proteger sua cidade contra ameaças intergalácticas enquanto aprende a controlar seus poderes.',
            limitacao: {
                tipo: 'vulnerabilidade',
                nome: 'Exposição a Extremos Criogênicos',
                descricao: 'Recebe a condição Vulnerável ao entrar em contato direto com agentes extintores ou gelo intenso.'
            },
            origem: {
                planetaId: 'pyros',
                planetaNome: 'Pyros',
                especieNome: 'Pyronita (Pyronite)',
                arquetipo: 'O Combatente',
                caminhoEvolutivo: 'Linha Evolutiva 01'
            },
            conhecimentos: [
                { id: 'acrobacias', nome: 'Acrobacias', custo: 4 },
                { id: 'estrategia', nome: 'Estratégia', custo: 4 }
            ],
            tracos: [
                { id: 'casca-grossa', nome: 'Casca Grossa', custo: 4 },
                { id: 'frase-de-efeito', nome: 'Frase de Efeito', custo: 4 },
                { id: 'afiliacao', nome: 'Afiliação', custo: 4 }
            ],
            equipamentos: [
                { id: 'gancho-escalada', nome: 'Gancho de Escalada (3 usos)', custo: 1, tipo: 'Dispositivo' },
                { id: 'spray-curativo', nome: 'Spray Curativo (3 usos)', custo: 1, tipo: 'Dispositivo' }
            ]
        };

        const lista = obterFichas();
        lista.push(exemplo);
        salvarListaFichas(lista);
        fichaSelecionadaId = exemplo.id;
        renderizarListaSessao();
    }


    /* =========================================================
       EFEITO DE CIRCUITOS TECNOLÓGICOS NO FUNDO (#canvas-tech)
       (MESMO PADRÃO DE TRILHAS 45° E EMBLEMAS DO SCRIPT_2.JS)
    ========================================================= */
    function iniciarFundoCircuitos() {
        let canvasTech = document.getElementById('canvas-tech');

        if (!canvasTech) {
            canvasTech = document.createElement('canvas');
            canvasTech.id = 'canvas-tech';
            document.body.prepend(canvasTech);
        }

        if (canvasTech.dataset.circuitosAtivos === 'true') return;
        canvasTech.dataset.circuitosAtivos = 'true';

        Object.assign(canvasTech.style, {
            position: 'fixed',
            inset: '0',
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: '0'
        });

        const ctx = canvasTech.getContext('2d');
        const cabecalhoFichas = document.querySelector('.fichas-topo h1') || document.querySelector('.fichas-topo');
        let largura = 0;
        let altura = 0;
        let tempo = 0;
        let cardHover = null;

        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card-ficha-salva, .fichas-vazio');
            if (card) cardHover = card;
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.card-ficha-salva, .fichas-vazio');
            if (card && cardHover === card) cardHover = null;
        });

        function redimensionarTech() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            largura = window.innerWidth;
            altura = window.innerHeight;
            canvasTech.width = Math.floor(largura * dpr);
            canvasTech.height = Math.floor(altura * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        /* Desenha uma trilha de circuito com glow e pulso animado */
        function desenharTrilha(pontos, intensidade = 0.5, fase = 0, espessuraBase = 3.5) {
            if (pontos.length < 2) return;

            ctx.save();
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            /* Traço principal brilhante */
            ctx.beginPath();
            ctx.moveTo(pontos[0][0], pontos[0][1]);
            for (let i = 1; i < pontos.length; i++) {
                ctx.lineTo(pontos[i][0], pontos[i][1]);
            }

            const alpha = Math.min(1, 0.28 + intensidade * 0.72);
            ctx.strokeStyle = `rgba(148, 255, 38, ${alpha})`;
            ctx.lineWidth = espessuraBase + intensidade * 2.2;
            ctx.shadowColor = '#8eff29';
            ctx.shadowBlur = 10 + intensidade * 22;
            ctx.stroke();

            /* Núcleo interno mais claro nas trilhas ativas */
            if (intensidade > 0.35) {
                ctx.beginPath();
                ctx.moveTo(pontos[0][0], pontos[0][1]);
                for (let i = 1; i < pontos.length; i++) {
                    ctx.lineTo(pontos[i][0], pontos[i][1]);
                }
                ctx.strokeStyle = `rgba(225, 255, 175, ${intensidade * 0.75})`;
                ctx.lineWidth = Math.max(1.2, (espessuraBase + intensidade) * 0.35);
                ctx.stroke();
            }

            /* Pulso de energia percorrendo os segmentos */
            let comprimentoTotal = 0;
            const segmentos = [];
            for (let i = 0; i < pontos.length - 1; i++) {
                const dx = pontos[i + 1][0] - pontos[i][0];
                const dy = pontos[i + 1][1] - pontos[i][1];
                const len = Math.hypot(dx, dy);
                segmentos.push({ x1: pontos[i][0], y1: pontos[i][1], dx, dy, len });
                comprimentoTotal += len;
            }

            if (comprimentoTotal > 0) {
                const velocidade = 0.004 + intensidade * 0.007;
                let distAlvo = ((tempo * velocidade + fase) % 1) * comprimentoTotal;

                for (const seg of segmentos) {
                    if (distAlvo <= seg.len) {
                        const t = distAlvo / seg.len;
                        const px = seg.x1 + seg.dx * t;
                        const py = seg.y1 + seg.dy * t;

                        ctx.beginPath();
                        ctx.arc(px, py, 3.2 + intensidade * 2.5, 0, Math.PI * 2);
                        ctx.fillStyle = '#e8ffbe';
                        ctx.shadowColor = '#b9ff35';
                        ctx.shadowBlur = 18;
                        ctx.fill();
                        break;
                    }
                    distAlvo -= seg.len;
                }
            }

            ctx.restore();
        }

        /* Desenha terminais circulares (cheios ou anéis vazados) */
        function desenharNo(x, y, raio = 6, vazado = false, intensidade = 0.6, espessura = 2.6) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, raio, 0, Math.PI * 2);
            ctx.shadowColor = '#8eff29';
            ctx.shadowBlur = 14 + intensidade * 18;

            if (vazado) {
                ctx.fillStyle = '#030603';
                ctx.fill();
                ctx.lineWidth = espessura;
                ctx.strokeStyle = `rgba(175, 255, 65, ${Math.min(1, 0.55 + intensidade * 0.45)})`;
                ctx.stroke();
            } else {
                ctx.fillStyle = `rgba(175, 255, 65, ${Math.min(1, 0.6 + intensidade * 0.4)})`;
                ctx.fill();
            }
            ctx.restore();
        }

        function desenharMalhaBase(intensidadeGlobal) {
            const cx = largura / 2;

            /* 1. EMBLEMA ULTRA-T SUPERIOR */
            const topoRef = cabecalhoFichas ? cabecalhoFichas.getBoundingClientRect().top - 48 : 90;
            const topoY = Math.max(88, topoRef);
            const raioAnel = 17;
            const subirCirculo = 16;
            const circuloY = topoY - subirCirculo;

            /* Haste central superior e inferior saindo do anel */
            desenharTrilha([[cx, 0], [cx, circuloY - raioAnel]], 0.9, 0.1, 5.5);
            desenharTrilha([[cx, circuloY + raioAnel], [cx, topoY + raioAnel + 24]], 0.9, 0.25, 5.5);
            desenharNo(cx, circuloY, raioAnel, true, 0.95, 5.2);

            /* Par interno: desce e dobra para dentro em 45° rumo à haste */
            desenharTrilha([[cx - 34, 0], [cx - 34, topoY + 12], [cx - 14, topoY + 32]], 0.78, 0.35, 3.6);
            desenharTrilha([[cx + 34, 0], [cx + 34, topoY + 12], [cx + 14, topoY + 32]], 0.78, 0.35, 3.6);
            desenharNo(cx - 34, topoY - 6, 4.5, false, 0.85);
            desenharNo(cx + 34, topoY - 6, 4.5, false, 0.85);

            /* Par externo: desce e abre em 45° para fora */
            desenharTrilha([[cx - 72, 0], [cx - 72, topoY + 8], [cx - 104, topoY + 40]], 0.65, 0.55, 3.6);
            desenharTrilha([[cx + 72, 0], [cx + 72, topoY + 8], [cx + 104, topoY + 40]], 0.65, 0.55, 3.6);
            desenharNo(cx - 72, topoY + 8, 5, false, 0.8);
            desenharNo(cx + 72, topoY + 8, 5, false, 0.8);

            /* 2. EMBLEMA ULTRA-T INFERIOR (espelhado na base) */
            const baseY = altura - 66;
            const raioBase = 17;

            desenharTrilha([[cx, altura], [cx, baseY + raioBase]], intensidadeGlobal, 0.4, 5.5);
            desenharTrilha([[cx, baseY - raioBase], [cx, baseY - raioBase - 24]], intensidadeGlobal, 0.55, 5.5);
            desenharNo(cx, baseY, raioBase, true, Math.max(0.85, intensidadeGlobal), 5.2);

            desenharTrilha([[cx - 34, altura], [cx - 34, baseY - 12], [cx - 14, baseY - 32]], intensidadeGlobal * 0.9, 0.6, 3.6);
            desenharTrilha([[cx + 34, altura], [cx + 34, baseY - 12], [cx + 14, baseY - 32]], intensidadeGlobal * 0.9, 0.6, 3.6);
            desenharNo(cx - 34, baseY - 12, 4.5, false, intensidadeGlobal);
            desenharNo(cx + 34, baseY - 12, 4.5, false, intensidadeGlobal);

            desenharTrilha([[cx - 72, altura], [cx - 72, baseY - 8], [cx - 106, baseY - 42]], intensidadeGlobal * 0.8, 0.75, 3.6);
            desenharTrilha([[cx + 72, altura], [cx + 72, baseY - 8], [cx + 106, baseY - 42]], intensidadeGlobal * 0.8, 0.75, 3.6);
            desenharNo(cx - 72, baseY - 8, 5, false, intensidadeGlobal);
            desenharNo(cx + 72, baseY - 8, 5, false, intensidadeGlobal);

            desenharTrilha([[cx - 138, altura], [cx - 112, altura - 26], [cx - 112, baseY - 16], [cx - 146, baseY - 50]], intensidadeGlobal * 0.75, 0.85, 3.8);
            desenharTrilha([[cx + 138, altura], [cx + 112, altura - 26], [cx + 112, baseY - 16], [cx + 146, baseY - 50]], intensidadeGlobal * 0.75, 0.85, 3.8);
            desenharNo(cx - 112, baseY - 16, 5.5, false, intensidadeGlobal);
            desenharNo(cx + 112, baseY - 16, 5.5, false, intensidadeGlobal);

            /* 3. Trilhas diagonais grossas nas laterais esquerda e direita */
            const mX = largura * 0.12;
            const mY = altura * 0.16;

            /* Lateral Esquerda */
            desenharTrilha([[0, mY], [mX, mY], [mX + 65, mY + 65], [mX + 65, altura * 0.44]], intensidadeGlobal, 0.15, 4.5);
            desenharNo(mX + 65, altura * 0.44, 6, false, intensidadeGlobal);

            desenharTrilha([[0, altura * 0.32], [mX * 0.6, altura * 0.32], [mX * 0.6 + 45, altura * 0.32 + 45]], intensidadeGlobal * 0.65, 0.45, 3);
            desenharNo(mX * 0.6 + 45, altura * 0.32 + 45, 5, true, intensidadeGlobal);

            desenharTrilha([[0, altura * 0.74], [mX * 0.85, altura * 0.74], [mX * 0.85 + 55, altura * 0.74 - 55], [mX * 0.85 + 55, altura * 0.56]], intensidadeGlobal, 0.65, 4.2);
            desenharNo(mX * 0.85 + 55, altura * 0.56, 6, false, intensidadeGlobal);

            desenharTrilha([[0, altura * 0.88], [mX * 1.1, altura * 0.88], [mX * 1.1 + 40, altura]], intensidadeGlobal * 0.75, 0.85, 3.8);

            /* Lateral Direita (espelhada) */
            desenharTrilha([[largura, mY], [largura - mX, mY], [largura - mX - 65, mY + 65], [largura - mX - 65, altura * 0.44]], intensidadeGlobal, 0.25, 4.5);
            desenharNo(largura - mX - 65, altura * 0.44, 6, false, intensidadeGlobal);

            desenharTrilha([[largura, altura * 0.32], [largura - mX * 0.6, altura * 0.32], [largura - mX * 0.6 - 45, altura * 0.32 + 45]], intensidadeGlobal * 0.65, 0.55, 3);
            desenharNo(largura - mX * 0.6 - 45, altura * 0.32 + 45, 5, true, intensidadeGlobal);

            desenharTrilha([[largura, altura * 0.74], [largura - mX * 0.85, altura * 0.74], [largura - mX * 0.85 - 55, altura * 0.74 - 55], [largura - mX * 0.85 - 55, altura * 0.56]], intensidadeGlobal, 0.75, 4.2);
            desenharNo(largura - mX * 0.85 - 55, altura * 0.56, 6, false, intensidadeGlobal);

            desenharTrilha([[largura, altura * 0.88], [largura - mX * 1.1, altura * 0.88], [largura - mX * 1.1 - 40, altura]], intensidadeGlobal * 0.75, 0.95, 3.8);
        }

        function renderizarTech() {
            tempo++;
            ctx.clearRect(0, 0, largura, altura);

            /* Micro-pontos de matriz tecnológica */
            ctx.fillStyle = cardHover
                ? 'rgba(185, 255, 53, 0.16)'
                : 'rgba(185, 255, 53, 0.10)';

            const espaco = 42;
            for (let x = espaco; x < largura; x += espaco) {
                for (let y = espaco; y < altura; y += espaco) {
                    ctx.fillRect(x, y, 2, 2);
                }
            }

            const intensidadeBase = cardHover ? 0.62 : 0.48;
            desenharMalhaBase(intensidadeBase);

            /* Trilhas de energia conectadas aos cards da sessão (ou ao painel vazio) */
            const alvos = document.querySelectorAll('.card-ficha-salva, .fichas-vazio:not(.oculto)');
            alvos.forEach((el, idx) => {
                const rect = el.getBoundingClientRect();
                if (rect.width === 0 || rect.bottom < 0 || rect.top > altura) return;

                const alvoX = rect.left + rect.width / 2;
                const topoCard = rect.top;
                const baseCard = rect.bottom;

                const isHover = cardHover === el;
                const forca = isHover ? 1.0 : 0.35;
                const lado = alvoX < largura / 2 ? -1 : 1;
                const desloc = lado * 75;

                const rotaTopo = [
                    [alvoX + desloc, 0],
                    [alvoX + desloc, topoCard - 54],
                    [alvoX, topoCard - 18],
                    [alvoX, topoCard]
                ];
                desenharTrilha(rotaTopo, forca, idx * 0.2, 3.6);
                desenharNo(alvoX + desloc, topoCard - 54, isHover ? 6 : 4.5, false, forca);

                const rotaBase = [
                    [alvoX, baseCard],
                    [alvoX, baseCard + 20],
                    [alvoX + desloc, baseCard + 56],
                    [alvoX + desloc, altura]
                ];
                desenharTrilha(rotaBase, forca, idx * 0.2 + 0.5, 3.6);
                desenharNo(alvoX + desloc, baseCard + 56, isHover ? 6 : 4.5, true, forca);
            });

            requestAnimationFrame(renderizarTech);
        }

        redimensionarTech();
        window.addEventListener('resize', redimensionarTech);
        renderizarTech();
    }


    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('btn-exportar-pdf')?.addEventListener('click', gerarEBaixarPdfEditavel);
        document.getElementById('btn-excluir-ficha')?.addEventListener('click', excluirFichaSelecionada);
        document.getElementById('btn-gerar-demo')?.addEventListener('click', criarFichaExemplo);
        document.getElementById('btn-gerar-demo-vazio')?.addEventListener('click', criarFichaExemplo);

        iniciarFundoCircuitos();
        renderizarListaSessao();
    });
})();