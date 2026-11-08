import { useEffect, useState } from 'react';

import { Person } from '../../types';
import { getPeople } from '../../api';
import { PersonRow } from '../PersonRow/PersonRow';
import { Loader } from '../Loader';

type Props = {
  setError: (error: string) => void;
};

export const TableOfPeoples: React.FC<Props> = ({ setError }) => {
  const [table, setTable] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPeople()
      .then(info => {
        setTable(info);
        setError('');
        setIsLoading(false);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => {
        setIsLoading(false);
      });
  }, [setError]);

  return isLoading ? (
    <Loader />
  ) : table.length === 0 ? (
    <p data-cy="noPeopleMessage">There are no people on the server</p>
  ) : (
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
        {table.map(person => {
          const mother: Person | undefined = table.find(
            parent => parent.name === person.motherName,
          );

          const father: Person | undefined = table.find(
            parent => parent.name === person.fatherName,
          );

          return (
            <PersonRow
              person={person}
              mother={mother}
              father={father}
              key={person.slug}
            />
          );
        })}
      </tbody>
    </table>
  );
};
