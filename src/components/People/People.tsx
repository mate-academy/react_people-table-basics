import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { getPersonByName } from '../PersonLink/helper';
import { PersonLink } from '../PersonLink';

export const People: FC = memo(
  () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isError, setError] = useState(false);
    const [isLoadedPeople, setLoadedPeople] = useState(false);

    const { slug = '' } = useParams();

    useEffect(() => {
      try {
        getPeople()
          .then((peopleFromServer) => {
            setPeople(peopleFromServer);
            setLoadedPeople(true);
          });
      } catch (error) {
        setError(true);
      }
    }, []);

    const isNoPeople = useMemo(() => {
      return !isError && isLoadedPeople && !people.length;
    }, [isError, isLoadedPeople, people.length]);

    const peopleWithParents = useCallback(
      () => {
        return people.map((person, _, arr) => ({
          ...person,
          mother: getPersonByName(arr, person.motherName),
          father: getPersonByName(arr, person.fatherName),
        }));
      }, [people],
    );

    return (
      <>
        <h1 className="title">People Page</h1>
        <div className="block">
          <div className="box table-container">

            {!isLoadedPeople && (
              <div className="container">
                <Loader />

                {isError && (
                  <p data-cy="peopleLoadingError" className="has-text-danger">
                    Something went wrong
                  </p>
                )}

                {isNoPeople && (
                  <p data-cy="noPeopleMessage">
                    There are no people on the server
                  </p>
                )}
              </div>
            )}

            {isLoadedPeople && (
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
                  {peopleWithParents().map(person => (
                    <PersonLink
                      key={person.slug}
                      person={person}
                      slug={slug}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </>
    );
  },
);
