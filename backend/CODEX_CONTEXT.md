# Contexto do projeto

Projeto avaliativo da disciplina Programação Backend - UESPI.

Objetivo: implementar uma API REST em TypeScript para gerenciamento de solicitações de viagem institucional.

Stack usada:

- Node.js
- TypeScript
- Fastify
- Prisma 7
- PostgreSQL via Docker Compose
- Vitest
- Git/GitHub

Estado atual:

- Ambiente configurado no MacBook
- Projeto Node criado
- TypeScript configurado
- Fastify funcionando
- Prisma configurado com PostgreSQL
- Docker Compose criado
- Banco `backend_db` rodando no container `backend-postgres`
- Migration criada para `TripRequest`
- Prisma Client gerado
- Endpoint `/health` funcionando
- Endpoint `GET /trip-requests` funcionando
- Endpoint `GET /trip-requests/:id` implementado/testado
- Script `init:db` populando 10 registros

Requisitos principais:

- POST /trip-requests
- GET /trip-requests
- GET /trip-requests/:id
- PATCH /trip-requests/:id/cancel
- GET /holidays/:year
- Respostas padronizadas:
  - sucesso: `{ "success": true, "data": ... }`
  - erro: `{ "success": false, "error": { "code": "...", "message": "..." } }`
- Tratamento centralizado de erros
- Consulta à BrasilAPI:
  - `GET https://brasilapi.com.br/api/feriados/v1/{ano}`
- Bloquear criação de viagem quando `departureAt` cair em feriado nacional
- Testes com Vitest
- README completo
- `.env.example` funcional
- Histórico de commits claro em inglês

Observações importantes:

- Usar inglês para código, erros, mensagens e commits
- Manter `strict: true` no TypeScript
- Não versionar `.env`
- Não versionar `node_modules`
- `init:db` não pode popular feriados
- Banco deve rodar via Docker Compose
- Projeto deve executar com:
  - `npm install`
  - `cp .env.example .env`
  - `docker compose up -d`
  - `npm run init:db`
  - `npm run dev`

Próximo passo sugerido:

- Padronizar nomes de pastas/arquivos
- Implementar tratamento centralizado de erros
- Depois implementar `POST /trip-requests`
