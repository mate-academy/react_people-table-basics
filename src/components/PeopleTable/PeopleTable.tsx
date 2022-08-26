import { Person } from '../../types';
import { List } from '../List/List';
import { Loader } from '../Loader';

type Props = {
  people: Person[];
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
