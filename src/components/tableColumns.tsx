import { TableColumn } from '../types/TableColumn';
import { PersonLink } from '../components/PersonLink';
import { ParentCell } from '../components/ParentCell';

export const tableColumns: TableColumn[] = [
  {
    title: 'Name',
    key: 'name',
    render: person => <PersonLink person={person} />,
  },
  {
    title: 'Sex',
    key: 'sex',
  },
  {
    title: 'Born',
    key: 'born',
  },
  {
    title: 'Died',
    key: 'died',
  },
  {
    title: 'Mother',
    key: 'motherName',
    render: (person, people) => (
      <ParentCell parentName={person.motherName} people={people} />
    ),
  },
  {
    title: 'Father',
    key: 'fatherName',
    render: (person, people) => (
      <ParentCell parentName={person.fatherName} people={people} />
    ),
  },
];
