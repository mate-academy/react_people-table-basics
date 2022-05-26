import { FC } from 'react';

interface Props {
  human: Human,
  i: number,
  showPersonInfo(name: string): void,
}

export const PersonRow: FC<Props> = ({ human, i, showPersonInfo }) => (
  <tr
    key={human.name}
    className="PeopleTable__body-row"
    onClick={() => showPersonInfo(human.name)}
  >
    <td className="PeopleTable__body-cell">
      {i + 1}
    </td>
    <td className="PeopleTable__body-cell">
      {human.name}
    </td>
    <td className="PeopleTable__body-cell">
      {human.sex}
    </td>
    <td className="PeopleTable__body-cell">
      {human.born}
    </td>
    <td className="PeopleTable__body-cell">
      {human.died}
    </td>
    <td className="PeopleTable__body-cell">
      {human.motherName}
    </td>
    <td className="PeopleTable__body-cell">
      {human.fatherName}
    </td>
  </tr>
);
