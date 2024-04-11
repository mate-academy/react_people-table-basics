import classNames from 'classnames';
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [noPeopleOnServer, setNoPeopleOnServer] = useState<boolean>(false);
  const { slug } = useParams();

  useEffect(() => {
    setLoader(true);
    setError(false);
    setNoPeopleOnServer(false);
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => {
        if (people.length === 0) {
          setNoPeopleOnServer(true);
        }

        setLoader(false);
      });
  }, [people.length]);

  return (
    <div className="block">
      <div className="box table-container">
        {loader && <Loader />}

        {error && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {noPeopleOnServer && (
          <p data-cy="noPeopleMessage">There are no people on the server</p>
        )}

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
            {people.map((person: Person) => (
              <tr
                data-cy="person"
                key={person.name + person.motherName + person.father}
                className={classNames({
                  'has-background-warning': slug === person.slug,
                })}
              >
                <PersonLink person={person} people={people} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
