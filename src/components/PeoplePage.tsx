import { FC, useEffect, useState } from 'react';
import { People } from '../types/People';
import { getPeople } from '../api/people';
import { PeopleTable } from './PeopleTable';

export const PeoplePage: FC = () => {
  const [people, setPeople] = useState<People[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function retrievePeople() {
      const result = await getPeople();

      setLoading(false);
      setPeople(result);
    }

    retrievePeople();
  }, []);

  return (
    <section>
      <h2 className="title">People page</h2>
      {!loading && <PeopleTable people={people} />}
    </section>
  );
};
