# React People Table

> Here is [the working example](https://mate-academy.github.io/react_people-table-basics/)

Implement the `App` with 2 pages and ability to select a person in the table.

1. Make each name in the table a link a to `/people/:slug` (including mother and father)
    - create the `<PersonLink person={person} />` and use it for all existing people;
    - if there is no person with a given name among the people just keep the name as a text (not a link);
    - if the motherName or fatherName is empty put `-` to the table

## Instructions
- Install Prettier Extention and use this [VSCode settings](https://mate-academy.github.io/fe-program/tools/vscode/settings.json) to enable format on save.
- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://kostivkostiv.github.io/react_people-table-basics/) and add it to the PR description.
