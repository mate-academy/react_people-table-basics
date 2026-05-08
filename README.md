# React People Table

> Here is [the working example](https://mate-academy.github.io/react_people-table-basics/)

Implement the `App` with 2 pages and ability to select a person in the table.

1. [x] Create the `HomePage` available at `/` with just a title `Home Page`
2. [x] Create the `PeoplePage` available at `/people` with a title `People Page`
3. [x] Use [Navigate](https://reactrouter.com/docs/en/v6/components/navigate) component to redirect from `/home` to `/`;
    - [x] add `replace` attribute not to save `/home` URL in the [browser history](https://reactrouter.com/en/main/start/tutorial#managing-the-history-stack) and avoid navigation loop when you press browser `Go back` button.
4. [x] Implement `NotFoundPage` with a title `Page not found` that is shown for all the other URLs;
5. [x] Add the `Navbar` with 2 links `Home` and `People`. Active one should have the `has-background-grey-lighter` class;
6. [x] Use `HashRouter` to be able to share a link to any page on Github pages;
7. [x] Fetch `people` from [the API](https://mate-academy.github.io/react_people-table/api/people.json) when `PeoplePage` is opened;
8. [x] Pass `people` to `PeopleTable` component and render as a table (see the given markup);
9. [x] Make each name in the table a link a to `/people/:slug` (including mother and father)
    - [x] create the `<PersonLink person={person} />` and use it for all existing people;
    - [x] add the `has-text-danger` class for women names;
    - [x] if there is no person with a given name among the people just keep the name as a text (not a link);
    - [x] if the motherName or fatherName is empty put `-` to the table
10. [x] Highlight the row of the selected person with the `has-background-warning` class;

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://sanchez-primal.github.io/react_people-table-basics/) and add it to the PR description.

# GitHub tests retries
2
