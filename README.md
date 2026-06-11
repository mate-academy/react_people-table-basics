# React People Table

SPA desenvolvida com React e TypeScript que exibe uma lista de pessoas com navegação por rotas, seleção dinâmica e relações entre familiares.

## Demo

[DEMO LINK](https://Igor-hrm.github.io/react_people-table-basics/)

---

## Funcionalidades

- Página inicial (Home)
- Página de pessoas (People)
- Página de não encontrado (NotFound)
- Navegação com React Router (HashRouter)
- Rota dinâmica `/people/:slug`
- Consumo de API externa
- Estados de loading, erro e lista vazia
- Tabela de pessoas
- Destaque da pessoa selecionada
- Links para mãe e pai quando disponíveis
- Destaque visual para nomes femininos
- Componente reutilizável para links de pessoas

---

## Rotas

- `/` — Home
- `/people` — Lista de pessoas
- `/people/:slug` — Pessoa selecionada
- `/home` — redireciona para `/`
- `*` — Página não encontrada

---

## API

https://mate-academy.github.io/react_people-table/api/people.json

---

## Conceitos praticados

- React Router (rotas e parâmetros de URL)
- Consumo de API com useEffect
- Gerenciamento de estado (loading, erro e dados)
- Renderização condicional
- Componentização
- Props e comunicação entre componentes
- Manipulação de listas com map
