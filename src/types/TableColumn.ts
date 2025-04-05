import { Person } from './Person';

export interface TableColumn {
  title: string;
  key: keyof Person;
  render?: (person: Person, people: Person[]) => React.ReactNode;
}
