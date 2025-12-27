import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import PeopleTable from '../components/PeopleTable';
import { Loader } from '../components/Loader';
import { getPeople } from '../api';

interface PeoplePageProps {
  selectedPerson: Person | null;
  setSelectedPerson: (person: Person | null) => void;
  slug?: string | null;
}

const PeoplePage: React.FC<PeoplePageProps> = ({
  selectedPerson,
  setSelectedPerson,
}) => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);

        if (slug) {
          const person = data.find(p => p.slug === slug) || null;

          setSelectedPerson(person);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug, setSelectedPerson]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p data-cy="peopleLoadingError" className="has-text-danger">
        Something went wrong
      </p>
    );
  }

  if (people.length === 0) {
    return <p data-cy="noPeopleMessage">There are no people on the server</p>;
  }

  return (
    <div>
      <h1 className="title" data-cy="title">
        People Page
      </h1>
      <PeopleTable
        people={people}
        selectedPerson={selectedPerson}
        setSelectedPerson={setSelectedPerson}
      />
    </div>
  );
};

export default PeoplePage;
