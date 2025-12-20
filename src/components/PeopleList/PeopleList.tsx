import { Loader } from '../Loader';
import { useState } from 'react';
import { PeopleItem } from '../PeopleItem/PeopleItem';
import type { PeopleListType } from '../../types/PeopleListType';

export const PeopleList = ({
  peoplelist,
  loader,
  errortext,
}: PeopleListType) => {
  const [warning, setWarning] = useState<string>('');

  return (
    <>
      {loader && <Loader />}

      {!loader &&
        (peoplelist.length > 0 ? (
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
              {peoplelist.map(persons => (
                <PeopleItem
                  key={persons.slug}
                  person={persons}
                  people={peoplelist}
                  warning={warning}
                  onWarning={setWarning}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <span data-cy="noPeopleMessage">
            There are no people on the server
          </span>
        ))}
      {errortext !== '' ? (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      ) : (
        ''
      )}
    </>
  );
};
