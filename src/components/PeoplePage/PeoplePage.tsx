import { useState } from 'react';
import useAsyncEffect from 'use-async-effect';

import { PeopleTable } from '../PeopleTable/PeopleTable';
import { getPeopleFromServer } from '../../api/getPeopleFromServer';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[] | null>(null);
  const [hasError, setHasError] = useState(false);

  useAsyncEffect(async () => {
    try {
      const peopleFromServer = await getPeopleFromServer();

      setHasError(false);
      setPeople(peopleFromServer);
    } catch (error) {
      setHasError(true);
    }
  }, []);

  return (
    <div className="PeoplePage">
      <h3 className="title is-3">People page</h3>

      {hasError && (
        <p className="error-message">
          Some troubles ;(
        </p>
      )}

      {people && <PeopleTable people={people} />}
    </div>
  );
};
