// =========================================================
// IMPORTS DO THREE.JS
// =========================================================
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


/* =========================
   VÍDEO: ÁUDIO E ROLAGEM
========================= */

const video = document.querySelector('#video-abertura');

if (video) {

    video.muted = true;
    video.volume = 0;

    let audioAtivado = false;

    function atualizarVideoPelaRolagem() {

        const limite = 600;

        const progresso = Math.min(
            Math.max(window.scrollY / limite, 0),
            1
        );

        const intensidade = 1 - progresso;

        video.style.opacity = intensidade;

        if (audioAtivado && !video.muted) {
            video.volume = intensidade;
        }
    }

    function ativarAudio() {

        if (audioAtivado) return;

        audioAtivado = true;
        video.muted = false;

        const limite = 600;

        const progresso = Math.min(
            Math.max(window.scrollY / limite, 0),
            1
        );

        video.volume = 1 - progresso;

        window.removeEventListener('pointerdown', ativarAudio);
        window.removeEventListener('keydown', ativarAudio);
    }

    window.addEventListener('pointerdown', ativarAudio, { once: true });
    window.addEventListener('keydown', ativarAudio, { once: true });

    window.addEventListener(
        'scroll',
        atualizarVideoPelaRolagem,
        { passive: true }
    );

    window.addEventListener('resize', atualizarVideoPelaRolagem);

    atualizarVideoPelaRolagem();
}


/* =========================
   RASTRO DE BOLHAS NO MOUSE
========================= */

const canvasMouse = document.querySelector('#canvas-bolhas');

if (canvasMouse) {

    const ctxMouse = canvasMouse.getContext('2d');
    const particulasMouse = [];

    const reducaoMovimento = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    function ajustarCanvasMouse() {

        const escala = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        canvasMouse.width = Math.floor(window.innerWidth * escala);
        canvasMouse.height = Math.floor(window.innerHeight * escala);

        canvasMouse.style.width = `${window.innerWidth}px`;
        canvasMouse.style.height = `${window.innerHeight}px`;

        ctxMouse.setTransform(escala, 0, 0, escala, 0, 0);
    }

    ajustarCanvasMouse();

    window.addEventListener('resize', ajustarCanvasMouse);


    class BolhaMouse {

        constructor(x, y) {

            this.x = x;
            this.y = y;

            this.tamanho = Math.random() * 7 + 4;

            this.velocidadeX = Math.random() * 2 - 1;
            this.velocidadeY = Math.random() * -1.5 - 0.5;

            this.opacidade = 0.8;

            this.tipoCor = Math.random() > 0.5
                ? 'verde'
                : 'preta';
        }

        atualizar() {

            this.x += this.velocidadeX;
            this.y += this.velocidadeY;

            this.tamanho += 0.18;
            this.opacidade -= 0.018;
        }

        desenhar() {

            ctxMouse.beginPath();

            ctxMouse.arc(
                this.x,
                this.y,
                this.tamanho,
                0,
                Math.PI * 2
            );

            if (this.tipoCor === 'verde') {

                ctxMouse.fillStyle =
                    `rgba(57, 255, 20, ${this.opacidade})`;

                ctxMouse.strokeStyle =
                    `rgba(255, 255, 255, ${this.opacidade * 0.5})`;

            } else {

                ctxMouse.fillStyle =
                    `rgba(30, 30, 30, ${this.opacidade})`;

                ctxMouse.strokeStyle =
                    `rgba(57, 255, 20, ${this.opacidade})`;
            }

            ctxMouse.fill();

            ctxMouse.lineWidth = 1.5;

            ctxMouse.stroke();
        }
    }


    window.addEventListener('pointermove', (evento) => {

        if (reducaoMovimento) return;

        const quantidade = evento.pointerType === 'mouse' ? 2 : 1;

        for (let i = 0; i < quantidade; i++) {

            particulasMouse.push(
                new BolhaMouse(evento.clientX, evento.clientY)
            );
        }

    }, { passive: true });


    function animarMouse() {

        ctxMouse.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        for (let i = particulasMouse.length - 1; i >= 0; i--) {

            const bolha = particulasMouse[i];

            bolha.atualizar();
            bolha.desenhar();

            if (bolha.opacidade <= 0) {
                particulasMouse.splice(i, 1);
            }
        }

        requestAnimationFrame(animarMouse);
    }

    if (!reducaoMovimento) {
        animarMouse();
    }
}


/* =========================
   BOLHAS ANIMADAS DO FUNDO
   HERO MAN OF ACTION
========================= */

const canvasFundo = document.getElementById('bolhas-fundo');

