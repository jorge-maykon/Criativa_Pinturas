# Criativa Pinturas 🎨

## Visão geral

**Criativa Pinturas** é um site institucional para uma empresa de pintura residencial e comercial. O objetivo é apresentar os serviços oferecidos, galeria de projetos, informações de contato e permitir que clientes potenciais solicitem orçamentos de forma simples e direta.

O site foi desenvolvido com **HTML5, CSS3 e JavaScript (vanilla)**, mantendo foco em performance, responsividade e boa experiência de usuário.

---

## Funcionalidades principais

- Página inicial com destaque para os serviços principais.  
- Seção “Serviços” com descrição de cada tipo de pintura (residencial, comercial, fachadas, retoques, etc.).  
- **Galeria de projetos**: slider ou grid mostrando imagens de obras concluídas para demonstrar portfólio.  
- Formulário de **solicitação de orçamento / contato** com campos para nome, e-mail, telefone e mensagem / breve descrição do trabalho.  
- Seção “Sobre nós” com histórico da empresa, valores e diferenciais.  
- Seção de **testemunhos / depoimentos de clientes** (opcional).  
- Layout responsivo, adaptável a dispositivos móveis, tablets e desktops.  
- SEO básico (meta tags, estrutura semântica, alt nas imagens).  

---

## Stack / Tecnologias utilizadas

- **HTML5** — marcação semântica  
- **CSS3** — estilos, responsividade, layout flexbox/grid, design mobile-first  
- **JavaScript (ES6+)** — interatividade (ex: galeria, validação de formulário)  
- (Opcional) **Pré-processadores / ferramentas**: Sass / PostCSS / Autoprefixer (se desejado)  
- (Opcional) **Build / bundler**: npm + scripts de build, ou bundlers como webpack / vite — dependendo da complexidade do projeto  

---

## Estrutura de pastas (sugestão)

/ (root)
│ index.html
│ contato.html # página de contato / orçamento
│ styles/ # estilos CSS ou SCSS
│ └── main.css
│ scripts/ # JS
│ └── main.js
│ images/ # imagens / galeria / logos
│ assets/ # fonts, ícones, etc.
│ (opcional) data/ # se usar JSON para portfólio/testemunhos
└── README.md


---

## Como rodar / instalar (modo de desenvolvimento)

1. Clone este repositório:

   ```bash
   git clone https://github.com/seu-usuario/criativa-pinturas.git
   cd criativa-pinturas

    (Se usar ferramentas de build) Instale dependências:

npm install

Abra o arquivo index.html em seu navegador — ou, se estiver usando servidor de desenvolvimento, rode:

npm start

Modifique os arquivos em styles/, scripts/, images/ conforme necessário. As mudanças serão refletidas no navegador (dependendo da configuração de “live reload”).

Para produção, gere os arquivos finais (minificados/comprimidos) com:

    npm run build

    E então faça deploy dos arquivos estáticos (ex: via GitHub Pages, Netlify, Vercel, ou hospedagem própria).

Como contribuir

Contribuições são bem-vindas! Se você quiser sugerir melhorias, adicionar novos recursos ou corrigir bugs:

    Fork este repositório.

    Crie uma branch para sua modificação (git checkout -b feature/nova-coisa).

    Faça suas alterações.

    Envie um pull request descrevendo as melhorias realizadas.

Boas práticas recomendadas

    Utilizar CSS modular ou BEM para organizar estilos e evitar conflitos.

    Garantir acessibilidade (a11y): uso correto de <alt> em imagens, labels em formulários, contraste de cores adequado.

    Otimização de imagens para web (compressão, uso do formato adequado) para manter boa performance.

    Validação do formulário de orçamento — tanto no front‑end (JS) quanto, se houver backend, no servidor.

    Testes de compatibilidade nos principais navegadores (Chrome, Firefox, Safari, Edge) e dispositivos móveis.

Licença

Este projeto está licenciado sob a MIT License — sinta-se livre para usar, modificar e distribuir conforme seus interesses.
Contato

Para dúvidas, sugestões ou solicitar um orçamento personalizado — entre em contato via e-mail: contato@criativapinturas.com.br
