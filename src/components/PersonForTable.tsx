import { Link, useParams } from 'react-router-dom';
import { Person } from '../types';
import classNames from 'classnames';

type Props = {
  person: Person;
  people: Person[];
};

export const PersonForTable: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  const selectedPerson = personSlug ? personSlug : '';

  function findParentLink(name: string | null) {
    if (name === null) {
      return '-';
    }

    const parent = people.find(p => p.name === name);

    if (parent && parent.sex === 'f') {
      return <Link to={`../${parent.slug}`} className="has-text-danger">
        {parent.name}
      </Link>;
    }

    if (parent && parent.sex === 'm') {
      return <Link to={`../${parent.slug}`}>{parent.name}</Link>;
    }

    return name;
  }

  return (
    <tr
      data-cy="person"
      className={classNames({
        'has-background-warning': selectedPerson === person.slug,
      })}
    >
      <td>
        <Link
          to={`../${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>{findParentLink(person.motherName)}</td>
      <td>{findParentLink(person.fatherName)}</td>
    </tr>
  );
};
