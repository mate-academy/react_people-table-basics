import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import PersonItem from '../components/PersonItem';

const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isError) {
      setIsLoading(true);
      getPeople()
        .then(result => {
          const personWithParents = result.map(person => {
            const modifiedPerson = { ...person };
            const mam = result.find(p => p.name === person.motherName);
            const dad = result.find(p => p.name === person.fatherName);

            if (mam) {
              modifiedPerson.mother = mam;
            }

            if (dad) {
              modifiedPerson.father = dad;
            }

            return modifiedPerson;
          });

          setPeople(personWithParents);
        })
        .catch(() => {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        })
        .finally(() => setIsLoading(false));
    }
  }, [isError]);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {people.length === 0 && !isError && !isLoading && (
              <p data-cy="noPeopleMessage">There are no people on the server</p>
            )}

            {people.length > 0 && (
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
                    <PersonItem key={person.slug} person={person} />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PeoplePage;