if (canvasFundo) {

    const ctxFundo = canvasFundo.getContext('2d');

    let bolhasFundo = [];

    let larguraFundo = 0;
    let alturaFundo = 0;

    const reducaoMovimentoFundo = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;


    /* Números aleatórios */

    function aleatorioFundo(min, max) {
        return Math.random() * (max - min) + min;
    }


    /* Classe exclusiva das bolhas do fundo */

    class BolhaFundo {

        constructor(x, y, raio = aleatorioFundo(11, 35)) {
            this.xBase = x;
            this.yBase = y;

            this.x = x;
            this.y = y;

            this.raio = raio * 1.95;

            this.velocidadeX = aleatorioFundo(-0.14, 0.14);
            this.velocidadeY = aleatorioFundo(-0.14, 0.14);
            this.limiteOscilacao = aleatorioFundo(14, 28);
        }


        atualizar() {
            if (reducaoMovimentoFundo) return;

            this.x += this.velocidadeX;
            this.y += this.velocidadeY;

            if (Math.abs(this.x - this.xBase) > this.limiteOscilacao) {
                this.velocidadeX *= -1;
            }

            if (Math.abs(this.y - this.yBase) > this.limiteOscilacao) {
                this.velocidadeY *= -1;
            }
        }


        desenhar() {
            ctxFundo.beginPath();

            ctxFundo.arc(
                this.x,
                this.y,
                this.raio,
                0,
                Math.PI * 2
            );

            ctxFundo.fillStyle = '#000000';
            ctxFundo.fill();
        }
    }


    /* Calcula as posições X das duas bordas diagonais na altura Y */

    function obterBordasFaixa(y) {
        const t = y / alturaFundo;

        const bordaEsquerda = t <= 0.54
            ? larguraFundo * (0.34 * (1 - t / 0.54))
            : 0;

        const bordaDireita = larguraFundo * (0.92 - 0.49 * t);

        return { bordaEsquerda, bordaDireita };
    }


    /* Gera a distribuição das bolhas nas laterais e no meio */

    function gerarBolhasFundo() {
        bolhasFundo = [];

        /* 1. Bolhas grandes e médias formando o recorte nas duas bordas */
        const totalBordas = 38;

        for (let i = 0; i < totalBordas; i++) {
            const y = aleatorioFundo(0, alturaFundo);
            const { bordaEsquerda, bordaDireita } = obterBordasFaixa(y);

            const sorteio = Math.random();
            let raio;

            if (sorteio < 0.30) {
                raio = aleatorioFundo(12, 19);
            } else if (sorteio < 0.75) {
                raio = aleatorioFundo(20, 31);
            } else {
                raio = aleatorioFundo(32, 44);
            }

            const naLateralEsquerda = i % 2 === 0;
            let x;

            if (naLateralEsquerda) {
                x = bordaEsquerda + aleatorioFundo(-raio * 0.4, raio * 1.6);
            } else {
                x = bordaDireita - aleatorioFundo(-raio * 0.4, raio * 1.6);
            }

            bolhasFundo.push(new BolhaFundo(x, y, raio));
        }


        /* 2. Bolhas grandes distribuídas ao longo do interior da faixa verde */
        const totalMeio = 19;

        for (let i = 0; i < totalMeio; i++) {
            const faixaYMin = (i / totalMeio) * alturaFundo;
            const faixaYMax = ((i + 1) / totalMeio) * alturaFundo;
            const y = aleatorioFundo(faixaYMin + 15, faixaYMax - 15);

            const { bordaEsquerda, bordaDireita } = obterBordasFaixa(y);
            const larguraFaixa = bordaDireita - bordaEsquerda;

            const raio = aleatorioFundo(23, 35);
            const x = bordaEsquerda + larguraFaixa * aleatorioFundo(0.22, 0.78);

            bolhasFundo.push(new BolhaFundo(x, y, raio));
        }
    }


    /* Ajusta o tamanho do Canvas */

    function ajustarCanvasFundo() {
        const proporcao = Math.min(
            window.devicePixelRatio || 1,
            2
        );

        const retangulo = canvasFundo.getBoundingClientRect();

        larguraFundo = retangulo.width;
        alturaFundo = retangulo.height;

        canvasFundo.width = Math.floor(larguraFundo * proporcao);
        canvasFundo.height = Math.floor(alturaFundo * proporcao);

        ctxFundo.setTransform(
            proporcao,
            0,
            0,
            proporcao,
            0,
            0
        );

        gerarBolhasFundo();
        desenharBolhasFundo();
    }


    /* Desenha e atualiza as bolhas */

    function desenharBolhasFundo() {
        ctxFundo.clearRect(
            0,
            0,
            larguraFundo,
            alturaFundo
        );

        bolhasFundo.forEach(bolha => {
            bolha.atualizar();
            bolha.desenhar();
        });

        if (!reducaoMovimentoFundo) {
            requestAnimationFrame(desenharBolhasFundo);
        }
    }


    /* Inicialização */

    ajustarCanvasFundo();

    window.addEventListener('resize', ajustarCanvasFundo);
}


/* =========================
   EFEITO FADE NA ROLAGEM
========================= */
const secoesSobre = document.querySelectorAll('.sobre-secao');

function atualizarFadeSobre() {
    const alturaJanela = window.innerHeight;

    secoesSobre.forEach((secao, index) => {
        const texto = secao.querySelector('.fade-text');
        const imagem = secao.querySelector('.fade-image');

        // Mantém a última seção sempre visível no final da página
        if (index === secoesSobre.length - 1) {
            if (texto) texto.style.opacity = 1;
            if (imagem) imagem.style.opacity = 1;
            return;
        }

        const rect = secao.getBoundingClientRect();
        const distancia = Math.max(1, secao.offsetHeight - alturaJanela * 0.50);
        let progresso = -rect.top / distancia;
        progresso = Math.max(0, Math.min(1, progresso));

        // 1. Texto permanece legível até metade da transição e desaparece suavemente
        if (texto) {
            let opacidadeTexto = 1 - Math.max(0, (progresso - 0.35) / 0.45);
            texto.style.opacity = Math.max(0, Math.min(1, opacidadeTexto));
        }

        // 2. Imagem acompanha logo atrás, sem deixar buraco verde na tela
        if (imagem) {
            let opacidadeImagem = 1 - Math.max(0, (progresso - 0.55) / 0.40);
            imagem.style.opacity = Math.max(0, Math.min(1, opacidadeImagem));
        }
    });
}

window.addEventListener('scroll', atualizarFadeSobre, { passive: true });
window.addEventListener('resize', atualizarFadeSobre);
window.addEventListener('load', atualizarFadeSobre);

atualizarFadeSobre();

