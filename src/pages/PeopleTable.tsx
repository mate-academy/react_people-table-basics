import { Person } from '../types';
import { Link, useOutletContext, useParams } from 'react-router-dom';
import { PersonLink } from './PersonLink';

interface Props {
  peopleList: Person[];
  isError: boolean;
}

export const PeopleTable = () => {
  const { peopleList, isError } = useOutletContext<Props>();
  const { slug } = useParams();

  const findPersonSlugByName = (name: string | null): string | null => {
    const person = peopleList.find(p => p.name === name);

    return person ? person.slug : null;
  };

  const renderItems = (key: string | null, woman?: string | null) => {
    const slugValue = findPersonSlugByName(key);

    if (key) {
      if (slugValue) {
        return (
          <Link
            className={woman ? 'has-text-danger' : ''}
            to={`/people/${slugValue}`}
          >
            {key}
          </Link>
        );
      }

      return `${key}`;
    }

    return '-';
  };

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
        {!isError &&
          (peopleList.length ? (
            peopleList.map(person => {
              const woman = findPersonSlugByName(person.motherName);

              return (
                <tr
                  key={person.slug}
                  data-cy="person"
                  className={
                    slug === person.slug ? 'has-background-warning' : ''
                  }
                >
                  <td>
                    <PersonLink person={person} />
                  </td>
                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>
                  <td>{renderItems(person.motherName, woman)}</td>
                  <td>{renderItems(person.fatherName)}</td>
                </tr>
              );
            })
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          ))}
      </tbody>
    </table>
  );
};
