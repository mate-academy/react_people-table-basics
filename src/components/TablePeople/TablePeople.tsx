import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { Errors } from '../../errors';
import { ErrorsMessage } from '../../types/ErrorsMessages';
import { TableHead } from '../TableHead';
import { Loader } from '../Loader';
import { TableBody } from '../TableBody/TableBody';

export const TablePeople = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setErrors] = useState<ErrorsMessage | null>(null);

  const handleGetPeople = () => {
    setLoading(true);

    getPeople()
      .then(setPeople)
      .catch(() => {
        setErrors(Errors.defaultError);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    handleGetPeople();
  }, []);
  {
    /* <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>

        <p data-cy="noPeopleMessage">There are no people on the server</p> */
  }

  return (
    <div className="block">
      <div className="box table-container">
        {loading ? (
          <Loader />
        ) : (
          <table
            data-cy="peopleTable"
            className="table is-striped is-hoverable is-narrow is-fullwidth"
          >
            <TableHead />
            <TableBody people={people} />
          </table>
        )}
      </div>
    </div>
  );
};
