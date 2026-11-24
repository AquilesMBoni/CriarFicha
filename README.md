> ⚠️ **AVISO IMPORTANTE — PROJETO INDEPENDENTE DE FÃ (NÃO OFICIAL)**
>
> O **CriarFicha** é uma iniciativa independente, gratuita e **sem fins lucrativos**, desenvolvida por um fã para a comunidade de RPG de mesa. **Este projeto não é oficial** e não possui vínculo comercial, parceria, patrocínio ou aprovação institucional da **Warner Bros. Discovery**, **Man of Action** ou **D20 Culture**.
>
> Todos os direitos sobre a franquia **Ben 10** e **Ben 10 Beyond: The Roleplaying Game** — incluindo nomes, marcas, personagens, espécies, planetas, conceitos e propriedades intelectuais — pertencem exclusivamente aos seus respectivos detentores de direitos (**Man of Action**, **Warner Bros. Discovery** e **D20 Culture**). Nenhum conteúdo deste site substitui os livros, materiais ou produtos oficiais do jogo.

---

<h1 align="center">CriarFicha — Ben 10 Beyond</h1>

<p align="center">
  Criador de fichas interativo feito de fã para a comunidade de <strong>Ben 10 Beyond: The Roleplaying Game</strong>,<br>
  com <strong>menu 3D do Omnitrix</strong>, <strong>mapa galáctico procedural</strong>, <strong>modelos 3D de planetas</strong> e organização local de personagens.
</p>

<p align="center">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black">
  <img alt="Three.js" src="https://img.shields.io/badge/Three.js-0.169-000000?logo=threedotjs&logoColor=white">
  <img alt="model-viewer" src="https://img.shields.io/badge/model--viewer-4.1-4285F4?logo=google&logoColor=white">
  <img alt="Canvas 2D" src="https://img.shields.io/badge/Canvas%202D-Procedural-8ACB38?logoColor=white">
  <img alt="Projeto de Fã" src="https://img.shields.io/badge/Projeto%20de%20F%C3%A3-Sem%20Fins%20Lucrativos-2EA043">
</p>

<!--
## Capturas de tela

Salve as imagens na pasta docs/ e remova este comentário quando quiser exibir pré-visualizações no repositório.

<p align="center">
  <img src="docs/home.png" alt="Tela inicial com Parallax e Omnitrix 3D" width="900">
</p>
-->

## Sobre o projeto

O **CriarFicha** é um projeto independente e sem fins lucrativos, criado com o objetivo de oferecer à comunidade uma ferramenta visual e interativa para montar, personalizar e organizar fichas de personagens para jogar **Ben 10 Beyond** com os amigos.

A proposta é transformar a montagem da ficha em uma experiência temática inspirada no universo da franquia — explorando o Omnitrix, sistemas estelares, espécies alienígenas e tecnologias espaciais em uma interface intuitiva diretamente no navegador, sem necessidade de instalação ou cadastro.

> **Nota sobre os dados do sistema:** A estrutura interativa da aplicação já está implementada; os textos e valores provisórios nas etapas de atributos e caminhos evolutivos aguardam apenas o preenchimento com as regras oficiais do *QuickStart* de **Ben 10 Beyond** quando disponibilizadas publicamente.

## Funcionalidades

