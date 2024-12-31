import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { getPeople } from '../../api';
import { PeopleTable } from '../PeopleTabel/PeopleTable';
import { Person } from '../../types/Person';
import { ErrorTypes } from '../../types/ErrorTypes';
import * as utils from '../../utils/infoHelper';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorTypes>(ErrorTypes.NO_ERROR);

  useEffect(() => {
    const getPeopleList = async () => {
      try {
        setLoading(true);
        const peopleList = await getPeople();
        const formattedPeopleList = utils.formPeopleData(peopleList);

        setPeople(formattedPeopleList);
      } catch {
        setError(ErrorTypes.LOAD_ERROR);
      }

      setLoading(false);
    };

    getPeopleList();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <PeopleTable people={people} />

              {error && (
                <p data-cy="peopleLoadingError" className="has-text-danger">
                  {error}
                </p>
              )}

              {!people.length && (
                <p data-cy="noPeopleMessage">
                  There are no people on the server
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};
