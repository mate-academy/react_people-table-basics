import { useEffect, useState } from 'react';
import { Loader } from './Loader';
import { Person } from '../types';
import { getPeople } from '../api';
import { PeopleTable } from './PeopleTable';
import { PeoplePageStatus } from '../types/types';

export const PeoplePage: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [status, setStatus] = useState(PeoplePageStatus.Loading);

  const loadPeople = async () => {
    setStatus(PeoplePageStatus.Loading);

    try {
      const loadedPeople = await getPeople();

      setPeople(
        loadedPeople.map((personToMap, _index, peopleToMap) =>
          peopleToMap.reduce(
            (person, parent) => ({
              ...person,
              mother:
                parent.name === person.motherName ? parent : person.mother,
              father:
                parent.name === person.fatherName ? parent : person.father,
            }),
            personToMap,
          ),
        ),
      );

      if (loadedPeople.length) {
        setStatus(PeoplePageStatus.Success);
      } else {
        setStatus(PeoplePageStatus.Idle);
      }
    } catch {
      setStatus(PeoplePageStatus.Error);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  let content: React.JSX.Element;

  switch (status) {
    case PeoplePageStatus.Success:
      content = <PeopleTable people={people} />;
      break;
    case PeoplePageStatus.Idle:
      content = (
        <p data-cy="noPeopleMessage">There are no people on the server</p>
      );
      break;
    case PeoplePageStatus.Loading:
      content = <Loader />;
      break;
    case PeoplePageStatus.Error:
      content = (
        <p data-cy="peopleLoadingError" className="has-text-danger">
          Something went wrong
        </p>
      );
      break;
    default:
      throw new Error('People page status is not valid!!!');
  }

  return (
    <>
      <h1 className="title">People Page</h1>
      <div className="block">{content}</div>
    </>
  );
};
