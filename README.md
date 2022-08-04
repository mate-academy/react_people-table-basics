# React - People table

1. Install all the NPM packages you need;
1. Implement `HomePage` available at `/` with just a title `Home Page`
1. Implement `PeoplePage` available at `/people` with a title `People Page`
1. Use [Navigate](https://reactrouter.com/docs/en/v6/components/navigate)) component to redirect from `/home` to `/`;
1. Implement `NotFoundPage` with a title `Page not found` that is shown for all the other URLs
1. Add a `Header` visible everywhere with navigation links to both pages;
1. Fetch `people` from [API](https://mate-academy.github.io/react_people-table/api/people.json) when `PeoplePage` is opened;
1. Use `HashRouter` to have navigation correctly working on Github pages;
1. Implement `PeopleTable` component receiving an array of people and rendering them in a [Bulma table](https://bulma.io/documentation/elements/table/)
1. The table should have these columns (tests expect these names wraped with `<th>` tag):
    - `Name`
    - `Sex`
    - `Born`
    - `Died`
    - `Mother` - only the name
    - `Father` - only the name
1. Add the `person` class to each `<tr>` containing a person;

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://Bielichenko.github.io/react_people-table-basics/) and add it to the PR description.
