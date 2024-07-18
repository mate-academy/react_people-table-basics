import { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getPeople } from '../../api';
import { Person as PersonType } from '../../types';
import { Person } from '../Person';

export const People: React.FC = () => {
  const [people, setPeople] = useState<PersonType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const list = await getPeople();
        setPeople(list);
      } catch {
        setError('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  const nameColor = (parentName: string | null) => {
    if (parentName === null) {
      return;
    }

    const insideNameList = people.find(el => el.name === parentName)?.sex;

    if (insideNameList === 'f') {
      return 'f';
    }

    if (insideNameList === 'm') {
      return 'm';
    }

    return;
  };

  const findSlug = (parentName: string | null) => {
    return people.find(el => el.name === parentName)?.slug;
  };

  return (
    <>
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {error && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isLoading ? (
            <Loader />
          ) : !!people.length ? (
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
                {people.map(el => (
                  <Person
                    key={el.slug}
                    name={el.name}
                    sex={el.sex}
                    born={el.born}
                    died={el.died}
                    mother={el.motherName}
                    father={el.fatherName}
                    slug={el.slug}
                    nameColor={nameColor}
                    findSlug={findSlug}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p data-cy="noPeopleMessage">There are no people on the server</p>
          )}
        </div>
      </div>
    </>
  );
};
