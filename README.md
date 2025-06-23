# React People Table

> Here is [the working example](https://mate-academy.github.io/react_people-table-basics/)

Implement the `App` with 2 pages and ability to select a person in the table.

1. Create the `HomePage` available at `/` with just a title `Home Page`
1. Create the `PeoplePage` available at `/people` with a title `People Page`
1. Use [Navigate](https://reactrouter.com/docs/en/v6/components/navigate) component to redirect from `/home` to `/`;
    - add `replace` attribute not to save `/home` URL in the [browser history](https://reactrouter.com/en/main/start/tutorial#managing-the-history-stack) and avoid navigation loop when you press browser `Go back` button.
1. Implement `NotFoundPage` with a title `Page not found` that is shown for all the other URLs;
1. Add the `Navbar` with 2 links `Home` and `People`. Active one should have the `has-background-grey-lighter` class;
1. Use `HashRouter` to be able to share a link to any page on Github pages;
1. Fetch `people` from [the API](https://mate-academy.github.io/react_people-table/api/people.json) when `PeoplePage` is opened;
1. Pass `people` to `PeopleTable` component and render as a table (see the given markup);
1. Make each name in the table a link a to `/people/:slug` (including mother and father)
    - create the `<PersonLink person={person} />` and use it for all existing people;
    - add the `has-text-danger` class for women names;
    - if there is no person with a given name among the people just keep the name as a text (not a link);
    - if the motherName or fatherName is empty put `-` to the table
1. Highlight the row of the selected person with the `has-background-warning` class;

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://DenisPitsul.github.io/react_people-table-basics/) and add it to the PR description.
