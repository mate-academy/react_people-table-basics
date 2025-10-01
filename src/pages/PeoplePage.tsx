import React, { useEffect, useState } from 'react';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { Person } from '../types/Person'; // <-- importar o tipo correto
import PeopleTable from '../components/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]); // <-- usar tipo importado
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const data = await getPeople();

        setPeople(data); // ✅ data já será Person[]
      } catch {
        // opcional: lidar com erro sem console
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <PeopleTable people={people} />;
};
