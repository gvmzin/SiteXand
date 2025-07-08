# ProdByXand – Catálogo Interativo de Beats

Este site é um mostruário moderno e responsivo desenvolvido para apresentar os beats do produtor musical **Xand**. O projeto oferece uma vitrine interativa com player embutido, organização por estilos, visual atrativo, animações suaves e opções de licenciamento. Ideal para produtores, artistas ou ouvintes que desejam explorar instrumentais profissionais por gênero.

---

## Funcionalidades

* Catálogo de beats organizado por estilo (Trap, Pluggnb, R\&B, etc).
* Modal interativo com listagem detalhada de beats para cada estilo.
* Player de áudio embutido com controle de volume e barra de progresso.
* Exibição de título, BPM e tonalidade de cada beat.
* Sessão de licenças com opções personalizadas para compra ou negociação.
* Página “Sobre” com apresentação profissional do produtor.
* Sessão de contato com botões de e-mail e Instagram.
* Design moderno, com responsividade total e animações suaves em Tailwind CSS.

---

## Aprendizados aplicados

* Manipulação avançada do DOM com JavaScript vanilla.
* Organização de dados em estrutura JSON para carregamento dinâmico dos beats.
* Criação de modais com conteúdo gerado dinamicamente.
* Desenvolvimento de um player de áudio customizado e funcional.
* Técnicas de responsividade com Tailwind CSS e CSS puro.
* Experiência prática em estruturação de um site profissional de portfólio musical.
* Navegação entre seções com scroll suave (smooth scroll) e interatividade otimizada.

---

## Tecnologias utilizadas

* Linguagem: *JavaScript* (vanilla)
* Marcação: *HTML5*
* Estilo: *Tailwind CSS* (via CDN) + *CSS customizado*
* Fonte: *Google Fonts (Inter)*
* Armazenamento de dados temporários no navegador (sem backend)

---

## Como rodar o projeto

Você pode visualizar o projeto online neste link:

🔗 [https://gvmzin.github.io/SiteXand/](https://gvmzin.github.io/SiteXand/)

---

## Estrutura geral

```plaintext
SiteXand/
│
├── index.html             # Página principal com todas as seções
├── style.css              # Estilos personalizados para o site
├── scripts.js             # Lógica do player e interatividade dos beats
├── img/                   # Imagens dos estilos e perfil do produtor
├── audios/                # Pasta com os arquivos de áudio organizados por estilo
└── README.md              # Documentação do projeto
```

---

## Organização dos Beats

* Os beats são organizados em um objeto JavaScript (`beatsData`) com categorias por estilo.
* Cada beat possui: título, caminho do arquivo `.wav`, arte da capa, BPM e tonalidade.
* Os beats são carregados dinamicamente no modal e tocados via player HTML5.

---

## Créditos

Projeto desenvolvido por [@gvmzin](https://github.com/gvmzin) para o produtor musical **[@Xand](https://www.instagram.com/prodbyxand)**.
Todos os beats são propriedade intelectual do artista.
