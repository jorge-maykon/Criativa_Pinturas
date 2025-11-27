# Agendamento_saude

Sistema web para **agendamento de consultas na área da saúde**, pensado para organizar horários, pacientes e profissionais de forma simples.  
O objetivo é facilitar o fluxo de marcação, consulta e gestão de atendimentos em clínicas, unidades básicas de saúde ou pequenas equipes.

---

## 📌 Funcionalidades (previstas / em desenvolvimento)

- Cadastro e autenticação de usuários (login/logout)
- Painel inicial (dashboard) pós-login
- Cadastro de pacientes
- Cadastro de profissionais de saúde
- Agendamento de consultas
- Listagem de horários disponíveis
- Visualização de agenda do dia/semana
- Controle básico de status do atendimento (agendado, concluído, cancelado)
- Relatórios simples (em desenvolvimento)

> Observação: Como o projeto está em construção, algumas funcionalidades podem ainda não estar totalmente implementadas.

---

## 🛠 Stack Utilizada

- **Backend:** Laravel (PHP)
- **Frontend:** Inertia.js + (Blade/React/Vue conforme configuração do projeto)
- **Banco de Dados:** MySQL
- **Gerenciador de Dependências PHP:** Composer
- **Gerenciador de Dependências Frontend:** NPM
- **Servidor de desenvolvimento:** Artisan (`php artisan serve`)
- **Controle de versão:** Git + GitHub

---

## ✅ Requisitos

Antes de rodar o projeto, tenha instalado na sua máquina:

- [PHP](https://www.php.net/) (versão compatível com a do Laravel utilizado)
- [Composer](https://getcomposer.org/)
- [Node.js e NPM](https://nodejs.org/)
- [MySQL](https://www.mysql.com/) (ou outro banco configurado no `.env`)
- [Git](https://git-scm.com/)
- Extensão do PHP `pdo_mysql` habilitada

---

## 🚀 Como rodar o projeto localmente

### 1. Clonar o repositório

git clone https://github.com/jorge-maykon/Agendamento_saude.git
cd Agendamento_saude

2. Instalar dependências do PHP (Laravel)

composer install

3. Instalar dependências do frontend

npm install

4. Configurar o arquivo .env

    Copie o arquivo de exemplo:

cp .env.example .env

    Edite o .env e configure principalmente:

APP_NAME="Agendamento_saude"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost

# Configurações do banco
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=agendamento_saude
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

Crie o banco de dados no MySQL com o mesmo nome definido em DB_DATABASE.
5. Gerar a chave da aplicação

php artisan key:generate

6. Rodar migrações (e seeds, se existirem)

php artisan migrate
# Se tiver seeds:
# php artisan db:seed

7. Subir o servidor backend (Laravel)

php artisan serve

O Laravel, por padrão, estará em:
http://127.0.0.1:8000 ou http://localhost:8000
8. Rodar o build do frontend

Para desenvolvimento:

npm run dev

Ou, se estiver usando Vite com hot reload:

npm run dev
# e acesse a URL do Laravel normalmente

Para produção:

npm run build

📂 Estrutura básica do projeto

Algumas pastas importantes:

    app/ – Código principal do backend (Laravel)

    routes/ – Arquivos de rotas (web, api, etc.)

    resources/views – Views Blade / layouts

    resources/js – Arquivos JS/TS para Inertia (páginas, componentes)

    database/migrations – Migrações do banco de dados

    public/ – Pasta pública (assets, index.php)

    config/ – Arquivos de configuração do Laravel

👨‍💻 Como contribuir

    Faça um fork do repositório

    Crie uma branch para sua feature/correção:

git checkout -b minha-feature

Faça seus commits:

git commit -m "Descrição da alteração"

Envie sua branch:

    git push origin minha-feature

    Abra um Pull Request neste repositório

📝 Licença

Defina aqui a licença do projeto (por exemplo, MIT, GPL, etc.).

Exemplo:

Este projeto está licenciado sob a licença MIT.
Sinta-se à vontade para usar, estudar e melhorar o código.
📣 Contato

Caso queira entrar em contato para dúvidas, sugestões ou melhorias:

    Autor: Jorge Maykon

    GitHub: @jorge-maykon
