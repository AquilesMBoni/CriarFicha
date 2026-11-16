/* =========================================================
   BEN 10 BEYOND — ETAPA 02: GALÁXIA (ONDA DE DENSIDADE 3D) E ORIGEM
   Arquivo complementar: carregue depois de script.js
========================================================= */

(() => {
    'use strict';

    const $ = (seletor, raiz = document) => raiz.querySelector(seletor);

    const dadosPlanetas = [
        {
            id: 'terra',
            planeta: 'Terra (Earth)',
            especie: 'Humano (Human)',
            especieCurta: 'HUMANO',
            codigo: 'SISTEMA SOLAR',
            setor: 'SISTEMA SOLAR // SETOR LOCAL',
            cor: '#63c8ff',
            classeEsfera: 'terra',
            simbolo: '◎',
            x: 0.19,
            y: 0.60,
            descricaoEspecie: 'Os humanos são uma espécie inteligente nativa da Terra, caracterizada por grande diversidade física, cultural e comportamental. Apesar de não possuírem habilidades sobrenaturais naturais em geral, demonstram capacidade de adaptação, criatividade e desenvolvimento tecnológico.',
            descricaoPlaneta: 'A Terra é um planeta rochoso localizado no Sistema Solar, com grande diversidade de ambientes naturais, incluindo oceanos, florestas, desertos, montanhas e regiões polares. É o mundo natal da humanidade e abriga diversas formas de vida.',
            imagemPlaneta: 'img/planetas/terra.png',
            modelo3D: 'modelos_3d/Terra.glb',
            imagemEspecie: 'img/racas/Humano.png'
        },
        {
            id: 'kylmyys',
            planeta: 'Kylmyys',
            especie: 'Necrofrigiano (Necrofriggian)',
            especieCurta: 'NECROFRIGIANO',
            codigo: 'SISTEMA KYLMYYS',
            setor: 'SETOR KYLMYYS // REGIÃO GLACIAL',
            cor: '#8be8ff',
            classeEsfera: 'kylmyys',
            simbolo: '❄',
            x: 0.39,
            y: 0.29,
            descricaoEspecie: 'Os Necrofrigianos são seres humanoides de aparência semelhante a mariposas, com quatro asas e características fantasmagóricas. Possuem capacidade de voar, atravessar matéria sólida e produzir temperaturas extremamente baixas. Também conseguem sobreviver em ambientes espaciais muito frios.',
            descricaoPlaneta: 'Kylmyys é associado aos Necrofrigianos e apresenta condições extremamente frias, compatíveis com as características biológicas da espécie.',
            imagemPlaneta: 'img/planetas/kylmyys.png',
            modelo3D: 'modelos_3d/Kylmyys.glb',
            imagemEspecie: 'img/racas/Necrofigiano.png'
        },
        {
            id: 'khoros',
            planeta: 'Khoros',
            especie: 'Tetramando (Tetramand)',
            especieCurta: 'TETRAMANDO',
            codigo: 'SISTEMA KHOROS',
            setor: 'SETOR KHOROS // ZONA DE ALTO RISCO',
            cor: '#ff9b64',
            classeEsfera: 'khoros',
            simbolo: '✦',
            x: 0.57,
            y: 0.68,
            descricaoEspecie: 'Os Tetramandos são seres humanoides de grande porte, conhecidos por sua estrutura muscular e por possuírem quatro braços. São extremamente fortes e resistentes, apresentando grande capacidade física para combate e atividades que exigem força.',
            descricaoPlaneta: 'Khoros é o planeta natal dos Tetramandos. É conhecido por abrigar ambientes hostis e criaturas selvagens, sendo associado a uma cultura que valoriza força e capacidade de combate.',
            imagemPlaneta: 'img/planetas/khoros.png',
            modelo3D: 'modelos_3d/Korros.glb',
            imagemEspecie: 'img/racas/Tetramando.png'
        },
        {
            id: 'pyros',
            planeta: 'Pyros',
            especie: 'Pyronita (Pyronite)',
            especieCurta: 'PYRONITA',
            codigo: 'SISTEMA PYROS',
            setor: 'SETOR PYROS // REGIÃO VULCÂNICA',
            cor: '#ff9a35',
            classeEsfera: 'pyros',
            simbolo: '✹',
            x: 0.79,
            y: 0.38,
            descricaoEspecie: 'Os Pyronitas são seres de natureza ígnea, constituídos por rochas vulcânicas e envoltos em chamas. São capazes de gerar, controlar e projetar fogo, além de absorver e manipular calor. Seu organismo é adaptado a temperaturas extremamente elevadas.',
            descricaoPlaneta: 'Pyros é o mundo natal dos Pyronitas. É um ambiente de natureza extremamente quente, associado a atividades vulcânicas e condições de temperatura elevadíssimas.',
            imagemPlaneta: 'img/planetas/pyros.png',
            modelo3D: 'modelos_3d/Pyros.glb',
            imagemEspecie: 'img/racas/Pyronita.png'
        },
        {
            id: 'cocoricoide',
            planeta: 'Não definido',
            especie: 'Cocoricóide',
            especieCurta: 'COCORICÓIDE',
            codigo: 'SISTEMA NÃO CATALOGADO',
            setor: 'SETOR NÃO CATALOGADO // DADOS INCOMPLETOS',
            cor: '#c2d66b',
            classeEsfera: 'indefinido',
            simbolo: '?',
            x: 0.85,
            y: 0.72,
            descricaoEspecie: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            descricaoPlaneta: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            imagemPlaneta: null,
            modelo3D: null,
            imagemEspecie: null
        },
        {
            id: 'classificado',
            planeta: 'CLASSIFICADO',
            especie: 'CLASSIFICADO',
            especieCurta: 'ACESSO RESTRITO',
            codigo: 'SISTEMA CLASSIFICADO',
            setor: 'SETOR RESTRITO // NÍVEL DE ACESSO INSUFICIENTE',
            cor: '#e879f9',
            classeEsfera: 'classificado',
            simbolo: '×',
            x: 0.51,
            y: 0.14,
            secreto: true,
            descricaoEspecie: 'ACESSO RESTRITO. Os dados desta espécie ainda não estão disponíveis.',
            descricaoPlaneta: 'LOCALIZAÇÃO DESCONHECIDA. Informações classificadas.',
            imagemPlaneta: null,
            modelo3D: null,
            imagemEspecie: null
        }
    ];

    const descricoesArquetipos = {
        'O Combatente': 'Lidere a linha de frente. O Combatente encara o perigo diretamente, abre caminho no calor da batalha e protege seus aliados quando a crise aperta.',
        'O Tecnocérebro': 'Invada e domine tecnologia alienígena. O Tecnocérebro analisa dispositivos desconhecidos, contorna sistemas de segurança e transforma equipamentos complexos em vantagem tática.',
        'O Investigador': 'Resolva casos complexos. O Investigador conecta pistas ocultas, decifra mistérios e descobre o que realmente está por trás de cada ocorrência antes que seja tarde.',
        'O Fora da Lei': 'Opere a partir das sombras. O Fora da Lei age com furtividade, astúcia e mobilidade, infiltrando-se sem ser detectado e atacando de ângulos inesperados.',
        'O Prodígio': 'Improvise sob pressão. O Prodígio adapta-se a qualquer imprevisto no último segundo, encontrando soluções criativas quando os planos originais falham.'
    };

    const caminhosEvolutivos = [
        {
            id: 'caminho-01',
            tag: 'LINHA EVOLUTIVA 01',
            titulo: 'Lorem Ipsum I',
            resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            nos: [
                { titulo: 'Lorem Ipsum 01', estagio: 'ESTÁGIO 01', texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', bonus: 'BENEFÍCIO: LOREM IPSUM DOLOR SIT AMET.' },
                { titulo: 'Lorem Ipsum 02', estagio: 'ESTÁGIO 02', texto: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', bonus: 'BENEFÍCIO: LOREM IPSUM CONSECTETUR.' },
                { titulo: 'Lorem Ipsum 03', estagio: 'ESTÁGIO 03', texto: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', bonus: 'BENEFÍCIO: LOREM IPSUM ADIPISCING.' },
                { titulo: 'Lorem Ipsum 04', estagio: 'ESTÁGIO 04', texto: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', bonus: 'BENEFÍCIO: LOREM IPSUM FINAL.' }
            ]
        },
        {
            id: 'caminho-02',
            tag: 'LINHA EVOLUTIVA 02',
            titulo: 'Lorem Ipsum II',
            resumo: 'Sed do eiusmod tempor incididunt ut labore et dolore.',
            nos: [
                { titulo: 'Lorem Ipsum 05', estagio: 'ESTÁGIO 01', texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', bonus: 'BENEFÍCIO: LOREM IPSUM DOLOR SIT AMET.' },
                { titulo: 'Lorem Ipsum 06', estagio: 'ESTÁGIO 02', texto: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', bonus: 'BENEFÍCIO: LOREM IPSUM CONSECTETUR.' },
                { titulo: 'Lorem Ipsum 07', estagio: 'ESTÁGIO 03', texto: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', bonus: 'BENEFÍCIO: LOREM IPSUM ADIPISCING.' },
                { titulo: 'Lorem Ipsum 08', estagio: 'ESTÁGIO 04', texto: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', bonus: 'BENEFÍCIO: LOREM IPSUM FINAL.' }
            ]
        },
        {
            id: 'caminho-03',
            tag: 'LINHA EVOLUTIVA 03',
            titulo: 'Lorem Ipsum III',
            resumo: 'Ut enim ad minim veniam, quis nostrud exercitation.',
            nos: [
                { titulo: 'Lorem Ipsum 09', estagio: 'ESTÁGIO 01', texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', bonus: 'BENEFÍCIO: LOREM IPSUM DOLOR SIT AMET.' },
                { titulo: 'Lorem Ipsum 10', estagio: 'ESTÁGIO 02', texto: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', bonus: 'BENEFÍCIO: LOREM IPSUM CONSECTETUR.' },
                { titulo: 'Lorem Ipsum 11', estagio: 'ESTÁGIO 03', texto: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', bonus: 'BENEFÍCIO: LOREM IPSUM ADIPISCING.' },
                { titulo: 'Lorem Ipsum 12', estagio: 'ESTÁGIO 04', texto: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', bonus: 'BENEFÍCIO: LOREM IPSUM FINAL.' }
            ]
        }
    ];

    const descricoesEspecie = {
        terra: 'FORMA BASE // HUMANO',
        kylmyys: 'FORMA BASE // NECROFRIGIANO',
        khoros: 'FORMA BASE // TETRAMANDO',
        pyros: 'FORMA BASE // PYRONITA',
        cocoricoide: 'REGISTRO PROVISÓRIO // ESPÉCIE SEM CLASSIFICAÇÃO OFICIAL',
        classificado: 'ACESSO RESTRITO // IDENTIDADE BLOQUEADA'
    };

    const iconesEspecie = {
        terra: '◎',
        kylmyys: '❄',
        khoros: '✦',
        pyros: '✹',
        cocoricoide: '?',
        classificado: '×'
    };

    function escaparHTML(valor) {
        return String(valor ?? '').replace(/[&<>"']/g, caractere => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[caractere]);
    }

    function obterFicha() {
        if (window.fichaBen10 && typeof window.fichaBen10 === 'object') {
            return window.fichaBen10;
        }

        try {
            const salva = JSON.parse(localStorage.getItem('fichaBen10'));
            if (salva && typeof salva === 'object') {
                window.fichaBen10 = salva;
                return salva;
            }
        } catch (erro) {
            console.warn('Não foi possível recuperar a ficha salva:', erro);
        }

        window.fichaBen10 = {
            tier: null,
            origem: null,
            arquetipo: null,
            atributos: {},
            conhecimentos: [],
            detalhes: {}
        };

        return window.fichaBen10;
    }

    function iniciarModuloOrigem() {
        const origemAba = $('.aba-conteudo[data-conteudo="origem"]');
        const galaxiaTela = $('#galaxia-tela');
        const canvas = $('#canvas-galaxia');
        const camadaPlanetas = $('#galaxia-planetas-layer');
        const planetaTela = $('#planeta-tela');
        const coordenadas = $('#galaxia-coord');

        if (!origemAba || !galaxiaTela || !canvas || !camadaPlanetas || !planetaTela) {
            return;
        }

        const contexto = canvas.getContext('2d');
        if (!contexto) {
            console.warn('O navegador não conseguiu inicializar o canvas da galáxia.');
            return;
        }

        const elementos = {
            nomePlaneta: $('#planeta-nome'),
            descricaoPlaneta: $('#planeta-descricao'),
            nomeEspecie: $('#especie-nome'),
            etiquetaEspecie: $('#especie-ben-nome'),
            descricaoEspecie: $('#especie-descricao'),
            palcoPlaneta: $('#planeta-3d-palco'),
            cartaoEspecie: $('#especie-imagem-card'),
            conteudoEspecie: $('#especie-imagem-conteudo'),
            seletorArquetipo: $('#select-arquetipo'),
            textoArquetipo: $('#raca-info-texto'),
            listaAtributos: $('#atributos-lista'),
            limiteAtributos: $('#atributos-limite-tag'),
            bannersEvolucao: $('#evolutivo-banners'),
            arvoreEvolucao: $('#evolutivo-arvore'),
            tagDetalheEvolucao: $('#evo-detalhe-tag'),
            tituloDetalheEvolucao: $('#evo-detalhe-titulo'),
            textoDetalheEvolucao: $('#evo-detalhe-texto'),
            bonusDetalheEvolucao: $('#evo-detalhe-bonus'),
            botaoConfirmar: $('#btn-confirmar-origem'),
            feedback: $('#origem-feedback'),
            botaoVoltar: $('#botao-voltar-galaxia'),
            botaoReset: $('#galaxia-btn-reset'),
            botaoZoomIn: $('#galaxia-btn-zoom-in'),
            botaoZoomOut: $('#galaxia-btn-zoom-out'),
            modal: $('#especie-modal-fullscreen'),
            modalFechar: $('#especie-modal-fechar'),
            modalPalco: $('#especie-modal-palco'),
            modalLegenda: $('#especie-modal-legenda')
        };

        const INCLINACAO_INICIAL = 0.88; // ~50° de inclinação 3D do disco galáctico

        const estado = {
            planetaSelecionado: null,
            caminhoAtivo: 0,
            noAtivo: 0,
            zoom: 1,
            inclinacaoX: INCLINACAO_INICIAL,
            deslocamentoX: 0,
            deslocamentoY: 0,
            arrastando: false,
            inclinando: false,
            ponteiroId: null,
            ultimoX: 0,
            ultimoY: 0,
            distanciaArrasto: 0,
            largura: 0,
            altura: 0,
            bufW: 0,
            bufH: 0,
            bufR: null,
            bufG: null,
            bufB: null,
            imgData: null,
            estrelasFundo: [],
            estrelasGalaxia: null,
            animacaoId: null,
            mapaVisivel: false,
            ultimoTempo: 0
        };

        const movimentoReduzido = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

        /* Offscreen canvases para tone mapping (Float32Array) e bloom */
        const offCanvas = document.createElement('canvas');
        const offCtx = offCanvas.getContext('2d');
        const bloomCanvas = document.createElement('canvas');
        const bloomCtx = bloomCanvas.getContext('2d');

        /* -----------------------------------------------------
           PROJEÇÃO 3D DO DISCO GALÁCTICO (ESTRELAS + PLANETAS)
        ----------------------------------------------------- */
        function projetarPontoGalaxia(gx, gy, gz = 0) {
            const cosT = Math.cos(estado.inclinacaoX);
            const sinT = Math.sin(estado.inclinacaoX);
            const y3d = gy * cosT - gz * sinT;
            const z3d = gy * sinT + gz * cosT;
            const perspectiva = 2.6 / (2.6 + z3d * 0.55);

            const cx = estado.largura * 0.5;
            const cy = estado.altura * 0.52;
            const escala = Math.min(estado.largura, estado.altura) * 0.45;

            const baseX = cx + gx * escala * perspectiva;
            const baseY = cy + y3d * escala * perspectiva;

            return {
                x: baseX * estado.zoom + estado.deslocamentoX,
                y: baseY * estado.zoom + estado.deslocamentoY
            };
        }

        /* -----------------------------------------------------
           MARCADORES DOS SEIS SISTEMAS
        ----------------------------------------------------- */
        function criarMarcadores() {
            camadaPlanetas.innerHTML = '';

            dadosPlanetas.forEach(planeta => {
                const botao = document.createElement('button');
                botao.type = 'button';
                botao.className = `planeta-marcador${planeta.secreto ? ' planeta-marcador--segredo' : ''}`;
                botao.dataset.planeta = planeta.id;
                botao.style.setProperty('--planeta-cor', planeta.cor);
                botao.setAttribute('aria-label', `Abrir dossiê: ${planeta.planeta} — ${planeta.especie}`);

                const orbe = document.createElement('span');
                orbe.className = 'planeta-marcador__orbe';
                orbe.setAttribute('aria-hidden', 'true');

                if (planeta.imagemPlaneta) {
                    orbe.classList.add('planeta-marcador__orbe--imagem');
                    const img = document.createElement('img');
                    img.src = planeta.imagemPlaneta;
                    img.alt = '';
                    img.draggable = false;

                    /* Se a imagem ainda não existir na pasta, volta para a bolinha brilhante */
                    img.addEventListener('error', () => {
                        orbe.classList.remove('planeta-marcador__orbe--imagem');
                        img.remove();
                    }, { once: true });

                    orbe.appendChild(img);
                }

                const etiqueta = document.createElement('span');
                etiqueta.className = 'planeta-marcador__etiqueta';
                etiqueta.innerHTML = `
                    <strong>${escaparHTML(planeta.planeta)}</strong>
                    <small>${escaparHTML(planeta.codigo)}</small>
                `;

                botao.append(orbe, etiqueta);

                botao.addEventListener('pointerenter', () => atualizarCoordenada(planeta));
                botao.addEventListener('focus', () => atualizarCoordenada(planeta));
                botao.addEventListener('pointerleave', restaurarCoordenada);
                botao.addEventListener('blur', restaurarCoordenada);
                botao.addEventListener('click', evento => {
                    evento.stopPropagation();
                    abrirDossie(planeta.id);
                });

                camadaPlanetas.appendChild(botao);
            });

            posicionarMarcadores();
        }

        function atualizarCoordenada(planeta) {
            if (!coordenadas) return;
            coordenadas.textContent = planeta.secreto
                ? 'SINAL INTERCEPTADO // IDENTIFICAÇÃO CLASSIFICADA'
                : `ESCANEANDO // ${planeta.codigo} // ${planeta.especieCurta}`;
        }

        function restaurarCoordenada() {
            if (!coordenadas) return;
            coordenadas.textContent = 'SETOR GALÁCTICO // SELECIONE UM PLANETA';
        }

        function posicionarMarcadores() {
            const largura = estado.largura || galaxiaTela.clientWidth;
            const altura = estado.altura || galaxiaTela.clientHeight;
            if (!largura || !altura) return;

            estado.largura = largura;
            estado.altura = altura;

            camadaPlanetas.querySelectorAll('.planeta-marcador').forEach(botao => {
                const planeta = dadosPlanetas.find(item => item.id === botao.dataset.planeta);
                if (!planeta) return;

                /* Converte as coordenadas normalizadas do planeta para o disco 3D */
                const gx = (planeta.x - 0.5) * 2.05;
                const gy = (planeta.y - 0.5) * 2.05;
                const pos = projetarPontoGalaxia(gx, gy, 0);

                botao.style.left = `${pos.x}px`;
                botao.style.top = `${pos.y}px`;
            });
        }

        /* -----------------------------------------------------
           SIMULAÇÃO DA GALÁXIA (ONDA DE DENSIDADE + FLOAT32)
        ----------------------------------------------------- */
        function criarGeradorAleatorio(semente) {
            let valor = semente >>> 0;
            return () => {
                valor = (valor * 1664525 + 1013904223) >>> 0;
                return valor / 4294967296;
            };
        }

        function inicializarEstrelas() {
            const rand = criarGeradorAleatorio(421907);

            /* Algumas centenas de estrelas distantes ao fundo */
            estado.estrelasFundo = Array.from({ length: 340 }, () => ({
                x: rand(),
                y: rand(),
                raio: 0.4 + rand() * 1.1,
                brilho: 0.16 + rand() * 0.42,
                fase: rand() * Math.PI * 2
            }));

            /* ~28.000 estrelas em órbitas elípticas rotacionadas (teoria das ondas de densidade) */
            const TOTAL_ESTRELAS = movimentoReduzido ? 14000 : 28000;
            const r = new Float32Array(TOTAL_ESTRELAS);
            const theta = new Float32Array(TOTAL_ESTRELAS);
            const omega = new Float32Array(TOTAL_ESTRELAS);
            const z = new Float32Array(TOTAL_ESTRELAS);
            const cosRot = new Float32Array(TOTAL_ESTRELAS);
            const sinRot = new Float32Array(TOTAL_ESTRELAS);
            const tipo = new Uint8Array(TOTAL_ESTRELAS); // 0 = padrão/núcleo, 1 = azul jovem, 2 = nebulosa rosa
            const brilhoBase = new Float32Array(TOTAL_ESTRELAS);

            for (let i = 0; i < TOTAL_ESTRELAS; i++) {
                /* Mais estrelas concentradas perto do núcleo */
                const raio = Math.pow(rand(), 1.72);
                const angulo = rand() * Math.PI * 2;
                /* Rotação da elipse proporcional ao raio (~4.1 radianos do centro à borda) */
                const rotacaoElipse = raio * 4.15;

                r[i] = raio;
                theta[i] = angulo;
                /* Mais rápidas perto do núcleo */
                omega[i] = 0.24 / (raio + 0.16);
                /* Pequena espessura vertical do disco 3D */
                z[i] = (rand() - 0.5) * 0.055 * (1 - raio * 0.65);
                cosRot[i] = Math.cos(rotacaoElipse);
                sinRot[i] = Math.sin(rotacaoElipse);

                const sorteioTipo = rand();
                if (raio > 0.24 && sorteioTipo < 0.018) {
                    tipo[i] = 2; // Nebulosas rosas nascendo nos braços
                    brilhoBase[i] = 0.22 + rand() * 0.28;
                } else if (raio > 0.18 && sorteioTipo < 0.22) {
                    tipo[i] = 1; // Estrelas azuis jovens nos braços
                    brilhoBase[i] = 0.14 + rand() * 0.26;
                } else {
                    tipo[i] = 0; // Núcleo quente amarelo e disco estelar
                    brilhoBase[i] = 0.08 + (1 - raio) * 0.22 + rand() * 0.1;
                }
            }

            estado.estrelasGalaxia = {
                total: TOTAL_ESTRELAS,
                r,
                theta,
                omega,
                z,
                cosRot,
                sinRot,
                tipo,
                brilhoBase
            };
        }

        function redimensionarCanvas() {
            const largura = galaxiaTela.clientWidth;
            const altura = galaxiaTela.clientHeight;
            if (!largura || !altura) return;

            estado.largura = largura;
            estado.altura = altura;

            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = Math.round(largura * dpr);
            canvas.height = Math.round(altura * dpr);
            contexto.setTransform(dpr, 0, 0, dpr, 0, 0);

            /* Resolução interna otimizada para acumulação rápida em Float32Array */
            const maxDim = 980;
            const fator = Math.min(1, maxDim / Math.max(largura, altura));
            estado.bufW = Math.max(320, Math.round(largura * fator));
            estado.bufH = Math.max(240, Math.round(altura * fator));

            offCanvas.width = estado.bufW;
            offCanvas.height = estado.bufH;
            bloomCanvas.width = Math.max(120, Math.round(estado.bufW * 0.25));
            bloomCanvas.height = Math.max(90, Math.round(estado.bufH * 0.25));

            const pixels = estado.bufW * estado.bufH;
            estado.bufR = new Float32Array(pixels);
            estado.bufG = new Float32Array(pixels);
            estado.bufB = new Float32Array(pixels);
            estado.imgData = offCtx.createImageData(estado.bufW, estado.bufH);

            if (!estado.estrelasGalaxia) {
                inicializarEstrelas();
            }

            posicionarMarcadores();
            desenharGalaxia(performance.now(), 0);
        }

        function desenharGalaxia(tempo = 0, dt = 0.016) {
            if (!estado.largura || !estado.altura || !estado.estrelasGalaxia || !estado.bufR) return;

            const { largura, altura, bufW, bufH, bufR, bufG, bufB, imgData } = estado;
            const escalaBufX = bufW / largura;
            const escalaBufY = bufH / altura;

            /* 1. Fundo quase preto + estrelas distantes */
            contexto.fillStyle = '#020403';
            contexto.fillRect(0, 0, largura, altura);

            contexto.fillStyle = '#dce8d5';
            for (let i = 0; i < estado.estrelasFundo.length; i++) {
                const est = estado.estrelasFundo[i];
                const cintilacao = movimentoReduzido ? 1 : 0.72 + Math.sin(tempo * 0.0014 + est.fase) * 0.28;
                contexto.globalAlpha = est.brilho * cintilacao;
                contexto.beginPath();
                contexto.arc(est.x * largura, est.y * altura, est.raio, 0, Math.PI * 2);
                contexto.fill();
            }
            contexto.globalAlpha = 1;

            /* 2. Limpa buffers de luz Float32Array */
            bufR.fill(0);
            bufG.fill(0);
            bufB.fill(0);

            const gal = estado.estrelasGalaxia;
            const cosT = Math.cos(estado.inclinacaoX);
            const sinT = Math.sin(estado.inclinacaoX);
            const cx = largura * 0.5;
            const cy = altura * 0.52;
            const escalaDisco = Math.min(largura, altura) * 0.45;
            const avanco = movimentoReduzido ? 0 : Math.min(dt, 0.05);

            /* 3. Avança cada estrela na elipse e acumula luz nos canais RGB */
            for (let i = 0; i < gal.total; i++) {
                const th = gal.theta[i] + gal.omega[i] * avanco;
                gal.theta[i] = th;

                const raio = gal.r[i];
                const cosTh = Math.cos(th);
                const sinTh = Math.sin(th);

                /* Órbita elíptica (eixo menor = 0.7 * eixo maior) */
                const ex = raio * cosTh;
                const ey = raio * 0.7 * sinTh;

                /* Rotação da elipse proporcional ao raio -> cria os 2 braços espirais */
                const gx = ex * gal.cosRot[i] - ey * gal.sinRot[i];
                const gy = ex * gal.sinRot[i] + ey * gal.cosRot[i];
                const gz = gal.z[i];

                /* Inclinação 3D em torno do eixo X */
                const y3d = gy * cosT - gz * sinT;
                const z3d = gy * sinT + gz * cosT;
                const perspectiva = 2.6 / (2.6 + z3d * 0.55);

                const sx = (cx + gx * escalaDisco * perspectiva) * estado.zoom + estado.deslocamentoX;
                const sy = (cy + y3d * escalaDisco * perspectiva) * estado.zoom + estado.deslocamentoY;

                const px = (sx * escalaBufX) | 0;
                const py = (sy * escalaBufY) | 0;

                if (px < 1 || px >= bufW - 1 || py < 1 || py >= bufH - 1) continue;

                const tStar = gal.tipo[i];
                const lum = gal.brilhoBase[i];

                /* Fator de onda de densidade: brilha mais onde as elipses se comprimem nos braços */
                const ondaBraco = Math.pow(Math.abs(cosTh), 2.4);

                if (tStar === 2) {
                    /* Nebulosa rosa que nasce nos braços espirais e esmaece ao sair deles */
                    const intNeb = lum * (0.18 + ondaBraco * 1.45);
                    if (intNeb > 0.04) {
                        const rNeb = intNeb * 1.15;
                        const gNeb = intNeb * 0.26;
                        const bNeb = intNeb * 0.68;

                        for (let dy = -1; dy <= 1; dy++) {
                            const linha = (py + dy) * bufW;
                            for (let dx = -1; dx <= 1; dx++) {
                                const peso = (dx === 0 && dy === 0) ? 0.55 : 0.22;
                                const idx = linha + px + dx;
                                bufR[idx] += rNeb * peso;
                                bufG[idx] += gNeb * peso;
                                bufB[idx] += bNeb * peso;
                            }
                        }
                    }
                } else {
                    const idx = py * bufW + px;
                    if (tStar === 1) {
                        /* Estrelas jovens azuis brilhantes ao longo dos braços */
                        const intAzul = lum * (0.35 + ondaBraco * 1.25);
                        bufR[idx] += intAzul * 0.34;
                        bufG[idx] += intAzul * 0.72;
                        bufB[idx] += intAzul * 1.25;
                    } else {
                        /* Núcleo quente amarelo-dourado transicionando para disco estelar claro */
                        const calorNucleo = Math.max(0, 1 - raio * 2.6);
                        const intPadrao = lum * (0.7 + ondaBraco * 0.45);
                        bufR[idx] += intPadrao * (0.95 + calorNucleo * 0.45);
                        bufG[idx] += intPadrao * (0.86 + calorNucleo * 0.22);
                        bufB[idx] += intPadrao * (0.72 - calorNucleo * 0.32);
                    }
                }
            }

            /* 4. Tone mapping exponencial: 1 - exp(-valor) */
            const data = imgData.data;
            const totalPixels = bufW * bufH;
            for (let p = 0, q = 0; p < totalPixels; p++, q += 4) {
                const rVal = bufR[p];
                if (rVal > 0.001 || bufG[p] > 0.001 || bufB[p] > 0.001) {
                    data[q]     = (1 - Math.exp(-rVal * 1.55)) * 255;
                    data[q + 1] = (1 - Math.exp(-bufG[p] * 1.55)) * 255;
                    data[q + 2] = (1 - Math.exp(-bufB[p] * 1.55)) * 255;
                    data[q + 3] = 255;
                } else {
                    data[q] = 0;
                    data[q + 1] = 0;
                    data[q + 2] = 0;
                    data[q + 3] = 0;
                }
            }

            offCtx.putImageData(imgData, 0, 0);

            /* 5. Desenha a galáxia nítida e aplica bloom com blending 'lighter' */
            contexto.save();
            contexto.globalCompositeOperation = 'lighter';
            contexto.drawImage(offCanvas, 0, 0, largura, altura);

            /* Cópia reduzida e desfocada para o brilho atmosférico (bloom) */
            bloomCtx.clearRect(0, 0, bloomCanvas.width, bloomCanvas.height);
            bloomCtx.drawImage(offCanvas, 0, 0, bloomCanvas.width, bloomCanvas.height);

            if ('filter' in contexto) {
                contexto.filter = 'blur(12px)';
            }
            contexto.globalAlpha = 0.85;
            contexto.drawImage(bloomCanvas, 0, 0, largura, altura);
            contexto.restore();

            /* 6. Vinheta sutil nas bordas para destacar o HUD */
            const vinheta = contexto.createRadialGradient(
                largura * 0.5, altura * 0.5, Math.min(largura, altura) * 0.24,
                largura * 0.5, altura * 0.5, Math.max(largura, altura) * 0.72
            );
            vinheta.addColorStop(0, 'rgba(0, 0, 0, 0)');
            vinheta.addColorStop(1, 'rgba(0, 0, 0, 0.52)');
            contexto.fillStyle = vinheta;
            contexto.fillRect(0, 0, largura, altura);
        }

        function atualizarAnimacao(tempo) {
            estado.animacaoId = null;
            if (!estado.mapaVisivel) return;

            const dt = estado.ultimoTempo ? (tempo - estado.ultimoTempo) / 1000 : 0.016;
            estado.ultimoTempo = tempo;

            desenharGalaxia(tempo, dt);
            if (!movimentoReduzido) {
                estado.animacaoId = requestAnimationFrame(atualizarAnimacao);
            }
        }

        function iniciarAnimacao() {
            if (estado.animacaoId !== null || !estado.mapaVisivel) return;
            estado.ultimoTempo = performance.now();
            estado.animacaoId = requestAnimationFrame(atualizarAnimacao);
        }

        function pararAnimacao() {
            if (estado.animacaoId !== null) {
                cancelAnimationFrame(estado.animacaoId);
                estado.animacaoId = null;
            }
        }

        function mapaEstaVisivel() {
            return origemAba.classList.contains('ativo') && !galaxiaTela.classList.contains('oculto');
        }

        function sincronizarVisibilidade() {
            estado.mapaVisivel = mapaEstaVisivel();
            if (estado.mapaVisivel) {
                requestAnimationFrame(() => {
                    redimensionarCanvas();
                    iniciarAnimacao();
                });
            } else {
                pararAnimacao();
            }
        }

        /* -----------------------------------------------------
           PAN, ZOOM E INCLINAÇÃO 3D DO MAPA
        ----------------------------------------------------- */
        function limitarZoom(valor) {
            return Math.max(0.72, Math.min(2.35, valor));
        }

        function aplicarZoom(novoZoom, centroX, centroY) {
            const zoomAnterior = estado.zoom;
            const zoomNovo = limitarZoom(novoZoom);
            if (zoomNovo === zoomAnterior) return;

            const xLocal = centroX ?? estado.largura / 2;
            const yLocal = centroY ?? estado.altura / 2;
            const pontoX = (xLocal - estado.deslocamentoX) / zoomAnterior;
            const pontoY = (yLocal - estado.deslocamentoY) / zoomAnterior;

            estado.zoom = zoomNovo;
            estado.deslocamentoX = xLocal - pontoX * zoomNovo;
            estado.deslocamentoY = yLocal - pontoY * zoomNovo;

            posicionarMarcadores();
            if (movimentoReduzido) desenharGalaxia(performance.now(), 0);
        }

        function centralizarMapa() {
            estado.zoom = 1;
            estado.inclinacaoX = INCLINACAO_INICIAL;
            estado.deslocamentoX = 0;
            estado.deslocamentoY = 0;
            posicionarMarcadores();
            if (movimentoReduzido) desenharGalaxia(performance.now(), 0);
        }

        galaxiaTela.addEventListener('contextmenu', evento => evento.preventDefault());

        galaxiaTela.addEventListener('pointerdown', evento => {
            if (evento.target.closest('button, a, select')) return;

            /* Botão direito ou Shift+arrastar inclina o disco em 3D; botão esquerdo move o mapa */
            estado.inclinando = evento.button === 2 || evento.shiftKey;
            estado.arrastando = !estado.inclinando && evento.button === 0;
            if (!estado.arrastando && !estado.inclinando) return;

            estado.ponteiroId = evento.pointerId;
            estado.ultimoX = evento.clientX;
            estado.ultimoY = evento.clientY;
            estado.distanciaArrasto = 0;
            galaxiaTela.classList.add('arrastando');

            try {
                galaxiaTela.setPointerCapture(evento.pointerId);
            } catch (erro) {
                /* Alguns navegadores podem não oferecer captura neste elemento. */
            }
        });

        galaxiaTela.addEventListener('pointermove', evento => {
            if ((!estado.arrastando && !estado.inclinando) || evento.pointerId !== estado.ponteiroId) return;

            const deltaX = evento.clientX - estado.ultimoX;
            const deltaY = evento.clientY - estado.ultimoY;
            estado.ultimoX = evento.clientX;
            estado.ultimoY = evento.clientY;
            estado.distanciaArrasto += Math.abs(deltaX) + Math.abs(deltaY);

            if (estado.inclinando) {
                estado.inclinacaoX = Math.max(0.15, Math.min(1.38, estado.inclinacaoX + deltaY * 0.006));
            } else {
                estado.deslocamentoX += deltaX;
                estado.deslocamentoY += deltaY;
            }

            posicionarMarcadores();
            if (movimentoReduzido) desenharGalaxia(performance.now(), 0);
        });

        function encerrarArrasto(evento) {
            if (!estado.arrastando && !estado.inclinando) return;
            if (evento && estado.ponteiroId !== null && evento.pointerId !== estado.ponteiroId) return;

            estado.arrastando = false;
            estado.inclinando = false;
            estado.ponteiroId = null;
            galaxiaTela.classList.remove('arrastando');
        }

        galaxiaTela.addEventListener('pointerup', encerrarArrasto);
        galaxiaTela.addEventListener('pointercancel', encerrarArrasto);
        galaxiaTela.addEventListener('lostpointercapture', encerrarArrasto);

        galaxiaTela.addEventListener('wheel', evento => {
            evento.preventDefault();
            const retangulo = galaxiaTela.getBoundingClientRect();
            const x = evento.clientX - retangulo.left;
            const y = evento.clientY - retangulo.top;
            const fator = evento.deltaY < 0 ? 1.12 : 0.89;
            aplicarZoom(estado.zoom * fator, x, y);
        }, { passive: false });

        elementos.botaoReset?.addEventListener('click', centralizarMapa);
        elementos.botaoZoomIn?.addEventListener('click', () => aplicarZoom(estado.zoom * 1.18));
        elementos.botaoZoomOut?.addEventListener('click', () => aplicarZoom(estado.zoom / 1.18));

        /* -----------------------------------------------------
           ABERTURA DO DOSSIÊ
        ----------------------------------------------------- */
        function renderizarPlaneta(planeta) {
            const container = $('#origem-container');
            if (container) container.style.setProperty('--planeta-destaque', planeta.cor);

            if (elementos.nomePlaneta) elementos.nomePlaneta.textContent = planeta.planeta;
            if (elementos.descricaoPlaneta) elementos.descricaoPlaneta.textContent = planeta.descricaoPlaneta;
            if (elementos.nomeEspecie) elementos.nomeEspecie.textContent = planeta.especie;
            if (elementos.etiquetaEspecie) {
                elementos.etiquetaEspecie.textContent = descricoesEspecie[planeta.id] || 'DESIGNAÇÃO OMNITRIX // FORMA BASE';
            }
            if (elementos.descricaoEspecie) elementos.descricaoEspecie.textContent = planeta.descricaoEspecie;

            if (elementos.palcoPlaneta) {
                elementos.palcoPlaneta.innerHTML = '';

                if (planeta.modelo3D) {
                    const visualizador = document.createElement('model-viewer');
                    visualizador.setAttribute('src', planeta.modelo3D);
                    visualizador.setAttribute('alt', `Modelo 3D de ${planeta.planeta}`);
                    visualizador.setAttribute('camera-controls', '');
                    visualizador.setAttribute('auto-rotate', '');
                    visualizador.setAttribute('shadow-intensity', '1');
                    elementos.palcoPlaneta.appendChild(visualizador);
                } else {
                    const esfera = document.createElement('div');
                    esfera.className = `planeta-esfera-provisoria planeta-esfera--${planeta.classeEsfera}`;
                    esfera.setAttribute('role', 'img');
                    esfera.setAttribute('aria-label', `Representação provisória de ${planeta.planeta}`);
                    elementos.palcoPlaneta.appendChild(esfera);
                    const selo = document.createElement('span');
                    selo.className = 'planeta-glb-badge';
                    selo.textContent = 'MODELO VISUAL PROVISÓRIO';
                    elementos.palcoPlaneta.appendChild(selo);
                }
            }

            if (elementos.conteudoEspecie) {
                elementos.conteudoEspecie.innerHTML = '';

                if (planeta.imagemEspecie) {
                    const imagem = document.createElement('img');
                    imagem.src = planeta.imagemEspecie;
                    imagem.alt = `Imagem da espécie ${planeta.especie}`;
                    imagem.loading = 'lazy';
                    imagem.addEventListener('error', () => renderizarHolograma(planeta), { once: true });
                    elementos.conteudoEspecie.appendChild(imagem);
                } else {
                    renderizarHolograma(planeta);
                }
            }

            if (elementos.limiteAtributos) {
                const ficha = obterFicha();
                const limite = ficha.tier?.limiteAtributo || '+6';
                elementos.limiteAtributos.textContent = `LIMITE TIER: ${limite}`;
            }

            atualizarTextoArquetipo();
            renderizarAtributosPendentes();
            renderizarCaminhos();
        }

        function renderizarHolograma(planeta) {
            if (!elementos.conteudoEspecie) return;
            const bloco = document.createElement('div');
            bloco.className = 'especie-holograma-placeholder';
            bloco.innerHTML = `
                <span class="especie-holograma-placeholder__simbolo" aria-hidden="true">${escaparHTML(iconesEspecie[planeta.id] || '✦')}</span>
                <strong>${escaparHTML(planeta.especie)}</strong>
                <small>PROJEÇÃO HOLOGRÁFICA // ARQUIVO VISUAL PENDENTE</small>
            `;
            elementos.conteudoEspecie.replaceChildren(bloco);
        }

        function abrirDossie(idPlaneta) {
            const planeta = dadosPlanetas.find(item => item.id === idPlaneta);
            if (!planeta) return;

            estado.planetaSelecionado = planeta;
            camadaPlanetas.querySelectorAll('.planeta-marcador').forEach(botao => {
                const selecionado = botao.dataset.planeta === planeta.id;
                botao.classList.toggle('selecionado', selecionado);
                botao.setAttribute('aria-pressed', String(selecionado));
            });

            if (coordenadas) {
                coordenadas.textContent = `SALTO HIPERESPACIAL // ${planeta.codigo}`;
            }

            renderizarPlaneta(planeta);
            galaxiaTela.classList.add('oculto');
            planetaTela.classList.remove('oculto');
            planetaTela.classList.remove('entrada-hiperespaco');
            void planetaTela.offsetWidth;
            planetaTela.classList.add('entrada-hiperespaco');
            sincronizarVisibilidade();

            if (elementos.feedback) {
                elementos.feedback.textContent = 'Sistema selecionado. Revise o arquétipo e confirme para registrar na ficha.';
            }
            if (elementos.botaoConfirmar) {
                elementos.botaoConfirmar.disabled = false;
                const origemSalva = obterFicha().origem;
                const mesmaOrigem = origemSalva?.id === planeta.id;
                elementos.botaoConfirmar.textContent = mesmaOrigem
                    ? '✓ ORIGEM JÁ REGISTRADA // CONFIRMAR NOVAMENTE'
                    : 'CONFIRMAR ORIGEM & ARQUÉTIPO NA FICHA';
                elementos.botaoConfirmar.classList.toggle('ja-selecionado', mesmaOrigem);
            }
        }

        function voltarParaGalaxia() {
            planetaTela.classList.add('oculto');
            galaxiaTela.classList.remove('oculto');
            if (coordenadas) {
                coordenadas.textContent = 'SETOR GALÁCTICO // SELECIONE UM PLANETA';
            }
            sincronizarVisibilidade();
        }

        elementos.botaoVoltar?.addEventListener('click', voltarParaGalaxia);

        /* -----------------------------------------------------
           ARQUÉTIPO E ATRIBUTOS
        ----------------------------------------------------- */
        function atualizarTextoArquetipo() {
            if (!elementos.seletorArquetipo || !elementos.textoArquetipo) return;
            const arquetipo = elementos.seletorArquetipo.value;
            elementos.textoArquetipo.textContent = descricoesArquetipos[arquetipo] || descricoesArquetipos['O Combatente'];
        }

        elementos.seletorArquetipo?.addEventListener('change', () => {
            atualizarTextoArquetipo();
            if (elementos.feedback) elementos.feedback.textContent = 'Arquétipo atualizado. Clique em confirmar para salvar a escolha.';
        });

        function renderizarAtributosPendentes() {
            if (!elementos.listaAtributos) return;
            elementos.listaAtributos.innerHTML = `
                <div class="atributos-vazio">
                    <strong>BASE RACIAL AGUARDANDO DEFINIÇÃO</strong>
                    <span>Os nomes dos atributos e seus valores ainda não foram informados. Nenhum número foi aplicado automaticamente.</span>
                </div>
            `;
        }

        /* -----------------------------------------------------
           CAMINHOS EVOLUTIVOS PROVISÓRIOS
        ----------------------------------------------------- */
        function mostrarDetalheNo(no, indiceCaminho, indiceNo) {
            estado.caminhoAtivo = indiceCaminho;
            estado.noAtivo = indiceNo;

            if (elementos.tagDetalheEvolucao) {
                elementos.tagDetalheEvolucao.textContent = `${caminhosEvolutivos[indiceCaminho].tag} // ${no.estagio}`;
            }
            if (elementos.tituloDetalheEvolucao) elementos.tituloDetalheEvolucao.textContent = no.titulo;
            if (elementos.textoDetalheEvolucao) elementos.textoDetalheEvolucao.textContent = no.texto;
            if (elementos.bonusDetalheEvolucao) elementos.bonusDetalheEvolucao.textContent = no.bonus;

            elementos.arvoreEvolucao?.querySelectorAll('.evo-no-item').forEach(botao => {
                const ativo = Number(botao.dataset.no) === indiceNo;
                botao.classList.toggle('ativo', ativo);
                botao.setAttribute('aria-pressed', String(ativo));
            });
        }

        function renderizarNos(indiceCaminho) {
            const caminho = caminhosEvolutivos[indiceCaminho];
            if (!caminho || !elementos.arvoreEvolucao) return;

            elementos.arvoreEvolucao.innerHTML = '';
            caminho.nos.forEach((no, indiceNo) => {
                const botao = document.createElement('button');
                botao.type = 'button';
                botao.className = 'evo-no-item';
                botao.dataset.no = String(indiceNo);
                botao.setAttribute('aria-pressed', 'false');
                botao.innerHTML = `
                    <span class="evo-no-nivel">${String(indiceNo + 1).padStart(2, '0')}</span>
                    <span class="evo-no-info">
                        <small>${escaparHTML(no.estagio)}</small>
                        <strong>${escaparHTML(no.titulo)}</strong>
                    </span>
                `;
                botao.addEventListener('mouseenter', () => mostrarDetalheNo(no, indiceCaminho, indiceNo));
                botao.addEventListener('focus', () => mostrarDetalheNo(no, indiceCaminho, indiceNo));
                botao.addEventListener('click', () => mostrarDetalheNo(no, indiceCaminho, indiceNo));
                elementos.arvoreEvolucao.appendChild(botao);
            });

            mostrarDetalheNo(caminho.nos[0], indiceCaminho, 0);
        }

        function renderizarCaminhos() {
            if (!elementos.bannersEvolucao) return;
            elementos.bannersEvolucao.innerHTML = '';

            caminhosEvolutivos.forEach((caminho, indice) => {
                const botao = document.createElement('button');
                botao.type = 'button';
                botao.className = `evo-banner-btn${indice === 0 ? ' ativo' : ''}`;
                botao.dataset.caminho = String(indice);
                botao.setAttribute('aria-pressed', String(indice === 0));
                botao.innerHTML = `
                    <small>${escaparHTML(caminho.tag)}</small>
                    <strong>${escaparHTML(caminho.titulo)}</strong>
                    <span>${escaparHTML(caminho.resumo)}</span>
                `;

                botao.addEventListener('click', () => {
                    elementos.bannersEvolucao.querySelectorAll('.evo-banner-btn').forEach(item => {
                        const ativo = item === botao;
                        item.classList.toggle('ativo', ativo);
                        item.setAttribute('aria-pressed', String(ativo));
                    });
                    renderizarNos(indice);
                });

                elementos.bannersEvolucao.appendChild(botao);
            });

            renderizarNos(0);
        }

        /* -----------------------------------------------------
           MODAL E EFEITO DE INCLINAÇÃO DO CARTÃO DA ESPÉCIE
        ----------------------------------------------------- */
        let elementoComFocoAnterior = null;

        function abrirModalEspecie() {
            if (!elementos.modal || !elementos.modalPalco || !estado.planetaSelecionado) return;

            elementoComFocoAnterior = document.activeElement;
            elementos.modalPalco.innerHTML = '';
            if (elementos.conteudoEspecie) {
                Array.from(elementos.conteudoEspecie.children).forEach(filho => {
                    elementos.modalPalco.appendChild(filho.cloneNode(true));
                });
            }
            if (elementos.modalLegenda) {
                elementos.modalLegenda.textContent = estado.planetaSelecionado.especie;
            }

            elementos.modal.classList.remove('oculto');
            elementos.modal.setAttribute('aria-hidden', 'false');
            elementos.modalFechar?.focus();
        }

        function fecharModalEspecie() {
            if (!elementos.modal) return;
            elementos.modal.classList.add('oculto');
            elementos.modal.setAttribute('aria-hidden', 'true');
            elementoComFocoAnterior?.focus?.();
        }

        elementos.cartaoEspecie?.addEventListener('click', abrirModalEspecie);
        elementos.cartaoEspecie?.addEventListener('keydown', evento => {
            if (evento.key === 'Enter' || evento.key === ' ') {
                evento.preventDefault();
                abrirModalEspecie();
            }
        });
        elementos.modalFechar?.addEventListener('click', fecharModalEspecie);
        elementos.modal?.addEventListener('click', evento => {
            if (evento.target === elementos.modal) fecharModalEspecie();
        });

        elementos.cartaoEspecie?.addEventListener('pointermove', evento => {
            if (evento.pointerType === 'touch') return;
            const retangulo = elementos.cartaoEspecie.getBoundingClientRect();
            const x = (evento.clientX - retangulo.left) / retangulo.width;
            const y = (evento.clientY - retangulo.top) / retangulo.height;
            const rotacaoY = (x - 0.5) * 9;
            const rotacaoX = (0.5 - y) * 8;
            elementos.cartaoEspecie.style.setProperty('--mx', `${x * 100}%`);
            elementos.cartaoEspecie.style.setProperty('--my', `${y * 100}%`);
            elementos.cartaoEspecie.style.transform = `rotateX(${rotacaoX}deg) rotateY(${rotacaoY}deg)`;
        });

        elementos.cartaoEspecie?.addEventListener('pointerleave', () => {
            elementos.cartaoEspecie.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });

        document.addEventListener('keydown', evento => {
            if (evento.key === 'Escape' && elementos.modal && !elementos.modal.classList.contains('oculto')) {
                fecharModalEspecie();
            }
        });

        /* -----------------------------------------------------
           SALVAR ORIGEM E ARQUÉTIPO NA FICHA EXISTENTE
        ----------------------------------------------------- */
        function atualizarResumoCartaoOrigem() {
            const cartao = $('.cartao-etapa[data-etapa="origem"] .cartao-etapa__conteudo');
            if (!cartao) return;

            const ficha = obterFicha();
            if (!ficha.origem) return;

            let badge = cartao.querySelector('.cartao-badge-salvo');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'cartao-badge-salvo';
                const acao = cartao.querySelector('.cartao-etapa__acao');
                cartao.insertBefore(badge, acao || null);
            }
            badge.textContent = `ORIGEM: ${(ficha.origem.especie || 'SELECIONADA').toUpperCase()}`;
        }

        function confirmarOrigem() {
            if (!estado.planetaSelecionado) {
                if (elementos.feedback) elementos.feedback.textContent = 'Selecione um sistema na galáxia antes de confirmar.';
                return;
            }

            const planeta = estado.planetaSelecionado;
            const ficha = obterFicha();
            const arquetipo = elementos.seletorArquetipo?.value || 'Versátil';

            ficha.origem = {
                id: planeta.id,
                planeta: planeta.planeta,
                especie: planeta.especie,
                setor: planeta.setor,
                codigo: planeta.codigo
            };
            ficha.arquetipo = arquetipo;

            if (!ficha.atributos || typeof ficha.atributos !== 'object') {
                ficha.atributos = {};
            }

            try {
                if (typeof window.salvarFichaBen10 === 'function') {
                    window.salvarFichaBen10();
                } else {
                    localStorage.setItem('fichaBen10', JSON.stringify(ficha));
                }
            } catch (erro) {
                console.error('Não foi possível salvar a origem na ficha:', erro);
                if (elementos.feedback) {
                    elementos.feedback.textContent = 'Não foi possível salvar no armazenamento local deste navegador.';
                }
                return;
            }

            atualizarResumoCartaoOrigem();
            if (elementos.feedback) {
                elementos.feedback.textContent = `${planeta.especie} — origem e arquétipo salvos na ficha.`;
            }
            if (elementos.botaoConfirmar) {
                elementos.botaoConfirmar.textContent = '✓ ORIGEM E ARQUÉTIPO SALVOS NA FICHA';
                elementos.botaoConfirmar.classList.add('ja-selecionado');
            }
        }

        elementos.botaoConfirmar?.addEventListener('click', confirmarOrigem);

        /* Cria os marcadores antes de restaurar visualmente uma origem já salva. */
        criarMarcadores();

        /* Restaura o arquétipo, a origem anteriormente salva e a etiqueta do cartão do hub. */
        const fichaInicial = obterFicha();
        if (fichaInicial.arquetipo && elementos.seletorArquetipo) {
            const opcaoExiste = Array.from(elementos.seletorArquetipo.options)
                .some(opcao => opcao.value === fichaInicial.arquetipo);
            if (opcaoExiste) elementos.seletorArquetipo.value = fichaInicial.arquetipo;
        }
        atualizarTextoArquetipo();
        atualizarResumoCartaoOrigem();

        if (fichaInicial.origem?.id) {
            const origemAnterior = dadosPlanetas.find(item => item.id === fichaInicial.origem.id);
            if (origemAnterior) {
                estado.planetaSelecionado = origemAnterior;
                camadaPlanetas.querySelectorAll('.planeta-marcador').forEach(botao => {
                    const ativo = botao.dataset.planeta === origemAnterior.id;
                    botao.classList.toggle('selecionado', ativo);
                    botao.setAttribute('aria-pressed', String(ativo));
                });
                if (elementos.botaoConfirmar) {
                    elementos.botaoConfirmar.disabled = false;
                    elementos.botaoConfirmar.textContent = '✓ ORIGEM JÁ REGISTRADA // CONFIRMAR NOVAMENTE';
                    elementos.botaoConfirmar.classList.add('ja-selecionado');
                }
            }
        }

        inicializarEstrelas();
        redimensionarCanvas();

        /* A etapa começa escondida. Observamos sua abertura pelo cartão do hub. */
        if ('ResizeObserver' in window) {
            const observadorTamanho = new ResizeObserver(() => {
                if (mapaEstaVisivel()) redimensionarCanvas();
            });
            observadorTamanho.observe(galaxiaTela);
        } else {
            window.addEventListener('resize', () => {
                if (mapaEstaVisivel()) redimensionarCanvas();
            });
        }

        if ('MutationObserver' in window) {
            const observadorVisibilidade = new MutationObserver(sincronizarVisibilidade);
            observadorVisibilidade.observe(origemAba, { attributes: true, attributeFilter: ['class'] });
            observadorVisibilidade.observe(galaxiaTela, { attributes: true, attributeFilter: ['class'] });
            observadorVisibilidade.observe(planetaTela, { attributes: true, attributeFilter: ['class'] });
        }

        /* -----------------------------------------------------
           DIVISORES DE CIRCUITO ENTRE AS SESSÕES DO DOSSIÊ
        ----------------------------------------------------- */
        function iniciarDivisoresCircuito() {
            const canvases = Array.from(planetaTela.querySelectorAll('.canvas-circuito-divisor'));
            if (!canvases.length) return;

            const instancias = canvases.map((cv, idx) => {
                const ctx = cv.getContext('2d');
                const trilhas = [];
                const pontos = [];

                function montarGeometria(w, h) {
                    trilhas.length = 0;
                    pontos.length = 0;
                    const passo = 22;

                    for (let x = passo; x < w; x += passo) {
                        for (let y = 14; y < h; y += passo) {
                            pontos.push({ x, y });
                        }
                    }

                    const qtdTrilhas = Math.max(8, Math.floor(w / 95));
                    for (let i = 0; i < qtdTrilhas; i++) {
                        const esquerda = i % 2 === 0;
                        const yBase = 16 + ((i * 19 + idx * 11) % Math.max(24, h - 32));
                        const trecho1 = 60 + ((i * 47) % Math.max(90, Math.floor(w * 0.28)));
                        const diag = (i % 3 === 0 ? 18 : -18);
                        const y2 = Math.max(12, Math.min(h - 12, yBase + diag));
                        const trecho2 = 45 + ((i * 31) % 110);

                        const pts = esquerda
                            ? [
                                { x: 0, y: yBase },
                                { x: trecho1, y: yBase },
                                { x: trecho1 + Math.abs(diag), y: y2 },
                                { x: trecho1 + Math.abs(diag) + trecho2, y: y2 }
                            ]
                            : [
                                { x: w, y: yBase },
                                { x: w - trecho1, y: yBase },
                                { x: w - trecho1 - Math.abs(diag), y: y2 },
                                { x: w - trecho1 - Math.abs(diag) - trecho2, y: y2 }
                            ];

                        trilhas.push({
                            pts,
                            fase: (i * 0.23 + idx * 0.4) % 1,
                            vel: 0.22 + (i % 4) * 0.05,
                            anel: i % 2 === 0
                        });
                    }
                }

                function redimensionar() {
                    const ret = cv.parentElement.getBoundingClientRect();
                    const w = Math.max(1, Math.round(ret.width));
                    const h = Math.max(1, Math.round(ret.height));
                    const dpr = Math.min(window.devicePixelRatio || 1, 2);
                    cv.width = w * dpr;
                    cv.height = h * dpr;
                    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                    montarGeometria(w, h);
                }

                return { cv, ctx, trilhas, pontos, redimensionar };
            });

            function desenharDivisores(tempo) {
                if (!planetaTela.classList.contains('oculto')) {
                    const t = tempo * 0.001;

                    instancias.forEach(inst => {
                        const w = inst.cv.clientWidth;
                        const h = inst.cv.clientHeight;
                        if (!w || !h) return;
                        if (!inst.trilhas.length) inst.redimensionar();

                        const { ctx, trilhas, pontos } = inst;
                        ctx.clearRect(0, 0, w, h);

                        /* Grade de micro-pontos */
                        ctx.fillStyle = 'rgba(185, 255, 53, 0.22)';
                        for (let i = 0; i < pontos.length; i++) {
                            ctx.fillRect(pontos[i].x, pontos[i].y, 1.5, 1.5);
                        }

                        /* Trilhas em 45° com nós e pulso luminoso */
                        trilhas.forEach(tr => {
                            ctx.save();
                            ctx.strokeStyle = 'rgba(140, 235, 45, 0.42)';
                            ctx.shadowColor = '#9dff2e';
                            ctx.shadowBlur = 8;
                            ctx.lineWidth = 2;
                            ctx.lineCap = 'round';
                            ctx.lineJoin = 'round';

                            ctx.beginPath();
                            ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
                            for (let p = 1; p < tr.pts.length; p++) {
                                ctx.lineTo(tr.pts[p].x, tr.pts[p].y);
                            }
                            ctx.stroke();

                            /* Nó na ponta da trilha */
                            const fim = tr.pts[tr.pts.length - 1];
                            ctx.beginPath();
                            ctx.arc(fim.x, fim.y, 3.6, 0, Math.PI * 2);
                            if (tr.anel) {
                                ctx.fillStyle = '#050a05';
                                ctx.fill();
                                ctx.strokeStyle = '#b9ff35';
                                ctx.lineWidth = 1.8;
                                ctx.stroke();
                            } else {
                                ctx.fillStyle = '#b9ff35';
                                ctx.fill();
                            }

                            /* Pulso de energia correndo na trilha */
                            if (!movimentoReduzido) {
                                const prog = (t * tr.vel + tr.fase) % 1;
                                const segTotal = tr.pts.length - 1;
                                const posSeg = prog * segTotal;
                                const sIdx = Math.min(segTotal - 1, Math.floor(posSeg));
                                const local = posSeg - sIdx;
                                const a = tr.pts[sIdx];
                                const b = tr.pts[sIdx + 1];
                                const px = a.x + (b.x - a.x) * local;
                                const py = a.y + (b.y - a.y) * local;

                                ctx.fillStyle = '#eaffb8';
                                ctx.shadowBlur = 12;
                                ctx.beginPath();
                                ctx.arc(px, py, 2.6, 0, Math.PI * 2);
                                ctx.fill();
                            }
                            ctx.restore();
                        });
                    });
                }

                if (!movimentoReduzido) {
                    requestAnimationFrame(desenharDivisores);
                }
            }

            window.addEventListener('resize', () => instancias.forEach(i => i.redimensionar()));
            const obs = new MutationObserver(() => {
                if (!planetaTela.classList.contains('oculto')) {
                    instancias.forEach(i => i.redimensionar());
                }
            });
            obs.observe(planetaTela, { attributes: true, attributeFilter: ['class'] });

            instancias.forEach(i => i.redimensionar());
            requestAnimationFrame(desenharDivisores);
        }

        iniciarDivisoresCircuito();

        sincronizarVisibilidade();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', iniciarModuloOrigem, { once: true });
    } else {
        iniciarModuloOrigem();
    }
})();