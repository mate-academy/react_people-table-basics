# React - People table
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://DimaBrushnivskyi.github.io/react_people-table-basics/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## If you don't use **Typescript**
1. Rename `.tsx` files to `.jsx`
2. use `eslint-config-react` in `.eslintrs.js` 

## Basic tasks
1. Install all the NPM packages you need and types for them.
2. Implement `HomePage` available at `/` with just a title `Home page`.
3. Implement `PeoplePage` available at `/people` with a title `Peope page`.
4. Redirect to `/` from `/home`.
5. Implement `NotFoundPage` with a title `Page not found` that is shown for all the other URLs.
6. Add a `Header` visible everywhere with navigation links to both pages.
7. Create `getPeople` method fetching `people` from [API](https://mate-academy.github.io/react_people-table/api/people.json) when `PeoplePage` is opened
    - Find a `mother` and a `father` by `motherName` and `fatherName` and add them to the person for future use.
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
        <thead>...</thead>
        <tbody>...</tbody>
      </table>
      ```
    - add `border-collapse: collapse` style to the table.
9. Implement `PersonRow` component accepting a `person` and displaying all the data described above.
    ```html
    <tr class="Person">
      <td></td>
      ...
      <td></td>
    </tr>
    ```
