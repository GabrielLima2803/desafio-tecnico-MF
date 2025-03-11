# Gerenciamento de Movimentações Financeiras

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?logo=vuedotjs)](https://vuejs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-11+-FF2D20?logo=laravel)](https://laravel.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql)](https://www.mysql.com/)

Desafio de uma aplicação fullstack para gestão de transações financeiras com autenticação de usuários, desenvolvida com Vue 3 no frontend e Laravel 11+ no backend.

## ✨ Funcionalidades

- **Autenticação de Usuários**
  - Login com validação de credenciais
  - Proteção de rotas autenticadas

- **Gestão de Transações**
  - Tabela com histórico completo
  - Filtros por tipo (entrada/saída) e valor
  - CRUD completo de movimentações
  - Formulário com seleção de categorias
  - Visualização de saldo total

- **Gestão de Categorias**
  - Criação e exclusão de categorias
  - Listagem de categorias disponíveis
  - Validação de categorias em uso

- **Extra**
  - Interface responsiva com **Vuetify**
  - Tipagem estática com **TypeScript**
  - Estado global com Pinia
  - Comunicação API com **Axios**
  - Feedback visual com toasts
  - **Filtros**

## 🛠 Tecnologias

**Frontend**  
![Vue](https://img.shields.io/badge/-Vue%203-4FC08D?logo=vuedotjs)  
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript)  
![Vuetify](https://img.shields.io/badge/-Vuetify-1867C0?logo=vuetify)  
![Pinia](https://img.shields.io/badge/-Pinia-FFD02F?logo=pinia)  
![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios)

**Backend**  
![Laravel](https://img.shields.io/badge/-Laravel%2011+-FF2D20?logo=laravel)  
![Sanctum](https://img.shields.io/badge/-Sanctum-FF2D20?logo=laravel)  
![MySQL](https://img.shields.io/badge/-MySQL%208.0-4479A1?logo=mysql)  
![Eloquent](https://img.shields.io/badge/-Eloquent-FF2D20?logo=laravel)

**DevOps & Tools**  
![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker)

## ⚙️ Pré-requisitos

- Node.js 18+
- PHP 8.1+
- Composer 2.6+
- MySQL 8.0+
- Docker (opcional para instalação containerizada)

## 📦 Instalação

### Método 1: Docker (Recomendado)

```bash
# Clone o repositório
git clone https://github.com/GabrielLima2803/desafio-tecnico-MF.git

# Entre no repositório
cd desafio-tecnico-MF

# Copie a as variveis de ambiente
cp backend/.env.example backend/.env

# Construa os containers
docker-compose build --no-cache

# Inicie os containers
docker-compose up 

# Acesse os serviços:
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# MySQL: porta 3306
```

### Método 2: Instalação Local

**Backend (Laravel 11+)**
```bash
# Acesse o diretório do backend
cd backend

# Crie uma cópia do arquivo de ambiente
cp .env.example .env

# Configure o banco de dados no .env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finance_db
DB_USERNAME=root
DB_PASSWORD=sua_senha_aqui

Ou

# Use Sqlite
DB_CONNECTION=sqlite

# Instale as dependências
composer install

# Gere a chave da aplicação
php artisan key:generate

# Execute as migrações do banco
php artisan migrate

# Inicie o servidor Laravel
php artisan serve --port=8000
```

**Frontend (Vuejs3)**
```bash
# Acesse o diretório do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🔧 Configuração do Banco de Dados

### 1. Criação do Banco MySQL
Execute no MySQL:
```sql
CREATE DATABASE finance_db;
CREATE USER 'finance_user'@'localhost' IDENTIFIED BY 'senha_forte';
GRANT ALL PRIVILEGES ON finance_db.* TO 'finance_user'@'localhost';
FLUSH PRIVILEGES;
```

### 1. Configuração do Ambiente
Edite o arquivo ``.env`` do backend com:

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finance_db
DB_USERNAME=finance_user
DB_PASSWORD=senha_forte
```

## Demostração
![Demonstração da Aplicação](./docs/mf-desafio.gif)


## 🔄 Rotas da API (Endpoints)

| Método | Endpoint                   | Descrição                   |
|--------|----------------------------|-----------------------------|
| POST   | `/api/login`               | Autenticação de usuário     |
| POST   | `/api/register`            | Registrar usuário           |
| GET    | `/api/transactions`        | Listar transações           |
| POST   | `/api/transactions`        | Criar transação             |
| GET    | `/api/transactions/{id}`   | Mostrar transação específica|
| PUT    | `/api/transactions/{id}`   | Atualizar transação         |
| DELETE | `/api/transactions/{id}`   | Excluir transação           |
| GET    | `/api/categories`          | Listar categorias           |
| POST   | `/api/categories`          | Criar categoria             |
| DELETE | `/api/categories/{id}`     | Excluir categoria           |



## Contato

- **Gabriel Lima de Souza**
- **gabriellima2803@gmail.com**
- **[LinkedIn](https://www.linkedin.com/in/gabriel-limadev/)**