/* =========================
   CRIAR FICHA — ETAPA 1
   CIRCUITOS 45°, TILT 3D E EXPANSÃO
========================= */

document.addEventListener('DOMContentLoaded', () => {
    const canvasTech = document.getElementById('canvas-tech');
    const gradeCartoes = document.getElementById('cartoes-grade');
    const cabecalhoCriar = document.getElementById('criar-cabecalho');
    const cartoes = document.querySelectorAll('.cartao-etapa');
    const abaExpandida = document.getElementById('aba-expandida');
    const conteudosAba = document.querySelectorAll('.aba-conteudo');
    const botaoVoltar = document.getElementById('botao-voltar-hub');
    const abaStatus = document.getElementById('aba-status');

    let cartaoHover = null;
    let modoFocoCentral = false;
    let animandoAbertura = false;

    /* =========================================
       1. FUNDO TECNOLÓGICO COM TRILHAS GROSSAS 45°
    ========================================= */
    if (canvasTech) {
        const ctx = canvasTech.getContext('2d');
        let largura = 0;
        let altura = 0;
        let tempo = 0;

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

            /* 1. EMBLEMA ULTRA-T SUPERIOR (acima de "Criar Ficha") */
            const topoY = Math.max(88, cabecalhoCriar.getBoundingClientRect().top - 48);
            if (!modoFocoCentral) {
                const raioAnel = 17;
                const subirCirculo = 16; // Aumente ou diminua este valor para ajustar a altura
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
            }


            /* 2. EMBLEMA ULTRA-T INFERIOR (espelhado na base) */
            const baseY = altura - 66;
            const raioBase = 17;

            /* Haste central inferior e superior saindo do anel */
            desenharTrilha([[cx, altura], [cx, baseY + raioBase]], intensidadeGlobal, 0.4, 5.5);
            desenharTrilha([[cx, baseY - raioBase], [cx, baseY - raioBase - 24]], intensidadeGlobal, 0.55, 5.5);
            desenharNo(cx, baseY, raioBase, true, Math.max(0.85, intensidadeGlobal), 5.2);

            /* Par interno: sobe e dobra para dentro em 45° */
            desenharTrilha([[cx - 34, altura], [cx - 34, baseY - 12], [cx - 14, baseY - 32]], intensidadeGlobal * 0.9, 0.6, 3.6);
            desenharTrilha([[cx + 34, altura], [cx + 34, baseY - 12], [cx + 14, baseY - 32]], intensidadeGlobal * 0.9, 0.6, 3.6);
            desenharNo(cx - 34, baseY - 12, 4.5, false, intensidadeGlobal);
            desenharNo(cx + 34, baseY - 12, 4.5, false, intensidadeGlobal);

            /* Par externo: sobe e abre em 45° para fora */
            desenharTrilha([[cx - 72, altura], [cx - 72, baseY - 8], [cx - 106, baseY - 42]], intensidadeGlobal * 0.8, 0.75, 3.6);
            desenharTrilha([[cx + 72, altura], [cx + 72, baseY - 8], [cx + 106, baseY - 42]], intensidadeGlobal * 0.8, 0.75, 3.6);
            desenharNo(cx - 72, baseY - 8, 5, false, intensidadeGlobal);
            desenharNo(cx + 72, baseY - 8, 5, false, intensidadeGlobal);

            /* Segundo par externo na base (linhas largas com quebra diagonal) */
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

            /* Micro-pontos de matriz tecnológica nas laterais */
            ctx.fillStyle = modoFocoCentral
                ? 'rgba(185, 255, 53, 0.22)'
                : 'rgba(185, 255, 53, 0.10)';

            const espaco = 42;
            for (let x = espaco; x < largura; x += espaco) {
                for (let y = espaco; y < altura; y += espaco) {
                    ctx.fillRect(x, y, 2, 2);
                }
            }

            const intensidadeBase = modoFocoCentral ? 0.95 : (cartaoHover ? 0.62 : 0.48);
            desenharMalhaBase(intensidadeBase);

            if (modoFocoCentral) {
                /* Quando uma aba abre, todas as trilhas convergem com brilho máximo para o centro */
                const cx = largura / 2;
                const cy = altura / 2;
                const entradas = [
                    [[largura * 0.18, 0], [largura * 0.18, cy - 120], [cx - 120, cy], [cx, cy]],
                    [[largura * 0.82, 0], [largura * 0.82, cy - 120], [cx + 120, cy], [cx, cy]],
                    [[largura * 0.18, altura], [largura * 0.18, cy + 120], [cx - 120, cy], [cx, cy]],
                    [[largura * 0.82, altura], [largura * 0.82, cy + 120], [cx + 120, cy], [cx, cy]]
                ];
                entradas.forEach((rota, idx) => desenharTrilha(rota, 1.0, idx * 0.22, 4.8));
            } else {
                /* Trilhas de energia direcionadas a cada um dos 4 cartões sem cruzar o centro */
                cartoes.forEach((cartao, idx) => {
                    const rect = cartao.getBoundingClientRect();
                    if (rect.width === 0) return;

                    const alvoX = rect.left + rect.width / 2;
                    const topoCard = rect.top;
                    const baseCard = rect.bottom;

                    const isHover = cartaoHover === cartao;
                    const forca = isHover ? 1.0 : 0.35;
                    const lado = idx < 2 ? -1 : 1;
                    const desloc = lado * 75;

                    /* Trilha superior chegando no cartão pelas laterais */
                    const rotaTopo = [
                        [alvoX + desloc, 0],
                        [alvoX + desloc, topoCard - 54],
                        [alvoX, topoCard - 18],
                        [alvoX, topoCard]
                    ];
                    desenharTrilha(rotaTopo, forca, idx * 0.2, 3.6);
                    desenharNo(alvoX + desloc, topoCard - 54, isHover ? 6 : 4.5, false, forca);

                    /* Trilha inferior saindo do cartão pelas laterais */
                    const rotaBase = [
                        [alvoX, baseCard],
                        [alvoX, baseCard + 20],
                        [alvoX + desloc, baseCard + 56],
                        [alvoX + desloc, altura]
                    ];
                    desenharTrilha(rotaBase, forca, idx * 0.2 + 0.5, 3.6);
                    desenharNo(alvoX + desloc, baseCard + 56, isHover ? 6 : 4.5, true, forca);
                });
            }

            requestAnimationFrame(renderizarTech);
        }

        redimensionarTech();
        window.addEventListener('resize', redimensionarTech);
        renderizarTech();
    }

    /* =========================================
       2. INCLINAÇÃO 3D (TILT) AO PASSAR O MOUSE
    ========================================= */
    cartoes.forEach(cartao => {
        cartao.addEventListener('mouseenter', () => {
            cartaoHover = cartao;
        });

        cartao.addEventListener('mousemove', e => {
            if (animandoAbertura) return;

            const rect = cartao.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const pctX = (x / rect.width) - 0.5;
            const pctY = (y / rect.height) - 0.5;

            const rotateY = pctX * 22;
            const rotateX = -pctY * 22;

            cartao.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
            cartao.style.setProperty('--my', `${(y / rect.height) * 100}%`);
            cartao.style.transform =
                `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(1.04)`;
        });

        cartao.addEventListener('mouseleave', () => {
            if (cartaoHover === cartao) cartaoHover = null;
            cartao.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });

        /* =========================================
           3. CLIQUE: VAI PARA O CENTRO E ABRE A ABA
        ========================================= */
        const abrirCartao = () => {
            if (animandoAbertura) return;
            animandoAbertura = true;

            modoFocoCentral = true;
            cabecalhoCriar.classList.add('oculto');
            gradeCartoes.style.opacity = '0';
            window.definirVisibilidadeMenuOmnitrix?.(false); // <-- Esconde o Omnitrix ao entrar no módulo

            const etapa = cartao.dataset.etapa;
            const titulo = cartao.querySelector('h2')?.textContent || etapa;
            const rectInicial = cartao.getBoundingClientRect();

            const clone = cartao.cloneNode(true);
            clone.classList.add('cartao-clone-voando');
            clone.style.top = `${rectInicial.top}px`;
            clone.style.left = `${rectInicial.left}px`;
            clone.style.width = `${rectInicial.width}px`;
            clone.style.height = `${rectInicial.height}px`;
            clone.style.transform = 'none';
            document.body.appendChild(clone);

            modoFocoCentral = true;
            cabecalhoCriar.classList.add('oculto');
            gradeCartoes.style.opacity = '0';

            /* Passo 1: Move o banner para o centro da tela */
            requestAnimationFrame(() => {
                const centroW = Math.min(460, window.innerWidth * 0.88);
                const centroH = 340;
                clone.style.top = `${(window.innerHeight - centroH) / 2}px`;
                clone.style.left = `${(window.innerWidth - centroW) / 2}px`;
                clone.style.width = `${centroW}px`;
                clone.style.height = `${centroH}px`;
                clone.style.borderColor = '#b9ff35';
                clone.style.boxShadow = '0 0 60px rgba(185, 255, 53, 0.65)';
            });

            /* Passo 2: Expande na aba interna */
            setTimeout(() => {
                const alvoW = Math.min(1380, window.innerWidth * 0.89);
                const alvoH = window.innerHeight * 0.75;
                clone.style.top = `${Math.max(105, (window.innerHeight - alvoH) / 2)}px`;
                clone.style.left = `${(window.innerWidth - alvoW) / 2}px`;
                clone.style.width = `${alvoW}px`;
                clone.style.height = `${alvoH}px`;
            }, 340);

            /* Passo 3: Revela o conteúdo interativo do módulo */
            setTimeout(() => {
                gradeCartoes.classList.add('oculto');
                gradeCartoes.style.opacity = '1';

                conteudosAba.forEach(bloco => {
                    bloco.classList.toggle('ativo', bloco.dataset.conteudo === etapa);
                });

                abaStatus.textContent = `MÓDULO ATIVO // ${titulo.toUpperCase()}`;
                abaExpandida.classList.add('ativa');
                abaExpandida.setAttribute('aria-hidden', 'false');

                if (window.FichaSessao) {
                    window.FichaSessao.atualizarHudPax(etapa);
                }

                clone.remove();
                animandoAbertura = false;
            }, 720);
        };

        cartao.addEventListener('click', abrirCartao);
        cartao.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                abrirCartao();
            }
        });
    });

    /* Botão e tecla ESC para voltar aos cartões */
    function fecharAba() {
        modoFocoCentral = false;
        cartaoHover = null;
        abaExpandida.classList.remove('ativa');
        abaExpandida.setAttribute('aria-hidden', 'true');
        cabecalhoCriar.classList.remove('oculto');
        gradeCartoes.classList.remove('oculto');
        window.definirVisibilidadeMenuOmnitrix?.(true); // <-- Traz o Omnitrix de volta ao sair
        cartoes.forEach(c => {
            c.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
        });
    }

    botaoVoltar.addEventListener('click', fecharAba);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && abaExpandida.classList.contains('ativa')) {
            fecharAba();
        }
    });
});

