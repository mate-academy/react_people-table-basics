import {
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { PeopleTable } from '../PeopleTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

type PersonToTable = [] | [Person] | Person[];

export const PeoplePage = () => {
  const [people, setPeople] = useState<PersonToTable>([]);
  const [errorLoading, setErrorLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const { selectedSlug } = useParams();

  useEffect(() => {
    getPeople()
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErrorLoading(true);
      });
  }, []);

  const notEmptyPeopleArray = people.length > 0;

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {loading && (
            <Loader />
          )}

          {!loading && errorLoading && (
            <p
              data-cy="peopleLoadingError"
              className="has-text-danger"
            >
              Something went wrong
            </p>
          )}

          {!loading && !errorLoading && !notEmptyPeopleArray && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {!loading && !errorLoading && notEmptyPeopleArray && (
            <PeopleTable people={people} selectedSlug={selectedSlug || ''} />
          )}
        </div>
      </div>
    </>
  );
};
