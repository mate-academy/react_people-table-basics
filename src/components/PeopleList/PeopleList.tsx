import { useEffect, useState } from 'react';
import { PersonType } from '../../types';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import {
  tableColumnNames,
} from '../../utils/consts';
import { Person } from '../Person/Person';
import { getPreparedPeople } from '../../utils/getPreparedPeople';

type Props = {};

export const PeopleList: React.FC<Props> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<PersonType[]>([]);

  const [isLoadingErrorShown, setIsLoadingErrorShown] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then((persons) => {
        const preparedPeople: PersonType[] = getPreparedPeople(persons);

        setPeople(preparedPeople);
      })
      .catch(() => {
        setIsLoadingErrorShown(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const isDataAvailable = !isLoadingErrorShown && !!people.length;
  const isDataEmptyAndNoErrors = !people.length
    && !isLoadingErrorShown && !isLoading;

  return (
    <div className="block">
      <div className="box table-container">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {isDataAvailable && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    {tableColumnNames.map(name => (
                      <th key={name}>
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {people.map((person) => {
                    return (
                      <Person person={person} />
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
        {isLoadingErrorShown && (
          <p data-cy="peopleLoadingError" className="has-text-danger">
            Something went wrong
          </p>
        )}

        {isDataEmptyAndNoErrors && (
          <p data-cy="noPeopleMessage">
            There are no people on the server
          </p>
        )}
      </div>
    </div>
  );
};
