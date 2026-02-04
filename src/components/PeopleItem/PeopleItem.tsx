import { Person } from '../../types/Person';

type Props = {
  person: Person;
};

export const PeopleItem = ({ person }: Props) => {
  return (
    <tr data-cy="person">
      <td>
        <a href="#/people/jan-van-brussel-1714">{person.name}</a>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName ?? '-'}</td>
      <td>{person.fatherName ?? '-'}</td>
    </tr>
  );
};
