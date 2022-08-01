import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api/people';
import { People } from '../../types/People';
import { Loader } from '../Loader';
import { PersonRow } from '../PersonRow';
import './PeopleTable.scss';

export const PeopleTable: React.FC = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const peopleFromServer = await getPeople();

        setPeople(peopleFromServer);
        setLoading(false);
      } catch (error) {
        setLoadingError(true);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="PeopleTable">
      <h1
        style={{ textAlign: 'center' }}
        className="PeopleTable__title title"
      >
        People Page
      </h1>
      {loading ? (
        <Loader />
      ) : (
        <table className="PeopleTable__table table">
          <thead>
            <tr>
              <th>№</th>
              <th>Name</th>
              <th>Sex</th>
              <th>Born</th>
              <th>Died</th>
              <th>Father</th>
              <th>Mother</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person, index) => (
              <PersonRow
                key={person.slug}
                person={person}
                numPerson={index + 1}
              />
            ))}
          </tbody>
        </table>
      )}

      {loadingError && (
        'Error loading data'
      )}
    </div>
  );
};
