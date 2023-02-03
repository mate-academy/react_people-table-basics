/* eslint-disable max-len */
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader';
import { TableRow } from '../TableRow';

export const PeopleTable = React.memo(() => {
  const { personId = '' } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<JSX.Element | null>(null);

  const noPeopleMessage = useMemo(() => (
    <p data-cy="noPeopleMessage">
      There are no people on the server
    </p>
  ), []);

  const peopleLoadingError = useMemo(() => (
    <p data-cy="peopleLoadingError" className="has-text-danger">
      Something went wrong
    </p>
  ), []);

  useEffect(() => {
    getPeople()
      .then(data => {
        if (data.length === 0) {
          setError(noPeopleMessage);
        }

        return data;
      })
      .then(setPeople)
      .catch(() => {
        setError(peopleLoadingError);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const peopleWithParents = useMemo(() => people.map(
    person => ({
      ...person,
      father: people.find(
        parent => person?.fatherName === parent.name || null,
      ),
      mother: people.find(
        parent => person?.motherName === parent.name || null,
      ),
    }),
  ), [people]);

  return (
    <div className="block">
      {
        error
      }
      {
        isLoading
          ? <Loader />
          : (
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
                  {
                    peopleWithParents.map(person => <TableRow key={person.slug} person={person} selectedPersonId={personId} />)
                  }
                </tbody>
              </table>
            </div>
          )
      }
    </div>
  );
});
