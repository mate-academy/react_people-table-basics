import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api';
import { Person } from '../../types/Person';
import { Loader } from '../Loader';
import { PersonLink } from '../PersonLink';

export const PeopleTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const [error, setError] = useState<boolean>(false);

  const { slug } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getPeople().then(setPeople).catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <>
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            <Loader />
          </div>
        </div>
      </>

    );
  }

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

          {(people.length === 0 && isLoading === false) && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

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

              {people.map(person => (

                <PersonLink
                  key={person.slug}
                  person={person}
                  motherSlug={
                    people.find(
                      mother => mother.name === person.motherName,
                    )?.slug
                  }
                  fatherSlug={
                    people.find(
                      father => father.name === person.fatherName,
                    )?.slug
                  }
                  slug={slug}
                />

              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>

  );
};
