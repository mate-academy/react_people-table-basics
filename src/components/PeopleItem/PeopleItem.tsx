import { Person } from '../../types/Person';
import { PersonLink } from '../PersonLink';

type Props = {
  person: Person;
};

export const PeopleItem = ({ person }: Props) => {
  return (
    <tr data-cy="person">
      <td>
        <PersonLink slug={person.slug} name={person.name} />
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{person.motherName ?? '-'}</td>
      <td>{person.fatherName ?? '-'}</td>
    </tr>
  );
};