/* =========================================
    4. ESTADO GLOBAL DA FICHA (TEMPORÁRIO NA SESSÃO)
========================================= */
window.fichaBen10 = {
    tier: null,
    origem: null
};

function salvarFichaBen10() {
    if (window.FichaSessao && window.fichaBen10.tier) {
        window.FichaSessao.definirTier(window.fichaBen10.tier.id);
    }
    atualizarResumoCartoesHub();
}

function atualizarResumoCartoesHub() {
    const cartaoTier = document.querySelector('.cartao-etapa[data-etapa="tier"] .cartao-etapa__conteudo');
    if (!cartaoTier) return;

    let badge = cartaoTier.querySelector('.cartao-badge-salvo');
    if (window.fichaBen10.tier) {
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'cartao-badge-salvo';
            const acao = cartaoTier.querySelector('.cartao-etapa__acao');
            cartaoTier.insertBefore(badge, acao);
        }
        badge.textContent = `SELECIONADO: ${window.fichaBen10.tier.titulo.toUpperCase()}`;
    } else if (badge) {
        badge.remove();
    }
}

/* =========================================
    5. MÓDULO TIER — DADOS, HOVER E SELEÇÃO
========================================= */
const DADOS_TIERS = {
    E: {
        id: 'E',
        titulo: 'Tier E',
        subtitulo: 'EM BREVE',
        cor: '#94a3b8',
        disponivel: false,
        descricao: 'Escala inicial civil ou recruta sem treinamento avançado. Os valores oficiais deste Tier serão liberados futuramente.'
    },
    D: {
        id: 'D',
        titulo: 'Tier D – Ano Um',
        subtitulo: 'ANO UM',
        cor: '#b9ff35',
        disponivel: true,
        descricao: 'Heróis recém-descobertos dando os primeiros passos com seus poderes e equipamentos. Ideal para campanhas focadas em aprendizado, descobertas e ameaças urbanas.',
        stats: {
            pax: 40,
            determinacao: 12,
            defesa: 15,
            bonusAtaque: '+1',
            dadoDano: '1d6',
            limiteAtributo: '+6',
            limitePoder: 'Grau 2'
        }
    },
    C: {
        id: 'C',
        titulo: 'Tier C – Herói Local',
        subtitulo: 'HERÓI LOCAL',
        cor: '#38bdf8',
        disponivel: true,
        descricao: 'Protetores reconhecidos em sua cidade ou setor, com maior domínio das próprias transformações e recursos táticos para enfrentar vilões recorrentes.',
        stats: {
            pax: 60,
            determinacao: 15,
            defesa: 18,
            bonusAtaque: '+2',
            dadoDano: '1d6',
            limiteAtributo: '+9',
            limitePoder: 'Grau 2'
        }
    },
    B: {
        id: 'B',
        titulo: 'Tier B',
        subtitulo: 'EM BREVE',
        cor: '#c084fc',
        disponivel: false,
        descricao: 'Defensores de escala planetária e agentes experientes dos Encanadores. Os atributos e recompensas deste nível serão adicionados em breve.'
    },
    A: {
        id: 'A',
        titulo: 'Tier A',
        subtitulo: 'EM BREVE',
        cor: '#fbbf24',
        disponivel: false,
        descricao: 'Ameaças e campeões de nível intergaláctico capazes de alterar o destino de sistemas inteiros. Conteúdo reservado para atualização futura.'
    },
    S: {
        id: 'S',
        titulo: 'Tier S',
        subtitulo: 'EM BREVE',
        cor: '#ff4d4d',
        disponivel: false,
        descricao: 'O ápice cósmico do universo de Ben 10. Os parâmetros oficiais deste Tier estarão disponíveis em breve.'
    }
};

