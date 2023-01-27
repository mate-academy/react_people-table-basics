import {
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types';
import { Loader } from '../Loader/Loader';
import { PersonLink } from '../PersonLink';
import { getPersonByName } from '../PersonLink/helper';

export const People: FC = memo(
  () => {
    const [people, setPeople] = useState<Person[]>([]);
    const [isError, setError] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [isPeopleLoaded, setPeopleLoaded] = useState(false);

    const { slug = '' } = useParams();

    const loadPeople = useCallback(
      async () => {
        setLoading(true);

        try {
          const peopleFromServer = await getPeople();

          setPeople(peopleFromServer);
          setPeopleLoaded(true);
        } catch (error) {
          setError(true);
        } finally {
          setLoading(false);
        }
      }, [],
    );

    useEffect(() => {
      loadPeople();
    }, []);

    const peopleWithParents = useCallback(
      () => {
        return people.map((person, _, arr) => ({
          ...person,
          mother: getPersonByName(arr, person.motherName),
          father: getPersonByName(arr, person.fatherName),
        }));
      }, [people],
    );

    const isLoadedPeopleExist = isPeopleLoaded && people.length;
    const isLoadedPeopleNotExist = isPeopleLoaded && !people.length;

    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {isLoading && <Loader />}

            {isError && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {isLoadedPeopleNotExist && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {isLoadedPeopleExist && (
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
