import { useState, useEffect } from 'react';
import { People } from '../../types/People';
import { getPeople } from '../../utils/api';
import { PeopleTable } from '../PeopleTable';
import { Spinner } from '../Spinner';

export const PeoplePage: React.FC = () => {
  const [peopleServer, setPeopleServer] = useState<People[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPeople()
      .then(people => {
        setPeopleServer(people.map((person: People) => {
          const father = people.find((el: People) => person.fatherName === el.fatherName);
          const mother = people.find((el: People) => person.motherName === el.motherName);

          return { ...person, father, mother };
        }));

        setIsLoading(false);
      });
  }, []);

  return (
    <section className="people">
      <div className="container">
        <h1 className="title">People Page</h1>
        <div className="people__body">
          {
            isLoading
              ? <Spinner />
              : <PeopleTable people={peopleServer} />
          }
        </div>
      </div>
    </section>
  );
};
