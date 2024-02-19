import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';
import cn from 'classnames';
import { Person } from '../types';
import { PeopleContex } from '../store/PeopleContex';

interface Prop {
  person: Person
}
export const PersonLink:React.FC<Prop> = ({ person }) => {
  const { slug } = useParams();
  const selectedPerson = slug;

  const { people } = useContext(PeopleContex);

  const women = person.sex === 'f';
  const samePersonMother = people?.find(
    el => el.name === person.motherName,
  );

  const samePersonFather = people?.find(
    el => el.name === person.fatherName,
  );

  return (
    <tr
      data-cy="person"
      className={cn('', {
        'has-background-warning': person.slug === selectedPerson,
      })}
    >
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn('', { 'has-text-danger': women })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {samePersonMother && (
          <Link
            to={`/people/${samePersonMother.slug}`}
            className="has-text-danger"

          >
            {person.motherName ? person.motherName : '-'}
          </Link>
        ) }

        {!samePersonMother && (
          person.motherName ? person.motherName : '-'
        )}
      </td>
      <td>
        {samePersonFather && (
          <Link to={`/people/${samePersonFather.slug}`}>
            {person.fatherName ? person.fatherName : '-'}
          </Link>
        ) }

        {!samePersonFather && (
          person.fatherName ? person.fatherName : '-'
        )}

      </td>
    </tr>
  );
};
