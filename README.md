# Aplicativos de Notas - Teste Quarto à Vista

O projeto Notas é um sistema de notas simples desenvolvido como parte de um teste técnico para a vaga de desenvolvedor fullstack na empresa Quarto à Vista.

## Objetivo
O objetivo principal do projeto é criar um sistema de notas que permita aos usuários adicionar, editar e excluir notas com títulos e descrições

## Funcionalidades Principais
- Adicionar notas com título e descrição
- Editar notas existentes
- Excluir notas

## Tecnologias Utilizadas
- Next.js
- TypeScript
- Tailwind CSS
- Prisma
- tRPC
- Zod
- SQLite

## Estrutura de Diretórios

- /
  - components/
    - Nota.tsx
    - NotaEditForm.tsx
    - NoteForm.tsx
    - Alerts/
      - alertError.tsx
      - alertInfo.tsx
      - alertSucess.tsx
  - interfaces/
    - DeleteRequest.ts
    - FormNotaProps.ts
    - NotaEditFormProps.ts
    - NotaProps.ts
  - prisma/
  - public/
  - src/
    - pages/
      - index.tsx
      - _app.tsx
      - api/trpc
    - server/
      - api/
        - root.ts
        - trpc.ts
        - routers/
          - deleteNota.ts
          - postNota.ts
          - putNota.ts
  - styles/
    - globals.ts
  - utils/
    - api.ts

-- --

## Configuração do Ambiente de Desenvolvimento

1. Instale as dependências do projeto utilizando `npm install`.

2. Crie um arquivo `.env` na raiz do projeto e configure o DATABASE_URL como `file:./dev.db`. O arquivo `.env.example` se encontra na raiz do projeto.

## Comandos Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.

## Dependências
- Nextjs
- React.js
- TypeScript
- Prisma
- tailwindcss
- react-tooltip (lib de tooltip)
- react-toastify (lib de notificação para confirmação)
- SweetAlert2 (lib de notificação)
- Zod

## Requisitos de Sistema
- **Node.js**: Recomendado a versão 20.12.2
- **npm**: O npm é o gerenciador de pacotes padrão para o Node.js. Certifique-se de ter o npm instalado na sua máquina, pois será usado para instalar as dependências do projeto e executar scripts.

## Contato
Para mais informações entre em contato com Michel através do número: (84)99812-0957