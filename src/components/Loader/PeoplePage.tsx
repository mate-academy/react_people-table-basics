import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from './Loader';
import { PeopleTable } from './PersonalTable';
import { getPeople } from '../../api';
import { Person } from '../../types';

// const API_URL =
//   'https://mate-academy.github.io/react_people-table/api/people.json';

// export const getPeople = () => {
//   return fetch(API_URL).then(response => {
//     if (!response.ok) {
//       throw new Error();
//     }

//     return response.json();
//   });
// };

export const PeoplePage = () => {
  const { slug } = useParams();

  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasErrow, setHasErrow] = useState(false);

  useEffect(() => {
    getPeople()
      .then(data => {
        setPeople(data);
        setIsLoading(false);
      })
      .catch(() => {
        setHasErrow(true);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {hasErrow && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {!isLoading && people.length === 0 && (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}

          {!isLoading && people.length > 0 && (
            <PeopleTable people={people} selectedSlug={slug} />
          )}
        </div>
      </div>
    </>
  );
};
