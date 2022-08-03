# React - People table

- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://LAndrikevych.github.io/react_people-table-basics/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## If you don't use **Typescript**
1. Rename `.tsx` files to `.jsx`
1. use `eslint-config-react` in `.eslintrs.js`
=======

1. Install all the NPM packages you need;
1. Implement `HomePage` available at `/` with just a title `Home Page`
1. Implement `PeoplePage` available at `/people` with a title `People Page`
1. Use [Navigate](https://reactrouter.com/docs/en/v6/components/navigate) component to redirect from `/home` to `/`;
    - add `replace` attribute to not save `/home` route in [browser history](https://reactrouter.com/docs/en/v6/getting-started/concepts#history-and-locations) and avoid navigation loop
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