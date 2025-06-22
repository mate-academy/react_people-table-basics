import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { Errors } from '../../errors';
import { ErrorsKey } from '../../types/ErrosKey';
import { TableHead } from '../TableHead';
import { Loader } from '../Loader';
import { TableBody } from '../TableBody/TableBody';
import { getPeople } from '../../api';

export const PeopleTable = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorsKey, setErrorsKey] = useState<ErrorsKey | null>(null);

  const handleGetPeople = () => {
    setLoading(true);

    getPeople()
      .then(data => {
        setPeople(data);
        if (data.length === 0) {
          setErrorsKey('noPeopleMessage');
        }
      })
      .catch(() => {
        setErrorsKey('peopleLoadingError');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetPeople();
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">
          {loading ? (
            <Loader />
          ) : errorsKey ? (
            <p data-cy={errorsKey}>{Errors[errorsKey]}</p>
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
    </>
  );
};
