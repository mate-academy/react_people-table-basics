import { useContext } from 'react';
import { PeopleContext } from '../../Contexts/PeopleContext';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import PersonLink from '../PersonLink/PersonLink';

export const PeopleTable = () => {
  const { people } = useContext(PeopleContext);
  const params = useParams();

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.slug}
            className={cn({
              'has-background-warning': params.personSlug === person.slug,
            })}
          >
            <td>
              <Link
                to={`/people/${person.slug}`}
                className={cn({ 'has-text-danger': person.sex === 'f' })}
              >
                {person.name}
              </Link>
            </td>

            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>
              <PersonLink
                person={person.mother}
                personName={person.motherName || undefined}
                people={people}
                isMother
              />
            </td>
            <td>
              <PersonLink
                person={person.father}
                personName={person.fatherName || undefined}
                people={people}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
