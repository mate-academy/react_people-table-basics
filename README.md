# React - People table

Implement the `App` with `Home page` available at `/` and `People page`
available at `/people`. Each page should have a corresponding title (`h1`).

1. Add the `nav` with 2 links `Home` and `People`
5. If the users enters the `/home` URL use the [Navigate](https://reactrouter.com/docs/en/v6/components/navigate)) component
  to the `/` page;
7. Add a `Header` visible everywhere with navigation links to both pages
2. Use `HashRouter` so the link to each page on Github Pages work as expected;
8. Create `getPeople` method fetching `people` from [API](https://mate-academy.github.io/react_people-table/api/people.json)
  when `PeoplePage` is opened
    - Find a `mother` and a `father` by `motherName` and `fatherName` and add them to the person for future use
8. Implement `PeopleTable` component accepting an array of people as a param and rendering them in a table
  It should show these columns:
    - `name`
    - `sex`
    - `born`
    - `died`
    - `mother`
    - `father`
      ```jsx harmony
      <PeopleTable people={people} />
      ```
      ```html
      <table className="PeopleTable">
        <th>...</th>
        <tbody>...</tbody>
      </table>
      ```
    - add `border-collapse: collapse` style to the table
9. Implement `PersonRow` component accepting a `person` and displaying all the data described above
    ```html
    <tr class="Person">
      <td></td>
      ...
      <td></td>
    </tr>
    ```

## Instructions

- Implement a solution following the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline).
- Use the [React TypeScript cheat sheet](https://mate-academy.github.io/fe-program/js/extra/react-typescript).
- Open one more terminal and run tests with `npm test` to ensure your solution is correct.
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://<your_account>.github.io/react_people-table-basics/) and add it to the PR description.

