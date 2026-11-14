
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