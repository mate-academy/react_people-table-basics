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
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://NemH.github.io/react_people-table-basics/) and add it to the PR description.

Реалізуйте `App` з 2 сторінками та можливістю вибору особи в таблиці.

1. Створіть `HomePage`, доступну за адресою `/`, лише з назвою `Home Page`

1. Створіть `PeoplePage`, доступну за адресою `/people`, з назвою `People Page`

1. Використовуйте компонент [Navigate](https://reactrouter.com/docs/en/v6/components/navigate) для перенаправлення з `/home` на `/`;
- додайте атрибут `replace`, щоб не зберігати URL-адресу `/home` в [історії браузера](https://reactrouter.com/en/main/start/tutorial#managing-the-history-stack) та уникати циклу навігації при натисканні кнопки `Go Back` у браузері.

1. Реалізуйте `NotFoundPage` із назвою `Сторінку не знайдено`, яка відображається для всіх інших URL-адрес;

1. Додайте `Navbar` з 2 посиланнями `Home` та `People`. Активний повинен мати клас `has-background-grey-lighter`;
1. Використовуйте `HashRouter`, щоб мати змогу ділитися посиланням на будь-яку сторінку на сторінках Github;
1. Отримуйте `people` з [API](https://mate-academy.github.io/react_people-table/api/people.json) під час відкриття `PeoplePage`;
1. Передавайте `people` до компонента `PeopleTable` та відображайте як таблицю (див. надану розмітку);
1. Зробіть кожне ім'я в таблиці посиланням на `/people/:slug` (включаючи матір та батька)
- створіть `<PersonLink person={person} />` та використовуйте його для всіх існуючих людей;
- додайте клас `has-text-danger` для жіночих імен;
- якщо серед людей немає людини з певним ім'ям, просто збережіть ім'я як текст (не посилання);
- якщо motherName або fatherName порожні, додайте `-` до таблиці
1. Виділіть рядок вибраної особи за допомогою класу `has-background-warning`;
