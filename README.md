# People Table

## Main functionality:
- After downloading the application, the user sees two tabs `"Home"` and `"People"`. By default, the link "Home" is selected and the path `"/"` is indicated in the URL bar of the browser.
- When you switch to the `"People" tab`, the list of people from the server is loaded and the table of people is drawn. The URL contains the path `"/people"`.
- Column `"Name"` is interactive, when you click on the name, this row will be `highlighted` and the `slug` of this user will be added to the URL.
- The columns `"Mother"` and `"Father"` contain links to people in the table (if they are specified) and when you click on them, the selected name will be highlighted (the URL will be changed accordingly).

## Technical specifications:
 - The application was created using the `React` library (functional components) + `TypeScript`.
 - State management is implemented using `"Use state"` React hooks for the application's data.
 - All links in the table are implemented using the `"Link"` component from the `React-Router` library. The slug data is passed through the components by reading it from the browser string using the `"Use Params"` hook.
 - The design is made using `Bulma's` CSS framework.
 - Requests to the server are implemented by using `Fetch` .

## [DEMO LINK](https://illnino380.github.io/react_people-table-basics/)
