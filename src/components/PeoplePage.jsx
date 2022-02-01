/* eslint-disable max-len */
import { useEffect, useState, React } from 'react';
import { getPeople } from '../api';
import PeopleTable from './PeopleTable';

const PeoplePage = () => {
  const [people, setPeople] = useState();

  useEffect(() => {
    const humans = async() => {
      const peoples = await getPeople();

      return peoples;
    };

    humans()
      .then((result) => {
        const peopleAndParents = result.map((person) => {
          const mother = result.find(peop => peop.name === person.motherName);
          const father = result.find(peop => peop.name === person.fatherName);

          return (
            {
              ...person,
              mother,
              father,
            }
          );
        });

        setPeople(peopleAndParents);
      });
  }, []);

  return (
    <div>
      {people && <PeopleTable people={people} />}
    </div>
  );
};

export default PeoplePage;
