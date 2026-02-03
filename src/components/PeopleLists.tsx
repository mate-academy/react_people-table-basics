import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Person } from '../types';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { PersonLink } from './PersonLink';

export const PeopleLists = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peoplesLists, setPeoplesLists] = useState<Person[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage(null);

    getPeople()
      .then(data => {
        setPeoplesLists(data);
      })
      .catch(() => {
        setErrorMessage('Something went wrong');
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="box table-container">
      {isLoading && <Loader />}

      {errorMessage && (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          {errorMessage}
        </p>
      )}

      {!isLoading && !errorMessage && peoplesLists.length === 0 && (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      )}

      {peoplesLists.length > 0 && (
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
            {peoplesLists.map(person => {
              const mother = peoplesLists.find(
                p => p.name === person.motherName,
              );
              const father = peoplesLists.find(
                p => p.name === person.fatherName,
              );

              return (
                <tr
                  data-cy="person"
                  className={
                    person.slug === slug ? 'has-background-warning' : ''
                  }
                  key={person.slug}
                >
                  <td>
                    <PersonLink person={person} nameFallBack={person.name} />
                  </td>

                  <td>{person.sex}</td>
                  <td>{person.born}</td>
                  <td>{person.died}</td>

                  <td>
                    {person ? (
                      <PersonLink
                        person={mother}
                        nameFallBack={person.motherName}
                      />
                    ) : (
                      '-'
                    )}
                  </td>

                  <td>
                    <PersonLink
                      person={father}
                      nameFallBack={person.fatherName}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
