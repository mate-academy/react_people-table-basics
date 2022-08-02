import { PersonInterface } from '../../react-app-env';

type Props = {
  person: PersonInterface,
};

const getFirstName = (fullName: string): string => fullName.split(' ')[0];

export const Person: React.FC<Props> = ({ person }) => (
  <>
    <th>
      {person.name}
    </th>

    <td>
      {person.sex}
    </td>

    <td>
      {person.born}
    </td>

    <td>
      {person.died}
    </td>

    <td>
      {person.motherName && getFirstName(person.motherName)}
    </td>

    <td>
      {person.fatherName && getFirstName(person.fatherName)}
    </td>
  </>
);
