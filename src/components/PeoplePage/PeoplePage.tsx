import { useEffect, useState } from 'react';
import { Person } from '../../types/Person';
import { getPeople } from '../../api';
import { useParams } from 'react-router-dom';
import { Loader } from '../Loader';
import { WrongMessage } from '../WrongMessage';
import { NoPeopleMessage } from '../NoPeopleMessage';
import { PeopleTable } from '../PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, SetError] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPeople()
      .then(data => setPeople(data))
      .catch(() => SetError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    <WrongMessage />;
  }

  if (people.length === 0) {
    <NoPeopleMessage />;
  }

  return <PeopleTable people={people} slug={slug} />;
};
