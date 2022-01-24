import { useEffect, useState } from 'react';
import { getPeople } from '../../api/getPeole';
import PeopleTable from '../../components/PeopleTable/PeopleTable';
import { IPeople, IPeopleWithParents } from '../../entities/IPeople';

function PeoplePage() {
  const [people, setPeople] = useState<IPeopleWithParents[]>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const humans = async () => {
      const peoples = await getPeople();

      return peoples;
    };

    humans()
      .then((result) => {
        const peoplesWithParents: IPeopleWithParents[] = result.map((child: IPeople) => {
          const mother = result.find((person: IPeople) => person.name === child.motherName);
          const father = result.find((person: IPeople) => person.name === child.fatherName);

          return (
            {
              ...child,
              mother,
              father,
            }
          );
        });

        setIsLoading(false);
        setPeople(peoplesWithParents);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isError) {
    return <h2>Error, please try again.</h2>;
  }

  return (
    <>
      {isLoading && <h2>Loading...</h2>}
      {people && <PeopleTable people={people} />}
    </>
  );
}

export default PeoplePage;
