import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../../api/getPeople';
import { Person } from '../../types/Person';
import { PeopleTable } from '../../components/PeopleTable/PeopleTable';

export const PeoplePage = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    getPeople()
      .then(setPeople)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // eslint-disable-next-line curly, react/jsx-no-undef
  if (error)
    // eslint-disable-next-line curly
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  if (people.length === 0)
    // eslint-disable-next-line curly
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;

  return (
    <div className="block">
      <h1 className="title">People Page</h1>
      <div className="box table-container">
        <PeopleTable people={people} selectedSlug={slug} />
      </div>
    </div>
  );
};