const tierPalco = document.getElementById('tier-palco');
const tierPainel = document.getElementById('tier-painel');
const tierItens = document.querySelectorAll('.tier-item');

function renderizarPainelTier(tierId) {
    const dados = DADOS_TIERS[tierId];
    if (!dados || !tierPainel) return;

    tierPainel.style.setProperty('--tier-cor', dados.cor);

    tierItens.forEach(item => {
        item.classList.toggle('ativo', item.dataset.tier === tierId);
    });

    const jaEscolhido = window.fichaBen10.tier && window.fichaBen10.tier.id === dados.id;

    if (!dados.disponivel) {
        tierPainel.innerHTML = `
            <div class="tier-painel__cabecalho">
                <div>
                    <span class="tier-painel__tag">ESCALA DE CAMPANHA // ${dados.subtitulo}</span>
                    <h3>${dados.titulo}</h3>
                </div>
            </div>
            <p class="tier-painel__descricao">${dados.descricao}</p>
            <div class="tier-em-breve-box">
                <strong>EM BREVE</strong>
                <span>Os valores de PAX, Determinação, Defesa e limites deste Tier serão adicionados com o livro oficial.</span>
            </div>
        `;
        return;
    }

    const s = dados.stats;
    tierPainel.innerHTML = `
        <div class="tier-painel__cabecalho">
            <div>
                <span class="tier-painel__tag">ESCALA DISPONÍVEL // ${dados.subtitulo}</span>
                <h3>${dados.titulo}</h3>
            </div>
        </div>

        <p class="tier-painel__descricao">${dados.descricao}</p>

        <div class="tier-painel__subtitulo">RECOMPENSAS E PARÂMETROS INICIAIS</div>

        <div class="tier-tabela-wrap">
            <table class="tier-tabela">
                <thead>
                    <tr>
                        <th>PAX</th>
                        <th>Determinação</th>
                        <th>Defesa</th>
                        <th>Bônus Ataque</th>
                        <th>Dado de Dano</th>
                        <th>Limite Atributo</th>
                        <th>Limite Poder</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${s.pax}</td>
                        <td>${s.determinacao}</td>
                        <td>${s.defesa}</td>
                        <td>${s.bonusAtaque}</td>
                        <td>${s.dadoDano}</td>
                        <td>${s.limiteAtributo}</td>
                        <td>${s.limitePoder}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <button type="button"
                class="tier-botao-selecionar ${jaEscolhido ? 'ja-selecionado' : ''}"
                id="btn-confirmar-tier"
                data-tier="${dados.id}">
            ${jaEscolhido ? '✓ TIER SELECIONADO PARA A FICHA' : `SELECIONAR ${dados.titulo.toUpperCase()}`}
        </button>
    `;

    const btnConfirmar = document.getElementById('btn-confirmar-tier');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', () => selecionarTier(dados.id));
    }
}

