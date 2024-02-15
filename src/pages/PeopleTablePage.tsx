/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { PersonLink } from '../components/PersonLink';
import { Person } from '../types';

type Prop = {
  getPersonSlugByName: (fetchedPeople: Person[], name: string) => string;
  peopleSlug: string | undefined;
  fetchedPeople: Person[];
};

export const PeopleTable = ({
  getPersonSlugByName,
  peopleSlug,
  fetchedPeople,
}: Prop) => (
  <div className="block">
    <div className="box table-container">
      <table
        data-cy="peopleTable"
        className="
        table is-striped
        is-hoverable
        is-narrow is-fullwidth
        "
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
          {fetchedPeople.map((person: Person) => (
            <tr
              key={person.slug}
              data-cy="person"
              className={cn({
                'has-background-warning':
                  person.slug === peopleSlug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {fetchedPeople
                  .find((people: Person) => people.name === person.motherName)
                  ? (
                    <Link
                      to={`./${getPersonSlugByName(fetchedPeople, person.motherName || '')}`}
                      className="has-text-danger"
                    >
                      {person.motherName}
                    </Link>
                  ) : (
                    <span>
                      {person.motherName || '-'}
                    </span>
                  )}
              </td>
              <td>
                {fetchedPeople
                  .find((people: Person) => people.name === person.fatherName)
                  ? (
                    <Link
                      to={`./${getPersonSlugByName(fetchedPeople, person.fatherName || '')}`}
                    >
                      {person.fatherName}
                    </Link>
                  ) : (
                    <span>
                      {person.fatherName || '-'}
                    </span>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
