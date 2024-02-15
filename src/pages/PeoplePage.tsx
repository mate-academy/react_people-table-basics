/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';
import { NoPeople } from '../components/NoPeople';
import { PeopleTable } from './PeopleTablePage';

export const PeoplePage = () => {
  const { peopleSlug } = useParams();
  const [fetchedPeople, setFetchedPeople] = useState<Person[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPeople()
      .then((data) => {
        setFetchedPeople(data);
        setError(null);
      })
      .catch(() => setError('Something went wrong'))
      .finally(() => setLoading(false));
  }, []);

  const getPersonSlugByName = (people: Person[], name: string | null) => {
    const person = people.find((p: Person) => p.name === name);

    return person ? person.slug : '';
  };

  // if (error) {
  //   return (
  //     <div className="block">
  //       <div className="box table-container">
  //         <p data-cy="peopleLoadingError" className="has-text-danger">
  //           {error}
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      {error ? (
        <div className="block">
          <div className="box table-container">
            <p data-cy="peopleLoadingError" className="has-text-danger">
              {error}
            </p>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : (
            <>
              {fetchedPeople.length === 0 ? (
                <NoPeople />
              ) : (
                <>
                  <h1 className="title">People Page</h1>

                  <PeopleTable
                    getPersonSlugByName={getPersonSlugByName}
                    peopleSlug={peopleSlug}
                    fetchedPeople={fetchedPeople}
                  />
                </>
              )}
            </>
          )}
        </>
      )}
    </>

  );
};
