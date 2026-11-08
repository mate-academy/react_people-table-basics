import { useState } from 'react';
import { TableOfPeoples } from '../TableOfPeoples/TableOfPeoples';

export const PeoplePage = () => {
  const [error, setError] = useState<string>('');

  return (
    <div data-cy="peoplePage">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          )}

          <TableOfPeoples setError={setError} />
        </div>
      </div>
    </div>
  );
};