function selecionarTier(tierId) {
    const dados = DADOS_TIERS[tierId];
    if (!dados || !dados.disponivel) return;

    window.fichaBen10.tier = {
        id: dados.id,
        titulo: dados.titulo,
        ...dados.stats
    };
    salvarFichaBen10();

    tierItens.forEach(item => {
        item.classList.toggle('selecionado', item.dataset.tier === tierId);
    });

    renderizarPainelTier(tierId);
}

if (tierPalco && tierItens.length > 0) {
    tierItens.forEach(item => {
        const tierId = item.dataset.tier;

        item.addEventListener('mouseenter', () => {
            tierPalco.classList.add('painel-aberto');
            renderizarPainelTier(tierId);
        });

        item.addEventListener('click', () => {
            tierPalco.classList.add('painel-aberto');
            if (DADOS_TIERS[tierId]?.disponivel) {
                selecionarTier(tierId);
            } else {
                renderizarPainelTier(tierId);
            }
        });
    });

    tierPalco.addEventListener('mouseleave', () => {
        if (window.fichaBen10.tier) {
            tierPalco.classList.add('painel-aberto');
            renderizarPainelTier(window.fichaBen10.tier.id);
        } else {
            tierPalco.classList.remove('painel-aberto');
            tierItens.forEach(i => i.classList.remove('ativo'));
        }
    });

    // Restaura apenas se já foi selecionado nesta mesma sessão
    const tierSessao = window.FichaSessao?.obterRascunho().tier;
    if (tierSessao && DADOS_TIERS[tierSessao]) {
        selecionarTier(tierSessao);
        tierPalco.classList.add('painel-aberto');
    }
}

