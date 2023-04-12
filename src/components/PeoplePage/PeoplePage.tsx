import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { Person } from '../../types/Person';
import { PersonModal } from '../PersonModal/PersonModal';
import { getPeople } from '../../api';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const { slug = '' } = useParams();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setIsLoading(true);

        const peopleData = await getPeople();

        setPeople(peopleData);
      } catch {
        setLoadingError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, []);

  let content = null;

  if (isLoading) {
    content = <Loader />;
  } else if (loadingError) {
    content = (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  } else if (!people.length) {
    content = (
      <p data-cy="noPeopleMessage">There are no people on the server</p>
    );
  } else {
    content = (
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
          {people.map((person) => (
            <PersonModal
              person={person}
              key={person.slug}
              selectedPersonSlug={slug}
              people={people}
            />
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">
        <div className="box table-container">{content}</div>
      </div>
    </>
  );
};
