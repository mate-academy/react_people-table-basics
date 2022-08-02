import { useState, useEffect } from 'react';
import { getPeople } from '../../api/people';
import { PersonInterface } from '../../react-app-env';
import { Loader } from '../Loader/Loader';
import { PeopleTable } from '../PeopleTable/PeopleTable';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<PersonInterface[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPeople().then(peopleData => setPeople(peopleData));

    setTimeout(() => (
      setIsLoaded(true)
    ), 200);
  }, []);

  return (
    <>
      <h2 className="has-text-centered is-size-2">
        People Page
      </h2>

      {!isLoaded
        ? <Loader />
        : <PeopleTable people={people} />}
    </>
  );
};
