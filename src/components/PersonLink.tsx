/* eslint-disable no-nested-ternary */
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../types';

type Props = {
  people: Person[],
  person: Person,
};

export const PersonLink: React.FC<Props> = ({ people, person }) => {
  const { personSlug } = useParams();
  const personMother = people.find(
    currentPerson => currentPerson.name === person.motherName,
  );
  const personFather = people.find(
    currentPerson => currentPerson.name === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={classNames(
        { 'has-background-warning': personSlug === person.slug },
      )}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={classNames({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>

      <td>
        {personMother ? (
          <Link
            className="has-text-danger"
            to={`/people/${personMother.slug}`}
          >
            {person.motherName !== null ? person.motherName : '-'}
          </Link>
        ) : (
          person.motherName !== null ? person.motherName : '-'
        )}
      </td>

      <td>
        {personFather ? (
          <Link to={`/people/${personFather.slug}`}>
            {person.fatherName !== null ? person.fatherName : '-'}
          </Link>
        ) : (
          person.fatherName !== null ? person.fatherName : '-'
        )}
      </td>
    </tr>
  );
};
