import { Person } from '../../types';
import { People } from '../People/People';

type Props = {
  people: Person[];
};

export const PeopleTable = ({ people }: Props) => <People users={people} />;
