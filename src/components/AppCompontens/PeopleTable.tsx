import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { People } from './People';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isErrorHappend, setIsErrorHappend] = useState(false);
  let isLoaded = false;

  const gettingPeople = async () => {
    try {
      const peopleFromServer = await getPeople();

      setPeople(peopleFromServer);
    } catch (error) {
      await setIsErrorHappend(true);
    }

    isLoaded = true;
  };

  useEffect(() => {
    gettingPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {!people.length && !isErrorHappend
            ? (<Loader />)
            : (
              <>
                {isLoaded && !people.length && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}

                {isErrorHappend
                  ? (
                    <p data-cy="peopleLoadingError" className="has-text-danger">
                      Something went wrong
                    </p>
                  )
                  : (
                    <table
                      data-cy="peopleTable"
                      className="
                      table
                      is-striped
                      is-hoverable
                      is-narrow
                      is-fullwidth"
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
                          <People
                            key={person.slug}
                            person={person}
                            people={people}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
              </>
            )}
        </div>
      </div>
    </>
  );
};
