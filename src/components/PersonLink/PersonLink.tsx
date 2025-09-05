import classNames from 'classnames';
import { Person } from '../../types';
import { Link, useParams } from 'react-router-dom';
import { ParentLink } from '../ParentLink';

type Props = {
  person: Person;
};
export function PersonLink({ person }: Props) {
  const { personId } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': person.slug === personId,
      })}
    >
      <td>
        <Link
          to={person.slug}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <ParentLink parentName={person.motherName} parent={person.mother} />
      <ParentLink parentName={person.fatherName} parent={person.father} />
    </tr>
  );
}
