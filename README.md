# React People Table

Implement the `App` with 2 pages and ability to select a person in the table and below features :

## Features

1. `HomePage` available at `/` with just a title `Home Page`.
2. `PeoplePage` available at `/people` with a title `People Page`.
3. Redirect from `/home` to `/`.
4. `NotFoundPage` with a title `Page not found` that is shown for all the other URLs.
5. `Navbar` with 2 links `Home` and `People` with the active one having a distinctive background.
6. Ability to share a link to any page on Github pages.
7. `people` is fetched from [the API](https://mate-academy.github.io/react_people-table/api/people.json) when `PeoplePage` is opened.
8. `people` is passed to `PeopleTable` component and rendered as a table.
9. Each name in the table is a link a to `/people/:slug` (including mother and father)
    - distinguish women names.
    - if there is no person with a given name among the people, name is kept as a text (not a link).
    - if the motherName or fatherName is empty, `-` is put to the table.
10. The row of the selected person is highlighed.

## Demo

https://sapnachoudhary06.github.io/react_people-table-basics/

## Run Locally

Clone the project

```bash
  git clone https://github.com/sapnachoudhary06/react_people-table-basics.git
```

Go to the project directory

```bash
  cd react_people-table-basics
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## 🛠 Skills
Javascript, TypeScript, HTML, CSS, React, React Router and hooks.
