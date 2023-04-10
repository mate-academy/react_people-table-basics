import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink/PersonLink';

type Props = {
  people: Person[],
  selectedSlug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, selectedSlug }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped
          is-hoverable is-narrow is-fullwidth"
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
        {people.map(({
          name, sex, born, died, fatherName,
          motherName, slug,
        }: Person) => {
          const isMother = people.find(person => person.name === motherName);
          const isFather = people.find(person => person.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames(
                { 'has-background-warning': slug === selectedSlug },
              )}
            >
              <td>
                <Link
                  to={`/people/${slug}`}
                  className={classNames(
                    { 'has-text-danger': sex === 'f' },
                  )}
                >
                  {name}
                </Link>
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                { isMother ? (
                  <PersonLink person={isMother} />
                ) : (
                  motherName || '-'
                )}
              </td>

              <td>
                { isFather ? (
                  <PersonLink person={isFather} />
                ) : (
                  fatherName || '-'
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