- **Menu Interativo 3D do Omnitrix (`Three.js`):** o núcleo do Omnitrix fica fixo no topo da tela, eleva suas peças ao ser acionado, exibe navegação holográfica e dispara um flash verde radial ao trocar de página.
- **Abertura com Parallax Espacial em Camadas:** composição em profundidade na página inicial com fundo estrelado, estação orbital no horizonte, nave em decolagem e plataforma em perspectiva que reagem à rolagem.
- **Materialização de Títulos com Efeito de Bolhas (`Canvas 2D`):** cada letra dos títulos principais surge acompanhada de partículas e bolhas verdes inspiradas na transformação do Omnitrix, ativadas na abertura e conforme a rolagem da página (`IntersectionObserver`).
- **Hub de Criação de Fichas (`Criar Ficha`):**
  - **Seleção de Tier:** escolha do nível de poder da campanha e definição automática dos limites de atributos na sessão.
  - **Mapa Galáctico 3D Procedural:** simulação em `Canvas 2D` baseada na teoria das ondas de densidade com cerca de 28.000 estrelas acumuladas em `Float32Array`, *tone mapping* exponencial, efeito *bloom*, controle de zoom, arrasto e inclinação 3D do disco galáctico.
  - **Transição de Viagem Espacial (Dobra Hiperespacial):** túnel estelar em `Canvas 2D` com barra de progresso real que pré-carrega imagens e modelos `.glb` antes de exibir o mapa ou o planeta escolhido, evitando engasgos em conexões mais lentas.
  - **Dossiê de Planetas e Espécies:** visualização interativa de cada planeta em 3D (`<model-viewer>`), cartão holográfico da espécie com inclinação 3D e ampliação em tela cheia, seleção de arquétipo e navegação por linhas evolutivas.
- **Visualização 3D (`GameCase` / Ficha):** inspeção interativa de modelos tridimensionais com rotação automática e controle de câmera.
- **Biblioteca de Fichas:** armazenamento local no navegador, permitindo salvar rascunhos, consultar fichas criadas, importar e exportar arquivos de personagem.
- **Acessibilidade e Otimização:** suporte à preferência do sistema para redução de movimento (`prefers-reduced-motion`), fechamento de modais pela tecla `Esc` e carregamento sob demanda dos modelos 3D.

## Sobre Ben 10 Beyond

**Ben 10 Beyond: The Roleplaying Game** é o primeiro RPG de mesa oficial da franquia Ben 10.

O jogo está sendo desenvolvido pela **D20 Culture** em colaboração direta com a **Man of Action** e sob licença da **Warner Bros. Discovery**, permitindo que os jogadores criem seus próprios heróis, explorem diferentes espécies alienígenas e vivam aventuras pelo Omniverso. O projeto oficial também conta com campanha de financiamento coletivo no Kickstarter.

Para conhecer e acompanhar o projeto oficial:

- [Site oficial de Ben 10 Beyond](https://launch.ben10rpg.com/)
- [D20 Culture](https://d20culture.com/)

## Direitos autorais, créditos e atribuições

**Este é um projeto independente, desenvolvido por um fã para a comunidade, sem fins lucrativos e sem qualquer intenção de comercialização.**

- **Propriedade Intelectual:** Todos os direitos relacionados à franquia **Ben 10**, incluindo personagens, espécies, nomes, marcas, logotipos, conceitos, elementos visuais e demais propriedades intelectuais, pertencem aos seus respectivos detentores de direitos.
- **Criadores e Licenciadores Oficiais:** A **Man of Action** é reconhecida como criadora da franquia Ben 10; a **Warner Bros. Discovery** é responsável pelo licenciamento da propriedade intelectual; e a **D20 Culture** é responsável pelo desenvolvimento e publicação do RPG oficial **Ben 10 Beyond** em colaboração com a Man of Action.
- **Recursos Visuais e Modelos 3D:** Os modelos 3D, ilustrações e demais recursos utilizados na interface pertencem aos seus respectivos autores e artistas, sendo empregados exclusivamente para fins ilustrativos e de entretenimento entre fãs.

### 3D Model Attribution

- **Model:** *"Alien Force Omnitrix"* by **Just Another Josh**
- **Source:** https://skfb.ly/pxJMw
- **License:** [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- **Modifications:** Adapted for integration into the CriarFicha fan website, including Three.js hierarchy animation, materials, lighting, and visual transition effects.

---

*Este projeto é uma iniciativa de fã, criada exclusivamente para entretenimento pessoal e diversão entre amigos. Nenhum conteúdo deste repositório deve ser interpretado como material oficial ou substituto dos produtos licenciados de Ben 10 Beyond.*
