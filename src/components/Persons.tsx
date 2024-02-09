import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { getPeople } from '../api';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const PersonsList: React.FC = () => {
  const [loader, setLoader] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const { personSlug } = useParams();

  useEffect(() => {
    setLoader(true);

    setTimeout(() => {
      getPeople()
        .then(setPeople)
        .catch(() => (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        ))
        .finally(() => setLoader(false));
    }, 300);
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="title">People Page</h1>
      </div>

      <div className="block">
        <div className="box table-container">
          {loader
            ? <Loader />
            : (
              <>
                {people.length === 0 && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
                <table
                  data-cy="peopleTable"
                  // eslint-disable-next-line max-len
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
                    {people.map((person: Person) => (
                      <PersonLink
                        people={people}
                        key={person.slug}
                        person={person}
                        personSlug={personSlug}
                      />
                    ))}
                  </tbody>
                </table>
              </>
            )}
        </div>
      </div>
    </>
  );
};
