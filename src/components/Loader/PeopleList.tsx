import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { Loader } from './Loader';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { PersonLink } from './PersonLink';

export const PeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peopleMessage, setPeopleMessage] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const { slug } = useParams();

  function getPersonByName(name: string) {
    return people.find((person) => person.name === name);
  }

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((response) => {
        setPeople(response);

        if (response.length === 0) {
          setPeopleMessage(true);
        }
      })

      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="block">
      <div className="box table-container">

        {isLoading && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {peopleMessage && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}

        {!isLoading && (
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
              {people.map(person => {
                const {
                  motherName,
                  fatherName,
                  sex,
                  born,
                  died,
                } = person;

                const mother = motherName ? getPersonByName(motherName)
                  : undefined;
                const father = fatherName ? getPersonByName(fatherName)
                  : undefined;

                return (
                  <tr
                    data-cy="person"
                    key={person.slug}
                    className={
                      cn(
                        {
                          'has-background-warning':
                            slug === person.slug,
                        },
                      )
                    }
                  >

                    <td>
                      <PersonLink person={person} />
                    </td>
                    <td>{sex}</td>
                    <td>{born}</td>
                    <td>{died}</td>

                    <td>
                      {(motherName
                    && (mother ? <PersonLink person={mother} /> : motherName))
                    || '-'}
                    </td>

                    <td>
                      {(fatherName
                    && (father ? <PersonLink person={father} /> : fatherName))
                    || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
