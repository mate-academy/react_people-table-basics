import { Person } from '../../types';
import { List } from '../List';
import { Loader } from '../Loader';

type Props = {
  people: Person[] | null;
  selectedPerson: string;
  isLoading: boolean;
};

export const PeopleTable: React.FC<Props> = (
  {
    people,
    selectedPerson = '',
    isLoading,
  },
) => {
  return (
    <>
      {isLoading
        ? <Loader />
        : (
          <List
            people={people}
            selectedPerson={selectedPerson}
          />
        )}
    </>
  );
};
