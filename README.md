# Sistema de Autenticação e Lista de Tarefas

Este projeto consiste em uma aplicação web desenvolvida utilizando React.js e Firebase Authentication para autenticação de usuários, juntamente com uma funcionalidade de lista de tarefas.

## Pré-requisitos

- Node.js instalado
- Conta no Firebase para configurar a autenticação

## Instalação

1. Clone o repositório para sua máquina local:

```
git clone https://github.com/J0A0F3L1P3/teste123.git
```

2. Na raiz do projeto, instale as dependências:

```
npm install
```

3. Configure as credenciais do Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
   - Copie as credenciais do projeto para `auth.js`
   - Ative a autenticação por e-mail e google autentication no console do Firebase

4. Inicie o servidor de desenvolvimento:

```
npm start
```

5. Acesse a aplicação em `http://localhost:3000`

## Funcionalidades

### Autenticação de Usuários

- Os usuários podem se cadastrar utilizando e-mail e senha ou autenticar-se com o Google.
- As credenciais dos usuários são armazenadas no Firebase Authentication.
- Os usuários autenticados podem visualizar suas informações de perfil e realizar logout.

### Lista de Tarefas

- Os usuários autenticados podem criar, visualizar e excluir tarefas.
- As tarefas são armazenadas localmente no navegador do usuário.
- A lista de tarefas apresenta um botão flutuante para adicionar novas tarefas.

## Estrutura do Projeto

- `App.js`: Componente principal que define as rotas da aplicação.
- `Login.js`: Componente responsável pela autenticação de usuários.
- `Home.js`: Componente que exibe as informações do usuário autenticado.
- `ListaDeTarefas.js`: Componente que gerencia a lista de tarefas.
- `auth.js`: Configuração da autenticação utilizando Firebase Authentication.
