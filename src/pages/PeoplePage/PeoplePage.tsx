import { useEffect, useState } from 'react';
import { getPeople } from '../../api';
import { PeopleTable } from '../../components/PeopleTable';
import { Person } from '../../types/Person';

type Props = {
  changeLoading: (status: boolean) => void;
  changeError: (status: boolean) => void;
  changeNoData: (status: boolean) => void;
};

export const PeoplePage: React.FC<Props> = ({
  changeLoading,
  changeError,
  changeNoData,
}) => {
  const [people, setPeople] = useState<Person[]>([]);

  const selectPerson = (slug: string) => {
    const selectedPeople = people.map(person => {
      if (slug === person.slug) {
        return ({ ...person, selected: !person.selected });
      }

      return ({ ...person, selected: false });
    });

    setPeople(selectedPeople);
  };

  useEffect(() => {
    changeLoading(true);

    getPeople()
      .then((peopleFromServer) => {
        const mapedPeople = peopleFromServer.map(person => ({
          ...person,
          selected: false,
        }));

        setPeople(mapedPeople);

        if (!mapedPeople.length) {
          changeNoData(true);
        }

        changeLoading(false);
      })
      .catch(() => {
        changeError(true);
        changeLoading(false);
      });
  }, []);

  return (
    <PeopleTable people={people} selectPerson={selectPerson} />
  );
};
