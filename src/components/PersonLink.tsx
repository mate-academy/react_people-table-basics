import classNames from 'classnames';
import { Person } from '../types';
import { Link, useParams } from 'react-router-dom';

type Props = {
  people: Person[];
  person: Person;
};

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const { slug } = useParams();

  return (
    <tr
      data-cy="person"
      className={classNames('', {
        'has-background-warning': slug === person.slug,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames('', {
            'has-text-danger': person.sex === 'f',
          })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      {person.motherName ? (
        people.find(human => human.name === person.motherName) ? (
          <td>
            <Link
              className="has-text-danger"
              to={`/people/${people.find(human => human.name === person.motherName)?.slug}`}
            >
              {person.motherName}
            </Link>
          </td>
        ) : (
          <td>{person.motherName}</td>
        )
      ) : (
        <td>-</td>
      )}

      {person.fatherName ? (
        people.find(human => human.name === person.fatherName) ? (
          <td>
            <Link
              to={`/people/${people.find(human => human.name === person.fatherName)?.slug}`}
            >
              {person.fatherName}
            </Link>
          </td>
        ) : (
          <td>{person.fatherName}</td>
        )
      ) : (
        <td>-</td>
      )}
    </tr>
  );
};
