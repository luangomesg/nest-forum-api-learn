# 🗣️ Nest Forum API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

API REST de um **fórum simples** desenvolvida com **NestJS + Prisma + SQLite**, utilizando **JWT** para autenticação.

> Projeto de estudo focado em boas práticas de backend, arquitetura REST e integração com ORM.

---

## 🚀 Tecnologias utilizadas

- **Node.js**
- **NestJS**
- **Prisma ORM**
- **SQLite**
- **JWT (JSON Web Token)**
- **TypeScript**

---

## 📦 Funcionalidades

### 👤 Usuários
- Criar usuário
- Login com JWT
- Deletar usuário
- Relacionamento com perguntas e respostas
- Exclusão em cascata (questions e answers)

### ❓ Perguntas
- Criar pergunta (usuário autenticado)
- Listar perguntas
- Buscar pergunta por ID
- Atualizar perguntas
- Deletar perguntas
- Prevenção de títulos duplicados

### 💬 Respostas
- Criar resposta (usuário autenticado)
- Relacionada a uma pergunta existente
- Listar respostas
- Buscar respostas por ID
- Atualizar respostas
- Deletar respostas

---

## 🔐 Autenticação

Após o login, envie o token JWT no header:

Authorization: Bearer SEU_TOKEN_AQUI

## ⚙️ Como rodar o projeto

1️⃣ Clonar o repositório
```http
git clone https://github.com/luangomesg/nest-forum-api-learn.git
```

2️⃣ Instalar as dependências
```http
npm install
```

3️⃣ Configurar o banco de dados

O projeto utiliza SQLite com Prisma.

Execute as migrations:
```http
npx prisma migrate dev
```

Isso irá:

Criar o banco SQLite

Aplicar o schema

Gerar o Prisma Client

4️⃣ Rodar a aplicação
```http
npm run start:dev
```


A API estará disponível em:
```http
http://localhost:3000
```

## 🧪 Exemplos de requests

👤 Criar usuário

POST /user
```http
{
  "name": "example",
  "email": "example@email.com",
  "password": "123456"
}
```

🔑 Login

POST /auth/signin
```http
{
  "email": "example@email.com",
  "password": "123456"
}
```
❓ Criar pergunta (rota protegida)

POST /questions

Headers:
```http
Authorization: Bearer SEU_TOKEN
```
Body:
```http
{
  "title": "O que é NestJS?",
  "body": "Alguém pode explicar o que é o NestJS?"
}
```
📄 Listar perguntas

GET /questions

💬 Criar resposta (rota protegida)

POST /answers/:questionId

Headers:
```http
Authorization: Bearer SEU_TOKEN
```
Body:
```http
{
  "body": "NestJS é um framework Node.js inspirado no Angular.",
}
```
❌ Deletar usuário

DELETE /user/:id

Headers:
```http
Authorization: Bearer SEU_TOKEN
```

