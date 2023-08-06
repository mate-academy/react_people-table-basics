import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  person: Person,
  people: Person[],
};

const findParent = (peopleFromServer: Person[], name?: string | null) => {
  if (name) {
    return peopleFromServer.find(pers => pers.name === name);
  }
  /* eslint-disable-next-line */
  return;
};

export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { personSlug } = useParams();
  const mother = findParent(people, person.motherName);
  const father = findParent(people, person.fatherName);

  return (
    <tr
      data-cy="person"
      key={person.slug}
      className={classNames({
        'has-background-warning': person.slug === personSlug,
      })}
    >
      <td>
        <Link
          to={`${person.slug}`}
          className={classNames({
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link
            to={`${mother.slug}`}
            className="has-text-danger"
          >
            {mother.name}
          </Link>
        ) : `${person.motherName || '-'}`}

      </td>

      <td>
        {father ? (
          <Link to={`${father.slug}`}>
            {father.name}
          </Link>
        ) : `${person.fatherName || '-'}`}
      </td>
    </tr>
  );
};