/* =========================
   MENU 3D INTERATIVO DO OMNITRIX
========================= */
(function iniciarMenuOmnitrix() {
    const container = document.getElementById('omnitrix-menu');
    if (!container) return;

    // Páginas conectadas diretamente aos arquivos do seu projeto
    const PAGINAS = [
        { titulo: 'HOME', url: 'index.html' },
        { titulo: 'CRIAR FICHAS', url: 'criar_fichas.html' },
        { titulo: 'FICHAS', url: 'fichas.html' },
        { titulo: 'SOBRE', url: 'sobre.html' }
    ];

    // Identifica a página atual para iniciar o seletor nela
    const caminhoAtual = window.location.pathname.split('/').pop() || 'index.html';
    let indiceAtual = Math.max(0, PAGINAS.findIndex(p => p.url === caminhoAtual));

    // Monta o HTML interno do holograma e do canvas
    container.innerHTML = `
        <button type="button" class="omnitrix-fechar" aria-label="Fechar menu">✕</button>
        <div class="omnitrix-holograma" id="omni-holograma">
            <div class="omnitrix-feixe"></div>
            <div class="omnitrix-hud">
                <button type="button" class="omnitrix-seta" id="omni-prev" aria-label="Anterior">◀</button>
                <button type="button" class="omnitrix-card-link" id="omni-card">${PAGINAS[indiceAtual].titulo}</button>
                <button type="button" class="omnitrix-seta" id="omni-next" aria-label="Próximo">▶</button>
            </div>
            <span class="omnitrix-dica">Role ou use as setas • Clique para abrir</span>
        </div>
        <canvas id="omni-canvas"></canvas>
    `;

    const canvas = container.querySelector('#omni-canvas');
    const hologramaEl = container.querySelector('#omni-holograma');
    const cardLinkEl = container.querySelector('#omni-card');
    const btnFechar = container.querySelector('.omnitrix-fechar');

    // Estados: 'REPOUSO' | 'HOVER' | 'ATIVO' | 'FECHANDO'
    let estado = 'REPOUSO';
    let menuOculto = false;

    window.definirVisibilidadeMenuOmnitrix = (visivel) => {
        menuOculto = !visivel;
        if (!visivel) {
            if (estado === 'ATIVO') fecharOmnitrix();
            container.classList.add('oculto-modulo');
        } else {
            container.classList.remove('oculto-modulo');
        }
    };

    // Alvos de animação suave
    const ROT_FRENTE_X = Math.PI / 2;
    const alvoRotacaoCorpo = new THREE.Euler(ROT_FRENTE_X, 0, 0);
    const alvoPosicaoCorpo = new THREE.Vector3(0, 0, 0);

    let alvoElevacaoNucleo = 0; // Sobe Mostrador + Rotator + Tecnologico juntos
    let alvoGiroRotator = 0;    // Gira APENAS o Rotator ao trocar de link
    let alvoBrilhoVerde = 0.7;
    let alvoCameraZ = 4.5;

    // Configuração Three.js
    const cena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0, alvoCameraZ);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    // Iluminação
    cena.add(new THREE.AmbientLight(0xffffff, 1.3));

    const luzPrincipal = new THREE.DirectionalLight(0xffffff, 2.2);
    luzPrincipal.position.set(3, 5, 4);
    cena.add(luzPrincipal);

    const luzVerde = new THREE.PointLight(0xb9ff35, 1.5, 6);
    luzVerde.position.set(0, 0.6, 1.5);
    cena.add(luzVerde);

    const pivoOmnitrix = new THREE.Group();
    pivoOmnitrix.rotation.x = ROT_FRENTE_X;
    cena.add(pivoOmnitrix);

    // Referências às 5 partes separadas no Blender
    let objBase = null;
    let objPinos = null;
    let objMostrador = null;
    let objRotator = null;
    let objTecnologico = null;

    const pecasQueSobem = []; // Mostrador + Rotator + Tecnologico
    const materiaisVerdes = [];

    // Carrega o modelo da pasta modelos_3d
    const loader = new GLTFLoader();
    loader.load('modelos_3d/omnitrix.glb', (gltf) => {
        const modelo = gltf.scene;

        // Normaliza tamanho e centraliza
        const caixa = new THREE.Box3().setFromObject(modelo);
        const tamanho = caixa.getSize(new THREE.Vector3());
        const centro = caixa.getCenter(new THREE.Vector3());
        const maiorEixo = Math.max(tamanho.x, tamanho.y, tamanho.z);
        const escala = 2.75 / maiorEixo;

        modelo.scale.setScalar(escala);
        modelo.position.sub(centro.multiplyScalar(escala));

        // Captura os 5 grupos/objetos pelo nome
        modelo.traverse((child) => {
            const nome = child.name.toLowerCase();
            if (!objBase && nome.includes('base')) objBase = child;
            else if (!objPinos && nome.includes('pinos')) objPinos = child;
            else if (!objMostrador && nome.includes('mostrador')) objMostrador = child;
            else if (!objRotator && nome.includes('rotator')) objRotator = child;
            else if (!objTecnologico && nome.includes('tecnologico')) objTecnologico = child;

            if (child.isMesh && child.material) {
                child.material.emissive = new THREE.Color(0x8eff29);
                child.material.emissiveIntensity = alvoBrilhoVerde;
                materiaisVerdes.push(child.material);
            }
        });

        pivoOmnitrix.add(modelo);

        // Coloca temporariamente na posição aberta (mostrador apontando para cima)
        // para calcular os eixos exatos de subida e giro
        pivoOmnitrix.rotation.set(0, 0, 0);
        pivoOmnitrix.updateMatrixWorld(true);

        const cimaMundial = new THREE.Vector3(0, 1, 0);

        // Calcula o deslocamento vertical exato para Mostrador, Rotator e Tecnologico
        [objMostrador, objRotator, objTecnologico].forEach((peca) => {
            if (!peca) return;
            const posMundoInicial = peca.parent.localToWorld(peca.position.clone());
            const posMundoSubida = posMundoInicial.clone().add(new THREE.Vector3(0, 0.30, 0));
            const posLocalSubida = peca.parent.worldToLocal(posMundoSubida);

            peca.userData.posInicial = peca.position.clone();
            peca.userData.deltaSubida = posLocalSubida.sub(peca.position);
            pecasQueSobem.push(peca);
        });

        // Calcula o eixo vertical exato para girar APENAS o Rotator
        if (objRotator) {
            const quatPaiRotator = objRotator.parent.getWorldQuaternion(new THREE.Quaternion());
            objRotator.userData.eixoGiro = cimaMundial
                .clone()
                .applyQuaternion(quatPaiRotator.invert())
                .normalize();
            objRotator.userData.quatInicial = objRotator.quaternion.clone();
        }

        // Retorna o pivô para a posição frontal inicial (Passo 1)
        pivoOmnitrix.rotation.set(ROT_FRENTE_X, 0, 0);
        pivoOmnitrix.updateMatrixWorld(true);
    });

    // Ajusta o canvas automaticamente quando o contêiner expande ou encolhe
    const observadorTamanho = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
    });
    observadorTamanho.observe(container);

    // --- PASSO 2: INCLINAR PARA O LADO DO MOUSE ---
    window.addEventListener('pointermove', (e) => {

        if (menuOculto || estado === 'ATIVO' || estado === 'FECHANDO') return;

        const rect = container.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / 260;
        const dy = (e.clientY - cy) / 260;
        const distancia = Math.hypot(dx, dy);

        if (distancia < 1.35) {
            estado = 'HOVER';
            const clampX = THREE.MathUtils.clamp(dx, -1, 1);
            const clampY = THREE.MathUtils.clamp(dy, -1, 1);
            alvoRotacaoCorpo.y = clampX * 0.55;
            alvoRotacaoCorpo.x = ROT_FRENTE_X + clampY * 0.45;
        } else if (estado === 'HOVER') {
            estado = 'REPOUSO';
            alvoRotacaoCorpo.set(ROT_FRENTE_X, 0, 0);
        }
    }, { passive: true });

    // --- PASSO 3: CLICAR PARA GIRAR (IMAGEM 3), SUBIR NÚCLEO E ABRIR HOLOGRAMA ---
    canvas.addEventListener('click', () => {
        if (estado === 'REPOUSO' || estado === 'HOVER') {
            ativarOmnitrix();
        } else if (estado === 'ATIVO') {
            trocarPagina(1);
        }
    });

    function ativarOmnitrix() {
        estado = 'ATIVO';
        container.classList.add('ativo');

        // Afasta a câmera suavemente para enquadrar a pulseira completa
        alvoCameraZ = 7.2;
        alvoRotacaoCorpo.set(0, 0, 0);
        alvoPosicaoCorpo.set(0, -1.20, 0);

        // Sobe Mostrador + Rotator + Tecnologico juntos
        alvoElevacaoNucleo = 0.28;
        alvoBrilhoVerde = 1.4;

        setTimeout(() => {
            if (estado === 'ATIVO') {
                hologramaEl.classList.add('visivel');
            }
        }, 260);
    }

    function fecharOmnitrix(aoTerminar = null) {
        estado = 'FECHANDO';
        hologramaEl.classList.remove('visivel');

        // Abaixa as 3 peças de volta para a Base
        alvoElevacaoNucleo = 0;
        alvoBrilhoVerde = aoTerminar ? 4.2 : 0.7;
        if (aoTerminar) luzVerde.intensity = 6;

        setTimeout(() => {
            alvoCameraZ = 4.5;
            alvoRotacaoCorpo.set(ROT_FRENTE_X, 0, 0);
            alvoPosicaoCorpo.set(0, 0, 0);
            alvoBrilhoVerde = 0.7;
            container.classList.remove('ativo');
        }, 220);

        setTimeout(() => {
            if (aoTerminar) {
                aoTerminar();
            } else {
                estado = 'REPOUSO';
            }
        }, 560);
    }

    // --- PASSO 4: GIRAR APENAS O ROTATOR AO TROCAR DE PÁGINA ---
    function trocarPagina(direcao) {
        if (estado !== 'ATIVO') return;

        indiceAtual = (indiceAtual + direcao + PAGINAS.length) % PAGINAS.length;
        alvoGiroRotator += direcao * (Math.PI / 2); // 90° no Rotator

        cardLinkEl.style.transform = 'scale(0.84)';
        setTimeout(() => {
            cardLinkEl.textContent = PAGINAS[indiceAtual].titulo;
            cardLinkEl.style.transform = 'scale(1)';
        }, 100);
    }

    container.querySelector('#omni-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        trocarPagina(-1);
    });

    container.querySelector('#omni-next').addEventListener('click', (e) => {
        e.stopPropagation();
        trocarPagina(1);
    });

    container.addEventListener('wheel', (e) => {
        if (estado === 'ATIVO') {
            e.preventDefault();
            trocarPagina(e.deltaY > 0 ? 1 : -1);
        }
    }, { passive: false });

    // Clique no link do holograma: fecha o Omnitrix e navega para a página
    cardLinkEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (estado !== 'ATIVO') return;
        const destino = PAGINAS[indiceAtual].url;
        fecharOmnitrix(() => {
            window.location.href = destino;
        });
    });

    // Fechar pelo botão ✕, clique fora ou tecla ESC
    btnFechar.addEventListener('click', (e) => {
        e.stopPropagation();
        if (estado === 'ATIVO') fecharOmnitrix();
    });

    document.addEventListener('pointerdown', (e) => {
        if (estado === 'ATIVO' && !container.contains(e.target)) {
            fecharOmnitrix();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && estado === 'ATIVO') {
            fecharOmnitrix();
        }
    });

    // --- LOOP DE ANIMAÇÃO ---
    const relogio = new THREE.Clock();
    let fatorElevacaoAtual = 0; // Vai de 0 (fechado) a 1 (aberto)
    let giroRotatorAtual = 0;

    function animarOmnitrix() {
        requestAnimationFrame(animarOmnitrix);
        const t = relogio.getElapsedTime();

        // Suaviza zoom da câmera, posição e rotação do relógio inteiro
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, alvoCameraZ, 0.12);
        pivoOmnitrix.rotation.x = THREE.MathUtils.lerp(pivoOmnitrix.rotation.x, alvoRotacaoCorpo.x, 0.12);
        pivoOmnitrix.rotation.y = THREE.MathUtils.lerp(pivoOmnitrix.rotation.y, alvoRotacaoCorpo.y, 0.12);
        pivoOmnitrix.rotation.z = THREE.MathUtils.lerp(pivoOmnitrix.rotation.z, alvoRotacaoCorpo.z, 0.12);
        pivoOmnitrix.position.lerp(alvoPosicaoCorpo, 0.12);

        // 1. Sobe Mostrador + Rotator + Tecnologico juntos (0 = fechado, 1 = elevado)
        const fatorAlvo = alvoElevacaoNucleo > 0 ? 1 : 0;
        fatorElevacaoAtual = THREE.MathUtils.lerp(fatorElevacaoAtual, fatorAlvo, 0.14);

        pecasQueSobem.forEach((peca) => {
            peca.position.copy(peca.userData.posInicial)
                .addScaledVector(peca.userData.deltaSubida, fatorElevacaoAtual);
        });

        // 2. Gira SOMENTE o Rotator no eixo correto ao alternar as páginas
        if (objRotator && objRotator.userData.eixoGiro) {
            giroRotatorAtual = THREE.MathUtils.lerp(giroRotatorAtual, alvoGiroRotator, 0.15);
            const qGiro = new THREE.Quaternion().setFromAxisAngle(
                objRotator.userData.eixoGiro,
                giroRotatorAtual
            );
            objRotator.quaternion.copy(objRotator.userData.quatInicial).multiply(qGiro);
        }

        // 3. Passo 1: Efeito "respirando" no modo Repouso
        let brilhoAlvo = alvoBrilhoVerde;
        if (estado === 'REPOUSO' || estado === 'HOVER') {
            const respiracao = (Math.sin(t * 2.5) + 1) * 0.5;
            brilhoAlvo = 0.35 + respiracao * 0.85;
            luzVerde.intensity = 0.9 + respiracao * 1.3;
        }

        materiaisVerdes.forEach((mat) => {
            mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, brilhoAlvo, 0.12);
        });

        renderer.render(cena, camera);
    }

    animarOmnitrix();
})();