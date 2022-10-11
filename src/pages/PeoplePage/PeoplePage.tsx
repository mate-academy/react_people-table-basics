import React, { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { Loader } from '../../components/Loader';
import { IPerson } from '../../types';
import PeopleTable from './PeopleTable';

const PeoplePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peopel, setPeople] = useState<IPerson[] | null>(null);

  const handleGetPeople = async () => {
    try {
      setIsLoading(true);
      const data = await getPeople();

      const dataWithParens = data.map(persone => {
        return {
          ...persone,
          mother: data.find(per => per.name === persone.motherName),
          father: data.find(per => per.name === persone.fatherName),
        };
      });

      setPeople(dataWithParens);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetPeople();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (!peopel) {
    return null;
  }

  return (
    <div className="block">
      <h1 className="title">People Page</h1>

      <div className="box table-container">
        <PeopleTable peopel={peopel} />
      </div>
    </div>
  );
};

export default PeoplePage;
