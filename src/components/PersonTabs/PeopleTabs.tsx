import { Loader } from '../Loader';
import { useEffect, useState } from 'react';
import { Person } from '../../types';
import { getPeople } from '../../api';
import classNames from 'classnames';
import { PersonLink } from '../PersonLink';
import { useParams } from 'react-router-dom';

export const PeopleTabs = () => {
  const [people, setPeople] = useState<Person[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, []);

  // const handleRowClick = (newSlug: string) => {
  //   setSelectedPersonSlug(newSlug);
  // };

  const findPersonByName = (name: string | undefined): Person | undefined => {
    if (!name) {
      return undefined;
    }

    return people.find(person => person.name === name);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div className="box table-container">
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
              // onClick={() => handleRowClick(person.slug)}
              className={classNames({
                // 'has-background-warning': selectedPersonSlug === person.slug,
                'has-background-warning': slug === person.slug,
              })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.died}</td>
              <td>
                {person.motherName ? (
                  findPersonByName(person.motherName) ? (
                    <PersonLink
                      person={findPersonByName(person.motherName) as Person}
                    />
                  ) : (
                    person.motherName
                  )
                ) : (
                  '-'
                )}
              </td>
              <td>
                {person.fatherName ? (
                  findPersonByName(person.fatherName) ? (
                    <PersonLink
                      person={findPersonByName(person.fatherName) as Person}
                    />
                  ) : (
                    person.fatherName
                  )
                ) : (
                  '-'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
