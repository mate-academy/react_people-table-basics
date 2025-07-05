import { Person } from '../../types/Person';
import { PeopleTable } from '../PeopleTable/PeopleTable';
import { useState, useEffect } from 'react';
import { getPeople } from '../../api';
import { useLocation } from 'react-router-dom';

export const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState<Person[]>([]);
  const location = useLocation();

  // Extrai o slug da URL se existir
  const slug = location.pathname.split('/people/')[1];

  useEffect(() => {
    setIsLoading(true);
    getPeople()
      .then(data => {
        setPeople(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }, []);

  return (
    <>
      <h1 className="title">People Page</h1>
      <PeopleTable isLoading={isLoading} people={people} selectedSlug={slug} />
    </>
  );
};
